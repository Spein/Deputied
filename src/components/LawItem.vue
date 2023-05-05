<template>
     <div class="bg-white shadow rounded-xl" >
    <div v-for="plaw of law" class="p-3">
        <router-link :to="{name:'lawDetails',params:{id:plaw.id}}" >

        <h3  font-semibold>{{ plaw.title }}</h3>
        <p class="mb-4"> {{ law.body }}</p>
    </router-link> 

       </div>

   
</div>
</template>
<script setup>


    const {law} = defineProps({
        law: {
            required:true,
            type:Object
        }
    })

</script>