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
        <div class=" sidebar  bg-gray-700 col-span-2 flex flex-col items-start justify-start max-h-screen overflow-auto ">
            <div class=" logo flex flex-col items-start justify-start w-full min-h-full">
                <div>
                    <div class="sticky top-0">
                        <input type="text" class=" border-2 border-gray-200" placeholder="Recherche" v-model="search">
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
        <div class="main-content col-span-10  bg-gray-800 p-3 ">
            <div v-if="showModal">
                <Depudex :deputy="this.selectedDeputy" :laws="this.laws" :seances="this.seances" :showModal="this.showModal"
                    v-on:switch_modal="switchModal" />
            </div>


            <div class="flex" v-if="selectedLaw">
                <!-- Top Navigation -->
                <!-- Main Content -->
                <SelectedLaw :law="this.selectedLaw" :seanceTags="this.seanceTags" />

                <div
                    class="sidebar border-l-4 border-black bg-gray-700 w-[12vw] flex flex-col items-center justify-start max-h-screen overflow-auto ">
                    <div class="logo flex items-center justify-center w-full min-h-[15vh] bg-no-repeat bg-cover"
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
                        <NoLawSideBar :law="this.selectedLaw" />

                    </div>
                </div>
            </div>
            <div v-else>
                <div
                    class="grid grid-rows-2 grid-cols-3 sm:grid-cols-2 lg:grid-cols-2 lg:grid-rows-3 2xl:grid-cols-3 h-screen gap-4 p-4 ">
                    <div
                        class="bg-gray-800 rounded-lg p-4 col-span-2 lg:col-span-1 2xl:col-span-2 bg-[url('https://spein0ps.com/sandbox/deputied/assets/img/Moods/emptyparl2.jpg')] bg-opacity-20 bg-no-repeat bg-cover bg-center flex flex-col justify-center items-center min-h-[45vh]">

                        <div
                            class="text-white font-bold text-3xl mb-2 before:block before:absolute before:-inset-1 before:-skew-y-2 before:bg-green-500 relative inline-block">
                            <h2 class="text-white relative p-1">Prochaine assemblée</h2>
                        </div>
                        <div class="text-3xl text-slate-900 bg-white p-4 bg-opacity-75 font-bold">
                            {{ days }} jours {{ hours }} heures {{ minutes }} minutes {{ seconds }} secondes
                        </div>
                    </div>
                    <div
                        class="bg-gray-800 rounded-lg p-4 grid grid-cols-2 2xl:grid-cols-2  col-span-2 lg:col-span-1 gap-6">


                        <div v-if="depMood" @click="showModal = true, showDetailsDep(this.depMood.oui[0].name)"
                            class="relative cursor-pointer rounded-lg my-2 font-semibold shadow-[5px_5px_rgba(0,0,0)]  p-[8px] border-2 border-slate-900 font-sans bg-lime-50 md:h-60 lg:h-52 2xl:h-[22vh] text-center">
                            <div class="w-full h-full flex flex-col justify-between ">
                                <span
                                    class="before:block before:absolute before:-inset-1 px-2 before:bg-green-300 relative inline-block">
                                    <span class="relative text-slate-900 font-extrabold text-lg"> Oui-Oui </span>
                                </span>
                                <div v-if="this.depMood.oui[0].sexe === 'M'"
                                    class=" bg-[url('https://spein0ps.com/sandbox/deputied/assets/img/Moods/ouiM.jpg')] bg-no-repeat bg-cover bg-center w-full h-full">
                                </div>
                                <div v-else
                                    class=" bg-[url('https://spein0ps.com/sandbox/deputied/assets/img/Moods/ouiF.jpg')] bg-no-repeat bg-cover bg-center w-full h-full">
                                </div>
                                <div
                                    class=" w-full  font-semibold shadow-[5px_5px_rgba(0,0,0)]  border-2 border-slate-900 font-sans bg-lime-50 p-1 text-center">

                                    {{ this.depMood.oui[0].surname }} {{ this.depMood.oui[0].name }}
                                </div>





                            </div>
                        </div>
                        <div v-if="depMood" @click="showModal = true, showDetailsDep(this.depMood.non[0].name)"
                            class=" relative cursor-pointer rounded-lg my-2 font-semibold shadow-[5px_5px_rgba(0,0,0)]  p-[8px] border-2 border-slate-900 font-sans bg-lime-50 md:h-60 lg:h-52 2xl:h-[22vh]  text-center">
                            <div class="w-full h-full flex flex-col justify-between ">

                                <span
                                    class="before:block before:absolute before:-inset-1 px-2 before:bg-red-300 relative inline-block">
                                    <span class="relative text-slate-900 font-extrabold text-lg"> Non-Non </span>
                                </span>
                                <div v-if="this.depMood.non[0].sexe === 'M'"
                                    class=" bg-[url('https://spein0ps.com/sandbox/deputied/assets/img/Moods/nonM.jpg')] bg-no-repeat bg-cover bg-center w-full h-full">
                                </div>
                                <div v-else
                                    class=" bg-[url('https://spein0ps.com/sandbox/deputied/assets/img/Moods/nonF.jpg')] bg-no-repeat bg-cover bg-center w-full h-full">
                                </div>

                                <div
                                    class=" w-full  font-semibold shadow-[5px_5px_rgba(0,0,0)]  border-2 border-slate-900 font-sans bg-lime-50 p-1 text-center">

                                    {{ this.depMood.non[0].surname }} {{ this.depMood.non[0].name }}
                                </div>




                            </div>
                        </div>
                        <div v-if="depMood" @click="showModal = true, showDetailsDep(this.depMood.ab[0].name)"
                            class=" relative cursor-pointer rounded-lg my-2 font-semibold shadow-[5px_5px_rgba(0,0,0)] p-[8px] border-2 border-slate-900 font-sans bg-lime-50 md:h-60 lg:h-52 2xl:h-[22vh]  text-center">
                            <div
                                class=" relative font-semibold shadow-[5px_5px_rgba(0,0,0)]  border-2 border-slate-900 font-sans bg-lime-50 p-1 text-center">

                                {{ this.depMood.ab[0].surname }} {{ this.depMood.ab[0].name }}
                            </div>
                            <div class="w-full h-[88%] flex flex-col justify-between">

                                <div v-if="this.depMood.non[0].sexe === 'M'"
                                    class=" bg-[url('https://spein0ps.com/sandbox/deputied/assets/img/Moods/abM.jpg')] bg-no-repeat bg-cover bg-center w-full h-full">
                                </div>
                                <div v-else
                                    class=" bg-[url('https://spein0ps.com/sandbox/deputied/assets/img/Moods/abF.jpg')] bg-no-repeat bg-cover bg-center w-full h-full">
                                </div>


                                <span
                                    class=" before:block before:absolute before:-inset-1 px-2 before:bg-slate-300 relative inline-block">
                                    <span class="relative text-white font-extrabold text-lg"> LE SUISSE </span>
                                </span>




                            </div>
                        </div>
                        <div v-if="depPalm" @click="showModal = true, showDetailsDep(this.depPalm.laziest[0].name)"
                            class=" relative cursor-pointer rounded-lg my-2 font-semibold shadow-[5px_5px_rgba(0,0,0)] p-[8px] border-2 border-slate-900 font-sans bg-lime-50  md:h-60 lg:h-52 2xl:h-[22vh]  text-center">
                            <div
                                class="bg-[url('https://spein0ps.com/sandbox/deputied/assets/img/Moods/absent.jpg')] bg-no-repeat bg-cover bg-center w-full h-full flex flex-col justify-between ">
                                <div
                                    class=" w-full  font-semibold shadow-[5px_5px_rgba(0,0,0)]  border-2 border-slate-900 font-sans bg-lime-50 p-1 text-center">

                                    {{ this.depPalm.laziest[0].surname }} {{ this.depPalm.laziest[0].name }}
                                </div>
                                <span
                                    class="before:block before:absolute before:-inset-1 px-2 before:bg-amber-300 relative inline-block">
                                    <span class="relative text-amber-900 font-extrabold text-lg"> WANTED </span>
                                </span>




                            </div>

                        </div>
                        <div class="relative lg:col-span-2 grid-cols-1 2xl:col-span-2 bg-gray-800 rounded-lg p-4 ">
                            <h2 class="text-white font-bold text-xl mb-2">Derniers débats</h2>

                            <li v-for="(law, index) in this.laws" :key="law.id" @click="showDetails(law.id)"
                                class="hover:bg-slate-400 list-none transition-colors	duration-100 cursor-pointer">
                                <div v-if="index < 5" class="text-[12px] hover:text-slate-800 first-line:uppercase first-line:tracking-widest
                                    first-letter:text-5xl first-letter:font-bold first-letter:text-slate-500
                                  first-letter:mr-3 lowercase first-letter:float-left text-slate-400  my-2 ">
                                    {{ law.titre.slice(0, 185) + ".." }}
                                    <p class="text-slate-300 text-sm text-justify">{{ law.body.slice(0, 185) + ".." }}</p>
                                </div>


                            </li>

                        </div>
                    </div>
                    <div class="lg:col-span-1 grid-cols-1  2xl:col-span-2    grid bg-gray-800 rounded-lg p-4  relative">
                        <h2 class="text-white font-bold text-xl mb-2  ">Graphique</h2>
                        <div class="relative lg:w-[40vw] 2xl:w-[45vw] h-[40vw]">
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
import NoLawSideBar from '../components/NoLawSideBar.vue';

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
    components: { LineChart, Depudex, Depudex, SelectedLaw, DepListByLaw, PartiesListByLaw, NoLawSideBar },
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

            intervalId: null,


            countdownDate: new Date('2023-05-09T00:00:00'),
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,

            depPalm: null,
            depMood: null
        };
    },
    methods: {
        switchModal(element) {
            this.showModal = element
        },
        selectDeputy(deputyName) {
            const deputy = this.deputies.filter(deputy =>
                deputy.name === deputyName)

            this.selectedDeputy = deputy[0]

        },

        toggleScaleX() {
            this.scaleX = this.scaleX === 1 ? -1 : 1;
        },




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
            console.log(depPalm, entries[0], this.depPalm)






        },

        getDepMood() {
            const depMood = {};
            const deputNames = [...new Set(this.deputies.map(deputy => deputy.name))];
            const yesAgregate = []
            const noAgregate = []
            const abAgregate = []
            const allAtOnce = []
            this.laws.forEach(law => {
                if (law.voteNom) yesAgregate.push(...law.voteNom.oui);
            });
            this.laws.forEach(law => {
                if (law.voteNom) noAgregate.push(...law.voteNom.non);
            });
            this.laws.forEach(law => {
                if (law.voteNom) abAgregate.push(...law.voteNom.ab);
            });
            allAtOnce.push(yesAgregate)
            allAtOnce.push(noAgregate)
            allAtOnce.push(abAgregate)


            let depMoodOui = this.mostFrequentElement(yesAgregate)
            let depMoodNon = this.mostFrequentElement(noAgregate)
            let depMoodAb = this.mostFrequentElement(abAgregate)

            depMood.oui = this.mostFrequentElement(yesAgregate)
            depMood.non = this.mostFrequentElement(noAgregate)
            depMood.ab = this.mostFrequentElement(abAgregate)
            depMood.oui = this.deputies.filter((deputy) => {
                return deputy.name === depMoodOui
            })
            depMood.non = this.deputies.filter((deputy) => {
                return deputy.name === depMoodNon
            })
            depMood.ab = this.deputies.filter((deputy) => {
                return deputy.name === depMoodAb
            })
            this.depMood = depMood
            console.log(this.depMood)
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

        updateCountdown() {
            const now = new Date().getTime();
            const distance = this.countdownDate - now;
            this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
            this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
        },
        showDetails(itemId) {
            this.selectedLaw = null
            const item = this.laws.find(law => law.id === itemId)

            this.selectedLaw = item
            const seance = this.seances.find(seances => seances.id === this.selectedLaw.seance)
            this.seance = seance
            this.absents = seance.deputies.absence
            this.seanceTags = seance.tags.trim().replace(/\s*\–/, '').split('–')
            let slByParti = this.calculateRateByParti() ? this.calculateRateByParti() : null
            this.selectedLawByParti = slByParti
        },
        showDetailsDep(itemName) {
            console.log('showDetailsDep', itemName)
            const item = this.deputies.filter(deputy =>
                deputy.name === itemName)

            this.selectedDeputy = item[0]
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
        setInterval(() => {
            this.toggleScaleX();
        }, 5000);

        this.getLaziest()
        this.getDepMood()
    },


}; </script>