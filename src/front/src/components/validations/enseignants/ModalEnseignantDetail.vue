<template>
    <v-card title="Ajout">
        <v-card-item class="py-4">
            <v-text-field
                v-model="props.user.nom"
                readonly
                variant="underlined"
                label="Nom"
                hide-details
            ></v-text-field>
            <v-text-field
                v-model="props.user.prenom"
                readonly
                variant="underlined"
                label="Prénom"
                hide-details
                class="pt-2"
            ></v-text-field>
            <v-text-field
                v-model="props.user.email"
                readonly
                variant="underlined"
                label="Email"
                hide-details
                class="pt-2"
            ></v-text-field>
        </v-card-item>
        <v-spacer></v-spacer>
        <v-row no-gutters class="px-6 mb-4">
            <v-col cols="12" md="4">
                <v-btn
                text="Annuler"
                @click="$emit('closeModal')"
                width="100"
                class="mt-4"
                ></v-btn>
            </v-col>
            <v-col cols="12" md="8" class="text-md-right text-left">
                <v-btn
                text="Valider"
                @click="emit('validUtilisateur', props.user._id)"
                width="250"
                color="green"
                class="mt-4"
                ></v-btn>
            </v-col>
            <v-col cols="12">
                <v-btn
                text="Refuser"
                color="error"
                @click="emit('deleteUtilisateur', props.user._id)"
                width="100"
                class="mt-4"
                ></v-btn>
            </v-col>
        </v-row>
    </v-card>
</template>

<script setup>
const emit = defineEmits(['closeModal', 'validUtilisateur', 'deleteUtilisateur']);
const props = defineProps(['user']);
</script>