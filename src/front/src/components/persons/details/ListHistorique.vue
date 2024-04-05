<template>
  <v-card class="ma-2 mb-6 pa-0" :color="props.editable ? '#F1F1F1' : '#ffffff'">
    <v-card-item width="100%" class="pa-0">
      <v-card color="#004F88" width="100%">
        <v-card-item width="100%" class="pa-4">
          <v-row no-gutters>
            <v-col cols="12" sm="8">
                <v-card-title class="text-uppercase mb-2" style="white-space: normal;">
                    Historique
                </v-card-title>
            </v-col>
            <v-col v-if="props.canEdit" cols="12" sm="4" align="right">
                <v-btn @click="showModal = true" class="mr-4" v-if="props.editable">
                    <v-icon icon="mdi-plus" width="30" size="x-large"></v-icon>
                </v-btn>
                <v-btn @click="emit('editing')">
                    <v-icon :icon="props.editable ? 'mdi-pencil-off' : 'mdi-pencil'" width="30" size="x-large"></v-icon>
                </v-btn>
            </v-col>
        </v-row>
        </v-card-item>
      </v-card>
    </v-card-item>
    <v-card-item class="my-4">
      <v-table density="compact" :style="{'background-color': props.editable ? '#F1F1F1' : '#ffffff'}">
        <thead>
          <tr>
            <th class="text-left text-uppercase">Ressource</th>
            <th class="text-center text-uppercase">Date deb</th>
            <th class="text-center text-uppercase">Date fin</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ressource of props.historique"
          :key="ressource"
          @click="showDetail(ressource)" 
          :class="{'historiqueRow' : props.editable}">
            <td :contenteditable="props.editable">{{ ressource.ressource }}</td>
            <td :contenteditable="props.editable" class="text-center">{{ ressource.date_deb }}</td>
            <td :contenteditable="props.editable" class="text-center">{{ ressource.date_fin }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-card-item>
  </v-card>
  <v-dialog
      v-model="showModal"
      width="500"
    >
    <ModalRessource :id="props.id" @closeModal="showModal=false" @addRessource="(data) => emit('addRessource', data)"/>
    </v-dialog>
    <v-dialog
      v-model="showModifModal"
      width="500"
    >
    <ModalModifRessource :id="props.id" :form="modifModalValue" @closeModal="showModifModal=false" @modifRessource="modifRessource" @deleteRessource="deleteRessource"/>
    </v-dialog>
    
</template>

<script setup>
import { ref } from 'vue';
import ModalRessource from './modals/ModalRessource.vue';
import ModalModifRessource from './modals/ModalModifRessource.vue';
const props = defineProps(['editable', 'id', 'historique', 'canEdit']);
const emit = defineEmits(['addRessource', 'editing', 'modifRessource', 'deleteRessource']);

const showModal = ref(false);
const showModifModal = ref(false);
const modifModalValue = ref(null);

function modifRessource(res){
  emit('modifRessource', {oldValue: res.oldValue, newValue: res.newValue});
  showModifModal.value = false;
}

function deleteRessource(res){
  emit('deleteRessource', res);
  showModifModal.value = false;
}

function showDetail(item){
  if (props.editable){
    modifModalValue.value = item;
    showModifModal.value = true;
  }
}
</script>

<style>
.historiqueRow {
  cursor: pointer;
}

.historiqueRow:hover {
  background-color: #ffffff;
}
</style>
