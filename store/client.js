export const state = () => ({
    data: null,
})

export const getters = {
    getClient(state) {
        return state.data
    },
}

export const mutations = {
    changeClient(state, payload) {
        state.data = payload
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
