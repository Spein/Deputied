<template>
     <div class="bg-white shadow rounded-xl" >
        <pre>{{ deputy }}</pre>
    <div>
        <img :src="deputy.imageURL" :alt="deputy.surname" class='rounded-t-xl w-full h-48 object-cover'>

    </div>
    <div class="p-3">
        <h3  font-semibold>{{ deputy.surname}}{{ deputy[deputy] }}</h3>
  
       </div>
</div>
</template>
<script setup>

    const {deputy} = defineProps({
        deputy: {
            required:true,
            type:Object
        }
    })

</script>