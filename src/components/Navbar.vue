<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { addOneHour, api, verifyDate } from '../utils';

const dolar = ref<number>();

defineProps<{ class: string }>();

type CurrencyStorage = {
  dolar: number;
  timestamp: number;
}

onMounted(() => {
  const storage: CurrencyStorage | null = JSON.parse(localStorage.getItem("currency") as any);

  if (!storage || verifyDate(storage.timestamp)) {
    api
      .then((res) => res.json())
      .then((res) => {
        const usd = res.USDBRL.ask;
        const expiresIn = addOneHour(new Date()).getTime();
        localStorage.setItem("currency", JSON.stringify({ dolar: usd, timestamp: expiresIn } as CurrencyStorage));
        dolar.value = usd;
      })
      .catch((error) => console.error(error));
    
    return;
  }

  dolar.value = storage.dolar;
});

</script>

<template>
  <header>
    <nav
      :class="$props.class"
    >
      <h1
        class="cursor-pointer lg:text-xl xl:text-2xl font-bold text-[#403146] text-justify tracking-wid pr-5 sm:pr-0"
      >
        <i class="hidden md:block not-italic">Calculadora de tributos sobre compras internacionais</i>
        <i class="md:hidden not-italic">Calculadora de tributos...</i>
      </h1>
      <div
        class="bg-white lg:py-1 xl:py-3 px-6 rounded-[10px] border-[#dedddd] border-[1px] border-solid"
      >
        <label
        >Dolar
        </label>
        <h3 
          class="md:text-xl lg:text-2xl xl:text-3xl"
          v-if="dolar"
        >R$ {{ parseFloat(dolar as any).toFixed(2).replace(".", ",") }}
        </h3>
      </div>
    </nav>
  </header>
</template>

<style scoped></style>