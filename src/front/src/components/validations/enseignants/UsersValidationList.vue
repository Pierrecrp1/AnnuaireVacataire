<template>
    <v-data-table
    :headers="headers"
    :items="props.utilisateurs"
    :sort-by="[{ key: 'calories', order: 'asc' }]"
    class="elevation-1"
  >
  <template v-slot:item="{ item }">
    <tr @click="showModal(item.selectable)" class="userTable">
        <td>{{ item.selectable.nom }}</td>
        <td>{{ item.selectable.prenom }}</td>
        <td>{{ item.selectable.email }}</td>
        <td>{{ userRole(item.selectable.level) }}</td>
    </tr>
      
    </template>
  </v-data-table>
    <v-dialog
      v-model="modalDetail"
      width="500"
    >
    <ModalEnseignantDetail :user="user" @closeModal="modalDetail = false" @deleteUtilisateur="deleteUtilisateur" @validUtilisateur="validUtilisateur"/>
    </v-dialog>
</template>

<script setup>
import { ref } from 'vue';
import ModalEnseignantDetail from './ModalEnseignantDetail.vue';
import { useUtilisateursStore } from '../../../stores/utilisateurs';

const utilisateursStore = useUtilisateursStore();
const props = defineProps(['utilisateurs']);

const modalDetail = ref(false);

const headers = ref([
    { title: 'Nom', align: 'start', key: 'nom' },
    { title: 'Prénom', align: 'left', key: 'prenom' },
    { title: 'Email', align: 'left', key: 'email' },
    { title: 'Rôle', align: 'left', key: 'level' }
  ]);

const user = ref(null);

const roles = [
  'Non vérifié',
  'Utilisateur',
  'Administrateur',
  'Super-Administrateur'
];

function userRole(value) {
  return roles[value];
}

function showModal(item){
    user.value = item;
    modalDetail.value = true;
}

function deleteUtilisateur(){
  utilisateursStore.deleteUtilisateur(user.value._id);
  modalDetail.value = false;
}

function validUtilisateur(){
  utilisateursStore.validUtilisateur(user.value._id);
  modalDetail.value = false;
}
</script>

<style>
.userTable {
  cursor: pointer;
}

.userTable:hover {
  background-color: #eff0f1 !important;
}
</style>