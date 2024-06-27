<template>
  <div class="popup" :class="{ show: isPopup }">
    <div class="container">
      <ul class="list">
        <li class="list-item" v-for="item of items" :key="item.id">
          <h2 class="list-item-title">
            <svg width="25" height="25" fill="#ff443a">
              <use :href="icon + item.icon"></use>
            </svg>
            {{ $t(item.title) }}
          </h2>
          <p class="list-item-text">
            {{ $t(item.text) }}
          </p>
        </li>
      </ul>
      <button type="button" class="btn btn-continue" @click="onClick">
        {{ $t("buttons.got_it") }}
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
    title: "popup.element1.title",
    text: "popup.element1.text",
    icon: "#icon-strawberry",
  },
  {
    id: 2,
    title: "popup.element2.title",
    text: "popup.element2.text",
    icon: "#icon-romantic",
  },
  {
    id: 3,
    title: "popup.element3.title",
    text: "popup.element3.text",
    icon: "#icon-communication",
  },
  {
    id: 4,
    title: "popup.element4.title",
    text: "popup.element4.text",
    icon: "#icon-family",
  },
  {
    id: 5,
    title: "popup.element5.title",
    text: "popup.element5.text",
    icon: "#icon-cam",
  },
  {
    id: 6,
    title: "popup.element6.title",
    text: "popup.element6.text",
    icon: "#icon-game",
  },
];

const onClick = (e) => {
  emit("togglePopup", e);
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
  font-size: 17px;
  margin-bottom: 7px;
  font-weight: 500;
}
.list-item-text {
  font-size: 15px;
}
.list-item + .list-item {
  margin-top: 10px;
}
.btn-continue {
  margin-top: 30px;
  margin-bottom: 0;
}
</style>
