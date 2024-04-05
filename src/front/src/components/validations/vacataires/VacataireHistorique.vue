<template>
  <v-card class="ma-2 mb-6 pa-0" color="#ffffff">
    <v-card-item width="100%" class="pa-0">
      <v-card color="#004F88" width="100%">
        <v-card-item width="100%" class="pa-4">
          <v-row no-gutters>
            <v-col cols="12" sm="8">
                <v-card-title class="text-uppercase mb-2" style="white-space: normal;">
                    Historique
                </v-card-title>
            </v-col>
        </v-row>
        </v-card-item>
      </v-card>
    </v-card-item>
    <v-card-item class="my-4">
      <v-table density="compact">
        <thead>
          <tr>
            <th class="text-left text-uppercase">Ressource</th>
            <th class="text-center text-uppercase">Date deb</th>
            <th class="text-center text-uppercase">Date fin</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ressource of props.historique" :key="ressource.ressource">
            <td>{{ ressource.ressource }}</td>
            <td class="text-center">{{ ressource.date_deb }}</td>
            <td class="text-center">{{ ressource.date_fin }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-card-item>
  </v-card>
    
</template>

<script setup>
const props = defineProps(['id', 'historique']);
</script>
