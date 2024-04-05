<template>
  <v-row class="my-md-2 my-8" no-gutters align="center">
    <v-col cols="12" md="4" class="pa-2">
      <v-text-field 
      v-model="search" 
      label="Rechercher" 
      single-line 
      hide-details
      append-inner-icon="mdi-magnify"
      density="compact"></v-text-field>
    </v-col>
    <v-col cols="12" md="8" class="pa-2 d-flex justify-space-between flex-sm-row flex-column">
      <v-btn color="#01AAE1" size="large" width="110" @click="showFilters = !showFilters">Filtres</v-btn>
      <v-btn v-if="router.currentRoute.value.name === 'home'" color="#01AAE1" size="large" width="130" class="mt-4 mt-sm-0" @click="exportCSV">EXPORTER</v-btn>
    </v-col>
  </v-row>
  <v-row no-gutters v-if="showFilters" class="mb-2">
    <v-col cols="12">
        <v-row no-gutters class="d-inline-flex">
          <v-checkbox hide-details label="Nom" value="nom" class="mr-4" v-model="filters"></v-checkbox>
          <v-checkbox hide-details label="Prenom" value="prenom" class="mr-4" v-model="filters"></v-checkbox>
        </v-row>
      <v-divider class="border-opacity-75 mx-2"></v-divider>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import exportFromJSON from 'export-from-json';
import { useVacatairesStore } from '../../stores/vacataires';
import { useRouter } from 'vue-router';
  
const emit = defineEmits(['search', 'filters']);
const router = useRouter();
const vacatairesStore = useVacatairesStore();

const showFilters = ref(false);

const filters = ref(["nom"]);
let search = ref('');

watch(search, (val) => {
  emit('search', val.toLowerCase());
});

watch(filters, (val) => {
  emit('filters', val);
});

const filterVacataires = computed(() => {
  if (filters.value.length===0) return vacatairesStore.getVerifVacataires();
  return vacatairesStore.getVerifVacataires().filter((vacataire) => {
    return filters.value.some((filter) => {
      return vacataire[filter].toLowerCase().includes(search.value);
    });
  });
});

function exportCSV() {
  const data = JSON.parse(JSON.stringify(filterVacataires.value));
  const fileName = 'export_vacataires';
  const exportType = exportFromJSON.types.csv;
  const delimiter = ';';

  for (const vac of Object.values(data)) {
    for (const val of Object.keys(vac)) {
      if (typeof(vac[val]) == 'object') { delete vac[val]; continue;};
      if (val == '__v') { delete vac[val]; }
    }
  }

  exportFromJSON({ data, fileName, exportType, delimiter });
}
</script>
