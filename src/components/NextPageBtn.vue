<template>
  <button
    type="button"
    class="btn btn-continue"
    :disabled="disabled"
    :class="{ 'btn-active': !disabled }"
    @click="onClick"
  >
    CONTINUE
  </button>
</template>

<script setup>
defineProps({
  disabled: { type: Boolean, default: true },
});

const emit = defineEmits(["onClick"]);

const onClick = () => {
  emit("onClick");
};
</script>

<style scoped>
</style>