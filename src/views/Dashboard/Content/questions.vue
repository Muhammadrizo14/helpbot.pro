<template>
  <div>
    <h1>Вопросы без ответа</h1>
    <TabMenu
      v-model:activeIndex="selectedTab"
      :model="items"
      class="settings-tabmenu pt-3"
    />

    <div class="flex align-items-center justify-content-between pt-3">
      <InputText
          placeholder="Поиск"
          class="w-30rem border-none"
      />
      <Button v-if="selectedTab !== 2" outlined label="Закрыть выделенные" />
    </div>

    <Dialog
      v-model:visible="answerDialog"
      :draggable="false"
      :closable="false"
      modal
      :style="{ width: '700px' }"
    >
      <template #header>
        <div class="pb-3">
          <h2 class="pb-2">Ответить на вопрос</h2>
        </div>
      </template>
      <img
        src="@/assets/images/icons/close.png"
        alt="Close"
        class="close-icon"
        @click="answerDialog = false"
      />

      <form @submit.prevent="answerDialog = false">
        <div>
          <label>Вопрос</label>
          <div class="question-wrap">
            Это вопрос, который остался без ответа. Ответьте мне как можно
            скорее. Это вопрос, который остался без ответа. Ответьте мне как
            можно скорее. Это вопрос, который остался без ответа. Ответьте мне
            как можно скорее.
          </div>
        </div>

        <div class="flex flex-column gap-2 pb-4">
          <label for="answer" class="database-add__label">Ответ</label>
          <Textarea
            v-model="data.answer"
            class="w-full"
            rows="6"
            cols="30"
            :invalid="v$.answer.$errors.length > 0"
            placeholder="Здесь должен быть ответ"
          />
          <label
            for="login__form-title"
            v-for="error in v$.answer.$errors"
            :key="error.$uid"
            style="color: var(--red)"
            >{{ error.$message }}</label
          >
        </div>

        <Button type="submit" label="Ответить" class="flex m-auto" />
      </form>
    </Dialog>

    <Dialog
      v-model:visible="declineDialog"
      :draggable="false"
      :closable="false"
      modal
      :style="{ width: '700px' }"
    >
      <template #header>
        <div class="pb-3">
          <h2 class="pb-2">Ответить на вопрос</h2>
        </div>
      </template>
      <img
        src="@/assets/images/icons/close.png"
        alt="Close"
        class="close-icon"
        @click="declineDialog = false"
      />

      <form>
        <div>
          <label>Вопрос</label>
          <div class="question-wrap">
            Это вопрос, который остался без ответа. Ответьте мне как можно
            скорее. Это вопрос, который остался без ответа. Ответьте мне как
            можно скорее. Это вопрос, который остался без ответа. Ответьте мне
            как можно скорее.
          </div>
        </div>
        <div class="flex align-items-center justify-content-center gap-3">
          <Button label="Отмена" />
          <Button label="Закрыть" severity="light" />
        </div>
      </form>
    </Dialog>

    <DataTable
      v-model:selection="selectedProduct"
      :tableClass="`users-data asdf ${selectedTab === 2 && 'archive-data'}`"
      class="users-table pt-4"
      :value="filteredQuestions"
      tableStyle="min-width: 50rem"
    >
      <Column v-if="selectedTab !== 2" selectionMode="multiple" headerStyle="width: 3rem"></Column>
      <Column
        field="name"
        header="Текст вопроса"
        :sortable="selectedTab !== 2 && true"
        style="width: 80%"
      ></Column>
      <Column style="width: 10%" field="data" header="Дата" :sortable="selectedTab !== 2 && true"></Column>
      <Column field="action" :header="selectedTab === 2 ? 'Дата закрытия' : 'Действие / дата закрытия'">
        <template #body="slotProps">
          <div
            class="flex align-items-center gap-3"
            v-if="slotProps.data.action === 'Ответить'"
          >
            <Button :label="slotProps.data.action" @click="answerDialog = true">
              <template #icon>
                <svg
                  width="20"
                  height="19"
                  class="mr-2"
                  viewBox="0 0 20 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3 1.75C2.30964 1.75 1.75 2.30964 1.75 3V12.6216C1.75 13.312 2.30964 13.8716 3 13.8716H4.78947C5.20369 13.8716 5.53947 14.2074 5.53947 14.6216V16.4487L8.58682 14.0338C8.71936 13.9288 8.88351 13.8716 9.05263 13.8716H17C17.6904 13.8716 18.25 13.312 18.25 12.6216V3C18.25 2.30964 17.6904 1.75 17 1.75H3ZM0.25 3C0.25 1.48122 1.48122 0.25 3 0.25H17C18.5188 0.25 19.75 1.48122 19.75 3V12.6216C19.75 14.1404 18.5188 15.3716 17 15.3716H9.31378L5.25529 18.5878C5.02982 18.7665 4.72202 18.8004 4.46302 18.6752C4.20403 18.55 4.03947 18.2877 4.03947 18V15.3716H3C1.48122 15.3716 0.25 14.1404 0.25 12.6216V3Z"
                    fill="white"
                  />
                  <path
                    d="M7 8C7 8.82843 6.32843 9.5 5.5 9.5C4.67157 9.5 4 8.82843 4 8C4 7.17157 4.67157 6.5 5.5 6.5C6.32843 6.5 7 7.17157 7 8Z"
                    fill="white"
                  />
                  <path
                    d="M11.5 8C11.5 8.82843 10.8284 9.5 10 9.5C9.17157 9.5 8.5 8.82843 8.5 8C8.5 7.17157 9.17157 6.5 10 6.5C10.8284 6.5 11.5 7.17157 11.5 8Z"
                    fill="white"
                  />
                  <path
                    d="M16 8C16 8.82843 15.3284 9.5 14.5 9.5C13.6716 9.5 13 8.82843 13 8C13 7.17157 13.6716 6.5 14.5 6.5C15.3284 6.5 16 7.17157 16 8Z"
                    fill="white"
                  />
                </svg>
              </template>
            </Button>
            <Button
              icon="pi pi-file-excel"
              severity="danger"
              outlined
              @click="declineDialog = true"
            />
          </div>
          <div v-else>
            <p class="text-500">{{ slotProps.data.action }}</p>
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from "vue";
import { helpers, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

const selectedProduct = ref();
const answerDialog = ref(false);
const declineDialog = ref(false);

const data = reactive({
  answer: "",
});
const customMessages = {
  required: "Это поле не может быть пустым",
};

const rules = reactive({
  answer: {
    required: helpers.withMessage(customMessages.required, required),
  },
});
const v$ = useVuelidate(rules, data);

const questions = ref([
  {
    name: "Это вопрос, который остался без ответа. Ответьте мне как можно скорее.1",
    data: "26.03.2024",
    action: "Ответить",
  },
  {
    name: "Это вопрос, который остался без ответа. Ответьте мне как можно скорее.2",
    data: "26.03.2024",
    action: "Закрыт 26.03.2024",
  },
  {
    name: "Это вопрос, который остался без ответа. Ответьте мне как можно скорее.3",
    data: "26.03.2024",
    action: "Ответить",
  },
  {
    name: "Это вопрос, который остался без ответа. Ответьте мне как можно скорее.4",
    data: "26.03.2024",
    action: "Ответить",
  },
]);

const selectedTab = ref(0);

const items = ref([
  { label: `Все (${questions.value.length})` },
  {
    label: `Открытые  (${
      questions.value.filter((q) => q.action === "Ответить").length
    })`,
  },
  {
    label: `Закрытые (${
      questions.value.filter((q) => q.action !== "Ответить").length
    })`,
  },
]);

const filteredQuestions = computed(() => {
  selectedProduct.value = [];
  if (selectedTab.value === 0) {
    return questions.value;
  } else if (selectedTab.value === 1) {
    return questions.value.filter((q) => q.action === "Ответить");
  } else if (selectedTab.value === 2) {
    return questions.value.filter((q) => q.action !== "Ответить");
  }
});
</script>

<style scoped lang="scss">
.question-wrap {
  margin-top: 4px;
  margin-bottom: 24px;
  padding: 6px;
  border-radius: 8px;
  border: 1px solid var(--grey-06);
}
</style>
