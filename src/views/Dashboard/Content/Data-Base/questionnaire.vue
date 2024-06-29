<template>
  <div class="database__questions-empty">
    <div
      v-if="questionsList.length === 0"
      class="flex align-items-center justify-content-center flex-column h-full"
    >
      <img src="@/assets/images/database-question-empty.png" alt="" />
      <h2 class="pt-4 pb-3">Вопрос-ответ</h2>
      <p class="pb-4 text-center">
        Добавьте фиксированные вопросы и ответы <br />
        для самых частых обращений
      </p>
      <Button
        icon="pi pi-plus"
        label="Добавить"
        class="px-4 py-3"
        @click="addQuestionModal = true"
      />
    </div>
  </div>

  <div class="pt-4" v-if="questionsList.length > 0">
    <div class="flex align-items-center justify-content-between">
      <InputText placeholder="Поиск..." class="border-none w-20rem" />
      <Button
        label="Добавить"
        icon="pi pi-plus"
        @click="addQuestionModal = true"
      />
    </div>
    <DataTable
      :value="questionsList"
      :tableClass="'users-data'"
      class="users-table pt-4"
    >
      <template #footer>
        <p class="text-center">
          На любые другие вопросы бот будет отвечать по базе знаний
        </p>
      </template>
      <Column
        field="question"
        header="Главный вопрос"
        style="min-width: 480px"
      ></Column>
      <Column field="similar" header="Похожие вопросы" style="min-width: 390px">
        <template #body="slotProps">
          <p v-html="slotProps.data.similar"></p>
        </template>
      </Column>
      <Column field="answer" header="Ответ" style="width: 392.67px">
        <template #body="slotProps">
          <Button
            v-if="slotProps.data.answer === 'Перенаправить на оператора'"
            class="surface-200 border-none text-900 border-round-3xl w-full text-center m-auto flex justify-content-center"
          >
            Перенаправить на оператора
          </Button>
          <p v-else>{{ slotProps.data.answer }}</p>
        </template>
      </Column>
      <Column style="width: 10%; min-width: 8rem" bodyStyle="text-align:center">
        <template #body="slotProps">
          <div class="flex gap-3">
            <Button title="asdf" icon="pi pi-pen-to-square" />
            <Button
              icon="pi pi-file-excel"
              outlined
              severity="danger"
              @click="() => remove(slotProps.index)"
            />
          </div>
        </template>
      </Column>
    </DataTable>
  </div>

  <Dialog
    v-model:visible="addQuestionModal"
    modal
    :closable="false"
    :draggable="false"
  >
    <template #header>
      <div class="pb-3">
        <h2 class="pb-2">Добавить ответ</h2>
        <p>Заполните форму, чтобы добавить ответ первой линии</p>
      </div>
    </template>
    <img
      src="@/assets/images/icons/close.png"
      alt="Close"
      class="close-icon"
      @click="addQuestionModal = false"
    />

    <form @submit.prevent="add">
      <div class="flex flex-column gap-2 pb-4">
        <label for="question" class="database-add__label">Главный вопрос</label>
        <InputText
          id="question"
          placeholder="Я забыл свой пароль..."
          :invalid="v$.question.$errors.length > 0"
          v-model="data.question"
        />
        <label
          for="login__form-title"
          v-for="error in v$.question.$errors"
          :key="error.$uid"
          style="color: var(--red)"
          >{{ error.$message }}</label
        >
      </div>

      <div class="flex flex-column gap-2 pb-4">
        <label class="database-add__label">Похожие вопросы</label>
        <span class="database-add__help">
          Добавьте похожие вопросы разделенные новой строкой для улучшения
          <br />
          поиска
        </span>
        <Textarea
          v-model="data.similar"
          class="max-w-30rem"
          rows="2"
          cols="30"
          :invalid="v$.similar.$errors.length > 0"
        />
        <label
          for="login__form-title"
          v-for="error in v$.similar.$errors"
          :key="error.$uid"
          style="color: var(--red)"
          >{{ error.$message }}</label
        >
      </div>

      <div class="flex flex-column gap-2 pb-4">
        <label for="action" class="database-add__label">Действие</label>
        <Dropdown
          v-model="selectedAction"
          :options="actions"
          optionLabel="title"
        />
      </div>

      <div
        v-if="selectedAction.title === 'Ответ'"
        class="flex flex-column gap-2 pb-4"
      >
        <label for="action" class="database-add__label">Ответ</label>
        <InputText
          id="question"
          placeholder="Здесь должен быть ответ"
          v-model="data.answer"
          :invalid="v$.answer.$errors.length > 0"
        />
        <label
          for="login__form-title"
          v-for="error in v$.answer.$errors"
          :key="error.$uid"
          style="color: var(--red)"
          >{{ error.$message }}</label
        >
      </div>

      <div class="flex justify-content-center gap-2">
        <Button class="px-4 py-3" type="submit" label="Добавить"></Button>
      </div>
    </form>
  </Dialog>
</template>

<script setup>
import { reactive, ref, watch } from "vue";
import { helpers, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

const addQuestionModal = ref(false);

const data = reactive({
  question: "",
  similar: "",
  answer: "",
});
const customMessages = {
  required: "Это поле не может быть пустым",
};

const rules = reactive({
  question: {
    required: helpers.withMessage(customMessages.required, required),
  },
  similar: {
    required: helpers.withMessage(customMessages.required, required),
  },
  answer: {
    required: helpers.withMessage(customMessages.required, required),
  },
});

const questionsList = ref([]);

const actions = ref([
  { title: "Ответ" },
  { title: "Перенаправить на оператора" },
]);

const selectedAction = ref(actions.value[0]);
const remove = (id) => {
  questionsList.value = questionsList.value.filter(
    (question, index) => index !== id
  );
};
const add = async () => {
  if (selectedAction.value.title === "Перенаправить на оператора") {
    data.answer = "Перенаправить на оператора";
  }

  const result = await v$.value.$validate();
  if (!result) {
    return;
  }

  const myData = {
    question: data.question,
    answer: data.answer,
    similar: data.similar,
  };

  questionsList.value.push(myData);

  addQuestionModal.value = false;

  data.question = "";
  data.answer = "";
  data.similar = "";
};

const v$ = useVuelidate(rules, data);

watch(selectedAction, (newAction) => {
  if (newAction.title === "Перенаправить на оператора") {
    rules.answer.required = false;
  } else {
    rules.answer.required = helpers.withMessage(
      customMessages.required,
      required
    );
  }
});
</script>

<style scoped lang="scss">
.database {
  height: 100%;
  overflow: hidden;

  &__questions-empty {
    height: 80vh;
  }

  &-add__label {
    font-size: 18px;
    font-weight: 400;
  }

  &-add__help {
    font-size: 14px;
    font-weight: 400;
    color: var(--grey-02);
  }
}
</style>
