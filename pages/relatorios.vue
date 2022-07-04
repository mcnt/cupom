<template>
    <div>
        <h3 class="text-center text-3xl my-4">Relatórios</h3>

        {{ reports }}

        <div class="container mx-auto">
            <button
                class="bg-blue-500 text-white px-2 mb-2 rounded"
                @click.prevent="downloadFile()"
            >
                Baixar CSV
            </button>
            <table class="w-full table-auto border-2">
                <thead>
                    <tr>
                        <th class="text-center text-gray-700">Vendedor</th>
                        <th class="text-center text-gray-700">Cliente</th>
                        <th class="text-center text-gray-700">Produto</th>
                        <th class="text-center text-gray-700">
                            Valor do produto
                        </th>
                        <th class="text-center text-gray-700">Desconto</th>
                        <th class="text-center text-gray-700">
                            Crédito de ICMS
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(r, i) in reports" :key="i" class="bg-blue-200">
                        <td class="border-2 text-center p-2">
                            {{ r }}
                        </td>
                        <td class="border-2 text-center p-2">{{ r }}</td>
                        <td class="border-2 text-center p-2">{{ r }}</td>
                        <td class="border-2 text-center p-2">
                            {{ r }}
                        </td>
                        <td class="border-2 text-center p-2">{{ r }}</td>
                        <td class="border-2 text-center p-2">{{ r }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import exportFromJSON from 'export-from-json'
export default {
    name: 'AdminReports',
    layout: 'empresa',
    data: () => ({
        reports: [],
    }),
    created() {
        // this.getReports()
    },
    methods: {
        async getReports() {
            this.reports = await this.$axios.$get('api/ticket/list')
        },
        downloadFile() {
            const data = this.reports
            const fileName = 'relatorios'
            const exportType = exportFromJSON.types.csv
            if (data) exportFromJSON({ data, fileName, exportType })
        },
    },
}
</script>
