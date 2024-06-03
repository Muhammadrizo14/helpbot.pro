<template>
  <label for="input">{{ label }}</label>
  <input :type="props.type" id="input" :class="props.invalid ? ' default invalid' : 'default'" :placeholder="placeholder">
</template>

<script setup>
const props = defineProps(['type', 'invalid', 'label', 'placeholder'])

</script>

<style lang="scss" scoped>
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