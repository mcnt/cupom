<template>
    <header id="header" class="p-8 text-white text-center">
        <!--  -->
        <Navbar />
        <!--  -->
        <h3 class="mt-24 mb-4 text-4xl font-bold">Digite o número do CPF</h3>
        <!--  -->
        <div v-if="valid === false" class="flex items-center justify-center">
            <h3 class="bg-red-500 text-white py-4 px-12 mb-2">CPF inválido</h3>
        </div>
        <!--  -->
        <div class="flex items-center justify-center">
            <form
                class="w-96 bg-white flex border-0 shadow-lg rounded"
                @submit.prevent="getClient(cpf)"
            >
                <input
                    v-model="cpf"
                    v-mask="'###.###.###-##'"
                    type="text"
                    class="px-8 py-4 w-full rounded-l focus:border-0 active:border-0 text-blue-500"
                    placeholder="Insira o número de CPF"
                    @blur="checkCpf(cpf)"
                />

                <button
                    class="flex items-center justify-center px-4 border-l bg-blue-500 rounded-r"
                    type="submit"
                    :class="valid != true ? 'cursor-not-allowed' : ''"
                    :disabled="valid != true"
                >
                    <svg
                        class="w-6 h-6 text-white"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path
                            d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
                        />
                    </svg>
                </button>
            </form>
        </div>
        <!--  -->
        <div v-if="client" class="text-center">
            <h1 class="text-5xl mt-6 font-bold">{{ client.cpf }}</h1>
            <h2 class="text-3xl">{{ client.name }}</h2>
            <p class="mt-6 text-xl">
                <b>Saldo Disponível:</b> {{ client.balance | currency }} |
                <b>Desconto Disponível:</b>
                {{ (client.balance * 0.25) | currency }}
            </p>
        </div>
        <!--  -->
    </header>
</template>

<script>
import { cpf } from 'cpf-cnpj-validator'
import { mapActions } from 'vuex'
export default {
    name: 'ClientHeader',
    data: () => ({
        cpf: '02060888093',
        valid: null,
    }),
    computed: {
        client() {
            return this.$store.state.client.data
        },
    },
    methods: {
        checkCpf(value) {
            this.valid = cpf.isValid(value)
        },
        ...mapActions({
            getClient: 'client/getClient',
        }),
    },
}
</script>
