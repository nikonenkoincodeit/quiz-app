<template>
  <div class="popup" :class="{ show: isPopup }">
    <div class="container">
      <ul class="list">
        <li class="list-item" v-for="item of items" :key="item.id">
          <h2 class="list-item-title">
            <svg width="30" height="30" fill="#ff443a">
              <use :href="icon + item.icon"></use>
            </svg>
            {{ item.title }}
          </h2>
          <p class="list-item-text">
            {{ item.text }}
          </p>
        </li>
      </ul>
      <button type="button" class="btn btn-continue" @click="onClick">
        GOT IT
      </button>
    </div>
  </div>
</template>

<script setup>
import icon from "../assets/icons/sprite.svg";

const props = defineProps({
  isPopup: { type: Boolean, default: false },
});

const emit = defineEmits(["togglePopup"]);

const items = [
  {
    id: 1,
    title: "One-night stand",
    text: "Choose this option if you are looking for quick dating, a relationship without commitment, in other words, a one-night stand",
    icon: "#icon-strawberry",
  },
  {
    id: 2,
    title: "Romantic relationship",
    text: "Choose this option if you are looking for a serious relationship, romance, regular dates and true love",
    icon: "#icon-romantic",
  },
  {
    id: 3,
    title: "New friends",
    text: "Choose this option if you want to make new friends or just chat with someone",
    icon: "#icon-communication",
  },
  {
    id: 4,
    title: "Starting a family",
    text: "Choose this option if you want to get married and start a family",
    icon: "#icon-family",
  },
  {
    id: 5,
    title: "Adult Live Cams",
    text: "Choose this option if you want to watch adult entertainment of web models in real time",
    icon: "#icon-cam",
  },
  {
    id: 6,
    title: "Adult browser games",
    text: "Choose this option if you want to play browser-based online games for adults",
    icon: "#icon-game",
  },
];

const onClick = () => {
  console.log("togglePopup");
  emit("togglePopup");
};
</script>

<style scoped>
.popup {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.85);
  color: #fff;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.7s ease-in-out;
}

.popup.show {
  opacity: 1;
  pointer-events: all;
}

.container {
  padding: 20px;
}
.list-item-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  margin-bottom: 7px;
  font-weight: 500;
}
.list-item-text {
  font-size: 15px;
}
.list-item + .list-item {
  margin-top: 15px;
}
</style>
