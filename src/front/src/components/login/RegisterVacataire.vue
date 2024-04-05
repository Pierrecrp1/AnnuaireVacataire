<template>
  <form @submit.prevent="submit" class="mb-6">
    <v-row no-gutters>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="nom.value.value"
          :error-messages="nom.errorMessage.value"
          label="Nom"
        ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" class="pl-sm-4">
        <v-text-field
          v-model="prenom.value.value"
          :error-messages="prenom.errorMessage.value"
          label="Prénom"
        ></v-text-field>
        </v-col>
      </v-row>
    <v-text-field
      v-model="email.value.value"
      :error-messages="email.errorMessage.value"
      label="Email"
    ></v-text-field>
    <v-text-field
        v-model="telephone.value.value"
        :counter="10"
        :error-messages="telephone.errorMessage.value"
        pattern="[0-9]{10}"
        size="10"
        type="tel"
        label="Numéro de téléphone"
      ></v-text-field>

    <v-row no-gutters class="mb-4">
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="password.value.value"
          :error-messages="password.errorMessage.value"
          label="Mot de passe"
          clearable
          :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          @click:append-inner="show1 = !show1"
        ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" class="pl-sm-4">
        <v-text-field
          v-model="passwordVerif.value.value"
          :error-messages="passwordVerif.errorMessage.value"
          label="Validez votre mot de passe"
          clearable
          :append-inner-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show2 ? 'text' : 'password'"
          @click:append-inner="show2 = !show2"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-btn
          block
          color="success"
          size="large"
          type="submit"
          variant="elevated"
        >
          S'enregistrer
        </v-btn>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useField, useForm } from 'vee-validate';
import { useRouter } from 'vue-router';

const router = useRouter();

const { handleSubmit } = useForm({
  validationSchema: {
    nom(value) {
      if (value?.length >= 2) return true;
      return 'Le nom doit faire 2 charactères minimum';
    },
    prenom(value) {
      if (value?.length >= 2) return true;
      return 'Le prénom doit faire 2 charactères minimum';
    },
    tel(value) {
      if (value?.length > 9 && /[0-9-]+/.test(value)) return true;
      return 'Le numéro de téléphone doit contenir 10 chiffres';
    },
    password(value) {
      if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/gm.test(value))
        return true;
      return 'Mot de passe doit contenir minuscules, Majuscules, chiffres et charactères spécifique';
    },
    passwordVerif(value) {
      if (value === password.value.value) return true;
      return "Le mot de passe n'est pas identique";
    },
    email(value) {
      if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true;
      return "L'email doit être valide";
    }
  }
});
const nom = useField('nom');
const prenom = useField('prenom');
const telephone = useField('tel');
const email = useField('email');
const password = useField('password');
const passwordVerif = useField('passwordVerif');

const show1 = ref(false);
const show2 = ref(false);

const submit = handleSubmit(() => {
  localStorage.setItem('user', 'test');
  router.push({name: 'home'});
});
</script>