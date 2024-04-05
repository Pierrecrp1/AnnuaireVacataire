<template>
  <v-row no-gutters>
    <v-col cols="12" md="8" class="mt-md-8 mt-4">
      <p class="text-uppercase text-h4 ml-2 my-2" style="white-space: normal;">
        Validation des vacataires
      </p>
    </v-col>
  </v-row>
  <TopMenu @search="defineSearch" @filters="defineFilters"/>
  <ListPersons :persons="filterVacataires" path="validations-vacataires-detail"/>
</template>

<script setup>
import { ref } from 'vue';
import TopMenu from '../../../components/menus/TopMenu.vue';
import ListPersons from '../../../components/persons/ListPersons.vue';
import { useVacatairesStore } from '../../../stores/vacataires';
import { computed } from 'vue';

const vacatairesStore = useVacatairesStore();
const search = ref('');
const filters = ref(["nom"]);

function defineSearch(value){
  search.value = value;
}

function defineFilters(value){
  filters.value = value;
}

const filterVacataires = computed(() => {
  if (filters.value.length===0) return vacatairesStore.getUnverifVacataires();
  return vacatairesStore.getUnverifVacataires().filter((vacataire) => {
    return filters.value.some((filter) => {
      return vacataire[filter].toLowerCase().includes(search.value);
    });
  });
});
</script>