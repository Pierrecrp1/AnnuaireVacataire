import { ref, reactive } from 'vue';
import { defineStore } from 'pinia';
// disponibilite = indisponible / neutre / disponible

import requestHandler from '../modules/requestHandler';
let requester = new requestHandler.Requester('/vacataires/');

export const useVacatairesStore = defineStore('vacataires', () => {
  let loaded = ref(false);
  const vacataires = reactive([]);

  async function populateVacataires() {
    vacataires.value = await requester.get();
    loaded.value = true;
  }

  function getVacataire(id) {
    return vacataires.value.filter((vacataire) => vacataire._id === id)[0];
  }

  function getVerifVacataires(){
    return vacataires.value.filter((vacataire) => vacataire.verifie === true);
  }

  function getUnverifVacataires(){
    return vacataires.value.filter((vacataire) => vacataire.verifie === false);
  }

  function validVacataire(id){
    const vacataire = getVacataire(id);
    vacataire['verifie'] = true;
    requester.patch(vacataire);
  }

  function updateVacataire(id, newValue){
    const vacataire = getVacataire(id);
    for (const item in vacataire){
      vacataire[item] = newValue[item];
    }
    requester.patch(newValue);
  }

  function deleteVacataire(id) {
    const vacataire = getVacataire(id);
    const index = vacataires.value.indexOf(vacataire);
    vacataires.value.splice(index, 1);
    requester.delete(vacataire);
  }

  function registerVacataire(vacataire){
    vacataires.push(vacataire);
    requester.post(vacataire);
  }

  function addRessource(id, ressource){
    const vacataire = getVacataire(id);
    vacataire.historique_vacation.push(ressource);
    requester.patch(vacataire);
  }

  return { vacataires, loaded, getVacataire, getVerifVacataires, getUnverifVacataires, updateVacataire, registerVacataire, deleteVacataire, addRessource, populateVacataires, validVacataire };
});
