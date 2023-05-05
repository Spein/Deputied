<template>
     <div class="bg-white shadow rounded-xl" >
    <router-link :to="{name:'mealDetails',params:{id:meal.idMeal?meal.idMeal:meal.idIngredient}}" >
        <img :src="meal.strMealThumb?meal.strMealThumb:meal.strIngredient" :alt="meal.strMeal?meal.strMeal:meal.strIngredient" class='rounded-t-xl w-full h-48 object-cover'>

    </router-link>
    <div class="p-3">
        <h3  font-semibold>{{ meal.strMeal?  meal.strMeal: meal.strIngredient}}</h3>
        <p class="mb-4"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor deleniti 
            fugit odit, natus voluptatum cupiditate excepturi, omnis recusandae 
            minima quisquam ipsum veritatis similique.</p>
        <div class="flex items-center justify-between">
            <YoutubeButton :href="meal.strYoutube?meal.strYoutube:'/'">Youtube</YoutubeButton>
        </div>
       </div>
</div>
</template>
<script setup>
import YoutubeButton from '../components/YoutubeButton.vue';

    const {meal} = defineProps({
        meal: {
            required:true,
            type:Object
        }
    })

</script>