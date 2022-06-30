<template>
    <div class="flex">
        <div
            class="p-8 rounded-l-xl flex cursor-pointer"
            :class="coupon.product_id ? 'bg-blue-600' : 'bg-gray-500'"
            @click.prevent="changePopupVoucher()"
        >
            <img
                :src="
                    require(`@/assets/img/${
                        coupon.product_id ? coupon.product_id : 'plus'
                    }.png`)
                "
                class="w-20"
            />
        </div>
        <div class="p-3 border border-gray-500 w-full rounded-r-xl">

            <div v-if="Object.keys(coupon).length !== 0">
                <div @click.prevent="deleteVoucher(coupon.id)">
                 <img :src="require(`@/assets/img/excluir.png`)" />
                </div>
                <div>
                    <h3>{{coupon.user.store.name}}}</h3>
                    <h3>Produto: R${{coupon.value}}</h3>
                    <h1 class="text-2xl bg-color">R${{ coupon.discount }} de desconto</h1>
                </div>
                <div v-if="coupon.note_number">
                    Nota fiscal #{{ coupon.note_number }}
                </div>
                <button
                    v-else
                    class="bg-blue-500 rounded text-white px-2 py-1 mt-5"
                    @click="changePopupFiscal()"
                >
                    Atribuir Nota
                </button>
            </div>
        </div>
        <ClientPopupFiscal v-if="coupon" :id="coupon.id" />
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    name: 'ComVoucher',
    props: {
        coupon: {
            type: Object,
            default: () => {},
        },
    },
    data: () => ({
        // fiscal: false,
    }),
    methods: {
        ...mapMutations({
            changePopupVoucher: 'client/changePopupVoucher',
            changePopupFiscal: 'client/changePopupFiscal',
        }),
        async deleteVoucher(id) {
            this.$vs.loading()
            await this.$axios
                .$delete(`api/ticket/delete/${id}`)
                .then(() => {
                    this.deleteVoucher()
                })
                .finally(() => {
                    this.$vs.loading.close()
                })
        },
    },
}
</script>
