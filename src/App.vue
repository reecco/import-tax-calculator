<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import Calculate from "./components/Calculate.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <div
    class="flex flex-col justify-center h-[100vh]"
  >
    <Navbar 
      class="p-[30px] bg-[#f3f3f3] border-[#dedddd] border-x-0 border-t-0 border-b-[1px] border-solid" 
    />
    <Calculate 
      class="h-full flex justify-center items-center"
    />
    <Footer 
      class="h-[10%] flex flex-col justify-center items-center"
    />
  </div>
</template>

<style scoped></style>
