<template>
    <v-row no-gutters>
        <v-col class="d-flex flex-wrap">
            <CardPerson v-for="(vacataire, key) in props.persons" :key="key" :index="vacataire._id" :vacataire="vacataire" :path="props.path"/>
        </v-col>
    </v-row>
</template>

<script setup>
import CardPerson from './CardPerson.vue';

const props = defineProps(['persons', 'path']);
</script>