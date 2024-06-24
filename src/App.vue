<template>
  <section class="my-section">
    <div class="container">
      <ProgressBar :items="items" :indexPage="indexPage" @nextPage="nextPage" />
      <component
        :is="myComponent"
        :indexPage="indexPage"
        :disabled="items[indexPage]?.disabled"
        :selected="items[indexPage]?.icon?.text"
        :gender="items[1]?.icon?.text"
        @nextPage="nextPage"
        @updateData="updateData"
      />
    </div>
  </section>
</template>
<script setup>
import { reactive, ref, computed } from "vue";
import YourAge from "./components/YourAge.vue";
import Partner from "./components/Partner.vue";
import ProgressBar from "./components/ProgressBar.vue";
import YourGender from "./components/YourGender.vue";
import YourGoal from "./components/YourGoal.vue";

const items = reactive([
  {
    id: 1,
    value: "",
    text: "age",
    icon: { name: "", text: "" },
    active: true,
    disabled: true,
  },
  {
    id: 2,
    value: "",
    text: "Gender",
    icon: { name: "", text: "" },
    active: false,
    disabled: false,
  },
  {
    id: 3,
    value: "",
    text: "Parnter",
    icon: { name: "", text: "" },
    active: false,
    disabled: true,
  },
  {
    id: 4,
    value: "",
    text: "Goal",
    icon: { name: "", text: "" },
    active: false,
    disabled: true,
  },
]);

const indexPage = ref(0);

const myComponent = computed(() => {
  if (indexPage.value === 0) return YourAge;
  if (indexPage.value === 1) return YourGender;
  if (indexPage.value === 2) return Partner;
  return YourGoal;
});

const nextPage = (val) => {
  console.log("val ", val);
  indexPage.value = val;
};

const updateData = ({ key, value, text } = {}) => {
  if (key === "icon") {
    items[indexPage.value][key]["name"] = value;
    items[indexPage.value][key]["text"] = text;
  } else items[indexPage.value][key] = value;
};
</script>

<style scoped>
.my-section,
.container {
  height: 100%;
}

.container {
  display: flex;
  flex-direction: column;
}

.regular-text {
  font-family: "EastmanTrial", sans-serif;
  font-weight: 400;
  font-size: 35px;
  color: #fd7b60;
}
.bold-text {
  font-family: "EastmanTrial", sans-serif;
  font-weight: 700;
  font-size: 80px;
  color: #ff443a;
}
.medium-text {
  font-family: "EastmanTrial", sans-serif;
  font-weight: 500;
  font-size: 25px;
  color: #d9d9d9;
}
</style>