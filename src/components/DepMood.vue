<template>
    <div v-if="depMood" @click="switchModal(), selectDeputy(this.depMood[0].name)"
        class=" relative cursor-pointer rounded-lg my-2 font-semibold shadow-[5px_5px_rgba(0,0,0)]   bg-lime-50 p-[8px] border-2 border-slate-900 font-sansh-96 h-60 md:h-60 lg:h-52 2xl:h-[22vh]  text-center">
        <div class="w-full h-full flex flex-col justify-between ">

            <span :class="`before:block before:absolute before:-inset-1 px-2  relative inline-block `"
                :style="`background-color:${this.bgColor}`">
                <span class="relative text-slate-900 font-extrabold text-lg">
                    <slot />
                </span>
            </span>
            <div :class="`bg-no-repeat bg-cover bg-center w-full h-full `"
                :style="`background-image: url('https://spein0ps.com/sandbox/deputied/assets/img/Moods/${this.avis}${this.depMood[0].sexe}.jpg')`">

            </div>


            <div
                class=" w-full  font-semibold shadow-[5px_5px_rgba(0,0,0)]  border-2 border-slate-900 font-sans bg-lime-50 p-1 text-center">

                {{ this.depMood[0].surname }} {{ this.depMood[0].name }}
            </div>




        </div>
    </div>
</template>
<script>


export default {


    name: 'DepMood',
    data() {
        return {
            bgColor: '',
            depMood: null
        };
    },
    props: {
        deputies: {
            type: Array,
            required: true
        },

        laws: {
            type: Array,
            required: true
        },

        avis: {
            type: String,
            required: true
        },


    },

    methods: {
        setbgColor(avis) {

            if (avis === "oui") { this.bgColor = '#0080006e' }
            else if (avis === "non") { this.bgColor = '#ff000078' }
            else if (avis === "ab") { this.bgColor = '#808080a8 ' }
        },
        getDepMood() {

            const avisAgregate = []
            const avis = this.avis
            this.setbgColor(avis)
            if (this.laws) {
                this.laws.forEach(law => {
                    if (law.voteNom) {
                        //console.log(law.voteNom)
                        avisAgregate.push(...law.voteNom[avis]);
                    }

                });
            }


            let depMood = this.mostFrequentElement(avisAgregate)



            let predepMood = this.deputies.filter((deputy) => {
                return deputy.name === depMood
            })

            this.depMood = predepMood
        },
        mostFrequentElement(array) {
            // Compte les occurrences de chaque élément dans le tableau
            const count = {};
            let maxCount = 0;
            let mostFrequent;
            for (const element of array) {
                if (count[element]) {
                    count[element]++;
                } else {
                    count[element] = 1;
                }
                if (count[element] > maxCount) {
                    maxCount = count[element];
                    mostFrequent = element;
                }
            }
            return mostFrequent;
        },
        switchModal() {
            this.$emit('switch_modal', true)
        },
        selectDeputy(deputyName) {
            console.log(deputyName)
            this.$emit('select_deputy', deputyName)
        }
    },
    emits: ['select_deputy', 'switch_modal'],

    mounted() {
        this.getDepMood()

    },
    watch: {
        bgColor(value) {
            console.log(value)
            if (value) {
                this.getDepMood()
            }
        },
        laws(value) {
            console.log(this.bgColor)
            if (value) {
                this.getDepMood()
            }
        },
    },
}

</script>