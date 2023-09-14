<script setup lang="ts">

defineProps<{ class: string }>();

</script>

<template>
  <footer
    :class="$props.class"
  >
    <p
      class="text-lg text-center"
    >&copy; {{ new Date().getUTCFullYear() }}
    </p>
  </footer>
</template>

<style scoped></style>