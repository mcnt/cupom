<template>
    <div>
        <vs-prompt
            width="550px"
            title="Criar Voucher"
            :active.sync="popupFiscal"
        >
            <div
                class="flex justify-end cursor-pointer"
                @click.prevent="changePopupFiscal()"
            >
                <img :src="require(`@/assets/img/sair.png`)" />
            </div>
            <form
                class="text-black p-4 space-y-8"
                @submit.prevent="setFiscal()"
            >
                <h2 class="text-3xl font-bold text-center text-blue-500">
                    Atribuir nota fiscal
                </h2>

                <div>
                    <label for="">Insira o número da nota</label>
                    <input
                        v-model="fiscal"
                        type="text"
                        class="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    />
                </div>

                <div class="flex justify-center">
                    <button
                        class="bg-blue-600 text-white py-2 px-6 rounded w-56"
                        type="submit"
                    >
                        Atribuir
                    </button>
                </div>
            </form>
        </vs-prompt>
    </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
export default {
    name: 'PopupFiscal',

    computed: {
        popupFiscal() {
            return this.$store.state.client.popupFiscal
        },
    },

    methods: {
        async setFiscal() {
            await this.$axios
                .$post('fiscal_rota', {
                    fiscal: this.fiscal,
                })
                .then(() => {
                    this.getClient()
                    this.changePopupFiscal()
                })
        },
        ...mapMutations({
            changePopupFiscal: 'client/changePopupFiscal',
        }),

        ...mapActions({
            getClient: 'client/getClient',
        }),
    },
}
</script>
