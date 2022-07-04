<template>
    <div class="flex">
        <div
            class="w-1/3 rounded-l-xl cursor-pointer"
            :class="coupon.product_id ? 'bg-blue-600' : 'bg-gray-500'"
        >
            <img
                class="w-14 h-14 m-8"
                :src="
                    require(`@/assets/img/${
                        coupon.product_id ? coupon.product_id : 'plus'
                    }.png`)
                "
            />
        </div>
        <div class="p-3 border border-gray-500 w-full rounded-r-xl">
            <div v-if="Object.keys(coupon).length !== 0" class="relative">
                <div
                    v-if="!coupon.note_number"
                    class="absolute top-0 right-0"
                    @click.prevent="deleteVoucher(coupon.id)"
                >
                    <img :src="require(`@/assets/img/excluir.png`)" />
                </div>
                <h3>{{ coupon.user.store.name }}</h3>
                <h3>Produto: R${{ coupon.value }}</h3>
                <h1 class="text-2xl bg-color">
                    R${{ coupon.discount }} de desconto
                </h1>
                <div v-if="coupon.note_number">
                    Nota fiscal #{{ coupon.note_number }}
                </div>
                <button
                    v-else
                    class="bg-blue-500 rounded text-white px-2 py-1"
                    @click="openFiscal(coupon.id)"
                >
                    Atribuir Nota
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
export default {
    name: 'ComVoucher',
    props: {
        coupon: {
            type: Object,
            default: () => {},
        },
    },
    data: () => ({}),
    computed: {
        client() {
            return this.$store.state.client.data
        },
    },
    methods: {
        ...mapMutations({
            changePopupVoucher: 'client/changePopupVoucher',
            changePopupFiscal: 'client/changePopupFiscal',
            changeTicketFiscal: 'client/changeTicketFiscal',
        }),

        ...mapActions({
            getClient: 'client/getClient',
        }),

        openFiscal(id) {
            this.changeTicketFiscal(id)
            this.changePopupFiscal()
        },

        async deleteVoucher(id) {
            this.$vs.loading()
            await this.$axios
                .$delete(`api/ticket/delete/${id}`)
                .then(() => {
                    this.getClient(this.client.cpf)
                })
                .catch((error) => {
                    this.$vs.notify({
                        title: 'Error',
                        text: error.response.data.error,
                        color: 'danger',
                        position: 'top-center',
                    })
                })
                .finally(() => {
                    this.$vs.loading.close()
                })
        },
    },
}
</script>
