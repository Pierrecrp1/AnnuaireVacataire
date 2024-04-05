<template>
    <v-card class="ma-2 mb-6 pa-0" :color="props.editable ? '#F1F1F1' : '#ffffff'">
        <v-card-item width="100%" class="pa-0">
           <v-card color="#004F88" width="100%">
            <v-card-item width="100%" class="pa-4">
                <v-row no-gutters>
                    <v-col cols="12" sm="8">
                        <v-card-title class="text-uppercase mb-2" style="white-space: normal;">
                            Compétences
                        </v-card-title>
                    </v-col>
                    <v-col v-if="props.canEdit" cols="12" sm="4" align="right">
                        <v-btn @click="modalChips = true" class="mr-4" v-if="props.editable">
                            <v-icon icon="mdi-plus" width="30" size="x-large"></v-icon>
                        </v-btn>
                        <v-btn @click="emit('editing')">
                            <v-icon :icon="props.editable ? 'mdi-pencil-off' : 'mdi-pencil'" width="30" size="x-large"></v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
        </v-card-item>
           </v-card>
        </v-card-item>

        <v-card-item class="my-4">
            <v-chip-group>
                <v-chip 
                :closable="props.editable"
                @click:close="emit('deleteChip', item)" 
                v-for="item in props.competences" 
                :key="item"
                :style="{'background-color': item.color, 'color': item.text}"
                >{{ item.nom }}</v-chip>
            </v-chip-group>
        </v-card-item>
        </v-card>
        <v-dialog
      v-model="modalChips"
      width="500"
    >
    <ModalChips :chipsActu="props.competences" @closeModal="modalChips=false" @addChips="addChips"/>
    </v-dialog>
</template>

<script setup>
import { ref } from 'vue';
import ModalChips from './modals/ModalChips.vue';

const props = defineProps(['editable', 'competences', 'id', 'canEdit']);
const emit = defineEmits(['editing', 'addChips', 'deleteChip']);

const modalChips = ref(false);

function addChips(chipsList){
    emit('addChips', chipsList);
    modalChips.value = false; 
}
</script>