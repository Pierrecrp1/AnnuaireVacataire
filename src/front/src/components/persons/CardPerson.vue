<template>
  <v-card
    width="400"
    class="ma-2"
    :style="{ 'border' : `${disponibilite} 2px solid`}"
    @click="router.push({ name: `${props.path}`, params: { id: props.index } })"
  >
    <v-card-item>
      <v-card-title class="text-uppercase">{{ props.vacataire.nom }}</v-card-title>
      <v-card-subtitle class="text-capitalize">{{ props.vacataire.prenom }}</v-card-subtitle>
    </v-card-item>
    <v-chip-group class="px-4 chip-group">
      <v-chip
        v-for="(competence, key) in props.vacataire.competences"
        :key="key"
        :style="{ 'background-color': competence.color, 'color': competence.text }"
      >
        {{ competence.nom }}
      </v-chip>
    </v-chip-group>
  </v-card>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const props = defineProps(['index', 'vacataire', 'path']);

const disponibilite =
  props.vacataire.disponibilite === 'neutre'
    ? '#585555'
    : props.vacataire.disponibilite === 'disponible'
    ? 'green'
    : 'red';
</script>

<style>
.chip-group {
  max-width: 400px;
  display: flex;
  height: 90px;
  overflow: hidden;
  flex-wrap: wrap;
  gap: 4px;
}
</style>
