<template>
  <div class="box">
    <div class="info">
      <h1 class="title">{{ $t("your_goal.title") }}</h1>
      <p
        class="desc"
        @click="togglePopup"
        v-html="
          $t('your_goal.desctiption1', {
            btn: `<button type='button' class='btn btn-accent'>
          Click here
        </button>`,
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
  {
    id: 1,
    icon: "#icon-strawberry",
    value: "one-night stand",
    text: "list.one_night_stand",
  },
  {
    id: 2,
    icon: "#icon-romantic",
    value: "romantic relationship",
    text: "list.romantic",
  },
  {
    id: 3,
    icon: "#icon-communication",
    value: "new friends",
    text: "list.new_friends",
  },
  {
    id: 3,
    icon: "#icon-family",
    value: "starting a family",
    text: "list.starting_a_family",
  },
  {
    id: 3,
    icon: "#icon-cam",
    value: "adult Live Cams",
    text: "list.adult_live_cams",
  },
  {
    id: 3,
    icon: "#icon-game",
    value: "adult online games",
    text: "list.adult_online_games",
  },
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

const togglePopup = (e) => {
  if (e.target.tagName !== "BUTTON") return;
  isPopup.value = !isPopup.value;
};
</script>

