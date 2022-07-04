<template>
    <div>
        <vs-prompt title="Teste" :active.sync="popup">
            <form class="text-black p-4 space-y-8" @submit.prevent="api()">
                <div
                    class="flex justify-end cursor-pointer"
                    @click.prevent="changePopup()"
                >
                    <img :src="require(`@/assets/img/sair.png`)" />
                </div>
                <h2 class="text-3xl font-bold text-center text-blue-500">
                    Cadastrar Lojista
                </h2>
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
                        Cadastrar no sistema
                    </button>
                </div>
            </form>
        </vs-prompt>
    </div>
</template>

<script>
import VuePassword from 'vue-password'
import { mapMutations, mapActions } from 'vuex'

export default {
    name: 'AdminPopup',

    components: {
        VuePassword,
    },

    data: () => ({
        setEdit: false,
        user: {
            name: '',
            cpf: '',
            email: '',
            password: '',
        },
    }),

    computed: {
        popup() {
            return this.$store.state.admin.popup
        },
    },

    methods: {
        ...mapMutations({
            changePopup: 'admin/changePopup',
        }),
        ...mapActions({
            getUsers: 'admin/getUsers',
        }),
        //
        async api() {
            //
            this.user.cpf = this.user.cpf.replace(/[^0-9]/g, '')

            //
            await this.$axios
                .$post(
                    `/api/user/create`,
                    this.userEdit ?? this.user
                )
                .then(() => {
                    this.changePopup()
                    this.getUsers()
                    this.user = {
                        name: '',
                        cpf: '',
                        email: '',
                        password: '',
                    }
                })
                .catch(() => {})
        },
    },
}
</script>
