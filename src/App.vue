<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import Calculate from "./components/Calculate.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <div
    class="flex flex-col justify-center min-h-full"
  >
    <Navbar 
      class="flex justify-between items-center py-[5px] xl:py-[10px] px-[60px] bg-[#f3f3f3] border-[#dedddd] border-x-0 border-t-0 border-b-[1px] border-solid" 
    />
    <Calculate 
      class="flex justify-center items-center flex-1 min-h-full p-[20px]"
    />
    <Footer 
      class="flex-shrink-0 left-0 bottom-0 w-full"
    />
  </div>
</template>

<style scoped></style>
