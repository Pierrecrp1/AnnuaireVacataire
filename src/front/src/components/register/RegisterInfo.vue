<template>
    <v-card class="ma-2 mb-6 pa-0" color="#ffffff">
        <v-card-item width="100%" class="pa-0">
           <v-card color="#004F88" width="100%">
            <v-card-item width="100%" class="pa-4">
                <v-row no-gutters>
                    <v-col cols="12" sm="10">
                        <v-card-title class="text-uppercase mb-2" style="white-space: normal;">
                            Informations personnelles 
                        </v-card-title>
                    </v-col>
                </v-row>
        </v-card-item>
           </v-card>
        </v-card-item>
        <v-card-item class="my-4">
            <v-text-field 
                v-model="props.vacataire.nom" 
                :rules="[required]"
                variant="underlined" 
                class="pl-0 pl-md-6 pr-2 pr-md-12 black-icon"
                hide-details="auto"
                label="Nom"
            ></v-text-field>
            <v-text-field 
                v-model="props.vacataire.prenom" 
                :rules="[required]"
                variant="underlined" 
                class="pl-0 pt-2 pl-md-6 pr-2 pr-md-12 black-icon"
                hide-details="auto"
                label="Prenom"
            ></v-text-field>
            <v-text-field 
                v-model="props.vacataire.password" 
                :rules="[required]"
                variant="underlined" 
                class="pl-0 pt-2 pl-md-6 pr-2 pr-md-12 black-icon"
                hide-details="auto"
                label="Mot de passe"
                clearable
                :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                @click:append-inner="show1 = !show1"
            ></v-text-field>
            <v-text-field 
                v-model="verif_password" 
                :rules="[requiredPasword]"
                variant="underlined" 
                class="pl-0 pt-2 pl-md-6 pr-2 pr-md-12 black-icon"
                hide-details="auto"
                label="Vérifiez votre mot de passe"
                clearable
                :append-inner-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show2 ? 'text' : 'password'"
                @click:append-inner="show2 = !show2"
            ></v-text-field>
            <v-text-field
                v-model="props.vacataire.email"
                :rules="[required]"
                variant="underlined"
                class="pl-0 pt-2 pl-md-6 pr-2 pr-md-12 black-icon"
                hide-details="auto"
                label="Email"
            ></v-text-field>
            <v-text-field 
                v-model="props.vacataire.telephone" 
                :rules="[required]"
                variant="underlined" 
                class="pl-0 pt-2 pl-md-6 pr-2 pr-md-12 black-icon"
                hide-details="auto"
                label="Téléphone"
            ></v-text-field>
            <v-text-field 
                v-model="props.vacataire.entreprise_actuelle" 
                variant="underlined" 
                class="pl-0 pt-2 pl-md-6 pr-2 pr-md-12 black-icon"
                hide-details="auto"
                label="Entreprise"
            ></v-text-field>
            <v-text-field 
                v-model="props.vacataire.poste_entreprise" 
                variant="underlined" 
                class="pl-0 pt-2 pl-md-6 pr-2 pr-md-12 black-icon"
                label="Poste"
                hide-details="auto"
            ></v-text-field>
            <v-text-field 
                v-model="props.vacataire.diplome" 
                variant="underlined" 
                class="pl-0 pt-2 pl-md-6 pr-2 pr-md-12 black-icon"
                label="Diplôme"
                hide-details="auto"
            ></v-text-field>
            <v-text-field 
                v-model="props.vacataire.nb_annees_exp" 
                variant="underlined" 
                class="pl-0 pt-2 pl-md-6 pr-2 pr-md-12 black-icon"
                label="Années d'expérience"
                hide-details="auto"
            ></v-text-field>
        </v-card-item>
        </v-card>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps(['vacataire']);
const emit = defineEmits(['verif_password']);

const verif_password = ref('');
const show1 = ref(false);
const show2 = ref(false);

watch(verif_password, () => {
    if (verif_password.value !== '') emit('verif_password', verif_password.value);
});

function required(v) {
  return !!v || 'Champ requis';
}

function requiredPasword(v) {
    if (verif_password.value === '') return 'Champ requis';
    if (verif_password.value !== props.vacataire.password) return 'Le mot de passe doit être identique';
    return !!v;
}
</script>