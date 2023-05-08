<template>
    <Line :data="chartData" />
</template>

<script>
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

export default {
    name: 'LineChart',
    components: { Line },
    data() {
        return {
            chartData: {
                labels: [

                    'S. 2018-2019',
                    'SE 2019',
                    'S. 2019-2020',
                    'S. 2020-2021',
                    'S. 2021-2022',
                    'S. 2022-2023',
                ],
                datasets: [
                    {
                        label: 'Projets de décret déposés',
                        data: [119, 4, 25, 57, 57, 47],
                        backgroundColor: '#4B5563',
                    },
                    {
                        label: 'Propositions de décret déposées',
                        data: [26, 21, 28, 53, 28, 31],
                        backgroundColor: '#6B7280',
                    },
                    {
                        label: 'Questions orales déposées',
                        data: [896, 0, 2527, 3355, 2180, 1634],
                        backgroundColor: '#9CA3AF',
                    },
                    {
                        label: 'Interpellations déposées',
                        data: [32, 0, 52, 118, 144, 145],
                        backgroundColor: '#EF4444',
                    },
                    {
                        label: 'Questions écrites déposées',
                        data: [2003, 65, 2308, 3503, 5239, 3759],
                        backgroundColor: '#F59E0B',
                    },
                    {
                        label: 'Questions d\'actualité déposées',
                        data: [165, 0, 245, 270, 291, 205],
                        backgroundColor: '#10B981',
                    },
                    {
                        label: 'Questions urgentes déposées',
                        data: [30, 0, 70, 98, 56, 51],
                        backgroundColor: '#3B82F6',
                    },
                    {
                        label: 'Propositions de résolution déposées',
                        data: [14, 0, 17, 43, 20, 5],
                        backgroundColor: '#8B5CF6',
                    },
                ]
            },
            options: {
                maintainAspectRatio: true
            }
        }
    }
}
</script>