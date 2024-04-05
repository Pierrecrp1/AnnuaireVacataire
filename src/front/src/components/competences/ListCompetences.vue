<template>
    <v-data-table
    :headers="headers"
    :items="filteredCompetences"
    :sort-by="[{ key: 'calories', order: 'asc' }]"
    class="elevation-1"
  >
  <template v-slot:item="{ item }">
    <tr>
      <td>{{ item.selectable.nom }}</td>
      <td>
        <div class="d-flex justify-center align-center">
          <v-chip style="width: 50px !important;" 
        :style="{ 'background-color': item.selectable.color }"></v-chip>
        </div>
    </td>
    <td>
      <div class="d-flex justify-center align-center">
        <v-chip style="width: 50px !important;"
        :style="{ 'background-color': item.selectable.text }"></v-chip>
      </div>
    </td>
    <td>
      <div v-if="canEdit" class="d-flex justify-end align-center">
        <v-icon
          size="small"
          class="me-2"
          @click="router.push({ name:'competences-modif', params: { id: item.selectable._id }})"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          size="small"
          @click="showModal(item.selectable)"
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
        Voulez-vous vraiment supprimer cette compétence ?<br>
        La compétence sera supprimée de toutes les fiches des vacataires
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
                @click="deleteComp"
                width="250"
                ></v-btn>
            </v-col>
        </v-row>
    </v-card>
    </v-dialog>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useCompetencesStore } from '../../stores/competences';
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps(['search']);

const competencesStore = useCompetencesStore();

const modalDelete = ref(false);

const headers = ref([
    {
      title: 'Nom',
      align: 'start',
      key: 'nom',
    },
    { title: 'Couleur', align: 'center', key: 'color' },
    { title: 'Couleur du texte', align: 'center', key: 'text' },
    { title: '', align: 'end', key: 'actions', sortable: false },
  ]);

const delCompetence = ref(null);

const filteredCompetences = computed(() => {
  return competencesStore.competences
  .filter(chip => chip.nom.toLowerCase().includes(props.search.toLowerCase()));});

const canEdit = computed(() => {
  if (localStorage.level && localStorage.level > 1) return true;
  return false;
});

function showModal(competence){
  delCompetence.value = competence;
  modalDelete.value = true;
}

function deleteComp(){
  competencesStore.deleteCompetence(delCompetence.value);
  delCompetence.value = null;
  modalDelete.value = false;
}
</script>