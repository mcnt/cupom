<template>
    <div>
        <!--  -->
        <header id="header" class="p-8 text-white text-center">
            <Navbar />
            <!--  -->
            <h3 class="mt-24 mb-4 text-4xl font-bold">
                Digite o número do CPF
            </h3>
            <!--  -->
            <div
                v-if="isValidCpf === false"
                class="flex items-center justify-center"
            >
                <h3 class="bg-red-500 text-white py-4 px-12 mb-2">
                    CPF inválido
                </h3>
            </div>
            <!--  -->
            <div class="flex items-center justify-center">
                <form
                    class="w-96 bg-white flex border-0 shadow-lg rounded"
                    @submit.prevent="searchUser()"
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
                        :class="isValidCpf != true ? 'cursor-not-allowed' : ''"
                        :disabled="isValidCpf != true"
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
            <div v-if="user" class="text-center">
                <h1 class="text-5xl mt-6 font-bold">{{ user.cpf }}</h1>
                <h2 class="text-3xl">{{ user.name }}</h2>
                <p class="mt-6 text-xl">
                    <b>Saldo Disponível:</b> {{ user.balance | currency }} |
                    <b>Desconto Disponível:</b>
                    {{ user.discount | currency }}
                </p>
            </div>
        </header>
        <!--  -->
        <div v-if="user" class="container mx-auto">
            <div class="py-12">
                <h4 class="text-blue-500 text-center text-4xl font-bold mb-16">
                    Vouchers
                </h4>
                <div class="grid grid-cols-3 gap-14" @click="active = !active">
                    <Voucher v-for="(v, i) in vouchers" :key="i" :coupon="v" />
                </div>
                <!--  -->
                <div>
                    <vs-prompt
                        width="550px"
                        title="Criar Voucher"
                        :active.sync="active"
                    >
                        <form
                            class="text-black p-4 space-y-8"
                            @submit.prevent="setVoucher()"
                        >
                            <h2
                                class="text-3xl font-bold text-center text-blue-500"
                            >
                                Criar Voucher
                            </h2>
                            <div>
                                <label for="">Selecione o produto</label>
                                <select
                                    v-model="voucher.product"
                                    class="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                >
                                    <option value="" selected disabled>
                                        Lista de produtos
                                    </option>
                                    <option
                                        v-for="(p, i) in products"
                                        :key="i"
                                        :value="p"
                                    >
                                        {{ p }}
                                    </option>
                                </select>
                            </div>

                            <div>
                                <label for="">Insira o valor do produto</label>
                                <input
                                    v-model="voucher.price"
                                    v-money="money"
                                    type="text"
                                    class="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                />
                            </div>

                            <div class="flex justify-center">
                                <button
                                    class="bg-blue-600 text-white py-2 px-6 rounded w-56"
                                    type="submit"
                                >
                                    Gerar Voucher
                                </button>
                            </div>
                        </form> 
                    </vs-prompt>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { cpf } from 'cpf-cnpj-validator'
import { VMoney } from 'v-money'

export default {
    name: 'PagePanel',
    directives: { money: VMoney },
    layout: 'panel',
    data: () => ({
        active: false,
        isValidCpf: null,
        cpf: '',
        user: null,
        vouchers: [{}, {}, {}, {}, {}],
        products: [
            'Fogão',
            'Tv',
            'Geladeira',
            'Microondas',
            'Maquina de Lavar/Tanquinho',
        ],
        voucher: {
            product: '',
            price: '',
            icon: '',
        },
        money: {
            decimal: ',',
            thousands: '.',
            prefix: 'R$ ',
            suffix: '',
            precision: 2,
            masked: false,
        },
    }),
    created() {
        this.searchUser()
    },
    methods: {
        checkCpf(value) {
            this.isValidCpf = cpf.isValid(value)
        },
        //
        searchUser() {
            if (cpf.isValid(this.cpf)) {
                //
                this.user = {
                    cpf: this.cpf,
                    name: 'Fulano de Tal da Silva',
                    balance: 2500,
                    discount: 625,
                }
                //
                this.cpf = ''
            }
        },
        //
        setVoucher() {
            for (let index = 0; index < this.vouchers.length; index++) {
                const element = this.vouchers[index]
                if (Object.keys(element).length === 0) {
                    const select = this.voucher
                    select.icon = 'product'
                    this.vouchers[index] = select
                    //
                    this.voucher = {
                        product: '',
                        price: '',
                        icon: '',
                    }
                    //
                    this.user.balance = this.user.balance - this.voucher.price
                    //
                    this.active = false
                    break
                }
            }
        },
    },
}
</script>
