<template>
<div class="p-8">
    <div class="grid grid-cols-2 md:grid-cols-3 gap-5 p-8">
  <MealItem v-for="meal of meals"  :key="meal.idMeal" :meal="meal" />
    
</div>
</div>


</template>

<script setup>
import {computed, watch,onMounted } from 'vue';
import { useRoute } from 'vue-router';
import store from '../store';
import MealItem from '../components/MealItem.vue';

const route = useRoute()
const meals=computed(()=>store.state.mealsByIngredient)


watch(route,()=>{
    store.dispatch('searchMealsByIngredient',route.params.ingredient)

})

onMounted(() => {
    store.dispatch('searchMealsByIngredient',route.params.ingredient)
    console.log(store.state.mealsByIngredient)

})
</script>