<template>
    <div class="flex  items-center flex-wrap justify-center py-2 px-2">
        <div v-for="( deputy, index ) in  deputies " :key="deputy.name" @click="switchModal(), selectDeputy(deputy.name)">
            <div v-if="voteCluster && voteCluster.includes(deputy.name)">
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
</template>
<script>


export default {


    name: 'DepListByLaw',
    data() {
        return {
            selectedTab: 'autres-mandats',
        };
    },
    props: {
        deputies: {
            type: Array,
            required: true
        },
        voteCluster: {
            type: Array,
            required: true
        },



    },

    methods: {
        switchModal() {
            this.$emit('switch_modal', true)
        },
        selectDeputy(deputyName) {
            this.$emit('select_deputy', deputyName)
        }
    },
}

</script>