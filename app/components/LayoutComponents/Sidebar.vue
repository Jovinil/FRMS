<template>
    <div class="sidebar-menu border-1 border-y-0 w-64 hidden md:flex flex-col items-center gap-3 py-3">
        <UButton
            v-for="item in adminMenu"
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

const sidebarUi = {
    base: "w-full rounded-none justify-center bg-none",
}

const adminMenu = [
  { label: "Dashboard", to: "/admin/" },
  { label: "User Management", to: "/admin/userManagement" },
  { label: "RDANA/DANA", to: "/admin/rdana" },
  { label: "Generate Report", to: "/admin/generateReport" },
  { label: "Logout", to: "/" }
]

const MDRRMOMenu = [
  { label: "Dashboard", to: "/" },
  { label: "Generate Report", to: "/test" },
  { label: "Map", to: "/rdana" },
  { label: "RDANA/DANA", to: "/reports" },
  { label: "Logout", to: "/logout" }
]

const barangayMenu = [
  { label: "RDANA", to: "/" },
  { label: "DANA", to: "/test" },
  { label: "Evacuation Center", to: "/rdana" },
  { label: "Logout", to: "/logout" }
]



</script>