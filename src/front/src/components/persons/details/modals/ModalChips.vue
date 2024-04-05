<template>
    <v-card title="Nouvelles compétences">
        <v-card-item>
            <v-card-subtitle>
                Compétences à ajouter
            </v-card-subtitle>
            <v-chip-group>
                <v-chip 
                v-for="(item, key) in chipsAdd"
                @click="removeChip(key)" 
                :key="key"
                :style="{'background-color': item.color, 'color': item.text}"
                append-icon="mdi-close"
                >{{ item.nom }}</v-chip>
            </v-chip-group>
        </v-card-item>
        <v-text-field
        class="mx-4 mt-4"
        density="compact"
        label="Rechercher une compétence"
        append-inner-icon="mdi-magnify"
        single-line
        hide-details
        v-model="searchValue"
      ></v-text-field>
        <v-card class="ma-4 py-2">
            <v-card-subtitle>
                Liste des compétences
            </v-card-subtitle>
            <v-chip-group class="px-2 chipSelect" multiple>
                <v-chip 
                v-for="(item) in filteredChips"
                :key="item"
                @click="clickChip(item)"
                :style="{'background-color': item.color, 'color': item.text}"
                >{{ item.nom }}</v-chip>
            </v-chip-group>
        </v-card>
        <v-spacer></v-spacer>
        <v-row no-gutters class="px-6 mb-4">
            <v-col>
                <v-btn
                text="Annuler"
                @click="$emit('closeModal')"
                width="100"
                class="mt-4"
                ></v-btn>
            </v-col>
            <v-col>
                <v-btn
                text="Ajouter"
                @click="emits('addChips', chipsAdd)"
                width="250"
                color="#004F88"
                class="mt-4"
                ></v-btn>
            </v-col>
        </v-row>
    </v-card>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useCompetencesStore } from '../../../../stores/competences';

const competencesStore = useCompetencesStore();
const props = defineProps(['chipsActu']);
const emits = defineEmits(['closeModal', 'addChips']);

const chipsAdd = ref([]);
const searchValue = ref("");

const filteredChips = computed(() => {
    return competencesStore.competences
  .filter(chip => !props.chipsActu.some(existChip => existChip.nom === chip.nom))
  .filter(chip => !chipsAdd.value.some(existChip => existChip.nom === chip.nom))
  .filter(chip => chip.nom.toLowerCase().includes(searchValue.value.toLowerCase()));
});

function removeChip(index){
    chipsAdd.value.splice(index, 1);
}

function clickChip(item){
    chipsAdd.value.includes(item) ? chipsAdd.value.splice(chipsAdd.value.indexOf(item), 1) : chipsAdd.value.push(item);
}
</script>

<style>
.chipSelect {
  display: flex;
  max-height: 200px;
  flex-wrap: wrap;
  overflow-y: scroll;
}
</style>