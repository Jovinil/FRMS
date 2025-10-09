import { defineStore } from 'pinia'

export const useRDANASelectStore = defineStore('rdanaSelect', () => {
    const forms = ref<Array< 'RDANA' | 'DANA' >>([ 'RDANA', 'DANA' ])
    const isSelected = ref<'RDANA' | 'DANA' >('RDANA')


    return {
        forms,
        isSelected
    }
})