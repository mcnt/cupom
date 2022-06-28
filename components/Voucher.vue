<template>
    <div class="flex">
        <div
            class="p-8 rounded-l-xl flex cursor-pointer"
            :class="coupon.icon ? 'bg-blue-600' : 'bg-gray-500'"
        >
            <img
                :src="
                    require(`@/assets/img/${
                        coupon.icon ? coupon.icon : 'plus'
                    }.png`)
                "
                class="w-20"
            />
        </div>
        <div class="p-3 border border-gray-500 w-full rounded-r-xl">
            <div v-if="Object.keys(coupon).length !== 0">
                <div>
                    {{ coupon }}
                </div>
                <div v-if="fiscal">Nota fiscal #00001</div>
                <button
                    v-else
                    class="bg-blue-500 rounded text-white px-2 py-1 mt-5"
                    @click="generateFiscal()"
                >
                    Atribuir Nota
                </button>
            </div>
        </div>
    </div>
</template> 

<script>
export default {
    name: 'ComVoucher',
    props: {
        coupon: {
            type: Object,
            default: () => {},
        },
    },
    data: () => ({
        fiscal: false,
    }),
    methods: {
        generateFiscal() {
            this.fiscal = true
        },
    },
}
</script>
