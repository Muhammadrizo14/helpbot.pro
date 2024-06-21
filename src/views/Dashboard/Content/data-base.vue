<template>
  <div class="database">
    <h1>База данных</h1>

    <TabMenu v-model:activeIndex="selectedTab" :model="items" class="settings-tabmenu pt-3"/>

    <div class="database__questions-empty flex align-items-center justify-content-center flex-column">
      <img src="@/assets/images/database-question-empty.png" alt="">
      <h2 class="pt-4 pb-3">Вопрос-ответ</h2>
      <p class="pb-4 text-center">Добавьте фиксированные вопросы и ответы <br> для самых частых обращений</p>
      <Button icon="pi pi-plus" label="Добавить" class="px-4 py-3" @click="addModal=true"/>
    </div>

    <Dialog v-model:visible="addModal" modal :closable="false" :draggable="false">
      <template #header>
        <div class="pb-3">
          <h2 class="pb-2">Добавить ответ</h2>
          <p>Заполните форму, чтобы добавить ответ первой линии</p>
        </div>
      </template>
      <img src="@/assets/images/icons/close.png" alt="Close" class="close-icon" @click="addModal = false">


      <div class="flex flex-column gap-2 pb-4">
        <label for="question" class="database-add__label">Главный вопрос</label>
        <InputText id="question" placeholder="Я забыл свой пароль..."/>
      </div>

      <div class="flex flex-column gap-2 pb-4">
        <label class="database-add__label">Похожие вопросы</label>
        <span class="database-add__help">
          Добавьте похожие вопросы разделенные новой строкой для улучшения <br> поиска
        </span>
        <MultiSelect class="w-full md:w-30rem"  display="comma" v-model="selectedQuestions" :options="questions" optionLabel="title" placeholder="Выбрать вопрос"/>
      </div>

      <div class="flex flex-column gap-2 pb-4">
        <label for="action" class="database-add__label">Действие</label>
        <Dropdown v-model="selectedAction" :options="actions" optionLabel="title" />
      </div>

      <div v-if="selectedAction.title === 'Ответ'" class="flex flex-column gap-2 pb-4">
        <label for="action" class="database-add__label">Ответ</label>
        <InputText id="question" placeholder="Здесь должен быть ответ"/>
      </div>



      <div class="flex justify-content-center gap-2">
        <Button class="px-4 py-3" type="button" label="Добавить" @click="visible = false"></Button>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import {ref} from "vue";


const selectedTab = ref()
const addModal = ref(false)




const actions = ref([
  { title: 'Ответ'},
  { title: 'Перенаправить на оператора'},
]);

const selectedAction = ref(actions.value[0]);


const items = ref([
  {label: 'Вопрос-ответ'},
  {label: 'База знаний'},
]);



const selectedQuestions = ref();
const questions = [
  { title: 'Вопрос 1' },
  { title: 'Вопрос 2' },
  { title: 'Вопрос 3' },
  { title: 'Вопрос 4' },
  { title: 'Вопрос 5' },
  { title: 'Вопрос 6' },
  { title: 'Вопрос 7' },
  { title: 'Вопрос 8' },
  { title: 'Вопрос 9' },
  { title: 'Вопрос 10' },
  { title: 'Вопрос 11' },
  { title: 'Вопрос 12' },
  { title: 'Вопрос 13' },
  { title: 'Вопрос 14' },
  { title: 'Вопрос 15' },
  { title: 'Вопрос 16' },
  { title: 'Вопрос 17' },
  { title: 'Вопрос 18' },
  { title: 'Вопрос 19' },
  { title: 'Вопрос 20' },
  { title: 'Вопрос 21' },
  { title: 'Вопрос 22' },
  { title: 'Вопрос 23' },
  { title: 'Вопрос 24' },
  { title: 'Вопрос 25' },
];
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

.close-icon {
  width: 14px;
  height: 14px;
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
}
</style>