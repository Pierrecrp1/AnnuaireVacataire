<template>
    <v-card title="Ajout">
        <v-card-item class="py-4">
            <v-text-field
                v-model="form.ressource"
                variant="underlined"
                label="Ressource"
                hide-details
            ></v-text-field>
            <v-text-field
                v-model="form.date_deb"
                variant="underlined"
                label="Date de début"
                hide-details
                class="pt-2"
                @input="formatDate('date_deb')"
            ></v-text-field>
            <v-text-field
                v-model="form.date_fin"
                variant="underlined"
                label="Date de fin"
                hide-details
                class="pt-2"
                @input="formatDate('date_fin')"
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
                text="Mettre à jour"
                @click="modifRessource"
                width="250"
                color="#004F88"
                class="mt-4"
                ></v-btn>
            </v-col>
            <v-col cols="12">
                <v-btn
                text="Supprimer"
                color="error"
                @click="emit('deleteRessource', props.form)"
                width="180"
                class="mt-4"
                ></v-btn>
            </v-col>
        </v-row>
    </v-card>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['closeModal', 'modifRessource', 'deleteRessource']);
const props = defineProps(['id', 'form']);

let form = ref({...props.form});

function formatDate(date) {
    let value = form.value[date].replace(/\D/g, "");
    if (value.length > 2) {
    value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    if (value.length > 5) {
    value = `${value.slice(0, 5)}/${value.slice(5, 9)}`;
    }
    form.value[date] = value;
}

function dateValid() {
    const dateFormat = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const startDateValid = dateFormat.test(form.value.date_deb);
    const endDateValid = dateFormat.test(form.value.date_fin);

    return startDateValid && endDateValid;
}

function modifRessource(){
    if (form.value.ressource !== "" && dateValid()) {
        emit('modifRessource', {oldValue: props.form, newValue: form.value});
    }
}
</script>