<script setup lang="ts">

defineProps<{ class: string }>();

</script>

<template>
  <div
    :class="$props.class"
  >
    <slot></slot>
  </div>
</template>

<style scoped></style>
