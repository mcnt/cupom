export const state = () => ({
    popup: false,
    users: [],
})

export const getters = {
    getPopup(state) {
        return state.popup
    },
    getUsers(state) {
        return state.users
    },
}

export const mutations = {
    changePopup(state) {
        state.popup = !state.popup
    },
    changeUser(state, payload) {
        state.users = payload
    },
}

export const actions = {
    async getUsers(context) {
        const users = await this.$axios.$get('api/user/list')
        context.commit('changeUser', users)
    },
}
