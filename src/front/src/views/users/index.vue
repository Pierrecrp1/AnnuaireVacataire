<template>
    <v-row no-gutters>
        <v-col cols="12" md="8" class="mt-md-8 mt-4">
            <p class="text-uppercase text-h4 ml-2 my-2" style="white-space: normal;">
                Utilisateurs
            </p>
        </v-col>
    </v-row>
    <v-row class="my-md-2 my-4" no-gutters align="center">
        <v-col cols="12" md="6" class="pa-2">
            <v-text-field 
            v-model="search" 
            label="Rechercher" 
            single-line 
            hide-details
            append-inner-icon="mdi-magnify"
            density="compact"></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
            <v-row no-gutters class="d-inline-flex">
                <v-checkbox label="Nom" value="nom" hide-details v-model="filters"></v-checkbox>
                <v-checkbox label="Prénom" value="prenom" class="ml-2" hide-details v-model="filters"></v-checkbox>
                <v-checkbox label="Email" value="email" class="ml-2" hide-details v-model="filters"></v-checkbox>
            </v-row>
        </v-col>
  </v-row>
  <UsersList :utilisateurs="filteredUtilisateurs"/>
</template>

<script setup>
import { ref, computed } from 'vue';
import UsersList from '../../components/users/UsersList.vue';
import { useUtilisateursStore } from '../../stores/utilisateurs';

const utilisateursStore = useUtilisateursStore();
const search = ref('');
const filters = ref(["nom"]);

const filteredUtilisateurs = computed(() => {
  if ( filters.value.length === 0 ) return utilisateursStore.getUsersVerified();
  return utilisateursStore.getUsersVerified().filter((utilisateur) => {
    return filters.value.some((filter) => {
      return utilisateur[filter].toLowerCase().includes(search.value.toLowerCase());
    });
  });
});
</script>