<template>
    <div class="whitespace-normal grid grid-cols-12  grid-rows-1 min-h-screen ">
        <!-- Sidebar -->
        <!--  <div class="sidebar bg-gray-900 flex flex-col w-[3.5vw] items-center justify-start">
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
                    <span class="mdi mdi-tag-multiple-outline">

                    </span>
                </button>

            </div>
        </div> -->
        <div
            class="sidebar absolute z-10 lg:relative bg-gray-700 col-span-2 flex flex-col items-start justify-start max-h-full  xl:max-h-[154vh] 2xl:max-h-[103vh] overflow-auto">
            <div class=" w-full flex items-center justify-between px-4 py-3 lg:hidden">
                <button @click="isMobileNavOpen = !isMobileNavOpen" type="button"
                    class="text-gray-400 hover:text-white focus:outline-none focus:text-white" aria-controls="mobile-menu"
                    aria-expanded="false">
                    <span class="sr-only">Toggle mobile menu</span>
                    <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
                        <path v-if="!isMobileNavOpen" fill-rule="evenodd" clip-rule="evenodd"
                            d="M3 6H21V8H3V6ZM3 11H21V13H3V11ZM3 16H21V18H3V16Z" />
                        <path v-else fill-rule="evenodd" clip-rule="evenodd"
                            d="M3 6H21V8H3V6ZM3 11H21V13H3V11ZM3 16H21V18H3V16Z" />
                    </svg>
                </button>
                <span v-if="!isMobileNavOpen" class="mdi text-white font-bold mdi-close sticky"
                    @click="isMobileNavOpen = !isMobileNavOpen"></span>
            </div>



            <nav class="lg:flex lg:flex-col lg:items-start lg:justify-start flex-1 px-1 pt-6 pb-4"
                :class="{ 'hidden': isMobileNavOpen }">
                <FilteredSearch :laws="this.laws" v-on:select_law="selectLaw" v-on:switch_nav=switchNav() />
            </nav>
        </div>
        <!-- Main Content -->
        <div class="main-content grid col-span-12 lg:col-span-10  bg-gray-800 p-3 ">
            <div v-if="showModal">
                <Depudex :deputy="this.selectedDeputy" :laws="this.laws" :seances="this.seances" :showModal="this.showModal"
                    v-on:switch_modal="switchModal" v-on:select_law="selectLaw" />
            </div>


            <div class="flex flex-col lg:flex-row" v-if="selectedLaw">
                <!-- Top Navigation -->
                <!-- Main Content -->
                <SelectedLaw :law="this.selectedLaw" :seanceTags="this.seanceTags" />

                <div
                    class="sidebar border-l-4 border-black bg-gray-700 flex lg:w-1/3 xl:w-1/4 flex-col items-center justify-start max-h-screen overflow-auto ">
                    <div class="logo flex items-center justify-center w-full  min-h-[15vh] bg-no-repeat bg-cover"
                        :style="` background-image: url(${bgImage}); transform:scaleX(${this.scaleX});`">
                    </div>
                    <div v-if="selectedLaw && selectedLaw.voteNom">
                        <ul class="w-full flex flex-col items-center justify-center my-3">
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
                                    <DepListByLaw :deputies="this.deputies" :voteCluster="this.selectedLaw.voteNom.oui"
                                        v-on:switch_modal="switchModal" v-on:select_deputy="selectDeputy" />

                                </div>
                                <div id="contre">
                                    <div class="flex flex-col items-center justify-center py-2 px-2">
                                        <span
                                            class="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-red-500 relative inline-block">
                                            <span class="relative text-white"> CONTRE </span>
                                        </span>
                                    </div>
                                    <DepListByLaw :deputies="this.deputies" :voteCluster="this.selectedLaw.voteNom.non"
                                        v-on:switch_modal="switchModal" v-on:select_deputy="selectDeputy" />

                                </div>
                                <div id="abstentions">
                                    <div class="flex flex-col items-center justify-center py-2 px-2">
                                        <span
                                            class="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-yellow-500 relative inline-block">
                                            <span class="relative text-white"> ABSTENTIONS </span>
                                        </span>
                                    </div>
                                    <DepListByLaw :deputies="this.deputies" :voteCluster="this.selectedLaw.voteNom.ab"
                                        v-on:switch_modal="switchModal" v-on:select_deputy="selectDeputy" />

                                </div>
                                <div id="absents">
                                    <div class="flex flex-col items-center justify-center py-2 px-2">
                                        <span
                                            class="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-slate-500 relative inline-block">
                                            <span class="relative text-white"> ABSENTS </span>
                                        </span>
                                    </div>
                                    <DepListByLaw :deputies="this.deputies" :voteCluster="this.absents"
                                        v-on:switch_modal="switchModal" v-on:select_deputy="selectDeputy" />


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
                                    <PartiesListByLaw :law="this.selectedLaw" :deputies="this.deputies" :avis="'oui'" />

                                </div>
                            </div>
                            <div id="contre">
                                <div class="flex flex-col items-center justify-center py-2 px-2">
                                    <span
                                        class="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-red-500 relative inline-block">
                                        <span class="relative text-white"> CONTRE </span>
                                    </span>
                                </div>
                                <PartiesListByLaw :law="this.selectedLaw" :deputies="this.deputies" :avis="'non'" />

                            </div>
                            <div id="abst">
                                <div class="flex flex-col items-center justify-center py-2 px-2">
                                    <span
                                        class="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-yellow-500 relative inline-block">
                                        <span class="relative text-white"> ABSTENTIONS </span>
                                    </span>
                                </div>
                                <PartiesListByLaw :law="this.selectedLaw" :deputies="this.deputies" :avis="'ab'" />

                            </div>
                        </div>
                    </div>
                    <div v-if="selectedLaw && !selectedLaw.voteNom">
                        <NoVoteSidebar :law="this.selectedLaw" />

                    </div>
                </div>
            </div>
            <div v-else>
                <div
                    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-rows-3 lg:grid-cols-4 2xl:grid-cols-8 h-screen gap-4 p-4 ">
                    <HomeCount />

                    <div
                        class="bg-gray-800 rounded-lg p-4 grid grid-cols-1 sm:grid-cols-2 lg:col-span-2 2xl:grid-cols-2 2xl:col-span-2  col-span-2  gap-6">

                        <DepMood :deputies="this.deputies" :laws="this.laws" :avis="'oui'" v-on:select_deputy="selectDeputy"
                            v-on:switch_modal="switchModal">Oui-Oui</DepMood>

                        <DepMood :deputies="this.deputies" :laws="this.laws" :avis="'non'" v-on:select_deputy="selectDeputy"
                            v-on:switch_modal="switchModal">Non-Non</DepMood>

                        <DepMood :deputies="this.deputies" :laws="this.laws" :avis="'ab'" v-on:select_deputy="selectDeputy"
                            v-on:switch_modal="switchModal">
                            Le Suisse</DepMood>

                        <DepPalmares :deputies="this.deputies" :seances="this.seances" v-on:select_deputy="selectDeputy"
                            v-on:switch_modal="switchModal" />

                        <div
                            class="relative md:col-span-2 lg:col-span-2 grid-cols-1 2xl:col-span-2 bg-gray-800 rounded-lg p-4 ">
                            <LastArticles :laws="this.laws" v-on:Select_Law="selectLaw" />


                        </div>
                    </div>
                    <div
                        class="lg:col-span-1 grid-cols-1  md:col-span-2 2xl:col-span-2    grid bg-gray-800 rounded-lg p-4  ">
                        <h2 class="text-white font-bold text-xl mb-2  ">Graphique</h2>
                        <div class="  min-h-[50vh] w-full lg:min-w-[35vw] 2xl:min-w-[69vw] ">
                            <LineChart />
                        </div>

                    </div>

                </div>
            </div>
        </div>


    </div>
