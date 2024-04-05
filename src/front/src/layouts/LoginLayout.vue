<template>

    <v-snackbar v-model="success_snack" timeout="2000" color="green" class="snackbar">{{ snack_text }}</v-snackbar>
    <v-snackbar v-model="error_snack" timeout="2000" color="red" class="snackbar">{{ snack_text }}</v-snackbar>

    <div style="max-width: 1440px; margin: auto;">
        <router-view></router-view>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useAppStore } from '../stores/app';
const appStore = useAppStore();

let { success_snack, error_snack, snack_text } = storeToRefs(appStore);
</script>