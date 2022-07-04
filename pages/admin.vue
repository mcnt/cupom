<template>
    <div>
        <!--  -->
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
            changeEdit: 'admin/changeEdit',
        }),
        ...mapActions({
            getUsers: 'admin/getUsers',
        }),
        async deleteUser(id) {
            this.$vs.loading()
            await this.$axios
                .$delete(`api/user/delete/${id}`)
                .then(() => {
                    this.getUsers()
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
        editUser(user) {
            // this.changeEdit(user)
            this.$router.push(`editar?id=${user.id}`)
        },
    },
}
</script>
