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
                        <label class="pl-5 pb-4" for="cpf">CPF</label>
                        <input
                            v-model="form.cpf"
                            v-mask="'###.###.###-##'"
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
            cpf: '',
            password: '',
        },
    }),

    methods: {
        login() {
            this.$router.push('/painel')
        },
    },
}
</script>
