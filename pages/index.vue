<template>
    <div>
        <Logo />
        <div class="flex justify-center mt-12 p-4">
            <div
                class="sm:w-3/6 bg-white border shadow border-blue-500 py-12 px-20"
            >
                <h4 class="text-center text-3xl font-semibold">Login</h4>
                <form @submit.prevent="login()">
                    <!--  -->
                    <div class="mb-4">
                        <label class="pl-5 pb-4" for="login">CPF ou Email</label>
                        <input
                            v-model="form.login"
                            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-black focus:border-4"
                            type="text"
                        />
                    </div>
                    <!--  -->
                    <div class="mb-4">
                        <label class="pl-5 pb-4" for="password">Senha</label>
                        <VuePassword
                            v-model="form.password"
                            :disable-strength="true"
                            type="password"
                            class="rounded"
                        />
                    </div>
                    <!--  -->
                    <div class="flex justify-center">
                        <button
                            class="bg-blue-600 text-white h-12 w-64 rounded-lg mt-5"
                            type="submit"
                            @submit.prevent="login()"
                        >
                            Entrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import VuePassword from 'vue-password'

export default {
    name: 'IndexPage',
    components: {
        VuePassword,
    },
    data: () => ({
        show: false,
        form: {
            login: '',
            password: '123456',
        },
    }),

    methods: {
        async login() {
            await this.$auth
                .loginWith('api', {
                    data: {
                        login: this.form.login,
                        password: this.form.password,
                    },
                })
                .then(() => {
                    this.$router.push('/painel')
                })
                .catch(() => {})
        },
    },
}
</script>
