<template>
    <div>
        <header id="header" class="p-8 text-white text-center">
            <Navbar />
            <!--  -->
            <h3 class="mt-24 mb-4 text-4xl font-bold">Área do Gestor</h3>
            <!--  -->
            <p v-if="$auth.user.store_id">
                {{ store.name }} - CNPJ:
                {{ store.cnpj | VMask('##.###.###/####-##') }}
            </p>
            <!--  -->
            <div class="flex items-center justify-center space-x-4">
                <button
                    class="bg-blue-600 text-white h-12 w-64 rounded-lg mt-5 text-base button"
                    @click.prevent="registerUser()"
                >
                    Cadastrar Lojistas
                </button>
                <nuxt-link
                    class="bg-blue-600 text-white h-12 w-64 rounded-lg mt-5 text-base button pt-3"
                    to="/relatorios"
                >
                    Relatórios
                </nuxt-link>
            </div>
            <!--  -->
        </header>

        <AdminPopup />

        <Nuxt />
    </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
export default {
    name: 'LayoutEmpresa',

    data: () => ({
        store: {},
    }),

    created() {
        this.getStore()
    },

    methods: {
        ...mapMutations({
            changePopup: 'admin/changePopup',
            changeEdit: 'admin/changeEdit',
        }),
        ...mapActions({
            getUsers: 'admin/getUsers',
        }),

        async getStore() {
            this.store = await this.$axios.$get('/api/store/info')
        },

        registerUser() {
            this.changePopup()
            this.changeEdit()
        },
    },
}
</script>
