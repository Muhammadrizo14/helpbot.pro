<template>
  <label :for="id">{{ label }}</label>
  <div class="password-input">
  <input
      v-model="internalValue"
      :type="type === 'password' ? passwordFieldType : type"
      :id="id"
      :class="invalid ? 'default invalid' : 'default'"
      :placeholder="placeholder"
      :style="type === 'password' && 'padding-right: 42px;'"
  />
    <span v-if="type === 'password'" class="toggle-icon" @click="togglePasswordVisibility">
      <img src="../assets/images/icons/eye.png" alt="">
    </span>
  </div>


</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';


const props = defineProps({
  type: {
    type: String,
    default: 'text'
  },
  invalid: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  modelValue: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    default: ''
  }
});


const isPasswordVisible = ref<boolean>(false);

const passwordFieldType = computed(() => (isPasswordVisible.value ? 'text' : 'password'));
const passwordIcon = computed(() => (isPasswordVisible.value ? 'fas fa-eye-slash' : 'fas fa-eye'));

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();


const internalValue = ref<string>(props.modelValue);

watch(() => props.modelValue, (newValue) => {
  internalValue.value = newValue;
});

watch(internalValue, (newValue) => {
  emit('update:modelValue', newValue);
});
</script>

<style lang="scss" scoped>
.password-input {
  position: relative;
  display: flex;
  align-items: center;
}

input {
  padding: 8px 30px 8px 8px;
  font-size: 18px;
  flex: 1;
}

.toggle-icon {
  position: absolute;
  right: 10px;
  cursor: pointer;
}

i {
  font-size: 16px;
}
.default {
  border-radius: 8px;
  padding: 12px;
  border: 2px solid var(--grey-04);

  &::placeholder {
    color: var(--grey-04);
    font-size: 18px;
  }

  &:active {
    border: 2px solid var(--grey-02);
    outline: none;
  }
}

.invalid {
  border: 2px solid var(--red);
}
</style>