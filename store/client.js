export const state = () => ({
    data: null,
    popupVoucher: false,
    popupFiscal: false,
    ticketFiscal: '',
})

export const getters = {
    getClient(state) {
        return state.data
    },
    getPopupVoucher(state) {
        return state.popupVoucher
    },
    getPopupFiscal(state) {
        return state.popupFiscal
    },
}

export const mutations = {
    changeClient(state, payload) {
        state.data = payload
    },
    changeTicketFiscal(state, payload) {
        state.ticketFiscal = payload
    },
    changePopupVoucher(state) {
        state.popupVoucher = !state.popupVoucher
    },
    changePopupFiscal(state) {
        state.popupFiscal = !state.popupFiscal
    },
}

export const actions = {
    async getClient(context, cpf) {
        const client = await this.$axios.$get(
            `api/client/search?cpf=${cpf.replace(/[^0-9]/g, '')}`
        )

        context.commit('changeClient', client)
    },
}
