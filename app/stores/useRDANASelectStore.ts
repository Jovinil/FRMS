import { defineStore } from 'pinia'

export const useRDANASelectStore = defineStore('rdanaSelect', () => {
    const forms = ref<Array< 'rdana' | 'dana' >>([ 'rdana', 'dana' ])
    const isSelected = ref<'rdana' | 'dana' >('rdana')


    return {
        forms,
        isSelected
    }
})