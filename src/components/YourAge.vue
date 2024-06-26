<template>
  <div class="box">
    <div class="info">
      <h1 class="title">{{ $t("your_age.title") }}</h1>
      <p class="desc">
        {{ $t("your_age.desctiption1") }}
      </p>
      <p
        class="desc"
        v-html="
          $t('your_age.desctiption2', {
            btn: `<button
          type=&quot;button&quot;class=&quot;btn btn-accent&quot;>${$t(
            'your_age.btn'
          )}</button>`,
          })
        "
      ></p>
    </div>
    <div class="body-content">
      <div class="w-img">
        <img
          src="../assets/img/hand-scale.gif"
          class="hand_final"
          alt="hand_final"
          v-if="disabled"
        />
        <div
          class="select-age body-content-top"
          ref="selectAgeRef"
          @scroll="onScroll"
          @keyup="onKeyup"
        >
          <ul class="list">
            <li
              v-for="age in ages"
              :key="age"
              :class="{ active: isActive(age) }"
              :data-id="age"
              class="list-item"
            >
              {{ age }}
            </li>
          </ul>
        </div>
      </div>
      <div>
        <NextPageBtn :disabled="disabled" @click="updateData(selectedAge)" />
        <p class="text" @click="onClick">
          {{ $t("your_age.link") }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import NextPageBtn from "../components/NextPageBtn.vue";

const ages = Array.from({ length: 71 }, (v, k) => k + 16);

const selectAgeRef = ref(null);

const props = defineProps({
  indexPage: { type: Number, default: 0 },
  disabled: { type: Boolean, default: true },
  selected: { type: [String, Number], default: "" },
});

const selectedAge = ref(props.selected);

const emit = defineEmits(["nextPage", "updateData"]);

const handleScroll = (event) => {
  const container = event.target;
  const listItems = container.querySelectorAll(".list-item");
  const containerHeight = container.clientHeight;
  const containerTop = container.getBoundingClientRect().top;

  listItems.forEach((item) => {
    const itemTop = item.getBoundingClientRect().top;
    const itemHeight = item.clientHeight;
    const itemMiddle = itemTop + itemHeight / 2;
    if (
      itemMiddle > containerTop + containerHeight / 2 - itemHeight / 2 &&
      itemMiddle < containerTop + containerHeight / 2 + itemHeight / 2
    ) {
      selectedAge.value = parseInt(item.textContent);
    }
  });
};

const isActive = (age) => {
  return age === selectedAge.value;
};

const updateData = (age) => {
  emit("updateData", { value: age, key: "value" });
  emit("updateData", { value: age, key: "selected" });
  emit("nextPage", props.indexPage + 1);
};

const onClick = () => {
  emit("updateData", { value: false, key: "disabled" });
  updateData(18);
};

const onScroll = (event) => {
  handleScroll(event);
  emit("updateData", { value: false, key: "disabled" });
};

const onKeyup = (e) => {
  if (e.key === "Tab") {
    emit("updateData", { value: false, key: "disabled" });
  }
};

onMounted(() => {
  const item = selectAgeRef.value?.querySelector(
    `[data-id="${selectedAge.value}"]`
  );

  if (item) {
    const parent = selectAgeRef.value;
    const parentRect = parent.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    const scrollPosition =
      itemRect.top +
      parent.scrollTop -
      parentRect.top -
      parent.clientHeight / 2 +
      itemRect.height / 2;

    parent.scrollTo({
      top: scrollPosition,
      behavior: "auto",
    });
  }
  nextTick(() => {
    handleScroll({ target: selectAgeRef.value });
  });
});
</script>

<style scoped>
.w-img {
  position: relative;
  overflow: hidden;
  width: 300px;
  margin: 0 auto;
}
.select-age {
  height: 174px;
  width: fit-content;
  margin: 20px auto;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
}

.hand_final {
  position: absolute;
  pointer-events: none;
  z-index: -1;
  top: 55%;
  opacity: 0.6;
  transform: translateY(-50%);
  right: 20px;
  width: 150px;
  height: 150px;
}

.list-item {
  width: 150px;
  scroll-snap-align: start;
  text-align: center;
  padding: 3px;
  line-height: 1.2;
  font-weight: 500;
  font-size: 25px;
  color: #d9d9d9;
}
.list-item.active {
  color: var(--main-color);
  font-weight: 700;
  background: url("../assets/img/bg.png") no-repeat;
}

@media screen and (min-width: 991px) {
  .select-age {
    scrollbar-width: thin;
    scrollbar-color: #888 #f1f1f1;
    -ms-overflow-style: -ms-autohiding-scrollbar;
  }
  .select-age::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }

  .select-age::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  .select-age::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }

  .select-age::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
}
.text {
  width: 80%;
  margin: 0 auto;
  text-align: center;
  font-size: 12px;
  margin-bottom: 20px;
  text-decoration: underline;
  cursor: pointer;
}
</style>
