<template>
<div class="p-8">
    <h1 class="text-4xl font-bold mb-4">Ingredients</h1>
    <router-link v-for="ingredient in ingredients" :key="ingredient.idIngredient" class="block bg-white rounded p-3 mb-3 shadow" 
    :to="{name:'byIngredient',params:{ingredient:ingredient.strIngredient}}" >
            <pre>{{ ingredient }}</pre>
        <h3 class="text-2xl font-bold mb-2">{{ ingredient.strIngredient}}</h3>
    <p>{{ ingredient.strDescription }}</p>
</router-link>
</div>


</template>

<script setup>
import axiosClient from '../axiosClient';
import { ref, onMounted } from 'vue';
const ingredients=ref([])
onMounted(() => {
    axiosClient.get('list.php?i=list')  
    .then(({data})=>{
        ingredients.value=data.meals
    })
})
</script>