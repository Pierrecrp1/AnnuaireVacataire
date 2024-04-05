<template>
  <v-row class="mt-4 px-2">
      <v-col>
          <v-card variant="flat" width="100%">
          <v-card-item width="100%" class="pa-4 pb-0 pb-md-8">
              <v-row no-gutters>
                  <v-col cols="12" md="8">
                      <v-card-title class="text-uppercase text-h4 my-2" style="white-space: normal; line-height: 50px;">
                          {{ vacataire.nom || 'Nom' }}
                      </v-card-title>
                      <v-card-subtitle class="text-capitalize text-h6" style="white-space: normal; line-height: 30px;">
                          {{ vacataire.prenom || 'Prénom' }}
                      </v-card-subtitle>
                  </v-col>
                  <v-col cols="12" md="4" class="text-md-right text-left">
                      <v-btn @click="validVacataire" class="mr-8 mb-4" color="green">
                          Valider <v-icon icon="mdi-check" width="30" size="x-large" class="ml-2"></v-icon>
                      </v-btn>
                      <v-btn v-bind="props" @click="modalDelete = true" color="error" class="mb-4">
                          Refuser <v-icon icon="mdi-close" width="30" size="x-large"></v-icon>
                      </v-btn>
                  </v-col>
              </v-row>
      </v-card-item>
  </v-card>
      </v-col>
  </v-row>
  <v-dialog
    v-model="modalDelete"
    width="500"
  >
  <v-card title="Suppression">
    <v-card-text>
      Voulez-vous vraiment refuser ce vacataire ?
    </v-card-text>
      <v-spacer></v-spacer>
      <v-row no-gutters class="px-6 my-4">
          <v-col>
              <v-btn
              text="Annuler"
              @click="modalDelete = false"
              width="100"
              ></v-btn>
          </v-col>
          <v-col>
              <v-btn
              text="Supprimer définitivement"
              color="error"
              @click="deleteVacataire"
              width="250"
              ></v-btn>
          </v-col>
      </v-row>
  </v-card>
  </v-dialog>
  <v-row no-gutters>
      <v-col align="left">
          <v-btn class="ml-6" width="180" :color="statutColor[statut]">
              <p class="px-2">{{ vacataire.disponibilite }}</p>
              <v-icon icon="mdi-account-box" width="30" size="x-large"></v-icon>
          </v-btn>
      </v-col>
  </v-row>
  <v-row>
      <v-col cols="12" md="6">
        <VacataireInfo :vacataire="vacataire"/>
      </v-col>
      <v-col cols="12" md="6">
        <VacataireCompetences :id="props.id" :competences="vacataire.competences"/>
        <VacataireHistorique :id="props.id" :historique="vacataire.historique_vacation"/>
      </v-col>
  </v-row>
</template>

<script setup>
import { ref } from 'vue';
import VacataireInfo from '../../../components/validations/vacataires/VacataireInfo.vue';
import VacataireCompetences from '../../../components/validations/vacataires/VacataireCompetences.vue';
import VacataireHistorique from '../../../components/validations/vacataires/VacataireHistorique.vue';
import { useVacatairesStore } from '../../../stores/vacataires';
import router from '../../../router';

const vacatairesStore = useVacatairesStore();
const props = defineProps(['id']);

const vacataire = ref(vacatairesStore.getVacataire(props.id));

const modalDelete = ref(false);

const statut = ref(
  vacataire.value.disponibilite === 'indisponible' ? 0
  : vacataire.value.disponibilite === 'neutre' ? 1 : 2
  );
const statutColor = ['error', 'grey', 'success'];

function deleteVacataire(){
  router.push({ name:'validations-vacataires' });
}

function validVacataire() {
  vacatairesStore.validVacataire(props.id);
  router.push({ name:'validations-vacataires' });
}
</script>

<style>

</style>