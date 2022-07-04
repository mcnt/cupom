<template>
    <div>
        <h3 class="text-center text-3xl my-4">Relatório</h3>

        <div class="container mx-auto">
            <button
                class="bg-blue-500 text-white px-2 mb-2 rounded"
                @click.prevent="downloadFile()"
            >
                Baixar CSV 
            </button>

            <div class="text-blue-500 font-bold">Total Créditos ICMS - R$  {{ parseFloat(total_credit_icms).toFixed(2).toString().replace(".", ",") }}</div>

            <table class="w-full table-auto border-2">
                <thead>
                    <tr>
                        <th class="text-center text-gray-700">Vendedor</th>
                        <th class="text-center text-gray-700">Cliente</th>
                        <th class="text-center text-gray-700">Produto</th>
                        <th class="text-center text-gray-700">Nota Fiscal</th>
                        <th class="text-center text-gray-700">Valor do produto</th>
                        <th class="text-center text-gray-700">Desconto</th>
                        <th class="text-center text-gray-700">Crédito de ICMS</th>
                    </tr>
                </thead>
                <tbody>                    
                    <tr v-for="(r, i) in reports" :key="i" class="bg-blue-200">
                        <td class="border-2 text-center p-2">{{ r.user.name }} / {{ r.user.cpf | VMask('###.###.###-##') }}</td>
                        <td class="border-2 text-center p-2">{{ r.client.name}} / {{ r.client.cpf | VMask('###.###.###-##') }}</td>
                        <td class="border-2 text-center p-2">{{ r.product.type }}</td>
                        <td class="border-2 text-center p-2">{{ r.note_number }}</td>
                        <td class="border-2 text-center p-2">R$ {{ parseFloat(r.value).toFixed(2).toString().replace(".", ",") }}</td>   
                        <td class="border-2 text-center p-2">R$ {{ parseFloat(r.discount).toFixed(2).toString().replace(".", ",") }}</td>
                        <td class="border-2 text-center p-2">R$ {{ parseFloat(r.credit_icms).toFixed(2).toString().replace(".", ",") }} </td>
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
        total_credit_icms: 0
    }),
    created() {
        this.getReports()
    },
    methods: {
        async getReports() {
            this.reports = await this.$axios.$get('api/ticket/list')
            for (let i = 0; i < this.reports.length; i++) {
                this.total_credit_icms += this.reports[i].credit_icms              
            }
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
