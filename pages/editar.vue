<template>
    <div>
        <!--  -->
        <h3 class="text-3xl font-bold p-16 pb-6">Editar Usuário</h3>
        <div class="container mx-auto pb-10 space-y-8">
            <form @submit.prevent="editUser()">
                <div>
                    <div>
                        <label class="pl-5 pb-4 font-medium" for="">
                            Nome do Usuário
                        </label>
                        <input
                            v-model="user.name"
                            type="text"
                            class="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label class="pl-5 pb-4 font-medium" for="">
                            Email
                        </label>
                        <input
                            v-model="user.email"
                            type="email"
                            class="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label class="pl-5 pb-4 font-medium" for="">CPF:</label>
                        <input
                            v-model="user.cpf"
                            v-mask="'###.###.###-##'"
                            type="text"
                            class="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        />
                    </div>
                    <div class="mb-4">
                        <label class="pl-5 pb-4 font-medium" for="password">
                            Senha
                        </label>
                        <VuePassword
                            v-model="user.password"
                            :disable-strength="true"
                            type="password"
                            class="rounded"
                        />
                    </div>
                </div>
                <div class="flex justify-center">
                    <button
                        class="bg-blue-600 text-white py-2 px-6 rounded w-56"
                        type="submit"
                    >
                        Editar Lojista
                    </button>
                </div>
            </form>
        </div>
        <!--  -->
    </div>
</template>
<script>
import VuePassword from 'vue-password'
export default {
    name: 'PageEdit',

    components: {
        VuePassword,
    },

    layout: 'empresa',

    data: () => ({
        user: {
            name: '',
            email: '',
            cpf: '',
            password: '',
        },
    }),

    created() {
        this.getUser()
    },

    methods: {
        async getUser() {
            const users = await this.$axios.$get('api/user/list')

            this.user = users.find(
                (e) => e.id === parseInt(this.$route.query.id)
            )
        },

        async editUser() {
            this.$vs.loading()

            this.user.user_id = this.user.id

            await this.$axios
                .$post(`api/user/edit`, this.user)
                .then((data) => {
                    this.$vs.notify({
                        title: 'Sucesso',
                        text: data.message,
                        color: 'green',
                        position: 'top-center',
                    })
                    this.$router.push('admin')
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
