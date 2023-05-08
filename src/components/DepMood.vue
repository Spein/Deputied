<template>
    <div v-if="depMood" @click="switchModal(), selectDeputy(this.depMood[0].name)"
        class=" relative cursor-pointer rounded-lg my-2 font-semibold shadow-[5px_5px_rgba(0,0,0)]  p-[8px] border-2 border-slate-900 font-sans bg-lime-50 h-96 md:h-60 lg:h-52 2xl:h-[22vh]  text-center">
        <div class="w-full h-full flex flex-col justify-between ">

            <span
                :class="`before:block before:absolute before:-inset-1 px-2 before:bg${this.bgColor} relative inline-block `">
                <span class="relative text-slate-900 font-extrabold text-lg">
                    <slot></slot>
                </span>
            </span>
            <div
                :class="`bg-[url('https://spein0ps.com/sandbox/deputied/assets/img/Moods/${this.avis}${this.depMood[0].sexe}.jpg')] bg-no-repeat bg-cover bg-center w-full h-full`">

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
            bgColor: '-red-300',
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

            if (avis === "oui") { this.bgColor = '-green-300' }
            else if (avis === "non") { this.bgColor = '-red-300' }
            else if (avis === "ab") { this.bgColor = '-slate-300' }
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