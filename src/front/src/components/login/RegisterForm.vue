<template>
  <v-form
        v-model="form"
        @submit.prevent="onSubmit"
      >
      <v-row no-gutters>
        <v-col cols="12" md="6">
          <v-text-field
          v-model="nom"
          :readonly="loading"
          :rules="[required]"
          class="mb-2 mt-md-6 mr-md-2"
          clearable
          label="Nom"
        ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
          v-model="prenom"
          :readonly="loading"
          :rules="[required]"
          class="mb-2 mt-md-6 ml-md-2"
          clearable
          label="Prénom"
        ></v-text-field>
        </v-col>
      </v-row>
        <v-text-field
          v-model="email"
          :readonly="loading"
          :rules="[required]"
          class="mb-2"
          clearable
          label="Email"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :readonly="loading"
          :rules="[required]"
          clearable
          class="mb-2"
          label="Mot de passe"
          placeholder="Enter votre mot de passe"
          :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          @click:append-inner="show1 = !show1"
        ></v-text-field>

        <v-text-field
          v-model="Verifpassword"
          :readonly="loading"
          :rules="[required]"
          clearable
          label="Vérifiez votre mot de passe"
          placeholder="Entrez a nouveau votre mot de passe"
          :append-inner-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show2 ? 'text' : 'password'"
          @click:append-inner="show2 = !show2"
        ></v-text-field>

        <br>

        <v-btn
          :disabled="!form"
          :loading="loading"
          block
          color="success"
          size="large"
          type="submit"
          variant="elevated"
        >
          S'enregistrer
        </v-btn>
        <br>
      </v-form>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import requestHandler from '../../modules/requestHandler';

let requester = new requestHandler.Requester('/users/');
const router = useRouter();

const nom = ref(null);
const prenom = ref(null);
const form = ref(false);
const email = ref(null);
const password = ref(null);
const Verifpassword = ref(null);
const loading = ref(false);

const show1 = ref(false);
const show2 = ref(false);

async function onSubmit () {
  if (!form.value) return;

  await requester.post({
    "nom": nom.value,
    "prenom": prenom.value,
    "email": email.value,
    "password": password.value
  });

  router.push({ name: 'login' });
  router.go();

  // if (data.status == 400) { return; }

  // localStorage.setItem('user', email.value);
  // localStorage.setItem('userId', data.data.userId);
  // localStorage.setItem('token', data.data.token);
  // localStorage.setItem('level', data.data.level);

  // router.push({ name: 'home' });
  // setTimeout(() => (this.loading = false), 2000);
}

function required (v) {
  return !!v || 'Champ requis';
}
</script>