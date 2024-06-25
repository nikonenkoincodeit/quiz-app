<template>
  <div class="box">
    <div class="info">
      <h1 class="title">Partner</h1>
      <p class="desc">
        <button type="button" class="btn btn-accent">Сhoose</button>
        the gender of the partner you prefer
      </p>
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

      <NextPageBtn @click="updateData" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import NextPageBtn from "../components/NextPageBtn.vue";
import Card from "../components/Card.vue";

const selectedGender = ref("");
const isPulsing = ref(false);
const disabled = ref(false);

const props = defineProps({
  indexPage: { type: Number, default: 0 },
  gender: { type: String },
});

const emit = defineEmits(["nextPage", "updateData"]);

emit("updateData", { value: true, key: "active" });

const items = [
  { id: 1, icon: "#icon-male", text: "male" },
  { id: 2, icon: "#icon-female", text: "female" },
  {
    id: 3,
    icon: "#icon-venus-mars-solid",
    text: "no matter",
  },
];

const img = computed(() => {
  let image = "";
  const sg = selectedGender.value;

  console.log(props.gender, sg);

  if (
    (props.gender === "female" && sg === "male") ||
    (props.gender === "male" && sg === "female")
  ) {
    image = "male-female.png";
  } else if (props.gender === "female" && sg === "female") {
    image = "female-female.png";
  } else if (
    (props.gender === "female" && sg === "no matter") ||
    (props.gender === "non-binary" && sg === "female")
  ) {
    image = "female-nomatter.png";
  } else if (props.gender === "male" && sg === "male") {
    image = "male-male.png";
  } else if (
    (props.gender === "male" && sg === "no matter") ||
    (props.gender === "non-binary" && sg === "male")
  ) {
    image = "nonbinary-male.png";
  } else {
    image = "nonbinary-nomatter.png";
  }
  return new URL(`../assets/img/${image}`, import.meta.url);
});

if (props.gender === "female" || props.gender === "non-binary") {
  selectedGender.value = "male";
} else if (props.gender === "male") {
  selectedGender.value = "female";
}

const onClick = () => {
  emit("nextPage", props.indexPage + 1);
};

const updateSelection = (val) => {
  selectedGender.value = val;
  isPulsing.value = true;
};

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
</script>
<style scoped>
.body-content-top {
  height: 225px;
}
</style>

