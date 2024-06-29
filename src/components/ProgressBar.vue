<template>
  <header>
    <button
      type="button"
      class="btn btn-prev"
      @click="onClick"
      v-if="indexPage > 0"
    >
      <svg width="20" height="20">
        <use :href="icon + '#icon-arrow-left'"></use>
      </svg>
      {{ $t("buttons.go_back") }}
    </button>
    <ul class="list">
      <li class="list-item" v-for="item of items" :key="item.id">
        <div class="circle" :class="[item.active ? 'active' : '']">
          <span v-if="item.value" class="pulse">{{ item.value }}</span>
          <svg width="30" height="30" v-if="item?.icon?.name" class="pulse">
            <use :href="icon + item?.icon?.name"></use>
          </svg>
        </div>
        <p class="text">{{ $t(item.text) }}</p>
      </li>
    </ul>
  </header>
</template>

<script setup>
import { ref } from "vue";
import icon from "../assets/icons/sprite.svg";

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  indexPage: { type: Number, default: 0 },
});

const emit = defineEmits(["nextPage"]);

const isPulsing = ref(false);

const onClick = () => {
  emit("nextPage", props.indexPage - 1);
};
</script>
<style scoped>
header {
  position: relative;
  padding-top: 55px;
}
.list {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 28px;
  padding: 0 20px 20px 20px;
}
.list-item {
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  gap: 5px;
}

.list-item:not(:last-child):after {
  content: "";
  width: 20px;
  height: 3px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: calc(100% + 4px);
  background: var(--main-color);
}

.circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid var(--main-color);
  display: flex;
  align-items: center;
  justify-content: center;
}

.circle.icon,
.circle.active {
  background: #ff443a;
  border-color: transparent;
  font-weight: 700;
  font-size: 25px;
  color: #fff;
}

.circle svg {
  fill: #fff;
}

.text {
  font-size: 14px;
  position: absolute;
  top: calc(100% + 5px);
  left: 50%;
  transform: translateX(-50%);
}

.text::first-letter {
  text-transform: uppercase;
}

.btn-prev {
  color: var(--main-color);
  padding: 10px 10px 10px 0;
  position: absolute;
  left: 0;
  top: 10px;
  font-weight: 700;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.pulse {
  animation: pulse 1s;
  animation-delay: 0.1s;
  animation-iteration-count: 1;
}
</style>
