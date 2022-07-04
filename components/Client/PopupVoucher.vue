<template>
    <div>
        <vs-prompt
            width="550px"
            title="Criar Voucher"
            :active.sync="popupVoucher"
        >
            <div
                class="flex justify-end cursor-pointer"
                @click.prevent="changePopupVoucher()"
            >
                <img :src="require(`@/assets/img/sair.png`)" />
            </div>
            <form
                class="text-black p-4 space-y-8"
                @submit.prevent="setVoucher()"
            >
                <h2 class="text-3xl font-bold text-center text-blue-500">
                    Criar Voucher
                </h2>
                <div>
                    <label for="">Selecione o produto</label>
                    <select
                        v-model="voucher.product_id"
                        class="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    >
                        <option value="" selected disabled>
                            Lista de produtos
                        </option>
                        <option
                            v-for="(p, i) in products"
                            :key="i"
                            :value="p.id"
                        >
                            {{ p.type }}
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
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import { VMoney } from 'v-money'
export default {
    name: 'PopupVoucher',

    directives: { money: VMoney },

    data: () => ({
        products: [],
        voucher: {
            product_id: '',
            price: '',
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

    computed: {
        client() {
            return this.$store.state.client.data
        },
        popupVoucher() {
            return this.$store.state.client.popupVoucher
        },
    },

    mounted() {
        this.getProducts()
    },

    methods: {
        ...mapMutations({
            changePopupVoucher: 'client/changePopupVoucher',
        }),

        ...mapActions({
            getClient: 'client/getClient',
        }),

        async getProducts() {
            this.$vs.loading()
            this.products = await this.$axios
                .$get('api/product/list')
                .finally(() => {
                    this.$vs.loading.close()
                })
        },
        async setVoucher() {
            await this.$axios
                .$post('api/ticket/create', {
                    client_id: this.client.id,
                    store_id: this.$auth.user.store_id,
                    product_id: this.voucher.product_id,
                    value: this.voucher.price
                        .replace('R$ ', '')
                        .replace('.', '')
                        .replace(',', '.'),
                })
                .then(() => {
                    this.getClient(this.client.cpf)
                    this.changePopupVoucher()
                })
                .catch((error) => {
                    this.changePopupVoucher()
                    this.$vs.notify({
                        title: 'Error',
                        text: error.response.data.error,
                        color: 'danger',
                        position: 'top-center',
                    })
                })
        },
    },
}
</script>
