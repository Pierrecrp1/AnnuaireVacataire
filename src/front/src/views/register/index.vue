<template>
    <v-row class="mt-4 px-2">
        <v-col>
            <v-card variant="flat" width="100%">
            <v-card-item width="100%" class="pa-4 pb-0 pb-md-8">
                <v-row no-gutters>
                    <v-col cols="12" md="8">
                        <v-btn :to="{ name: 'login' }" class="mb-4" color="grey" prepend-icon="mdi-arrow-left-thick">
                            Retour
                        </v-btn>
                    </v-col>
                    <v-col cols="12" md="4" class="text-md-right text-left">
                        <v-btn @click="registerVacataire" class="mb-4" color="green">
                            S'enregistrer
                        </v-btn>
                    </v-col>
                </v-row>
        </v-card-item>
    </v-card>
        </v-col>
    </v-row>
    <v-row no-gutters>
        <v-col align="left">
            <p class="text-capitalize text-h6 ml-4" style="white-space: normal; line-height: 30px;">
                Disponibilité
            </p> 
            <v-btn @click="changeStatut" class="ml-4 mt-2" width="180" :color="statutColor[statut]">
                <p class="px-2">{{ disponibilite }}</p>
                <v-icon icon="mdi-account-box" width="30" size="x-large"></v-icon>
            </v-btn>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12" md="6">
            <RegisterInfo :vacataire="vacataire" @verif_password="(value) => {verif_password = value}"/>
            </v-col>
        <v-col cols="12" md="6">
            <RegisterCompetences :id="props.id" :competences="vacataire.competences" @addChips="addChips" @deleteChip="deleteChip"/>
            <RegisterHistorique :historique="vacataire.historique_vacation" :id="props.id" @addRessource="addRessource" @modifRessource="modifRessource" @deleteRessource="deleteRessource"/>
        </v-col>
    </v-row>
</template>

<script setup>
import { computed, ref } from 'vue';
import RegisterCompetences from '../../components/register/RegisterCompetences.vue';
import RegisterInfo from '../../components/register/RegisterInfo.vue';
import RegisterHistorique from '../../components/register/RegisterHistorique.vue';
import { useVacatairesStore } from '../../stores/vacataires';
import router from '../../router';

const vacatairesStore = useVacatairesStore();
const props = defineProps(['id']);

const vacataire = ref({
    "nom": "",
    "prenom": "",
    "email": "",
    "password": "",
    "telephone": "",
    "diplome": "",
    "nb_annees_exp": 0,
    "entreprise_actuelle": "",
    "poste_entreprise": "",
    "disponibilite": "neutre",
    "competences": [
    ],
    "historique_vacation": [
    ]
});

const verif_password = ref('');
const statut = ref(1);
const disponibilite = ref('neutre');
const statutColor = ['error', 'grey', 'success'];

const requiredField = ref(['nom', 'prenom', 'email', 'password', 'telephone']);

function changeStatut(){
    statut.value=(statut.value+1)%3;
    statut.value === 1 ? disponibilite.value = 'neutre' :
    statut.value === 2 ? disponibilite.value = 'disponible'
    : disponibilite.value = 'indisponible';
}

function addChips(chipsList){
    for (const chip of chipsList){
        vacataire.value.competences.push(chip);
    }
}

function deleteChip(chip){
    vacataire.value.competences.splice(vacataire.value.competences.indexOf(chip), 1);
}

function addRessource(res){
    vacataire.value.historique_vacation.push(res);
}

function modifRessource(res){
    const index = vacataire.value.historique_vacation.indexOf(res.oldValue);
    vacataire.value.historique_vacation[index] = res.newValue;
}

function deleteRessource(val){
    vacataire.value.historique_vacation.splice(vacataire.value.historique_vacation.indexOf(val), 1);
}

const formValid = computed(() => {
    if (vacataire.value.password !== verif_password.value) return false;
    for (const field of requiredField.value){
        if (vacataire.value[field] === '') return false;
    }
    return true;
});

function registerVacataire(){
    if (formValid.value){
        vacatairesStore.registerVacataire(vacataire.value);
        router.push({ name: 'login' });
    }
}
</script>