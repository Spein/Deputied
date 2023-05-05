<template>
    <div class="flex min-h-screen ">
        <!-- Sidebar -->
        <div class="sidebar bg-gray-900 flex flex-col w-[3.5vw] items-center justify-start">
            <div class="logo flex items-center  justify-center p-4">
                <button
                    class="bg-gray-200 rounded-full h-10 w-10 hover:bg-green-500 hover:rounded-lg hover:ease-in transition duration-150 ease-out ">
                </button>
            </div>
            <hr class=" w-6 border-gray-700 border-2 ">
            <div class="logo flex items-center  justify-center p-4">
                <button
                    class="bg-gray-200 rounded-full h-10 w-10 hover:bg-green-500 hover:rounded-lg hover:ease-in transition duration-150 ease-out ">
                </button>
            </div>
            <div class="logo flex items-center  justify-center p-4">
                <button
                    class="bg-gray-200 rounded-full h-10 w-10 hover:bg-green-500 hover:rounded-lg hover:ease-in transition duration-150 ease-out ">
                </button>
            </div>
            <div class="logo flex items-center  justify-center p-4">
                <button
                    class="bg-gray-200 rounded-full h-10 w-10 hover:bg-green-500 hover:rounded-lg hover:ease-in transition duration-150 ease-out ">
                </button>
            </div>
        </div>
        <div class="sidebar bg-gray-700 w-[12vw] flex flex-col items-start justify-start max-h-screen overflow-auto ">
            <div class="logo flex flex-col items-start justify-start w-full min-h-full">
                <div>
                    <div class="sticky top-0">
                        <input type="text" class=" border-2 border-gray-200 min-w-full" placeholder="Recherche"
                            v-model="search">
                        <ul>
                            <li v-for="item in filteredItems" :key="item.id">{{ item.name }}</li>
                        </ul>
                    </div>
                    <ul class="">
                        <li v-for="law in filteredItems()" :key="law.id">
                            <div v-if="law.type"
                                class="text-[12px] first-line:uppercase first-line:tracking-widest
                                    first-letter:text-5xl first-letter:font-bold first-letter:text-slate-500
                                  first-letter:mr-3 lowercase first-letter:float-left text-slate-400 hover:text-slate-200 my-3 py-4 px-2"
                                @click="showDetails(law.id)">
                                {{ law.titre.slice(0, 185) + ".." }}

                            </div>


                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- Main Content -->
        <div class="flex" v-if="selectedLaw">
            <div class="main-content flex-1 bg-gray-800 p-10">
                <!-- Top Navigation -->
                <div class="absolute z-10 w-[30vw] bg-slate-50 top-36 left-1/2 flex flex-wrap  border-4 border-gray-700 rounded-lg "
                    v-if="showModal">
                    <div class="bg-gray-900 min-w-[100%] text-white py-1 px-2 font-bold text-sm flex justify-between">
                        <h5>DÉPUDEX</h5>
                        <span class="mdi mdi-close" @click="showModal = false"></span>
                    </div>
                    <div class="bg-gray-300  flex flex-wrap">
                        <div class="bg-white border-4 border-gray-700 flex justify-center items-center w-1/3">
                            <div class=" justify-between items-center w-64 flex ">
                                <img :src="`../src/assets/img/normal/${this.selectedDeputy.name}.jpg`" alt="image"
                                    class=" sepia-[.5] w-full h-full">
                            </div>
                        </div>
                        <div class="bg-gray-800  py-2 px-4 text-white text-sm w-2/3">
                            <p class="mb-2"><span class="font-bold">Nom:</span> {{ this.selectedDeputy.surname }} {{
                                this.selectedDeputy.name }}</p>
                            <p class="mb-2"><span class="font-bold">Parti:</span> {{ this.selectedDeputy.parti }}</p>
                            <p class="mb-2"><span class="font-bold">Circonscription:</span> {{
                                this.selectedDeputy.circonscription }}</p>
                            <p class="mb-2"><span class="font-bold">Fonction:</span> {{
                                this.selectedDeputy.fonction ? this.selectedDeputy.fonction : 'Député' }}</p>
                            <p class="mb-2"><span class="font-bold">Presence:</span> {{
                                calculDepPresence(this.selectedDeputy.name) }}%</p>
                            <p class="mb-2"><span class="font-bold">Wikipedia:</span><a class=" underline" href="/">Lien
                                    vers le wiki</a></p>
                        </div>
                        <div class="max-h-96 overflow-auto  p-4 text-white text-xs flex">
                            <div class="flex flex-col justify-start items-start">
                                <div class="flex min-w-100 text-slate-700">
                                    <h5 :class="{ 'bg-slate-700 text-slate-100': selectedTab === 'autres-mandats' }"
                                        class="shadow-[5px_5px_rgba(0,0,0,0.4)]  cursor-pointer border-4 text-sm border-slate-600 font-extrabold mx-3 p-2  hover:bg-slate-700 hover:text-slate-100"
                                        @click="selectedTab = 'autres-mandats'">Autres mandats
                                    </h5>
                                    <h5 :class="{ 'bg-slate-700 text-slate-100': selectedTab === 'historique' }"
                                        class="shadow-[5px_5px_rgba(0,0,0,0.4)]  cursor-pointer border-4 text-sm border-slate-600 font-extrabold mx-3 p-2 hover:bg-slate-700 hover:text-slate-100"
                                        @click="selectedTab = 'historique'">
                                        Historique</h5>
                                </div>
                                <div class="flex flex-col py-4">
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
                                            <tbody v-if="this.selectedDeputy.mandats.length > 0" class="   divide-gray-200">
                                                <tr v-for="(mandats, index) in this.selectedDeputy.mandats"
                                                    :key="`${mandats.fonction}-${mandats.titre}`" class="text-slate-700">
                                                    <td colspan="5" class="p-2">{{ mandats.titre }}</td>
                                                    <td colspan="4" class="text-[.61rem]">{{ mandats.fonction }}</td>
                                                    <td colspan="1" class="text-right">{{ mandats.remuneration }}</td>
                                                    <td colspan="1" class="text-right">{{ mandats.avantage }}</td>
                                                </tr>
                                            </tbody>
                                            <tr v-else>
                                                <td colspan="4">
                                                    <h5 class=" text-semibold text-slate-700 text-center">N'a rien déclaré
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

                                                <tr v-for="(law, index) in  this.laws " :key="law.id"
                                                    class="text-slate-700 text-center">
                                                    <td v-if="law.voteNom && (law.voteNom.oui.includes(this.selectedDeputy.name) || law.voteNom.non.includes(this.selectedDeputy.name) || law.voteNom.ab.includes(this.selectedDeputy.name))"
                                                        class="cursor-pointer hover:text-cyan-700 hover:font-extrabold p-2"
                                                        @click="showDetails(law.id)">{{ law.titre.slice(0,
                                                            105) + ".." }}</td>
                                                    <td v-if="law.voteNom && (law.voteNom.oui.includes(this.selectedDeputy.name) || law.voteNom.non.includes(this.selectedDeputy.name) || law.voteNom.ab.includes(this.selectedDeputy.name))"
                                                        class=" p-2">{{ law.date }}</td>
                                                    <td v-if="law.voteNom && law.voteNom.oui.includes(this.selectedDeputy.name)"
                                                        class=" p-2"><span
                                                            class="text-lg text-green-700 mdi mdi-thumb-up-outline"></span>
                                                    </td>
                                                    <td v-if="law.voteNom && law.voteNom.non.includes(this.selectedDeputy.name)"
                                                        class="text-lg text-red-700 p-2"><span
                                                            class="mdi mdi-thumb-down-outline"></span>
                                                    </td>

                                                    <td v-if="law.voteNom && law.voteNom.ab.includes(this.selectedDeputy.name)"
                                                        class="text-lg text-slate-700 p-2"><span
                                                            class="mdi mdi-snapchat"></span>
                                                    </td>
                                                </tr>






                                            </tbody>

                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> <!-- Main Content -->
                <main class="container mx-auto px-4 py-6">
                    <div class="w-full">
                        <h1 class="text-xl font-bold text-orange-200 mb-2">{{ selectedLaw.titre }}</h1>
                    </div>

                    <div v-if="seanceTags" class="w-full flex-wrap flex items-center space-x-2  mt-4">
                        <span v-for=" tag  in  seanceTags "
                            class="inline-block bg-gray-200 rounded-full px-3 py-2 my-1 text-sm font-semibold text-gray-700">{{
                                tag }}</span>


                    </div>

                    <div class="flex flex-row justify-between flex-wrap mt-4">
                        <div
                            class="w-full lg:w-[68%] p-2 mr-4 shadow-[5px_5px_rgba(0,0,0)]  border-2 border-slate-900 font-sans bg-lime-50  text-center">
                            <h3
                                class="my-2 font-semibold shadow-[5px_5px_rgba(0,0,0)]  border-2 border-slate-900 font-sans bg-lime-500 p-1 text-center w-44">
                                Chat</h3>
                        </div>
                        <div
                            class=" w-full lg:w-[27%]  p-2 mr-4 shadow-[5px_5px_rgba(0,0,0)]  border-2 border-slate-900 font-sans bg-lime-50  text-center">
                            <h3
                                class="top-[-6%] relative font-semibold shadow-[5px_5px_rgba(0,0,0)]  border-2 border-slate-900 font-sans bg-slate-500 p-1 text-center w-44">
                                Texte intégral</h3>
                            <p class=" text-left max-h-96 overflow-auto ...">{{ selectedLaw.body }}</p>
                        </div>
                    </div>
                </main>
            </div>
            <div
                class="sidebar border-l-4 border-black bg-gray-700 w-[12vw] flex flex-col items-center justify-start max-h-screen overflow-auto ">
                <div class="logo flex items-center justify-center w-full min-h-[15vh] bg-no-repeat bg-cover"
                    :style="` background-image: url(${bgImage}); transform:scaleX(${this.scaleX});`">
                </div>
                <ul class="w-full flex flex-col items-center justify-center my-3" v-if="selectedLaw.voteNom">
                    <li :class="{ 'active': activeTab === 'tab1' }"
                        class="my-2 font-semibold shadow-[5px_5px_rgba(0,0,0)]  border-2 border-slate-900 font-sans bg-lime-50 p-1 text-center w-44"
                        @click="activeTab = 'tab1'">Par personne <span
                            :class="{ 'mdi mdi-chevron-down': activeTab === 'tab1', 'mdi mdi-chevron-right': activeTab != 'tab1' }"></span>
                    </li>
                    <div class="py-4" v-if="activeTab === 'tab1'">
                        <div id="pour">
                            <div class="flex flex-col items-center justify-center py-2 px-2"> <span
                                    class="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-green-500 relative inline-block">
                                    <span class="relative text-white"> POUR</span>
                                </span> </div>
                            <div class="flex  items-center flex-wrap justify-center py-2 px-2">
                                <div v-for="( deputy, index ) in  deputies " :key="deputy.name"
                                    @click="showModal = true, showDetailsDep(deputy.name)">
                                    <div v-if="selectedLaw.voteNom.oui && selectedLaw.voteNom.oui.includes(deputy.name)"><!-- {{
                                    deputy.name }} -->
                                        <div class="flex items-center m-2 cursor-pointer">
                                            <div class="relative flex-shrink-0">
                                                <img class="w-8 h-8 rounded-full"
                                                    :src="`../src/assets/img/normal/${deputy.name}.jpg`"> <img
                                                    class="absolute bottom-0 right-0 block w-2.5 h-2.5 rounded-full "
                                                    :src="`../src/assets/img/normal/${deputy.parti}.jpg`" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="contre">
                            <div class="flex flex-col items-center justify-center py-2 px-2">
                                <span
                                    class="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-red-500 relative inline-block">
                                    <span class="relative text-white"> CONTRE </span>
                                </span>
                            </div>
                            <div class="flex  items-center flex-wrap justify-center py-2 px-2">
                                <div v-for="( deputy, index ) in  deputies " :key="deputy.name"
                                    @click="showModal = true, showDetailsDep(deputy.name)">
                                    <div v-if="selectedLaw.voteNom.non && selectedLaw.voteNom.non.includes(deputy.name)"><!-- {{
                                    deputy.name }} -->
                                        <div class="flex items-center m-2 cursor-pointer">
                                            <div class="relative flex-shrink-0">
                                                <img class="w-8 h-8 rounded-full"
                                                    :src="`../src/assets/img/normal/${deputy.name}.jpg`"> <img
                                                    class="absolute bottom-0 right-0 block w-2.5 h-2.5 rounded-full "
                                                    :src="`../src/assets/img/normal/${deputy.parti}.jpg`" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="abstentions">
                            <div class="flex flex-col items-center justify-center py-2 px-2">
                                <span
                                    class="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-yellow-500 relative inline-block">
                                    <span class="relative text-white"> ABSTENTIONS </span>
                                </span>
                            </div>
                            <div class="flex  items-center flex-wrap justify-center py-2 px-2">
                                <div v-for="( deputy, index ) in  deputies " :key="deputy.name"
                                    @click="showModal = true, showDetailsDep(deputy.name)">
                                    <div v-if="selectedLaw.voteNom.ab && selectedLaw.voteNom.ab.includes(deputy.name)"><!-- {{
                                    deputy.name }} -->
                                        <div class="flex items-center m-2 cursor-pointer">
                                            <div class="relative flex-shrink-0">
                                                <img class="w-8 h-8 rounded-full"
                                                    :src="`../src/assets/img/normal/${deputy.name}.jpg`"> <img
                                                    class="absolute bottom-0 right-0 block w-2.5 h-2.5 rounded-full "
                                                    :src="`../src/assets/img/normal/${deputy.parti}.jpg`" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="absents">
                            <div class="flex flex-col items-center justify-center py-2 px-2">
                                <span
                                    class="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-slate-500 relative inline-block">
                                    <span class="relative text-white"> ABSENTS </span>
                                </span>
                            </div>
                            <div class="flex  items-center flex-wrap justify-center py-2 px-2">
                                <div v-for="( deputy, index ) in  deputies " :key="deputy.name"
                                    @click="showModal = true, showDetailsDep(deputy.name)">
                                    <div v-if="absents && absents.includes(deputy.name)"><!-- {{
                                    deputy.name }} -->
                                        <div class="flex items-center m-2 cursor-pointer">
                                            <div class="relative flex-shrink-0">
                                                <img class="w-8 h-8 rounded-full"
                                                    :src="`../src/assets/img/normal/${deputy.name}.jpg`"> <img
                                                    class="absolute bottom-0 right-0 block w-2.5 h-2.5 rounded-full "
                                                    :src="`../src/assets/img/normal/${deputy.parti}.jpg`" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <li :class="{ 'active': activeTab === 'tab2' }"
                        class="my-2 font-semibold shadow-[5px_5px_rgba(0,0,0)]  border-2 border-slate-900 font-sans bg-lime-50 p-1 text-center w-44"
                        @click="activeTab = 'tab2'">Par parti <span
                            :class="{ 'mdi mdi-chevron-down': activeTab === 'tab2', 'mdi mdi-chevron-right': activeTab != 'tab2' }"></span>
                    </li>
                </ul>
                <div v-if="activeTab === 'tab2'">
                    <div id="pour">
                        <div class="flex flex-col items-center justify-center py-2 px-2"> <span
                                class="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-green-500 relative inline-block">
                                <span class="relative text-white"> POUR</span>
                            </span> </div>
                        <div class="flex  items-center flex-wrap justify-center py-2 px-2">
                            <div v-for="( count, parti ) in  selectedLawByParti.pour " class="flex shrink items-center">
                                <div v-if="count > 0"
                                    class="text-slate-200  m-2 font-semibold flex flex-col items-center justify-center flex-shrink-0">
                                    <img class="w-8 h-8 rounded-full" :src="`../src/assets/img/normal/${parti}.jpg`">
                                    <p>{{ count }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="contre">
                        <div class="flex flex-col items-center justify-center py-2 px-2">
                            <span
                                class="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-red-500 relative inline-block">
                                <span class="relative text-white"> CONTRE </span>
                            </span>
                        </div>
                        <div class="flex  items-center flex-wrap justify-center py-2 px-2">
                            <div v-for="( count, parti ) in  selectedLawByParti.contre "
                                class="shrink flex justify-center items-center">
                                <div v-if="count > 0"
                                    class="text-slate-200 font-semibold flex flex-col items-center justify-center flex-shrink-0  m-2">
                                    <img class="w-8 h-8 rounded-full" :src="`../src/assets/img/normal/${parti}.jpg`">
                                    <p>{{ count }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="abst">
                        <div class="flex flex-col items-center justify-center py-2 px-2">
                            <span
                                class="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-yellow-500 relative inline-block">
                                <span class="relative text-white"> ABSTENTIONS </span>
                            </span>
                        </div>
                        <div class="flex  items-center flex-wrap justify-center py-2 px-2">
                            <div v-for="( count, parti ) in  selectedLawByParti.ab "
                                class="shrink flex justify-center items-center">
                                <div v-if="count > 0"
                                    class="text-slate-200 font-semibold flex flex-col items-center justify-center flex-shrink-0  m-2">
                                    <img class="w-8 h-8 rounded-full" :src="`../src/assets/img/normal/${parti}.jpg`">
                                    <p>{{ count }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template> 

<script >
import '@mdi/font/css/materialdesignicons.min.css';
import { ref, watchEffect, computed, onMounted } from 'vue'
import store from '../store';
import { useRoute } from 'vue-router';
import LawItem from '../components/LawItem.vue';
import { mapState, mapGetters } from 'vuex'; export default {
    setup() {
        const bgImages = [
            'https://streak.club/img/Mix1c2VyX2NvbnRlbnQvdXBsb2Fkcy9pbWFnZS80NDA3LmdpZg==/401x399%23/dOZdaR.gif',
            'https://streak.club/img/Mix1c2VyX2NvbnRlbnQvdXBsb2Fkcy9pbWFnZS80NDE2LmdpZg==/323x317%23/0eeKn5.gif',
            'https://media.tenor.com/lyC7rRQJ3GwAAAAC/crossy-road-chicken.gif'
        ]
        const bgImage = ref(bgImages[0])
        let index = 0
        watchEffect(() => {
            setInterval(() => {
                index = (index + 1) % bgImages.length
                bgImage.value = bgImages[index]
            }, 5000)
        })
        return {
            bgImage,
        }
    },
    computed: {
        ...mapState({
            laws: state => state.searchedLaws,
            deputies: state => state.deputies,
            seances: state => state.seances,

        }),
    },
    data() {
        return {
            activeTab: 'tab1',
            scaleX: 1,
            selectedLaw: null,
            selectedLawByParti: null,
            selectedDeputy: null,
            selectedTab: 'autres-mandats',
            showModal: false,
            absents: null,
            seance: null,
            seanceTags: [],
            search: '',
            lawsForHistory: this.laws
        };
    },
    methods: {
        toggleScaleX() {
            this.scaleX = this.scaleX === 1 ? -1 : 1;
        },
        setAbstents(seanceId) {
        },
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
        showDetails(itemId) {
            this.selectedLaw = null
            const item = this.laws.find(law => law.id === itemId)

            this.selectedLaw = item
            const seance = this.seances.find(seances => seances.id === this.selectedLaw.seance)
            this.seance = seance
            this.absents = seance.deputies.absence
            this.seanceTags = seance.tags.trim().replace(/\s*\–/, '').split('–')
            let slByParti = {
                pour: {
                    PS: 0,
                    MR: 0,
                    cdH: 0,
                    ECOLO: 0,
                    PTB: 0,
                    DéFI: 0,
                },
                contre: {
                    PS: 0,
                    MR: 0,
                    cdH: 0,
                    ECOLO: 0,
                    PTB: 0,
                    DéFI: 0,
                },
                ab: {
                    PS: 0,
                    MR: 0,
                    cdH: 0,
                    ECOLO: 0,
                    PTB: 0,
                    DéFI: 0,
                }
            }


            if (this.selectedLaw.voteNom.oui) {
                for (let i = 0; i < this.selectedLaw.voteNom.oui.length; i++) {
                    const deputyOui = this.deputies.filter(deputy =>
                        deputy.name === this.selectedLaw.voteNom.oui[i]
                    )[0];

                    if (deputyOui) {

                        const parti = deputyOui.parti
                        slByParti.pour[parti]++
                    }
                }
            }
            if (this.selectedLaw.voteNom.non) {
                for (let i = 0; i < this.selectedLaw.voteNom.non.length; i++) {
                    const deputyNon = this.deputies.filter(deputy =>
                        deputy.name === this.selectedLaw.voteNom.non[i]
                    )[0]; if (deputyNon) {
                        const parti = deputyNon.parti
                        slByParti.contre[parti]++
                    }
                }
            }
            if (this.selectedLaw.voteNom.ab) {
                for (let i = 0; i < this.selectedLaw.voteNom.ab.length; i++) {
                    const deputyAbst = this.deputies.filter(deputy =>
                        deputy.name === this.selectedLaw.voteNom.ab[i]
                    )[0]; if (deputyAbst) {
                        const parti = deputyAbst.parti
                        slByParti.ab[parti]++
                    }
                }
            }
            this.selectedLawByParti = slByParti
        },
        showDetailsDep(itemName) {
            const item = this.deputies.filter(deputy =>
                deputy.name === itemName)

            this.selectedDeputy = item[0]
        },
        searchHistory(deputName) {
            const laws = this.laws
            laws.forEach(law => {

            });
        },
        filteredItems() {

            if (!this.search) {
                return this.laws;
            }
            const searchLower = this.search.toLowerCase();
            return this.laws.filter(law =>
                law.body.toLowerCase().includes(searchLower)
            );
        }
    },
    mounted() {
        setInterval(() => {
            this.toggleScaleX();
        }, 5000);
    }
}; </script>