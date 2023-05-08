<template>
    <div class=" logo flex flex-col items-start justify-start w-full min-h-full">
        <div>
            <div class="sticky top-0">
                <input type="text" class=" border-2 border-gray-200" placeholder="Recherche" v-model="search">

            </div>
            <ul class="">
                <li v-for="law in filteredItems()" :key="law.id">

                    <div v-if="law.type"
                        class="text-[12px] first-line:uppercase first-line:tracking-widest
                                    first-letter:text-5xl first-letter:font-bold first-letter:text-slate-500
                                  first-letter:mr-3 lowercase first-letter:float-left text-slate-400 hover:text-slate-200 my-3 py-4 px-2"
                        @click="selectLaw(law.id)">
                        {{ law.titre.slice(0, 185) + ".." }}

                    </div>


                </li>
            </ul>
        </div>
    </div>
</template>
<script>


export default {


    name: 'FilteredSearch',
    data() {
        return {
            search: '',

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
            this.$emit('select_law', LawId)
        },
        filteredItems() {
            if (!this.search) {
                return this.laws.filter(law =>
                    Object.keys(law).includes('voteNom')
                );
            }

            const searchLower = this.search.toLowerCase();
            return this.laws.filter(law =>
                law.body.toLowerCase().includes(searchLower)
            );
        }
    },
    mounted() {



    },
    watch: {

    },

}

</script>