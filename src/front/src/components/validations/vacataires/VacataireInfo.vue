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
                v-model="props.vacataire.email"
                variant="underlined" 
                readonly
                class="pl-0 pl-md-6 pr-2 pr-md-12 black-icon"
                prepend-icon="mdi-email"
                hide-details="auto"
            ></v-text-field>
            <v-text-field 
                v-model="props.vacataire.telephone" 
                variant="underlined" 
                readonly
                class="pl-0 pl-md-6 pr-2 pr-md-12 black-icon"
                prepend-icon="mdi-phone"
                hide-details="auto"
            ></v-text-field>
            <v-text-field 
                v-model="props.vacataire.entreprise_actuelle" 
                variant="underlined" 
                readonly
                class="pl-0 pt-2 pl-md-6 pr-2 pr-md-12 black-icon"
                hide-details="auto"
                label="Entreprise"
            ></v-text-field>
            <v-text-field 
                v-model="props.vacataire.poste_entreprise" 
                variant="underlined" 
                readonly
                class="pl-0 pt-2 pl-md-6 pr-2 pr-md-12 black-icon"
                label="Poste"
                hide-details="auto"
            ></v-text-field>
            <v-text-field 
                v-model="props.vacataire.diplome" 
                variant="underlined" 
                readonly
                class="pl-0 pt-2 pl-md-6 pr-2 pr-md-12 black-icon"
                label="Diplôme"
                hide-details="auto"
            ></v-text-field>
            <v-text-field 
                v-model="props.vacataire.nb_annees_exp" 
                variant="underlined" 
                readonly
                class="pl-0 pt-2 pl-md-6 pr-2 pr-md-12 black-icon"
                label="Années d'expérience"
                hide-details="auto"
            ></v-text-field>
        </v-card-item>
        <v-card-item>
            <v-card-title class="my-4 mx-0 pl-0 pl-md-6">
                Commentaire
            </v-card-title>
            <v-textarea variant="solo-filled" 
            readonly
            v-model="props.vacataire.commentaire"></v-textarea>
        </v-card-item>
        </v-card>
</template>

<script setup>
const props = defineProps(['editable', 'vacataire', 'canEdit']);
</script>

<style>
.black-icon i {
    opacity: 100% !important;
}
</style>