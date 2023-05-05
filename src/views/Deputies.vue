<template>
    <!--  <div class="p-8 pb-0">
        <input type="text" 
        v-model="keyword"
        class="rounded border-2 border-gray-200 w-full" 
        placeholder="Search for meals"
        @change="searchMeals" >
    </div> -->
    <div v-if="deputies" class="grid grid-cols-2 md:grid-cols-3 gap-5 p-8">
        Deputies
        <div v-for="deputy of deputies" :key="deputy.id" :deputy="deputy">
            <router-link class="bg-white shadow rounded-xl" :to="{ name: 'DeputyDetails', params: { id: deputy.name } }">
                <div>
                    <img :src="deputy.imageURL" :alt="deputy.surname" class='rounded-t-xl w-full h-48 object-cover'>

                </div>
                <div class="p-3">
                    <h3 font-semibold>{{ deputy.surname }} {{ deputy.name }}</h3>

                </div>
            </router-link>
        </div>

        <!--   <MealItem v-for="meal of meals"  :key="meal.idMeal" :meal="meal" />
 -->
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import store from '../store';
import { useRoute } from 'vue-router';
/* import DeputyDetails from '../views/DeputyDetails.vue'
 */const route = useRoute();
const keyword = ref('')
const deputies = computed(()=>store.state.deputies)
let loading = true;

/*   function searchMeals(){
     store.dispatch('searchMeals',keyword.value)
  } */

onMounted(() => {
    
    console.log(deputies)
    loading = false
    /*    keyword.value=route.params.name
       if(keyword.value){
           searchMeals()
       } */

})

</script>