<template>
    <div>
        <!--  -->
        <header id="header" class="p-8 text-white text-center">
            <!--  -->
            <h3 class="mt-24 mb-4 text-4xl font-bold">Área da Empresa</h3>
            <!--  -->
            <p>
                {{ $auth.user.store.name }} | CNPJ: {{ $auth.user.store.cnpj }}
            </p>
            <!--  -->
            <div class="flex items-center justify-center">
                <button
                    class="bg-blue-600 text-white h-12 w-64 rounded-lg mt-5 text-base button"
                    @click.prevent="changePopup()"
                >
                    Cadastrar Usuários
                </button>
            </div>
            <!--  -->
        </header>

        <AdminPopup />

        <h3 class="text-3xl font-bold p-16 pb-6">Lista de Usuários</h3>
        <div class="container mx-auto pb-10 space-y-8">
            <div v-for="(u, i) in users" :key="i" :users="u" class="flex">
                <h3 class="w-10/12 p-3 bg-blue-200 text-3xl text-gray-800">
                    {{ u.name }}
                </h3>
                <div class="w-2/12 p-3 space-x-10 bg-white flex justify-center">
                    <button @click.prevent="editUser(u)">
                        <img :src="require('@/assets/img/editar.png')" alt="" />
                    </button>
                    <button @click.prevent="deleteUser(u.id)">
                        <img
                            :src="require('@/assets/img/excluir.png')"
                            alt=""
                        />
                    </button>
                </div>
            </div>
        </div>
        <!--  -->
    </div>
</template>
<script>
import { mapMutations, mapActions } from 'vuex'
export default {
    name: 'PageareaEmpresa',

    layout: 'empresa',

    computed: {
        popup() {
            return this.$store.state.admin.popup
        },
        users() {
            return this.$store.state.admin.users
        },
    },

    created() {
        this.getUsers()
    },

    methods: {
        ...mapMutations({
            changePopup: 'admin/changePopup',
        }),
        ...mapActions({
            getUsers: 'admin/getUsers',
        }),
        async deleteUser(id) {
            await this.$axios.$delete(`api/user/list/${id}`).then(() => {
                this.getUsers()
            })
        },
        editUser(user) {
            this.changePopup()
        },
    },
}
</script>
