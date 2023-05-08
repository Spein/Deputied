<template>
    <h2 class="text-white font-bold text-xl mb-2">Derniers débats</h2>

    <li v-for="( law, index ) in  this.laws " :key="law.id" @click="selectLaw(law.id)"
        class="hover:bg-slate-400 list-none transition-colors	duration-100 cursor-pointer">
        <div v-if="index < 5" class="text-[12px] hover:text-slate-800 first-line:uppercase first-line:tracking-widest
                                    first-letter:text-5xl first-letter:font-bold first-letter:text-slate-500
                                  first-letter:mr-3 lowercase first-letter:float-left text-slate-400  my-2 ">
            {{ law.titre.slice(0, 185) + ".." }}
            <p class="text-slate-300 text-sm text-justify">{{ law.body.slice(0, 185) + ".." }}</p>
        </div>


    </li>
</template>
<script>


export default {


    name: 'LastArticles',
    data() {
        return {

        }
    },
    props: {
        laws: {
            type: Array,
            required: true
        },

    },
    methods: {
        selectLaw(LawId) {
            this.$emit('Select_Law', LawId)
        }
    },
    emits: ['select_Law'],
    mounted() {



    },
    watch: {

    },

}

</script>