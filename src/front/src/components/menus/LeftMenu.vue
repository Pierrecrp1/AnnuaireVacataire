<template>
  <v-card style="z-index: 1000">
    <v-layout>
      <v-navigation-drawer expand-on-hover rail permanent color="#585555">
        <v-list>
          <div class="LeftNavDiv">
            <img src="/info_calais.jfif" class="LeftNavImg" />
          </div>
          <v-divider></v-divider>
          <v-list-item
            prepend-avatar="/user.png"
            :title="name"
            :subtitle="role"
            class="mt-2"
            style="filter: brightness(400%)"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav v-if="!isVacataire">
          <v-list-item
            prepend-icon="mdi-home"
            title="Accueil"
            value="accueil"
            :to="{ name: 'home' }"
            :active="router.currentRoute.value.name === 'home'"
          >
          </v-list-item>
          <div v-if="asAuthor" :style="showDetail ? { backgroundColor: '#5f5c5c' } : {}">
            <v-list-item
              prepend-icon="mdi-check"
              title="Validations"
              value="Validations"
              @click="showDetail = !showDetail"
              :active="isIn"
              :append-icon="showDetail ? 'mdi-chevron-up' : 'mdi-chevron-down'"
            >
            </v-list-item>
            <div v-if="showDetail">
              <v-list-item
                prepend-icon="mdi-text-box-outline"
                title="Vacataires"
                value="Vacataires"
                :to="{ name: 'validations-vacataires' }"
                :active="router.currentRoute.value.name === 'validations-vacataires'"
              >
              </v-list-item>
              <v-list-item
                prepend-icon="mdi-account-supervisor"
                title="Titulaires"
                value="Titulaires"
                :to="{ name: 'validations-enseignants' }"
                :active="router.currentRoute.value.name === 'validations-enseignants'"
              >
              </v-list-item>
            </div>
          </div>
          <v-list-item
            prepend-icon="mdi-format-list-bulleted"
            title="Compétences"
            value="competences"
            :to="{ name: 'competences' }"
            :active="router.currentRoute.value.name === 'competences'"
          ></v-list-item>
          <v-list-item
            v-if="asAuthor"
            prepend-icon="mdi-account-supervisor"
            title="Utilisateurs"
            value="utilisateurs"
            :to="{ name: 'users' }"
            :active="router.currentRoute.value.name === 'users'"
          >
          </v-list-item>
        </v-list>
        <v-list density="compact" nav v-else>
          <v-list-item
            prepend-icon="mdi-format-list-bulleted"
            title="Ma fiche"
            value="fiche-perso"
            :to="{ name: 'vacataire', params: { id: vacataireId } }"
            :active="router.currentRoute.value.name === 'vacataire'"
          ></v-list-item>
        </v-list>
        <v-list density="compact" nav class="logoutBtn">
          <v-list-item
            title="Mentions légales"
            value="mentions-legales"
            :to="{ name: 'mentions-legales' }"
            :active="router.currentRoute.value.name === 'mentions-legales'"
          >
          </v-list-item>
          <v-list-item
            title="CGU"
            value="CGU"
            :to="{ name: 'cgu' }"
            :active="router.currentRoute.value.name === 'cgu'"
          >
          </v-list-item>
          <v-list-item
            prepend-icon="mdi-logout"
            title="Déconnexion"
            value="deconnexion"
            @click="logOut"
          >
          </v-list-item>
          <v-list-item prepend-icon="mdi-Copyright" title="©Copyright AnnuVac"> </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-layout>
  </v-card>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const name = localStorage.user || 'Invité';

const showDetail = ref(false);

const roles = ['Non vérifié', 'Utilisateur', 'Administrateur', 'Super-Administrateur'];
const role = computed(() => {
  if (localStorage.level){
    return roles[parseInt(localStorage.level)];
  }
  else return '...';
});

const vacataireId = computed(() => {
  if (localStorage.userId) return localStorage.userId;
  return 0;
});

const isVacataire = computed(() => {
  return (localStorage.isVacataire && localStorage.isVacataire === 'true');
});

const asAuthor = computed(() => { return (localStorage.level && localStorage.level >= 2);});

const isIn = computed(() => {
  if (
    !showDetail.value &&
    (router.currentRoute.value.name === 'validations-enseignants' ||
      router.currentRoute.value.name === 'validations-vacataires')
  )
    return true;
  return false;
});

function logOut() {
  localStorage.clear();
  router.push({ name: 'login' });
}
</script>

<style>
.LeftNavImg {
  max-width: 40px;
  width: 100%;
  margin: auto;
  vertical-align: center;
  display: flex;
  border-radius: 3px;
}

.LeftNavDiv {
  padding: 0 0.5rem;
  margin: 1.2rem 0;
  height: 40px;
  display: flex;
  vertical-align: center;
}

.logoutBtn {
  position: absolute;
  bottom: 0;
  width: 100%;
}
.legalesBtn {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
