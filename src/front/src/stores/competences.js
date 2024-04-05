import { ref } from 'vue';
import { defineStore } from 'pinia';

import requestHandler from '../modules/requestHandler';
let requester = new requestHandler.Requester('/competences/');

export const useCompetencesStore = defineStore('competences', () => {
  let loaded = ref(false);
  const competences = ref([]);

  async function populateCompetences() {
    competences.value = await requester.get();
    loaded.value = true;
  }
  
  function getCompetence(id){
    return competences.value.filter((competence) => competence._id === id)[0];
  }

  function updateCompetence(id, item){
    const competence = getCompetence(id);
    for (const i in competence){
      competence[i] = item[i];
    }
    requester.patch(competence);
  }

  async function addCompetence(competence){
    competences.value.push(competence);
    await requester.post(competence);
    populateCompetences();
  }

  function deleteCompetence(competence){
    const index = competences.value.indexOf(competence);
    competences.value.splice(index, 1);
    requester.delete(competence);
  }

  return { loaded, competences, getCompetence, updateCompetence, addCompetence, deleteCompetence, populateCompetences };
});
