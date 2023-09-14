<script setup lang="ts">
import { Ref, ref, onMounted } from "vue";
import { api, taxCalculate } from "../utils";
import Form from "./Form.vue";
import { verifyDate, addOneHour } from "../utils/";

defineProps<{ class: string }>()

const price = ref<number>();
const freight = ref<number>();
const dispatchFee = ref<boolean>(false);
const resultQuotation = ref<string>();
const message = ref<string>();
const isPRC = ref<boolean>(false);
const currency = ref<{ dolar: number }>({ dolar: 0 });

type CurrencyStorage = {
  dolar: number;
  timestamp: number;
}

const inputNumbers: Record<any, Ref<any>> = {
  price: price,
  freight: freight
}

onMounted(() => {
  // const json = JSON.parse(localStorage.getItem("currency") as any);
  // const currencyStorage: CurrencyStorage | null = json ? json : null;
  const currencyStorage = localStorage.getItem("currency");
  const storageData: CurrencyStorage = JSON.parse(currencyStorage as any);
  
  if (!currencyStorage || verifyDate(storageData.timestamp)) {
    api
      .then((res) => res.json())
      .then((res) => {
        const dolar = res.USDBRL.ask;
        const expiresIn = addOneHour(new Date()).getTime();
        localStorage.setItem("currency", JSON.stringify({ dolar: dolar, timestamp: expiresIn } as CurrencyStorage));
        currency.value.dolar = dolar;
      })
      .catch((error) => console.error(error));

    return;
  }

  currency.value.dolar = storageData.dolar;
});

const handleCheckDispatch = () => {
  dispatchFee.value = !dispatchFee.value;
  calculator();
};

const handleCheckPRC = () => {
  isPRC.value = !isPRC.value;
  calculator();
}

const calculator = async () => {
  if (isNaN(price.value as number)) {
    resultQuotation.value = "Valor inválido";
    return;
  }

  const limit = 1000000000000;

  for (const input in inputNumbers) {
    if (inputNumbers[input].value < 0) {
      inputNumbers[input].value = null;
      return;
    }
  }

  if (price.value && freight.value && (price.value + freight.value) > limit) {
    return;
  }

  const result = taxCalculate(price.value as number, freight.value, dispatchFee.value, isPRC.value, currency.value.dolar);

  if (result instanceof Error) {
    message.value = result.message;
    return;
  }

  resultQuotation.value = result;
}

</script>

<template>
  <div :class="$props.class">
    <Form
      class="my-10 flex flex-col justify-center items-center w-[20rem] h-[32rem] sm:w-[24rem] md:w-[28rem] bg-[#f3f3f3] border-[#dedddd] border-[1px] border-solid rounded-[10px]">
      <div class="flex flex-col items-center">
        <div class="flex flex-col">
          <label class="" for="buy">Valor da compra em US$
          </label>
          <input class="w-72 h-10 rounded-[6px] pl-2 mt-1 focus:outline focus:outline-2 focus:outline-[#bdb7b7]" id="buy"
            placeholder="0,00" type="number" v-model="price" @input="calculator">
        </div>
        <div class="flex flex-col mt-5">
          <label class="" for="freight">Valor do frete em US$
          </label>
          <input class="w-72 h-10 rounded-[6px] pl-2 mt-1 focus:outline focus:outline-2 focus:outline-[#bdb7b7]"
            id="freight" placeholder="0,00" type="number" v-model="freight" @input="calculator"
            :readonly="(price as number) > 0 ? false : true">
        </div>
        <div class="flex flex-col items-center">
          <div class="mt-5 flex items-center">
            <input class="w-4 h-4 cursor-pointer" type="checkbox" id="dispatchFee" v-model="dispatchFee"
              @input="handleCheckDispatch" :disabled="(price as number) > 0 ? false : true">
            <label class="pl-2 w-[250px] h-[50px] cursor-pointer" for="dispatchFee">Incluir taxa de despacho dos Correios
              (R$ 15,00)
            </label>
          </div>
          <div class="mt-5 flex items-center">
            <input class="w-4 h-4 cursor-pointer" type="checkbox" id="is-prc" v-model="isPRC" @input="handleCheckPRC"
              :disabled="(price as number) > 0 ? false : true">
            <label class="pl-2 w-[250px] h-[50px] cursor-pointer" for="is-prc">Empresa participante do Programa Remessa
              Conforme
            </label>
          </div>
        </div>
        <div class="flex flex-col items-center mt-8 w-72" v-if="price">
          <label class="text-center" for="amount-usd" v-if="resultQuotation">Total a pagar
          </label>
          <div class="flex flex-row justify-around w-full mt-4">
            <h3 class="bg-[#fefefe] p-2 rounded-[5px] border-[#dedddd] border-[1px] border-solid" id="amount-usd"
              v-if="resultQuotation">US$ {{ resultQuotation }}
            </h3>
            <h3 class="bg-[#fefefe] p-2 rounded-[5px] border-[#dedddd] border-[1px] border-solid" id="amount-brl"
              v-if="resultQuotation">R$ {{ (parseInt(resultQuotation) * currency.dolar).toFixed(2).replace(".", ",") }}
            </h3>
          </div>
          <p class="mt-8 bg-[#fefefe] w-[100%] text-center rounded-[5px]" v-if="message">{{ message }}
          </p>
        </div>
      </div>
      <!-- <div>
        <label
        >Dolar
        </label>
        <h4>
          R$ {{ parseFloat(currency.dolar as any).toFixed(2).replace(".", ",") }}
        </h4>
      </div> -->
    </Form>
  </div>
</template>

<style scoped></style>