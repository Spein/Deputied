<template>
    <div
        class="absolute z-10 w-3/4 bg-slate-50 lg:top-36 lg:left-1/2 lg:w-5/12 xl:w-5/12 2xl:w-1/4 flex flex-col flex-wrap  border-4 border-gray-700 rounded-lg ">
        <div class="bg-gray-900  text-white py-1 px-2 font-bold text-sm flex justify-between">
            <h5>DÉPUDEX</h5>
            <span class="mdi mdi-close" @click="switchModal()"></span>
        </div>
        <div class="bg-gray-300 w-full   flex flex-wrap">

            <div class="  flex w-max xl:w-max">
                <img :src="`https://spein0ps.com/sandbox/deputied/assets/img/normal/${deputy.name}.jpg`" alt="image"
                    class=" sepia-[.5] w-screen flex-grow sm:w-full    ">

            </div>
            <div class="bg-gray-800 flex-grow py-2 px-4 text-white text-sm w-full sm:w-7/12">
                <p class="mb-2"><span class="font-bold">Nom:</span> {{
                    deputy.surname }} {{ deputy.name }}</p>
                <p class="mb-2"><span class="font-bold">Parti:</span> {{
                    deputy.parti }}</p>
                <p class="mb-2"><span class="font-bold">Circonscription:</span> {{
                    deputy.circonscription }}</p>
                <p class="mb-2"><span class="font-bold">Fonction:</span> {{
                    deputy.fonction ? deputy.fonction : 'Député' }}
                </p>
                <p class="mb-2"><span class="font-bold">Presence:</span> {{
                    calculDepPresence(deputy.name) }}%</p>
                <div class="flex ">
                    <p class="mb-2"><span class="font-bold">Contact:</span> </p>
                    <div>
                        <a v-if="deputy.email" class="p-1" :href="`mailto:${deputy.email}`">
                            <span class="text-lg text-slate-300 mdi mdi-email">
                            </span>

                        </a>
                        <a v-if="deputy.tel" class="p-1" :href="`tel:+32${deputy.tel.replace(/\./g, '').slice(1)}`">
                            <span class="text-lg text-slate-300 mdi mdi-phone">
                            </span>

                        </a>
                        <a v-if="deputy.fax" class="p-1" :href="`tel:+32${deputy.fax.replace(/\./g, '').slice(1)}`">
                            <span class="text-lg text-slate-300 mdi mdi-fax">
                            </span>

                        </a>

                    </div>

                </div>
                <div class="flex ">
                    <p class="mb-2"><span class="font-bold">Réseaux sociaux:</span> </p>
                    <div>
                        <a v-if="deputy.rs.dep_facebook" class="p-1" :href="`${deputy.rs.dep_facebook}`">
                            <span class="text-lg text-slate-300 mdi mdi-facebook">
                            </span>

                        </a>
                        <a v-if="deputy.rs.dep_twitter" class="p-1" :href="`${deputy.rs.dep_twitter}`">
                            <span class="text-lg text-slate-300 mdi mdi-twitter">
                            </span>

                        </a>
                        <a v-if="deputy.rs.dep_instagram" class="p-1" :href="`${deputy.rs.dep_instagram}`">
                            <span class="text-lg text-slate-300 mdi mdi-instagram">
                            </span>

                        </a>

                    </div>

                </div>
            </div>
            <div class="max-h-96 overflow-auto max-w-full p-4 text-white  flex-wrap text-xs flex">
                <div class="flex flex-col max-w-full justify-start items-start">
                    <div class="flex min-w-full text-slate-700">
                        <h5 :class="{ 'bg-slate-700 text-slate-100': selectedTab === 'autres-mandats' }"
                            class="shadow-[5px_5px_rgba(0,0,0,0.4)]  cursor-pointer border-4 text-sm border-slate-600 font-extrabold mx-3 p-2  hover:bg-slate-700 hover:text-slate-100"
                            @click="selectedTab = 'autres-mandats'">Autres mandats
                        </h5>
                        <h5 :class="{ 'bg-slate-700 text-slate-100': selectedTab === 'historique' }"
                            class="shadow-[5px_5px_rgba(0,0,0,0.4)]  cursor-pointer border-4 text-sm border-slate-600 font-extrabold mx-3 p-2 hover:bg-slate-700 hover:text-slate-100"
                            @click="selectedTab = 'historique'">
                            Historique</h5>
                    </div>
                    <div class="flex flex-col max-w-full py-4">
                        <div v-show="selectedTab === 'autres-mandats'" class="px-4 pb-4">
                            <table class="min-w-full divide-y divide-transparent">
                                <thead>
                                    <tr>
                                        <th colspan="5"
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[6vw]">
                                            Titre
                                        </th>
                                        <th colspan="4"
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Fonction
                                        </th>
                                        <th colspan="1"
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Rémunération
                                        </th>
                                        <th colspan="1"
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Avantages
                                        </th>
                                    </tr>
                                </thead>
                                <tbody v-if="deputy.mandats.length > 0" class="   divide-gray-200">
                                    <tr v-for="(mandats, index) in deputy.mandats"
                                        :key="`${mandats.fonction}-${mandats.titre}`" class="text-slate-700">
                                        <td colspan="5" class="p-2">{{ mandats.titre }}</td>
                                        <td colspan="4" class="text-[.61rem]">{{
                                            mandats.fonction }}</td>
                                        <td colspan="1" class="text-right">{{
                                            mandats.remuneration }}</td>
                                        <td colspan="1" class="text-right">{{ mandats.avantage
                                        }}</td>
                                    </tr>
                                </tbody>
                                <tr v-else>
                                    <td colspan="4">
                                        <h5 class=" text-semibold text-slate-700 text-center">
                                            N'a rien déclaré
                                        </h5>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div v-show="selectedTab === 'historique'" class="px-4 pb-4">
                            <table class="min-w-full divide-y divide-transparent">
                                <thead>
                                    <tr>
                                        <th scope="col"
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Titre
                                        </th>
                                        <th scope="col"
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th scope="col"
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Vote
                                        </th>

                                    </tr>
                                </thead>
                                <tbody class="divide-gray-200">

                                    <tr v-for="(law, index) in  laws " :key="law.id" class="text-slate-700 text-center">
                                        <td v-if="law.voteNom && (law.voteNom.oui.includes(deputy.name) || law.voteNom.non.includes(deputy.name) || law.voteNom.ab.includes(deputy.name))"
                                            class="cursor-pointer hover:text-cyan-700 hover:font-extrabold p-2"
                                            @click="selectLaw(law.id)">{{ law.titre.slice(0,
                                                105) + ".." }}</td>
                                        <td v-if="law.voteNom && (law.voteNom.oui.includes(deputy.name) || law.voteNom.non.includes(deputy.name) || law.voteNom.ab.includes(deputy.name))"
                                            class=" p-2">{{ law.date }}</td>
                                        <td v-if="law.voteNom && law.voteNom.oui.includes(deputy.name)" class=" p-2"><span
                                                class="text-lg text-green-700 mdi mdi-thumb-up-outline"></span>
                                        </td>
                                        <td v-if="law.voteNom && law.voteNom.non.includes(deputy.name)"
                                            class="text-lg text-red-700 p-2"><span
                                                class="mdi mdi-thumb-down-outline"></span>
                                        </td>

                                        <td v-if="law.voteNom && law.voteNom.ab.includes(deputy.name)"
                                            class="text-lg text-slate-700 p-2"><span class="mdi mdi-snapchat"></span>
                                        </td>
                                    </tr>






                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>


export default {


    name: 'depudex',
    data() {
        return {
            selectedTab: 'autres-mandats',
        };
    },
    props: {
        deputy: {
            type: Object,
            required: true
        },
        laws: {
            type: Array,
            required: true
        },
        seances: {
            type: Array,
            required: true
        },
        showModal: {
            type: Boolean,
            required: true
        }

    },

    methods: {
        calculDepPresence(deputyName) {
            const seances = this.seances
            const presenceMax = seances.length
            let presenceReal = 0
            seances.forEach(seance => {

                if (seance.deputies.absence.includes(deputyName)) {
                    presenceReal++
                }
            })

            let presenceFin = Math.round((presenceMax - presenceReal) / presenceMax * 100)
            return presenceFin
        },
        switchModal() {
            this.$emit('switch_modal', false)
        },
        selectLaw(LawId) {
            this.$emit('select_law', LawId)
        },
    },

}

</script>