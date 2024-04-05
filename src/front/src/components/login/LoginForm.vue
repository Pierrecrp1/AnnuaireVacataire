<template>
  <v-card class="mx-auto px-6 py-8 loginForm" max-width="600">
    <v-form v-model="form" @submit.prevent="onSubmit">
      <p class="text-h5 d-flex justify-center">Connexion</p>

      <v-switch
        class="mt-4"
        v-model="isVacataire"
        hide-details
        true-value="Vacataire"
        false-value="Titulaire"
        color="green"
        :label="isVacataire"
      ></v-switch>

      <v-text-field v-model="email" :rules="[required]" class="mb-2 mt-2" clearable label="Email"></v-text-field>

      <v-text-field v-model="password" :rules="[required]" clearable label="Mot de passe"
        placeholder="Enter votre mot de passe" :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show ? 'text' : 'password'" @click:append-inner="show = !show"></v-text-field>

      <br>

      <v-btn :disabled="!form" block color="success" size="large" type="submit" variant="elevated">
        Se connecter
      </v-btn>

      <br>
    </v-form>
    <v-btn block color="grey" size="large" variant="elevated" @click="$emit('register')">
      S'enregistrer
    </v-btn>
  </v-card>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import requestHandler from '../../modules/requestHandler';
const userRequester = new requestHandler.Requester('/users/login');
const vacataireRequester = new requestHandler.Requester('/vacataires/login');

const router = useRouter();
const isVacataire = ref('Titulaire');

const form = ref(false);
const email = ref(null);
const password = ref(null);
const show = ref(false);

async function onSubmit() {
  if (!form.value) return;

  let data;
  if (isVacataire.value === 'Vacataire') {
    data = await vacataireRequester.post({
      "email": email.value,
      "password": password.value
    });
  } else {
    data = await userRequester.post({
      "email": email.value,
      "password": password.value
    });
  }

  if (data.status == 401 || data.status == 404) { return; }

  localStorage.setItem('isVacataire', isVacataire.value === 'Vacataire');
  localStorage.setItem('user', email.value);
  localStorage.setItem('userId', data.data.userId);
  localStorage.setItem('token', data.data.token);
  localStorage.setItem('level', data.data.level);

  router.push({ name: 'home' });
}

function required(v) {
  return !!v || 'Champ requis';
}
</script>

<style >
.loginForm {
  transform: translateY(calc(50vh - 200px));
}
</style>