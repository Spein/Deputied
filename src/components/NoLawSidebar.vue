<template>
    <div class=" flex flex-col items-center justify-center py-2 px-2 min-h-[30vw] h-full">

        <span class="relative text-white text-center text-xl"> AUCUN VOTE SUR CETTE
            DISCUSSION </span>
        <span v-if="law.secType" class="relative text-white text-center p-3">IL
            A SUREMENT EU
            LIEU
            PLUS TARD DANS LA SEANCE: <span @click="search = law.titre.slice(0, 40)"
                class="font-bold bg-slate-300 text-sky-950 underline cursor-pointer">CLIQUEZ
                ICI </span>
            POUR TROUVER LA DISUCSSION LIEE AU VOTE</span>
        <span v-else class="relative text-white text-center p-3">{{ law.type
        }}</span>
    </div>
</template>
<script>


export default {


    name: 'NoLawSidebar',

    props: {

        law: {
            type: Object,
            required: false
        },

    },


}

</script>