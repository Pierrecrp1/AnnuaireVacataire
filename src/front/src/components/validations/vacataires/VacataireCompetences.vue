<template>
    <v-card class="ma-2 mb-6 pa-0" color="#ffffff">
        <v-card-item width="100%" class="pa-0">
           <v-card color="#004F88" width="100%">
            <v-card-item width="100%" class="pa-4">
                <v-row no-gutters>
                    <v-col cols="12" sm="8">
                        <v-card-title class="text-uppercase mb-2" style="white-space: normal;">
                            Compétences
                        </v-card-title>
                    </v-col>
                </v-row>
        </v-card-item>
           </v-card>
        </v-card-item>

        <v-card-item class="my-4">
            <v-chip-group>
                <v-chip 
                v-for="item in props.competences" 
                :key="item"
                :style="{'background-color': item.color, 'color': item.text}"
                >{{ item.nom }}</v-chip>
            </v-chip-group>
        </v-card-item>
        </v-card>
</template>

<script setup>
const props = defineProps(['competences', 'id']);
</script>