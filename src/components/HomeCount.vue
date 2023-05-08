<template>
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
</template>
<script>


export default {


    name: 'NoLawSidebar',
    data() {
        return {
            countdownDate: new Date('2023-05-15T00:00:00'),
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            distance: 0
        }
    },
    props: {


    },
    methods: {
        updateCountdown() {
            const now = new Date().getTime();
            const distance = this.countdownDate - now;
            this.distance = distance
            this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
            this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
        },
    },
    mounted() {
        this.updateCountdown()
        setInterval(() => {
            this.updateCountdown()
        }, 1000);


    },
    watch: {

    },

}

</script>