<template>
  <div class="max-sw-[800px] mx-auto p-8">
    <h1 class="text-xl font-bold mb-5">{{ law.title }}</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 text-lg py-2">
      <div class="">
        <strong class="font-bold">Type: </strong>{{ law.type }}
      </div>
      <div class="">
        <strong class="font-bold">Date: </strong>{{ law.date }}
      </div>
    
    </div>  <div class="grid grid-cols-1 md:grid-cols-3 text-lg py-2">
   
      <div class="">
        <strong class="font-bold">Pour: </strong>{{ law.voteNom.oui.length }}
        <div v-for="(deputy, index) in deputies" :key="deputy.name">
        <router-link  :to="{ name: 'DeputyDetails', params: { id: deputy.name }}">
        <div v-if="law.voteNom.oui&&law.voteNom.oui.includes(deputy.name)">{{ deputy.name }}</div>
      </router-link>
      </div>
  
      </div>
      <div class="">
        <strong class="font-bold">Contre: </strong>{{ law.voteNom.non?law.voteNom.non.length:"0" }}
        <div v-for="(deputy, index) in deputies" :key="deputy.name">
          <router-link  :to="{ name: 'DeputyDetails', params: { id: deputy.name }}">

        <div v-if="law.voteNom.non&&law.voteNom.non.includes(deputy.name)">{{ deputy.name }}</div>
          </router-link>
      </div>
  
      </div>
      <div class="">
        <strong class="font-bold">Abstenu: </strong>{{ law.voteNom.abst?law.voteNom.abst.length:"0" }}
        <div v-for="(deputy, index) in deputies" :key="deputy.name">
          <router-link  :to="{ name: 'DeputyDetails', params: { id: deputy.name }}">

        <div v-if="law.voteNom.abst&&law.voteNom.abst.includes(deputy.name)">{{ deputy.name }}</div>
      </router-link>
    </div>
  
      </div>
    </div>
    <div class="my-3">
      {{ law.body }}
       </div>
       <pre>{{chatResponse}}</pre>  


  </div>
</template>

<script >
import { ref, onMounted,computed } from 'vue';
import { useRoute } from 'vue-router';
import { mapGetters } from 'vuex';
import store from '../store';
import axios from 'axios';
async function getChatGPTResponse(prompt) {

    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        prompt: prompt,
        max_tokens: 150,
        temperature: 0.5,
        model:"gpt-3.5-turbo-0301",
        n: 1,
        stop: '\n'
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
        }
    });
    console.log(response.data.choices[0])
    return response.data.choices[0].text.trim();
}



export default {
  data() {
    return {
      route: useRoute().params.id,
      prompt:"Raconte-moi une blague",
      deputies : computed(()=>store.state.deputies)

    }

  },

  computed: {
    ...mapGetters(['getLawById']),
    law() {
      console.log(this.getLawById(this.route))
      return this.getLawById(this.route) // Appel du getter avec l'id de l'objet à afficher
    },
    chatResponse(){
      return getChatGPTResponse(this.prompt) // Appel du getter avec l'id de l'objet à afficher

    }
  }
}

</script>