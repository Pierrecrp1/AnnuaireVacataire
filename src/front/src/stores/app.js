import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', () => {
    let success_snack = ref(false);
    let error_snack = ref(false);
    
    let snack_text = ref('');

    return { success_snack, error_snack, snack_text };
});
