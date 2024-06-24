<template>
  <div class="box">
    <div class="info">
      <h1 class="title">Your Gender</h1>
      <p class="desc">Choose the option that best describes your gender</p>
      <div class="gallery">
        <Card
          v-for="item of items"
          :key="item.id"
          :text="item.text"
          :iconName="item.icon"
          :selected="selectedGender"
          @updateSelection="updateSelection"
        />
      </div>
    </div>
    <div class="body-content">
      <div class="body-content-top">
        <img
          :src="img"
          alt="picture"
          class="picture"
          :class="{ pulse: isPulsing }"
          @animationend="isPulsing = false"
        />
      </div>

      <NextPageBtn :disabled="false" @click="updateData" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Card from "../components/Card.vue";
import NextPageBtn from "../components/NextPageBtn.vue";

const props = defineProps({
  indexPage: { type: Number, default: 0 },
  selected: { type: String },
});

const emit = defineEmits(["nextPage", "updateData"]);

const selectedGender = ref(props.selected || "male");
const isPulsing = ref(false);

emit("updateData", { value: true, key: "active" });

const items = [
  { id: 1, icon: "#icon-male", text: "male" },
  { id: 2, icon: "#icon-female", text: "female" },
  { id: 3, icon: "#icon-mercury-solid", text: "non-binary" },
];

const img = computed(
  () => new URL(`../assets/img/${selectedGender.value}.png`, import.meta.url)
);

const el = computed(() =>
  items.find((item) => item.text === selectedGender.value)
);

const updateData = () => {
  emit("updateData", {
    value: el.value.icon,
    key: "icon",
    text: el.value.text,
  });
  emit("nextPage", props.indexPage + 1);
};

const updateSelection = (val) => {
  selectedGender.value = val;
  isPulsing.value = true;
};
</script>

<style scoped>
.body-content-top {
  height: 280px;
}
</style>
