<template>
    <v-card class="mx-2 my-4" color="#ffffff">
    <v-card-item width="100%" class="pa-0">
      <v-card color="#004F88" width="100%">
        <v-card-item width="100%" class="pa-4">
          <v-row no-gutters>
            <v-col cols="12">
                <v-card-title class="text-uppercase mb-2" style="white-space: normal;">
                    Création de Compétence
                </v-card-title>
            </v-col>
        </v-row>
        </v-card-item>
      </v-card>
    </v-card-item>
    <v-card-item class="my-2">
        <v-row no-gutters>
            <v-col cols="12" md="6" class="px-4">
                <v-text-field
                    v-model="item.nom"
                    variant="underlined"
                    label="Compétence"
                    class="mb-4"
                    hide-details="auto"
                ></v-text-field>
                <v-card-subtitle>Couleur du fond</v-card-subtitle>
                <v-color-picker v-model="item.color" class="ma-auto my-4"></v-color-picker>
                <v-card-subtitle>Couleur du texte</v-card-subtitle>
                <v-radio-group v-model="item.text" inline>
                    <v-radio label="Noir" value="black" class="mr-4"></v-radio>
                    <v-radio label="Blanc" value="white"></v-radio>
                </v-radio-group>
            </v-col>
            <v-col cols="12" md="6" class="pa-4">
                <v-card color="#F8F8F8" class="d-flex" height="100%" style="min-height: 80px;">
                    <v-chip 
                    :style="{'background-color': item.color, 'color': item.text}"
                    class="ma-auto"
                    size="large">
                    {{ competence }}</v-chip>
                </v-card>
            </v-col>
            <v-col cols="4" align="left">
                <v-btn
                text="Retour"
                width="150"
                color="grey"
                class="mt-2 mr-4"
                @click="router.push({ name:'competences' })"
                ></v-btn></v-col>
            <v-col cols="8" align="right">
                <v-btn
                text="Ajouter"
                width="250"
                color="#004F88"
                class="mt-2 mr-4"
                @click="addCompetence"
                ></v-btn></v-col>
        </v-row>
    </v-card-item>
  </v-card>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useCompetencesStore } from '../../stores/competences';
import { useRouter } from 'vue-router';

const competencesStore = useCompetencesStore();
const router = useRouter();
const item = ref({
    nom: '',
    color: "#ffffff",
    text: 'black'
});

const competence = computed(() => { return item.value.nom !== '' ? item.value.nom : 'Competence';});

function addCompetence(){
    if (item.value.nom !== ''){
        competencesStore.addCompetence(item.value);
    }
    router.push({name : 'competences'});
}
</script>