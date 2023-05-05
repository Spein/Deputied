<template>
  <!--   <div class="p-8 pb-0">
        <input type="text" 
        v-model="keyword"
        class="rounded border-2 border-gray-200 w-full" 
        placeholder="Search for meals"
        @change="searchMeals" >
    </div> -->
<div >
    <LawItem class="grid grid-cols-2 md:grid-cols-3 gap-5 p-8" v-for="(law, index) in laws" :key="law.title" :law="law">
    </LawItem>
</div>
</template>

<script setup>
import { ref,computed,onMounted } from 'vue';
import store from '../store';
import { useRoute } from 'vue-router';
import LawItem from '../components/LawItem.vue';
/* import MealItem from '../components/MealItem.vue';
 */
    const route = useRoute();
    const keyword=ref('')
    const laws = computed(()=>store.state.searchedLaws)

   /*  function searchMeals(){
       store.dispatch('searchMeals',keyword.value)
    } */
onMounted(() => {
/*     keyword.value=route.params.name
    if(keyword.value){
        searchMeals() 
    }*/
    console.log(laws)
})
</script>