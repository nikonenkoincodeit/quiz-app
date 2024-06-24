<template>
  <div
    class="card"
    :class="[selected === text ? 'active' : '']"
    @click="onClick"
  >
    <div class="card-icon">
      <svg width="50" height="50" v-if="iconName">
        <use :href="icon + iconName"></use>
      </svg>
    </div>
    <p class="card-title">{{ text }}</p>
  </div>
</template>
<script setup>
import icon from "../assets/icons/sprite.svg";

const props = defineProps({
  selected: { type: String },
  iconName: { type: String },
  text: { type: String },
});

const emit = defineEmits(["updateSelection"]);

const onClick = () => {
  emit("updateSelection", props.text);
};
</script>

<style scoped>
.card-icon {
  border: 1px solid #d9d9d9;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 6px;
  padding: 20px 10px;
  margin-bottom: 5px;
}

.card-icon svg {
  fill: #ff443a;
}

.active .card-icon {
  background: #ff443a;
  border-color: #ff443a;
}

.active .card-icon svg {
  fill: #fff;
}

.card-title {
  text-align: center;
}

.card-title::first-letter {
  text-transform: uppercase;
}
</style>
