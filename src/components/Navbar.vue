<script setup lang="ts">

defineProps<{ class: string }>();

</script>

<template>
  <header>
    <nav
      :class="$props.class"
    >
      <h1
        class="cursor-pointer text-[25px] font-bold text-[#403146] text-justify tracking-wide"
      >Calculadora de tributos sobre compras internacionais
      </h1>
    </nav>
  </header>
</template>

<style scoped></style>