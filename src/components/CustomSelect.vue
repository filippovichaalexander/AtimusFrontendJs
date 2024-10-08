<template>
  <div class="custom-select">
    <p class="custom-select__top-label">{{ label }}</p>
    <div class="select-label" @click="toggleOptions">
      {{ shortSelectedValue || placeholder }}
      <span class="arrow">&#9660;</span>
    </div>
    <div class="options" v-show="showOptions">
      <div v-if="selectedValue" class="option" @click="selectDefault">
        {{ defaultOptionText }}
      </div>
      <div
        v-for="(option, index) in options"
        :key="index"
        class="option"
        :class="{ 'selected-option': option === selectedValue }"
        @click="selectOption(option)"
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: "Выберите значение",
  },
  options: {
    type: Array,
    required: true,
  },
  defaultOptionText: {
    type: String,
    default: "Все",
  },
  modelValue: {
    type: [String, Number, Boolean, Object, Array, Date, null],
    default: null,
  },
});

const emit = defineEmits(["update:modelValue"]);

const selectedValue = ref(props.modelValue);
const showOptions = ref(false);

const toggleOptions = () => {
  showOptions.value = !showOptions.value;
};

const selectOption = (option) => {
  selectedValue.value = option;
  emit("update:modelValue", option);
  showOptions.value = false;
};

const selectDefault = () => {
  selectedValue.value = null;
  emit("update:modelValue", "all");
  showOptions.value = false;
};

const shortSelectedValue = computed(() => {
  if (selectedValue.value && selectedValue.value.length >= 20) {
    return selectedValue.value.substring(0, 20) + "...";
  } else {
    return selectedValue.value;
  }
});
</script>

<style scoped>
.custom-select {
  position: relative;
  border: 1px solid #ccc;
  border-radius: 8px;
}
.custom-select__top-label {
  background-color: #fff;
  padding: 2px;
  z-index: 40;
  position: absolute;
  left: 10px;
  top: -10px;

  font-size: 10px;
}
.options {
  max-height: 300px;
  overflow: auto;
}
.selected-option {
  background-color: lightblue;
}
.select-label {
  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: #fff;
  padding: 10px;
  border-radius: 8px;

  padding: 18px 12px;
}
.select-label:hover {
  cursor: pointer;
}
.options::-webkit-scrollbar {
  width: 5px;
}
.options::-webkit-scrollbar-thumb {
  width: 5px;
  background-color: #ccc;
}
.option {
  padding: 10px;
  transition: 0.3s ease;
}
.option:hover {
  background-color: rgb(145, 197, 218);
  cursor: pointer;
}
.arrow {
  color: #ccc;
}
</style>
