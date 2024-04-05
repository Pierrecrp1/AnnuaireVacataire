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
                    <v-col v-if="canEdit" cols="12" md="4" class="text-md-right text-left">
                        <v-btn @click="updateVacataire" class="mb-4" :class="{ 'mr-8' : !persoFiche}" color="green">
                            Sauvegarder <v-icon icon="mdi-content-save" width="30" size="x-large" class="ml-2"></v-icon>
                        </v-btn>
                        <v-btn v-if="!persoFiche" v-bind="props" @click="modalDelete = true" color="error" class="mb-4">
                            <v-icon icon="mdi-delete" width="30" size="x-large"></v-icon>
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
        Voulez-vous vraiment supprimer ce vacataire ?
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
            <v-btn @click="changeStatut" class="ml-6" width="180" :color="statutColor[statut]">
                <p class="px-2">{{ vacataire.disponibilite }}</p>
                <v-icon icon="mdi-account-box" width="30" size="x-large"></v-icon>
            </v-btn>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12" md="6">
            <PersonalInfo :canEdit="canEdit" :editable="editable.perso.value" :vacataire="vacataire" @editing="editable.perso.value=!editable.perso.value"/>
            </v-col>
        <v-col cols="12" md="6">
            <ListCompetences :canEdit="canEdit" :editable="editable.chips.value" :id="props.id" :competences="vacataireCompetences" @addChips="addChips" @deleteChip="deleteChip" @editing="editable.chips.value=!editable.chips.value"/>
            <ListHistorique :canEdit="canEdit" :editable="editable.historique.value" :historique="vacataireRessources" :id="props.id" @addRessource="addRessource" @modifRessource="modifRessource" @deleteRessource="deleteRessource" @editing="editable.historique.value=!editable.historique.value"/>
        </v-col>
    </v-row>
</template>

<script setup>
import { ref, computed } from 'vue';
import PersonalInfo from '../../components/persons/details/PersonalInfo.vue';
import ListCompetences from '../../components/persons/details/ListCompetences.vue';
import ListHistorique from '../../components/persons/details/ListHistorique.vue';
import { useVacatairesStore } from '../../stores/vacataires';
import router from '../../router';

const vacatairesStore = useVacatairesStore();
const props = defineProps(['id']);

const vacataire = ref({}); 
Object.assign(vacataire.value, vacatairesStore.getVacataire(props.id));
const vacataireCompetences = ref([]);
Object.assign(vacataireCompetences.value, vacataire.value.competences);
const vacataireRessources = ref([]);
Object.assign(vacataireRessources.value, vacataire.value.historique_vacation);

const editable = {
    perso: ref(false),
    chips: ref(false),
    historique: ref(false),
};

const modalDelete = ref(false);

const statut = ref(
    vacataire.value.disponibilite === 'indisponible' ? 0
    : vacataire.value.disponibilite === 'neutre' ? 1 : 2
    );
const statutColor = ['error', 'grey', 'success'];

const canEdit = computed(() => {
    if ((localStorage.level && localStorage.level > 1) || (localStorage.userId && localStorage.userId === vacataire.value._id)) return true;
    return false;
});

const persoFiche = computed(() => { return (localStorage.userId && localStorage.userId === vacataire.value._id);});

function changeStatut(){
    if (canEdit.value){
        statut.value=(statut.value+1)%3;
        statut.value === 1 ? vacataire.value.disponibilite = 'neutre' :
        statut.value === 2 ? vacataire.value.disponibilite = 'disponible'
        : vacataire.value.disponibilite = 'indisponible';
    }
}

function addChips(chipsList){
    for (const chip of chipsList){
        vacataireCompetences.value.push(chip);
    }
}

function deleteChip(chip){
    vacataireCompetences.value.splice(vacataireCompetences.value.indexOf(chip), 1);
}

function addRessource(res){
    vacataireRessources.value.push(res);
}

function modifRessource(res){
    const index = vacataireRessources.value.indexOf(res.oldValue);
    vacataireRessources.value[index] = res.newValue;
}

function deleteRessource(val){
    vacataireRessources.value.splice(vacataireRessources.value.indexOf(val), 1);
}

function updateVacataire(){
    vacataire.value.competences = vacataireCompetences.value;
    vacataire.value.historique_vacation = vacataireRessources.value;
    vacatairesStore.updateVacataire(props.id, vacataire.value);
    for (const item in editable) editable[item].value = false;
}

function deleteVacataire(){
    vacatairesStore.deleteVacataire(props.id);
    router.push({ name:'home' });
}
</script>

<style>

</style>