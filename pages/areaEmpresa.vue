<template>
    <div>
        <!--  -->
        <header id="header" class="p-8 text-white text-center">
            <!--  -->
                <h3 class="mt-24 mb-4 text-4xl font-bold">
                    Área da Empresa
                </h3>
                <!--  -->
                    <p> [NOME DA EMPRESA] | CNPJ: 00.000.000/0001-00</p>
                <!--  -->
                <div class="flex items-center justify-center">
                    <div>
                       
                        <button
                            class="bg-blue-600 text-white h-12 w-64 rounded-lg mt-5 text-base button"
                            type="submit"
    
                                    
                        >
                            Cadastrar Usuários
                        </button>
                    </div>
                </div>
            <!--  -->
        </header>

        <div>
            <vs-prompt
                width="550px"
                title="Criar Voucher"
                :active.sync="active"
            >
                <form
                    class="text-black p-4 space-y-8"
                    @submit.prevent="setVoucher()"
                >
                    <h2
                        class="text-3xl font-bold text-center text-blue-500"
                    >
                        Criar Voucher
                    </h2>
                    <div>
                        <label for="">Selecione o produto</label>
                        
                     </div>

                    <div>
                        <label for="">Insira o valor do produto</label>
                        <input
                            type="text"
                            class="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        />
                    </div>

                    <div class="flex justify-center">
                        <button
                            class="bg-blue-600 text-white py-2 px-6 rounded w-56"
                            type="submit"
                        >
                            Gerar Voucher
                        </button>
                    </div>
                </form>
            </vs-prompt>
        </div>
        <h3 class="text-3xl font-bold p-16">Lista de Usuários</h3>
        <!--  -->
       
    </div>
</template>
<script>
    export default {
    name: 'PageareaEmpresa',
    layout: 'empresa',
}
</script>