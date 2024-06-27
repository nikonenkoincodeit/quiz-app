<template>
  <button
    type="button"
    class="btn btn-continue"
    :disabled="disabled"
    :class="{ 'btn-active': !disabled }"
    @click="onClick"
  >
    {{ $t("buttons.continue") }}
  </button>
</template>

<script setup>
defineProps({
  disabled: { type: Boolean, default: false },
});

const emit = defineEmits(["onClick"]);

const onClick = () => {
  emit("onClick");
};
</script>

<style scoped>
</style>