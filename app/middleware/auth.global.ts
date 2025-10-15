import { defineNuxtRouteMiddleware, navigateTo } from '#app'
import { useSupabaseClient, useSupabaseUser } from '#imports'
import { useAuthStore } from '@/stores/useAuthStore'
import type { User } from '@prisma/client'
import SuperJSON from 'superjson'

export default defineNuxtRouteMiddleware(async (to) => {
  const supabase = useSupabaseClient()
  const supabaseUser = await supabase.auth.getUser()
  const auth = useAuthStore()

  // 🟢 Public routes (no auth needed)
  const publicRoutes = ['/login', '/register', '/forgot-password', '/logout', '/createAccount']
  if (publicRoutes.includes(to.path)) return

  // 🧠 Restore Supabase session (prevents logout on refresh)
  if (!supabaseUser) {
    const { data } = await supabase.auth.getSession()
    if (!supabaseUser && data.session?.user) {
  // No need to mutate supabaseUser — just use data.session.user directly
  const currentUser = data.session.user
  // you can use `currentUser` below
}

  }

  // 🛑 Still no user → redirect to login
  if (!supabaseUser) {
    return navigateTo('/login')
  }

  // 🧩 Fetch your Prisma user (app-level user)
  if (!auth.user) {
    try {
      const dbUser = await $fetch('/api/user/profile', {
        headers: { Authorization: `Bearer ${supabaseUser.data.user?.email}` }, // use email to match your login flow
      })

      if (dbUser) {
        auth.setUser(SuperJSON.deserialize(dbUser.data))
      } else {
        console.warn('No Prisma user found, signing out...')
        await supabase.auth.signOut()
        return navigateTo('/login')
      }
    } catch (err) {
      console.error('❌ Error fetching profile:', err)
      await supabase.auth.signOut()
      return navigateTo('/login')
    }
  }

  // ✅ Role-based redirection
  const role = auth.user?.role  || 'USER'

  switch (role) {
    case 'ADMIN':
      if (!to.path.startsWith('/admin')) return navigateTo('/admin')
      break
    case 'BARANGAY_OFFICIAL':
      if (!to.path.startsWith('/barangay')) return navigateTo('/barangay')
      break
    case 'MDRRMO':
      if (!to.path.startsWith('/mdrrmo')) return navigateTo('/mdrrmo')
      break
    default:
      return navigateTo('/login')
  }
})
