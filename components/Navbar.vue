<template>
    <nav class="text-white flex justify-end space-x-4">
        <span>
            Olá <b>{{ $auth.user.name }}</b>
        </span>
        <NuxtLink v-if="$auth.user.level === 1" to="/admin">
            Área do Gestor
        </NuxtLink>
        <NuxtLink to="/painel"> Criar Voucher </NuxtLink>
        <button class="text-yellow-500" @click.prevent="logout()">Sair</button>
    </nav>
</template>

<script>
export default {
    name: 'ComNav',
    methods: {
        logout() {
            this.$auth.logout()
            this.$router.push('/')
        },
    },
}
</script>
