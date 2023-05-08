<template>
    <div class="whitespace-normal flex min-h-screen ">
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
        <div class=" sidebar w-48 bg-gray-700 flex flex-col items-start justify-start max-h-screen overflow-auto ">
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
        <div class="main-content flex-1 bg-gray-800 p-3">
            <div class="absolute z-10 w-[30vw] bg-slate-50 top-36 left-1/2 flex flex-wrap  border-4 border-gray-700 rounded-lg "
                v-if="showModal">
                <div class="bg-gray-900 min-w-[100%] text-white py-1 px-2 font-bold text-sm flex justify-between">
                    <h5>DÉPUDEX</h5>
                    <span class="mdi mdi-close" @click="showModal = false"></span>
                </div>
                <div class="bg-gray-300  flex flex-wrap">
                    <div class="bg-white border-4 border-gray-700 flex justify-center items-center w-1/3">
                        <div class=" justify-between items-center w-64 flex ">
                            <img :src="`https://spein0ps.com/sandbox/deputied/assets/img/normal/${this.selectedDeputy.name}.jpg`"
                                alt="image" class=" sepia-[.5] w-full h-full">
                        </div>
                    </div>
                    <div class="bg-gray-800  py-2 px-4 text-white text-sm w-2/3">
                        <p class="mb-2"><span class="font-bold">Nom:</span> {{
                            this.selectedDeputy.surname }} {{
        this.selectedDeputy.name }}</p>
                        <p class="mb-2"><span class="font-bold">Parti:</span> {{
                            this.selectedDeputy.parti }}</p>
                        <p class="mb-2"><span class="font-bold">Circonscription:</span> {{
                            this.selectedDeputy.circonscription }}</p>
                        <p class="mb-2"><span class="font-bold">Fonction:</span> {{
                            this.selectedDeputy.fonction ? this.selectedDeputy.fonction : 'Député' }}
                        </p>
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
            </div>
            <div class="flex" v-if="selectedLaw">
                <!-- Top Navigation -->
                <!-- Main Content -->
                <main class="container mx-auto px-4 py-6">
                    <div class="w-full">
                        <h1 class="text-xl font-bold text-orange-200 mb-2">{{ selectedLaw.titre }}</h1>
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
                                <div v-for="(item, index) in this.selectedLaw.conversation" :key="index">
                                    <div class="text-green-500" v-if="showItem[index]">{{ item }}</div>
                                    <span class="prompt text-white"></span>
                                    <span v-if="showLine(index)" color="green">{{
                                        typeLine(item) }}</span>
                                </div>
                            </div>
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
                                    <div class="flex  items-center flex-wrap justify-center py-2 px-2">
                                        <div v-for="( deputy, index ) in  deputies " :key="deputy.name"
                                            @click="showModal = true, showDetailsDep(deputy.name)">
                                            <div
                                                v-if="selectedLaw.voteNom.oui && selectedLaw.voteNom.oui.includes(deputy.name)">
                                                <div class="flex items-center m-2 cursor-pointer">
                                                    <div class="relative flex-shrink-0">
                                                        <img class="w-8 h-8 rounded-full"
                                                            :src="`https://spein0ps.com/sandbox/deputied/assets/img/normal/${deputy.name}.jpg`">
                                                        <img class="absolute bottom-0 right-0 block w-2.5 h-2.5 rounded-full "
                                                            :src="`https://spein0ps.com/sandbox/deputied/assets/img/normal/${deputy.parti}.jpg`" />
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
                                            <div
                                                v-if="selectedLaw.voteNom.non && selectedLaw.voteNom.non.includes(deputy.name)">
                                                <div class="flex items-center m-2 cursor-pointer">
                                                    <div class="relative flex-shrink-0">
                                                        <img class="w-8 h-8 rounded-full"
                                                            :src="`https://spein0ps.com/sandbox/deputied/assets/img/normal/${deputy.name}.jpg`">
                                                        <img class="absolute bottom-0 right-0 block w-2.5 h-2.5 rounded-full "
                                                            :src="`https://spein0ps.com/sandbox/deputied/assets/img/normal/${deputy.parti}.jpg`" />
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
                                            <div
                                                v-if="selectedLaw.voteNom.ab && selectedLaw.voteNom.ab.includes(deputy.name)">
                                                <div class="flex items-center m-2 cursor-pointer">
                                                    <div class="relative flex-shrink-0">
                                                        <img class="w-8 h-8 rounded-full"
                                                            :src="`https://spein0ps.com/sandbox/deputied/assets/img/normal/${deputy.name}.jpg`">
                                                        <img class="absolute bottom-0 right-0 block w-2.5 h-2.5 rounded-full "
                                                            :src="`https://spein0ps.com/sandbox/deputied/assets/img/normal/${deputy.parti}.jpg`" />
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
                                            <div v-if="absents && absents.includes(deputy.name)">
                                                <div class="flex items-center m-2 cursor-pointer">
                                                    <div class="relative flex-shrink-0">
                                                        <img class="w-8 h-8 rounded-full"
                                                            :src="`https://spein0ps.com/sandbox/deputied/assets/img/normal/${deputy.name}.jpg`">
                                                        <img class="absolute bottom-0 right-0 block w-2.5 h-2.5 rounded-full "
                                                            :src="`https://spein0ps.com/sandbox/deputied/assets/img/normal/${deputy.parti}.jpg`" />
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
                                    <div v-for="( count, parti ) in  selectedLawByParti.pour "
                                        class="flex shrink items-center">
                                        <div v-if="count > 0"
                                            class="text-slate-200  m-2 font-semibold flex flex-col items-center justify-center flex-shrink-0">
                                            <img class="w-8 h-8 rounded-full"
                                                :src="`https://spein0ps.com/sandbox/deputied/assets/img/normal/${parti}.jpg`">
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
                                            <img class="w-8 h-8 rounded-full"
                                                :src="`https://spein0ps.com/sandbox/deputied/assets/img/normal/${parti}.jpg`">
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
                                            <img class="w-8 h-8 rounded-full"
                                                :src="`https://spein0ps.com/sandbox/deputied/assets/img/normal/${parti}.jpg`">
                                            <p>{{ count }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="selectedLaw && !selectedLaw.voteNom">
                        <div class=" flex flex-col items-center justify-center py-2 px-2 min-h-[30vw] h-full">

                            <span class="relative text-white text-center text-xl"> AUCUN VOTE SUR CETTE
                                DISCUSSION </span>
                            <span v-if="this.selectedLaw.secType" class="relative text-white text-center p-3">IL
                                A SUREMENT EU
                                LIEU
                                PLUS TARD DANS LA SEANCE: <span @click="search = this.selectedLaw.titre.slice(0, 40)"
                                    class="font-bold bg-slate-300 text-sky-950 underline cursor-pointer">CLIQUEZ
                                    ICI </span>
                                POUR TROUVER LA DISUCSSION LIEE AU VOTE</span>
                            <span v-else class="relative text-white text-center p-3">{{ this.selectedLaw.type
                            }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <div
                    class="grid grid-rows-2 grid-cols-4 sm:grid-cols-2 lg:grid-cols-2 lg:grid-rows-3 2xl:grid-cols-3 h-screen gap-4 p-4 ">
                    <div
                        class="bg-gray-800 rounded-lg p-4 col-span-2 lg:col-span-1  bg-[url('./src/assets/img/Moods/emptyparl2.jpg')] bg-opacity-20 bg-no-repeat bg-cover bg-center flex flex-col justify-center items-center min-h-[45vh]">

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
                        <div class="relative lg:col-span-2 grid-cols-1  bg-gray-800 rounded-lg p-4 ">
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
                    <div class="lg:col-span-2 grid-cols-1  grid bg-gray-800 rounded-lg p-4  relative min-w-full">
                        <h2 class="text-white font-bold text-xl mb-2  ">Graphique</h2>
                        <div class="relative w-[40vw] h-[40vw]">
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
    components: { LineChart },
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
            lawsForHistory: this.laws,
            showItem: [],
            intervalId: null,
            currentIndex: 0,
            currentIndexL: 0,

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
        toggleScaleX() {
            this.scaleX = this.scaleX === 1 ? -1 : 1;
        },
        getLawTypes() {
            const cats = []
            const laws = this.laws
            laws.forEach(law => {
                if (!cats.includes(law.type) && law.type) { cats.push(law.type) }
            })
            this.searchCats = cats
            this.searchByTypeDisplay = true
            console.log(this.searchCats)

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

        calculateRateByParti() {
            if (this.selectedLaw.voteNom) {
                const repartition = {

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
                            repartition.pour[parti]++
                        }
                    }
                }
                if (this.selectedLaw.voteNom.non) {
                    for (let i = 0; i < this.selectedLaw.voteNom.non.length; i++) {
                        const deputyNon = this.deputies.filter(deputy =>
                            deputy.name === this.selectedLaw.voteNom.non[i]
                        )[0]; if (deputyNon) {
                            const parti = deputyNon.parti
                            repartition.contre[parti]++
                        }
                    }
                }
                if (this.selectedLaw.voteNom.ab) {
                    for (let i = 0; i < this.selectedLaw.voteNom.ab.length; i++) {
                        const deputyAbst = this.deputies.filter(deputy =>
                            deputy.name === this.selectedLaw.voteNom.ab[i]
                        )[0]; if (deputyAbst) {
                            const parti = deputyAbst.parti
                            repartition.ab[parti]++
                        }
                    }
                }
                return repartition
            }

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
            console.log(item)
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
        startInterval() {
            console.log('intervale started')
            this.showItem = [];

            this.showItem = Array(this.selectedLaw.conversation.length).fill(false);
            console.log(this.showItem, this.currentIndex)

            this.intervalId = setInterval(() => {
                console.log(this.showItem, this.currentIndex, this.intervalId, this.selectedLaw.conversation.length)
                if (this.currentIndex >= this.selectedLaw.conversation.length) {
                    console.log('interval cleared')
                    this.currentIndex = 0;
                    clearInterval(this.intervalId);

                    return;
                }
                this.showItem[this.currentIndex] = true;
                this.currentIndex++;
            }, this.selectedLaw.conversation[this.currentIndex].split('').length * 80);
        },

        showLine(index) {
            return index <= this.currentIndex;
        },
        typeLine(line) {
            return line.slice(0, this.currentIndexL);
        },
        startTyping() {
            setInterval(() => {
                if (this.currentIndexL < this.lines[this.lines.length - 1].length) {
                    this.currentIndexL++;
                }
            }, 100);
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
        if (this.selectedLaw !== null) {
            this.startTyping();
        }
        this.updateCountdown();
        setInterval(this.updateCountdown, 1000)
        this.getLaziest()
        this.getDepMood()
    },

    watch: {
        selectedLaw(value) {
            console.log(value)
            if (value) {
                this.startInterval();
            } else {
                clearInterval(this.intervalId);
            }
        },
    },
}; </script>