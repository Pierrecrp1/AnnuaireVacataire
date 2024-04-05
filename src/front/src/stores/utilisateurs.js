import { ref, reactive } from 'vue';
import { defineStore } from 'pinia';

import requestHandler from '../modules/requestHandler';
let requester = new requestHandler.Requester('/users/');

export const useUtilisateursStore = defineStore('utilisateurs', () => {
  let loaded = ref(false);
  const utilisateurs = reactive([]);

  async function populateUsers() {
    utilisateurs.value = await requester.get();
    loaded.value = true;
  }

  function getUtilisateur(id) {
    return utilisateurs.value.filter((utilisateur) => utilisateur._id === id)[0];
  }

  function getUsersUnverified() {
    return utilisateurs.value.filter((utilisateur) => !utilisateur.verifie);
  }

  function getUsersVerified() {
    return utilisateurs.value.filter((utilisateur) => utilisateur.verifie);
  }

  function updateUtilisateur(id, newValue) {
    const utilisateur = getUtilisateur(id);
    for (const item in utilisateur){
      utilisateur[item] = newValue[item];
    }
    requester.patch(newValue);
  }

  function validUtilisateur(id) {
    const utilisateur = getUtilisateur(id);
    utilisateur.verifie = true;
    utilisateur.level = 1;
    requester.patch(utilisateur);
  }

  function deleteUtilisateur(id) {
    const utilisateur = getUtilisateur(id);
    const index = utilisateurs.value.indexOf(utilisateur);
    utilisateurs.value.splice(index, 1);
    requester.delete(utilisateur);
  }

  return { loaded, utilisateurs, populateUsers, getUtilisateur, getUsersUnverified, getUsersVerified, updateUtilisateur, validUtilisateur, deleteUtilisateur };
});
