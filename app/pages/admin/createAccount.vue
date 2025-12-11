<script setup lang="ts">
import z from 'zod'


definePageMeta({
  layout: 'empty'
})

type Role = 'ADMIN' | 'BARANGAY_OFFICIAL' | 'MDRRMO'

const userSignupSchema = z.discriminatedUnion('role', [
  z.object({
    role: z.literal('BARANGAY_OFFICIAL'),
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Password too short'),
    barangay: z.string().min(1, 'Barangay required'),
  }),
  z.object({
    role: z.enum(['ADMIN', 'MDRRMO']),
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Password too short'),
  }),
])

const client = useSupabaseClient()
const email = ref('')
const password = ref('')
const role = ref<Role | undefined>()
const name = ref('')
const useAuth = useAuthStore();
const barangay = ref<string | undefined>()
const barangayList = useBarangayStore().barangays
const loading = ref(false)
const status = ref<{ message: string; color: 'red' | 'green' } | null>(null)

const roles = ref([
    {
        label: 'Admin',
        id: 'ADMIN'
    },
    {
        label: 'Barangay official',
        id: 'BARANGAY_OFFICIAL'
    },
    {
        label: 'MDRRMO',
        id: 'MDRRMO'
    },
])

watch(role, (newRole) => {
  if (newRole !== 'BARANGAY_OFFICIAL') {
    barangay.value = undefined
  }
})

const handleSignup = async () => {
  status.value = null
  const payload = {
    name: name.value,
    email: email.value,
    password: password.value,
    role: role.value,
    barangay: barangay.value,
  };


  const validated = userSignupSchema.safeParse(payload)
  if(!validated.success){
    status.value = {
      color: 'red',
      message: validated.error.issues[0]?.message ?? 'Please check the fields and try again.'
    }
    console.log(validated.error.issues)
    return;
  }
  try{
    loading.value = true
    const signup = await client.auth.signUp({
        email: validated.data.email,
        password: validated.data.password
    })
    if(signup.error){
      status.value = {
        color: 'red',
        message: signup.error.message ?? 'Unable to create account.'
      }
      return
    }

    if(validated.data.role === 'BARANGAY_OFFICIAL'){
        await useAuth.createAccount(validated.data.name, validated.data.email, validated.data.password, validated.data.role, validated.data.barangay)
    }else {
        await useAuth.createAccount(validated.data.name, validated.data.email, validated.data.password, validated.data.role)
    }

    status.value = {
      color: 'green',
      message: 'Account created successfully. Share the login details securely with the new user.'
    }

    name.value = ''
    email.value = ''
    password.value = ''
    role.value = undefined
    barangay.value = undefined
  }catch(error){
      console.log(`${error} occured`)
      status.value = {
        color: 'red',
        message: 'Something went wrong while creating the account.'
      }
  } finally {
    loading.value = false
  }
}

</script>

<template>
  <div class="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
    <div class="w-full max-w-5xl grid gap-6 md:grid-cols-2 items-start">
      <div class="rounded-3xl bg-gradient-to-br from-blue-600 via-slate-800 to-slate-900 text-white shadow-2xl p-8 md:p-10 space-y-6">
        <p class="text-sm uppercase tracking-[0.2em] text-blue-100">FRMS Admin</p>
        <div class="space-y-3">
          <h1 class="text-3xl font-semibold leading-tight">Create a new account</h1>
          <p class="text-sm text-blue-50/80">
            Add an Admin, Barangay Official, or MDRRMO user. Keep credentials secure and make sure the selected role matches the user’s responsibilities.
          </p>
        </div>

        <div class="space-y-4">
          <div class="flex gap-3">
            <span class="h-9 w-9 flex items-center justify-center rounded-full bg-white/10 border border-white/10 text-sm font-semibold">1</span>
            <div>
              <p class="font-semibold">Pick the right role</p>
              <p class="text-sm text-blue-50/70">Barangay Officials need their barangay assigned; Admins and MDRRMO don’t.</p>
            </div>
          </div>
          <div class="flex gap-3">
            <span class="h-9 w-9 flex items-center justify-center rounded-full bg-white/10 border border-white/10 text-sm font-semibold">2</span>
            <div>
              <p class="font-semibold">Use strong passwords</p>
              <p class="text-sm text-blue-50/70">Minimum 6 characters; encourage the user to change it on first login.</p>
            </div>
          </div>
          <div class="flex gap-3">
            <span class="h-9 w-9 flex items-center justify-center rounded-full bg-white/10 border border-white/10 text-sm font-semibold">3</span>
            <div>
              <p class="font-semibold">Share credentials securely</p>
              <p class="text-sm text-blue-50/70">Send via an approved channel and confirm receipt.</p>
            </div>
          </div>
        </div>
      </div>

      <UCard class="shadow-xl rounded-2xl">
        <template #header>
          <div class="space-y-1">
            <p class="text-lg font-semibold text-slate-900">Account details</p>
            <p class="text-sm text-slate-500">All fields are required unless noted otherwise.</p>
          </div>
        </template>

        <form @submit.prevent="handleSignup" class="space-y-5">
          <div class="grid gap-4">
            <UFormGroup label="Full name" name="name">
              <UInput v-model="name" type="text" placeholder="Enter full name" />
            </UFormGroup>

            <UFormGroup label="Email" name="email" help="Use the official email the user will own.">
              <UInput v-model="email" type="email" placeholder="user@domain.com" />
            </UFormGroup>

            <UFormGroup label="Password" name="password" help="At least 6 characters.">
              <UInput v-model="password" type="password" placeholder="Create a temporary password" />
            </UFormGroup>

            <UFormGroup label="Role" name="role" help="This controls what the user can see and do.">
              <UInputMenu v-model="role" value-key="id" :items="roles" placeholder="Select role" class="w-full" />
            </UFormGroup>

            <UFormGroup
              v-if="role === 'BARANGAY_OFFICIAL'"
              label="Barangay"
              name="barangay"
              help="Assign the barangay this official represents."
            >
              <UInputMenu
                v-model="barangay"
                value-key="name"
                label-key="location"
                :items="barangayList"
                placeholder="Select barangay"
                class="w-full"
              />
            </UFormGroup>
          </div>

          <div class="space-y-3">
            <UAlert
              v-if="status"
              color="info"
              variant="soft"
              class="border"
            >
              {{ status.message }}
            </UAlert>

            <UButton
              type="submit"
              color="primary"
              variant="solid"
              class="w-full"
              :loading="loading"
              :ui="{ base: 'justify-center' }"
            >
              Create account
            </UButton>
          </div>
        </form>
      </UCard>
    </div>
  </div>
</template>
