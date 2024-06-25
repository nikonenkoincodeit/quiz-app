<template>
  <div class="box">
    <div class="info">
      <h1 class="title">Your Goal</h1>
      <p class="desc">
        <button type="button" class="btn btn-accent" @click="togglePopup">
          Click here
        </button>
        to learn more about each option
      </p>
      <div class="gallery">
        <Card
          v-for="item of items"
          :key="item.id"
          :text="item.text"
          :iconName="item.icon"
          :selected="selected"
          @updateSelection="updateSelection"
        />
      </div>
    </div>
    <div class="body-content">
      <NextPageBtn @click="onClick" />
    </div>
  </div>
  <Popup :isPopup="isPopup" @togglePopup="togglePopup" />
</template>

<script setup>
import { ref, computed } from "vue";
import Card from "../components/Card.vue";
import Popup from "../components/Popup.vue";
import NextPageBtn from "../components/NextPageBtn.vue";

const selected = ref("one-night stand");
const disabled = ref(false);
const isPopup = ref(false);

const props = defineProps({
  indexPage: { type: Number, default: 0 },
  disabled: { type: Boolean },
  selected: { type: String },
  gender: { type: String },
});

const emit = defineEmits(["nextPage", "updateData"]);

const items = [
  { id: 1, icon: "#icon-strawberry", text: "one-night stand" },
  { id: 2, icon: "#icon-romantic", text: "romantic relationship" },
  { id: 3, icon: "#icon-communication", text: "new friends" },
  { id: 3, icon: "#icon-family", text: "starting a family" },
  { id: 3, icon: "#icon-cam", text: "adult Live Cams" },
  { id: 3, icon: "#icon-game", text: "adult online games" },
];

emit("updateData", { value: true, key: "active" });

const el = computed(() => items.find((item) => item.text === selected.value));

const onClick = () => {
  emit("updateData", {
    value: el.value.icon,
    key: "icon",
    text: el.value.text,
  });
};

const updateSelection = (val) => {
  selected.value = val;
};

const togglePopup = () => {
  isPopup.value = !isPopup.value;
};
</script>

<style scoped>
</style>
