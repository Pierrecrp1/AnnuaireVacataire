<template>
    <v-data-table
    :headers="headers"
    :items="props.utilisateurs"
    :sort-by="[{ key: 'calories', order: 'asc' }]"
    class="elevation-1"
  >
  <template v-slot:item="{ item }">
    <tr>
        <td>{{ item.selectable.nom }}</td>
        <td>{{ item.selectable.prenom }}</td>
        <td>{{ item.selectable.email }}</td>
        <td>{{ userRole(item.selectable.level) }}</td>
    <td>
      <div v-if="canEdit && item.selectable.level < 3" class="d-flex justify-end align-center">
        <v-icon
          size="small"
          class="me-2"
          @click="router.push({ name:'users-modif', params: { id: item.selectable._id }})"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          size="small"
          @click="showModal(item.selectable._id)"
          color="red"
        >
          mdi-delete
        </v-icon>
      </div>
    </td>
    </tr>
      
    </template>
  </v-data-table>
    <v-dialog
      v-model="modalDelete"
      width="500"
    >
    <v-card title="Suppression">
      <v-card-text>
        Voulez-vous vraiment supprimer cette compétence ?
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
                @click="deleteUtilisateur"
                width="250"
                ></v-btn>
            </v-col>
        </v-row>
    </v-card>
    </v-dialog>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUtilisateursStore } from '../../stores/utilisateurs';

const utilisateursStore = useUtilisateursStore();

const router = useRouter();
const props = defineProps(['utilisateurs']);

const modalDelete = ref(false);

const headers = ref([
    { title: 'Nom', align: 'start', key: 'nom' },
    { title: 'Prénom', align: 'left', key: 'prenom' },
    { title: 'Email', align: 'left', key: 'email' },
    { title: 'Rôle', align: 'left', key: 'level' },
    { title: '', align: 'end', key: 'actions', sortable: false },
  ]);

const delUtilisateur = ref(null);

const roles = [
  'Non vérifié',
  'Utilisateur',
  'Administrateur',
  'Super-Administrateur'
];

function userRole(value) {
  return roles[value];
}

const canEdit = computed(() => {
    if (localStorage.level && localStorage.level > 2) return true;
    return false;
});

function showModal(id){
    delUtilisateur.value = id;
    modalDelete.value = true;
}

function deleteUtilisateur(){
    utilisateursStore.deleteUtilisateur(delUtilisateur.value);
    modalDelete.value = false;
}
</script>