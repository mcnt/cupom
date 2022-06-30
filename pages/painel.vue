<template>
    <div>
        <ClientHeader />
        <div v-if="client && $auth.user.level == 2" class="container mx-auto">
            <div class="py-12">
                <h4 class="text-blue-500 text-center text-4xl font-bold mb-16">
                    Vouchers
                </h4>

                <div class="grid grid-cols-3 gap-14">
                    <Voucher
                        v-for="(v, i) in 5 - client.ticket.length"
                        :key="i"
                        :coupon="{}"
                    />
                    <Voucher
                        v-for="(v, i) in client.ticket"
                        :key="i"
                        :coupon="v"
                    />
                </div>

                <ClientPopupVoucher />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PagePanel',
    layout: 'panel',
    computed: {
        client() {
            return this.$store.state.client.data
        },
    },
}
</script>
