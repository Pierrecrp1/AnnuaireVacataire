<template>
    <v-card class="mx-auto px-6 py-8 RegisterForm" :class="{'RegisterEns': statut === 'enseignant' }" max-width="600">
        <p class="text-h5 pb-8 d-flex justify-center">Créer un compte</p>
        <RegisterForm v-if="statut === 'enseignant'"/>
        <div v-if="statut===''">
        <v-btn
          block
          color="green"
          size="large"
          variant="elevated"
          :to="{ name: 'register' }"
        >
          Je suis vacataire
        </v-btn>
        <v-btn
          block
          color="#01AAE1"
          size="large"
          variant="elevated"
          class="my-6"
          @click="statut='enseignant'"
        >
          Je suis titulaire
        </v-btn>
        </div>
        
      <v-btn
          block
          color="grey"
          size="large"
          variant="elevated"
          @click="$emit('login')"
        >
          Se connecter
        </v-btn>
    </v-card>
</template>

<script setup>
import RegisterForm from './RegisterForm.vue';
import { ref } from 'vue';

const statut = ref('');
</script>

<style >
.RegisterForm {
  transform: translateY(calc(50vh - 150px));
}

.RegisterEns {
  transform: translateY(calc(50vh - 300px));
  @media screen and (max-width: 600px) {
    transform: translateY(calc(50vh - 350px));
  }
}

.RegisterVac {
  transform: translateY(calc(50vh - 270px));
  @media screen and (max-width: 600px) {
    transform: translateY(calc(50vh - 350px));
  }
}
</style>