<template>
    <div class="sidebar-menu border-1 border-y-0 w-64 hidden md:flex flex-col items-center gap-3 py-3">
        <UButton
            v-for="item in currentMenu"
            :key="item.to"
            :ui="sidebarUi"
            variant="ghost"
            active-class="bg-active-color"  
            :to="item.to"
        >
            {{ item.label }}
        </UButton>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed } from 'vue'; // Import computed

const route = useRoute();

const sidebarUi = {
    base: "w-full rounded-none justify-center bg-none",
}

// Menu definitions remain the same...
const adminMenu = [
  { label: "Dashboard", to: "/admin" },
  { label: "User Management", to: "/admin/userManagement" },
  { label: "Create Account", to: "/admin/createAccount" },
]

const MDRRMOMenu = [
  { label: "Dashboard", to: "/mdrrmo/" },
  { label: "Generate Report", to: "/mdrrmo/report" },
  { label: "Map", to: "/mdrrmo/map" },
  { label: "RDANA", to: "/mdrrmo/rdana/form-1" },
]

const barangayMenu = [
  { label: "Dashboard", to: "/barangay" },
  { label: "Form 1", to: "/barangay/first-barangay-form-i" },
  { label: "Form 2", to: "/barangay/second-barangay-form-ii" },
  { label: "Form 3", to: "/barangay/third-barangay-form-iii" },
  { label: "Evacuation Center", to: "/barangay/evacuation-center" },
]
// ... end of menu definitions

/**
 * MOCK LOGIC: Determines the active menu based on the current route path.
 * This assumes your routes are structured with a role prefix (e.g., /admin, /mdrrmo, /barangay).
 */
const currentMenu = computed(() => {
    const path = route.path;

    if (path.startsWith('/admin')) {
        return adminMenu;
    } 
    
    if (path.startsWith('/mdrrmo')) {
        return MDRRMOMenu;
    } 
    
    if (path.startsWith('/barangay')) {
        return barangayMenu;
    }
    
    // Default case (e.g., public pages, login, or general user)
    return []; 
});
</script>