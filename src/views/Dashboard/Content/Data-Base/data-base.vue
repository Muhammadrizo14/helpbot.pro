<template>
  <div class="database">
    <h1>База данных</h1>

    <TabMenu v-model:activeIndex="selectedTab" :model="items" class="settings-tabmenu pt-3"/>


    <!--Вопрос-ответ tab-->

    <questionnaire v-if="selectedTab === 0"/>


    <!--База знаний tab-->
    <knowledge v-if="selectedTab === 1"/>


  </div>
</template>

<script setup>
import {ref} from "vue";
import Questionnaire from "./questionnaire.vue";
import Knowledge from "./knowlednge.vue";

const selectedTab = ref(0);


const items = ref([
  {label: 'Вопрос-ответ'},
  {label: 'База знаний'},
]);

</script>


<style scoped lang="scss">

.database {
  height: 100%;
  overflow: hidden;

  &__questions-empty {
    height: 100%;
  }

  &-add__label {
    font-size: 18px;
    font-weight: 400;
  }

  &-add__help {
    font-size: 14px;
    font-weight: 400;
    color: var(--grey-02)
  }
}

</style>