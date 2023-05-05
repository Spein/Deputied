<template>
    <div  class="max-sw-[800px] mx-auto p-8">
       <h1 class="text-5xl font-bold mb-5" >{{ deputy.name }}</h1>
      <img :src="deputy.imageURL" :alt="deputy.name" class="max-w-full" >
      <div class="grid grid-cols-1 md:grid-cols-3 text-lg py-2">
        <div class="">
            <strong class="font-bold">Category: </strong>{{ deputy.parti }}
        </div>
        <div class="">
            <strong class="font-bold">Area: </strong>{{ deputy.sexe }}
        </div>
        <div class="">
            <strong class="font-bold" >Tags: </strong>{{ deputy.circonscription }}
        </div>
      </div>
      <div class="my-3">
        {{ deputy.fonction }}
      </div>
     
    </div>
</template>

<script>

import { ref,onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import store from '../store';
import { mapGetters } from 'vuex';



 
 export default  {
  data(){
    return{
       route : useRoute().params.id,
    }
   
  },
  
  computed: {
    ...mapGetters(['getObjectById']),
    deputy () {
      return this.getObjectById(this.route) // Appel du getter avec l'id de l'objet à afficher
    }
  }
}
      




    
</script>