<template>
  <section class="my-section">
    <div class="container">
      <ProgressBar :items="items" :indexPage="indexPage" @nextPage="nextPage" />
      <component
        :is="myComponent"
        :indexPage="indexPage"
        :disabled="items[indexPage]?.disabled"
        :selected="items[indexPage]?.selected"
        :gender="items[1]?.selected"
        @nextPage="nextPage"
        @updateData="updateData"
      />
    </div>
  </section>
</template>
<script setup>
import { reactive, ref, computed, getCurrentInstance, onMounted } from "vue";
import YourAge from "./components/YourAge.vue";
import Partner from "./components/Partner.vue";
import ProgressBar from "./components/ProgressBar.vue";
import YourGender from "./components/YourGender.vue";
import YourGoal from "./components/YourGoal.vue";
import { getBrowserLanguage, prepareDataForSending } from "./helper";
import { addData } from "./api";

const locale = ref(null);

onMounted(() => {
  const { $i18n } = getCurrentInstance().proxy;
  const lang = getBrowserLanguage();
  locale.value = lang.split("-")[0];
  $i18n.locale = lang.split("-")[0];
});

const items = reactive([
  {
    id: 1,
    value: "",
    name: "your_age",
    selected: "",
    text: "progress_bar.age",
    icon: { name: "", text: "" },
    active: true,
    disabled: true,
  },
  {
    id: 2,
    value: "",
    name: "your_gender",
    selected: "",
    text: "progress_bar.gender",
    icon: { name: "", text: "" },
    active: false,
    disabled: false,
  },
  {
    id: 3,
    value: "",
    name: "partner",
    selected: "",
    text: "progress_bar.partner",
    icon: { name: "", text: "" },
    active: false,
    disabled: true,
  },
  {
    id: 4,
    value: "",
    name: "your_goal",
    selected: "",
    text: "progress_bar.goal",
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
  indexPage.value = val;
};

const updateData = ({ key, value, text, page = "next" } = {}) => {
  if (key === "icon") {
    items[indexPage.value][key]["name"] = value;
    items[indexPage.value][key]["text"] = text;
  } else items[indexPage.value][key] = value;
  setTimeout(() => {
    if (page === "finish") {
      const data = prepareDataForSending(items);
      data.locale = locale.value;
      addData(data)
        .then((r) => {
          console.log(r);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, 0);
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
