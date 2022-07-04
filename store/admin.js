export const state = () => ({
    popup: false,
    users: [],
    edit: '',
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
        if (!state.popup) {
            state.edit = ''
        }
    },
    changeUser(state, payload) {
        state.users = payload
    },
    changeEdit(state, payload) {
        state.edit = payload
    },
}

export const actions = {
    async getUsers(context) {
        const users = await this.$axios.$get('api/user/list')
        context.commit('changeUser', users)
    },
}
