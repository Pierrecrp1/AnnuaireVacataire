<template>
    <LeftMenu/>

    <v-snackbar v-model="success_snack" timeout="2000" color="green" class="snackbar">{{ snack_text }}</v-snackbar>
    <v-snackbar v-model="error_snack" timeout="2000" color="red" class="snackbar">{{ snack_text }}</v-snackbar>

    <div class="viewHome" v-if="loaded">
        <router-view></router-view>
    </div>
    <v-progress-circular
      :size="50"
      color="primary"
      indeterminate
      v-else
    ></v-progress-circular>
</template>

<script setup>
import LeftMenu from '../components/menus/LeftMenu.vue';
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useAppStore } from '../stores/app';
import { useVacatairesStore } from '../stores/vacataires';
import { useUtilisateursStore } from '../stores/utilisateurs';
import { useCompetencesStore } from '../stores/competences';

const vacatairesStore = useVacatairesStore();
const utilisateursStore = useUtilisateursStore();
const competencesStore = useCompetencesStore();
const appStore = useAppStore();

let { success_snack, error_snack, snack_text } = storeToRefs(appStore);

vacatairesStore.populateVacataires();
if (localStorage.level && localStorage.level >= 2) utilisateursStore.populateUsers();
competencesStore.populateCompetences();

const loaded = computed(() => {
    if (localStorage.level && localStorage.level >= 2){
        return vacatairesStore.loaded && utilisateursStore.loaded && competencesStore.loaded;
    }
    return vacatairesStore.loaded && competencesStore.loaded;
});
</script>

<style>
.viewHome {
    margin-left: 56px;
    padding: 0 2rem;

    @media screen and (max-width: 960px) {
        padding: 0 1rem;
    }
}
</style>