<template>
    <v-card class="mx-2 my-4" color="#ffffff">
    <v-card-item width="100%" class="pa-0">
      <v-card color="#004F88" width="100%">
        <v-card-item width="100%" class="pa-4">
          <v-row no-gutters>
            <v-col cols="12">
                <v-card-title class="text-uppercase mb-2" style="white-space: normal;">
                    Modification Utilisateur
                </v-card-title>
            </v-col>
        </v-row>
        </v-card-item>
      </v-card>
    </v-card-item>
    <v-card-item class="my-4">
        <v-row no-gutters>
            <v-col cols="12" md="6">
                <v-text-field
                    v-model="utilisateur.nom"
                    variant="underlined"
                    label="Nom"
                    class="mb-4"
                    hide-details="auto"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col cols="12" md="6">
                <v-text-field
                    v-model="utilisateur.prenom"
                    variant="underlined"
                    label="Prénom"
                    class="mb-4"
                    hide-details="auto"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col cols="12" md="6">
                <v-text-field
                    v-model="utilisateur.email"
                    variant="underlined"
                    label="Email"
                    class="mb-4"
                    hide-details="auto"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col cols="12" md="6">
                <v-select
                    label="Rôle"
                    :items="roles"
                    variant="underlined"
                    return-object
                    v-model="roleActu"
                ></v-select>
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col cols="4" align="left">
                <v-btn
                text="Retour"
                width="150"
                color="grey"
                class="mt-2 mr-4"
                @click="router.push({ name:'users' })"
                ></v-btn></v-col>
            <v-col cols="8" align="right">
                <v-btn
                text="Sauvegarder"
                width="250"
                color="#004F88"
                class="mt-2 mr-4"
                @click="updateUtilisateur"
                ></v-btn>
            </v-col>
        </v-row>
    </v-card-item>
  </v-card>
</template>

<script setup>
import { ref } from 'vue';
import { useUtilisateursStore } from '../../stores/utilisateurs';
import { useRouter } from 'vue-router';

const utilisateursStore = useUtilisateursStore();
const router = useRouter();
const props = defineProps(['id']);

const utilisateur = ref({}); 
Object.assign(utilisateur.value, utilisateursStore.getUtilisateur(props.id));

const roles = [
  'Utilisateur',
  'Administrateur'
];

const rolesList = ['Non Vérifié', 'Utilisateur', 'Administrateur', 'Super-Administrateur'];

const roleActu = ref(rolesList[utilisateur.value.level]);

function updateUtilisateur(){
    utilisateur.value.level = rolesList.indexOf(roleActu.value);
    utilisateursStore.updateUtilisateur(props.id, utilisateur.value);
    router.push({ name:'users' });
}
</script>