</template> 

<script >
import '@mdi/font/css/materialdesignicons.min.css';
import { ref, watchEffect } from 'vue'
import { mapState } from 'vuex';
import LineChart from '../components/HomeChart.vue'
import Depudex from '../components/Depudex.vue';
import SelectedLaw from '../components/SelectedLaw.vue';
import DepListByLaw from '../components/DepListByLaw.vue';
import PartiesListByLaw from '../components/PartiesListByLaw.vue';
import HomeCount from '../components/HomeCount.vue';
import DepPalmares from '../components/DepPalmares.vue';
import DepMood from '../components/DepMood.vue'
import LastArticles from '../components/LastArticles.vue'
import FilteredSearch from '../components/FilteredSearch.vue'
import NoVoteSidebar from '../components/NoVoteSidebar.vue';
export default {

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
    components: { LineChart, Depudex, Depudex, SelectedLaw, DepListByLaw, PartiesListByLaw, HomeCount, DepPalmares, DepMood, LastArticles, FilteredSearch, NoVoteSidebar },
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
            selectedDeputy: null,
            showModal: false,
            absents: null,
            seance: null,
            search: '',
            seanceTags: [],
            isMobileNavOpen: false
        };
    },
    methods: {
        switchModal(element) {
            this.showModal = element
        },
        switchNav(element) {
            this.isMobileNavOpen = !element
        },
        selectDeputy(deputyName) {
            console.log('rer')
            const deputy = this.deputies.filter(deputy =>
                deputy.name === deputyName)

            this.selectedDeputy = deputy[0]
            console.log(this.selectedDeputy)
        },
        selectLaw(lawId) {

            const law = this.laws.filter(law =>
                law.id === lawId)

            this.selectedLaw = law[0]

        },
        toggleScaleX() {
            this.scaleX = this.scaleX === 1 ? -1 : 1;
        },






    },


    mounted() {
        setInterval(() => {
            this.toggleScaleX();
        }, 5000);



    },


}; </script>