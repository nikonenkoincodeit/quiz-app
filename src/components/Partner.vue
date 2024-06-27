<template>
  <div class="box">
    <div class="info">
      <h1 class="title">{{ $t("partner.title") }}</h1>
      <p
        class="desc"
        v-html="
          $t('partner.desctiption1', {
            btn: `<button
          type=&quot;button&quot;
          class=&quot;btn btn-accent&quot;
        >
          Сhoose</button
        >`,
          })
        "
      ></p>
      <div class="gallery">
        <Card
          v-for="item of items"
          :key="item.id"
          :text="$t(item.text)"
          :value="item.value"
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
  gender: { type: String, default: "male" },
});

const emit = defineEmits(["nextPage", "updateData"]);

emit("updateData", { value: true, key: "active" });

const items = [
  { id: 1, icon: "#icon-male", text: "list.male", value: "male" },
  { id: 2, icon: "#icon-female", text: "list.female", value: "female" },
  {
    id: 3,
    icon: "#icon-venus-mars-solid",
    text: "list.no_matter",
    value: "no-matter",
  },
];

const img = computed(() => {
  let image = "";
  const sg = selectedGender.value;

  if (props.gender === "female" && sg === "male") {
    image = "female-male.png";
  } else if (props.gender === "female" && sg === "female") {
    image = "female-female.png";
  } else if (props.gender === "female" && sg === "no matter") {
    image = "female-nomatter.png";
  } else if (props.gender === "male" && sg === "female") {
    image = "male-female.png";
  } else if (props.gender === "male" && sg === "male") {
    image = "male-male.png";
  } else if (props.gender === "male" && sg === "no matter") {
    image = "male-nomatter.png";
  } else if (props.gender === "non-binary" && sg === "male") {
    image = "nonbinary-male.png";
  } else if (props.gender === "non-binary" && sg === "female") {
    image = "nonbinary-female.png";
  } else {
    image = "nonbinary-nomatter.png";
  }

  return new URL(`../assets/img/${image}`, import.meta.url);
});
console.log(props.gender);
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
  items.find((item) => item.value === selectedGender.value)
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


