<template>
    <div v-for="(vacataire, key) in filteredValidations" 
    :key="key"
>
      <v-card width="400" class="ma-2 mb-6"
      @click="router.push({ name: 'validation', params: { id: props.index } })"
>
        <v-card-item>
          <v-card-title class="text-uppercase">{{ vacataire.nom }}</v-card-title>
          <v-card-subtitle class="text-capitalize">{{ vacataire.nom }}</v-card-subtitle>
        </v-card-item>
        <v-chip-group class="px-4 chip-group">
          <v-chip
            v-for="(competence, compKey) in vacataire.competences"
            :key="compKey"
            :style="{ 'background-color': competence.color, 'color': competence.text }"
          >
            {{ competence.nom }}
          </v-chip>
        </v-chip-group>
      </v-card>

     
    </div>
    
</template>

  
  <script setup>
    import { useRouter } from 'vue-router';
    const router = useRouter();

  import {  computed } from 'vue';
  import { useVacatairesStore } from '../../stores/vacataires';


  const vacatairesStore = useVacatairesStore();
  const props = defineProps(['index', 'validation']);
  
  const filteredValidations = computed(() => {
    return vacatairesStore.vacataires.filter((vacataire) => !vacataire.verifie);
  });
</script>

  // const modalValidate = ref(false);
  // const vacataireToValidate = ref(null);
  

  // function validatevacataireAndCloseModal() {
  //   if (vacataireToValidate.value) {
  //     vacataireToValidate.value = null;
  //     modalValidate.value = false;
  //   }
  // }
  