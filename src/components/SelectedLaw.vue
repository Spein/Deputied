<template>
    <div class="container mx-auto px-4 py-6">
        <div class="">
            <h1 class="text-xl font-bold text-orange-200 mb-2">{{ law.titre }}</h1>
        </div>

        <div v-if="seanceTags" class="w-full flex-wrap flex items-center space-x-2  mt-4">
            <span v-for=" tag  in  seanceTags "
                class="inline-block bg-gray-200 rounded-full px-3 py-2 my-1 text-sm font-semibold text-gray-700">{{
                    tag }}</span>


        </div>

        <div class="flex flex-row justify-between flex-wrap mt-4 ">
            <div
                class="w-full max-h-[55vh] lg:w-[68%] p-2 mr-4 shadow-[5px_5px_rgba(0,0,0)]  border-2 border-slate-900 font-sans bg-lime-50  text-center overflow-auto">
                <h3
                    class="my-2 font-semibold shadow-[5px_5px_rgba(0,0,0)]  border-2 border-slate-900 font-sans bg-lime-500 p-1 text-center w-44">
                    Chat</h3>
                <div class="max-w-full min-h-screen bg-black overscroll-auto text-green " id="conversation">
                    <div v-for="(item, index) in this.law.conversation" :key="index">
                        <div class="text-green-500 text-justify p-4">{{ item }}</div>
                        <span class="prompt text-white"></span>

                    </div>
                </div>
            </div>

            <div
                class=" w-full lg:w-[27%]  p-2 mr-4 shadow-[5px_5px_rgba(0,0,0)]  border-2 border-slate-900 font-sans bg-lime-50  text-center">
                <h3
                    class="top-[-6%] relative font-semibold shadow-[5px_5px_rgba(0,0,0)]  border-2 border-slate-900 font-sans bg-slate-500 p-1 text-center w-44">
                    Texte intégral</h3>
                <p class=" text-left max-h-96 overflow-auto ...">{{ law.body }}</p>
            </div>
        </div>
    </div>
</template>
<script>
import { watch } from 'vue';
export default {
    name: 'selectedLaw',
    data() {
        return {
            currentIndex: 0,
            showItem: [],
            currentIndexL: 0,
        };
    },
    props: {
        law: {
            type: Object,
            required: true
        },

        seanceTags: {
            type: Array,
            required: true
        }

    },

    methods: {

    },

}

</script>