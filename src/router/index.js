import {createRouter,createWebHistory } from 'vue-router';
import DefaultLayout from '../components/DefaultLayout.vue'
import GuestLayout from '../components/GuestLayout.vue'

import Home from  '../views/Home.vue'
import MealsByLetter from '../views/MealsByLetter.vue'
import MealsByName from '../views/MealsByName.vue'
import LawsByName from '../views/LawsByName.vue'

import MealsByIngredient from '../views/MealsByIngredient.vue'
import MealDetails from '../views/MealDetails.vue'
import LawDetails from '../views/LawDetails.vue'

import Ingredients from '../views/Ingredients.vue'
import Deputies from '../views/Deputies.vue'
import DeputyDetails from '../views/DeputyDetails.vue'

const routes = [ 
    {
        path:'/',
        component:DefaultLayout,
        children: [
            {
                path:'/',
                name:'home',
                component:Home
            },
            {
                path:'/letter/:letter?',
                name:'byLetter',
                component:MealsByLetter
            },
            {
                path:'/name/:name?',
                name:'MbyName',
                component:MealsByName
            },
            {
                path:'/laws/:name?',
                name:'byName',
                component:LawsByName
            },
            {
                path:'/ingredients',
                name:'ingredients',
                component:Ingredients
            },
            {
                path:'/ingredient/:ingredient?',
                name:'byIngredient',
                component:MealsByIngredient
            },
            {
                path:'meal/:id?',
                name:'mealDetails',
                component:MealDetails

            },
            {
                path:'law/:id?',
                name:'lawDetails',
                component:LawDetails

            },
            {
                path:'deputies',
                name:'deputies',
                component:Deputies

            },
            {
                path:'deputy/:id?',
                name:'DeputyDetails',
                component:DeputyDetails

            },
        
        ]
    },
    {
        path:'/guest',
        component:GuestLayout,
    }
    
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router