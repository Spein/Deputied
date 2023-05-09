<template>
    <div v-if="depPalm" @click="switchModal(), selectDeputy(this.depPalm.laziest[0].name)"
        class=" relative cursor-pointer rounded-lg my-2 font-semibold shadow-[5px_5px_rgba(0,0,0)] p-[8px] border-2 border-slate-900 font-sans bg-lime-50 h-60 md:h-60 lg:h-52 2xl:h-[22vh]  text-center">
        <div
            class="bg-[url('https://spein0ps.com/sandbox/deputied/assets/img/Moods/absent.jpg')] bg-no-repeat bg-cover bg-center w-full h-full flex flex-col justify-between ">
            <div
                class=" w-full  font-semibold shadow-[5px_5px_rgba(0,0,0)]  border-2 border-slate-900 font-sans bg-lime-50 p-1 text-center">

                {{ this.depPalm.laziest[0].surname }} {{ this.depPalm.laziest[0].name }}
            </div>
            <span class="before:block before:absolute before:-inset-1 px-2 before:bg-amber-300 relative inline-block">
                <span class="relative text-amber-900 font-extrabold text-lg"> WANTED </span>
            </span>




        </div>

    </div>
</template>
<script>


export default {


    name: 'DepPalmares',
    data() {
        return {
            depPalm: null
        };
    },
    props: {
        deputies: {
            type: Array,
            required: true
        },

        seances: {
            type: Array,
            required: true
        },


    },

    methods: {

        getLaziest() {

            const depPalm = {
                laziest: null,
                fullest: null
            }


            const deputNames = [...new Set(this.deputies.map(deputy => deputy.name))];
            const absAgregate = []
            this.seances.forEach(seances => {
                absAgregate.push(...seances.deputies.absence);
            });
            let allAtOnce = []
            allAtOnce.push(absAgregate)
            allAtOnce.push(deputNames)
            //console.log(allAtOnce)


            const frequencies = allAtOnce.reduce((acc, array) => {
                array.forEach((element) => {
                    if (element in acc) {
                        acc[element]++;
                    } else {
                        acc[element] = 1;
                    }
                });
                return acc;
            }, {});

            const entries = Object.entries(frequencies);
            entries.sort((a, b) => a[1] - b[1]);
            depPalm.laziest = this.deputies.filter((deputy) => {
                return deputy.name === entries[entries.length - 1][0]
            })
            depPalm.fullest = this.deputies.filter((deputy) => {
                return deputy.name === entries[0][0]
            })
            this.depPalm = depPalm
            //console.log(this.depPalm)





        },
        switchModal() {
            this.$emit('switch_modal', true)
        },
        selectDeputy(deputyName) {
            this.$emit('select_deputy', deputyName)
        }
    },
    mounted() {

        this.getLaziest()
    },
}

</script>