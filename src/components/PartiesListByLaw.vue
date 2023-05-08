<template>
    <div class="flex  items-center flex-wrap justify-center py-2 px-2">
        <div v-for="( count, parti ) in  lawByParti " class="flex shrink items-center">
            <div v-if="count > 0"
                class="text-slate-200  m-2 font-semibold flex flex-col items-center justify-center flex-shrink-0">
                <img class="w-8 h-8 rounded-full"
                    :src="`https://spein0ps.com/sandbox/deputied/assets/img/normal/${parti}.jpg`">
                <p>{{ count }}</p>
            </div>
        </div>
    </div>
</template>
<script>


export default {


    name: 'PartiesListByLaw',
    data() {
        return {
            lawByParti: null,
        };
    },
    props: {
        deputies: {
            type: Array,
            required: true
        },
        avis: {
            type: String,
            required: true
        },
        law: {
            type: Object,
            required: true
        },




    },

    methods: {
        calculateRateByParti() {
            if (this.law.voteNom) {
                const avis = this.avis


                let repartition = {}
                repartition = {

                    PS: 0,
                    MR: 0,
                    cdH: 0,
                    ECOLO: 0,
                    PTB: 0,
                    DéFI: 0,
                }

                console.log(repartition, avis)

                if (this.law.voteNom[avis]) {
                    for (let i = 0; i < this.law.voteNom[avis].length; i++) {
                        const deputyOui = this.deputies.filter(deputy =>
                            deputy.name === this.law.voteNom[avis][i]
                        )[0];

                        if (deputyOui) {

                            const parti = deputyOui.parti
                            repartition[parti]++
                        }
                    }
                }

                return repartition
            }

        }
    },
    mounted() {
        let slByParti = this.calculateRateByParti() ? this.calculateRateByParti() : null
        this.lawByParti = slByParti
        console.log(this.lawByParti)
    },
    watch: {
        law(value) {
            console.log(value)
            if (value) {
                let slByParti = this.calculateRateByParti() ? this.calculateRateByParti() : null
                this.lawByParti = slByParti
            }
        },
    },
}

</script>