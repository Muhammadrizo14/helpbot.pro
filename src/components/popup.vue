<template>
  <div class="popup">
    <div class="popup__content">
      <Box>
        <slot/>
        <img @click="closePopup" class="popup__content-close" src="../assets/images/icons/close.png" alt="">
      </Box>
    </div>
  </div>
</template>

<script setup lang="ts">
import Box from './box.vue'

interface Prop {
  modelValue: boolean
}

const props = defineProps<Prop>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>();

const closePopup = () => {
  emit('update:modelValue', false)
}
</script>

<style lang="scss" scoped>
.popup {
  background: rgba(20, 24, 44, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  &__content {
    width: 550px;
    max-height: 704px;
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    &-close {
      position: absolute;
      top: 18px;
      right: 18px;
      cursor: pointer;
    }
  }
}
</style>