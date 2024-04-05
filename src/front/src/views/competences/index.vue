<template>
    <v-row no-gutters>
      <v-col cols="12" md="8" class="mt-md-8 mt-4">
        <p class="text-uppercase text-h4 ml-2 my-2" style="white-space: normal;">
            Compétences
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
    </v-row>
    <v-row no-gutters class="my-4">
      <v-col v-if="canEdit">
        <v-btn prepend-icon="mdi-plus" :to="{name: 'competences-create'}" color="#0bade2">
          Nouvelle compétence
        </v-btn>
      </v-col>
    </v-row>
    <ListCompetences :search="search"/>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import ListCompetences from '../../components/competences/ListCompetences.vue';
  
  const search = ref('');
  
  const canEdit = computed(() => {
    if (localStorage.level && localStorage.level > 1) return true;
    return false;
  });
  </script>