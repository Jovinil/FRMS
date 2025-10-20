import { useAuthStore } from "#imports";

export default defineNuxtPlugin(async () => {
    await useAuthStore().fetchUsers();
    await useBarangayStore().fetchBarangays();
})
