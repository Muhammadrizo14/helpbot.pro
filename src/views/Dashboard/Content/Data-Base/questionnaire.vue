<template>
  <div class="database__questions-empty" v-if="questionsList.length === 0">
    <div
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
        field="main_question"
        header="Главный вопрос"
        style="max-width: 480px"
      >
      </Column>
      <Column field="similar" header="Похожие вопросы" style="max-width: 390px">
        <template #body="slotProps">
          <p v-for="similar in slotProps.data.similar_questions">
            {{ similar }}
          </p>
        </template>
      </Column>
      <Column field="answer" header="Ответ" style="max-width: 392.67px">
        <template #body="slotProps">
          <Button
            v-if="slotProps.data.action === 'call_operator'"
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
            <Button
              title="Изменить"
              icon="pi pi-pen-to-square"
              @click="updateData(slotProps.data)"
            />
            <Button
              icon="pi pi-file-excel"
              outlined
              severity="danger"
              @click="() => remove(slotProps.data.id)"
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
          :invalid="v$.main_question.$errors.length > 0"
          v-model="data.main_question"
        />
        <label
          for="login__form-title"
          v-for="error in v$.main_question.$errors"
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
        />
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
        <Button
          class="px-4 py-3"
          type="submit"
          label="Добавить"
          :loading="loading"
          :disabled="loading"
        ></Button>
      </div>
    </form>
  </Dialog>

  <Dialog
    v-model:visible="editQuestionModal"
    modal
    :closable="false"
    :draggable="false"
  >
    <template #header>
      <div class="pb-3">
        <h2 class="pb-2">Изменить</h2>
      </div>
    </template>
    <img
      src="@/assets/images/icons/close.png"
      alt="Close"
      class="close-icon"
      @click="editQuestionModal = false"
    />

    <form @submit.prevent="edit">
      <div class="flex flex-column gap-2 pb-4">
        <label for="question" class="database-add__label">Главный вопрос</label>
        <InputText
          id="question"
          placeholder="Я забыл свой пароль..."
          :invalid="v$.main_question.$errors.length > 0"
          v-model="data.main_question"
        />
        <label
          for="login__form-title"
          v-for="error in v$.main_question.$errors"
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
        />
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
        <Button class="px-4 py-3" type="submit" label="Изменить"></Button>
      </div>
    </form>
  </Dialog>
</template>

<script setup>
import { reactive, ref, watch } from "vue";
import { helpers, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { useQuestionStore } from "../../../../stores/QuestionStore";
import { useToast } from "primevue/usetoast";

const toast = useToast();
const store = useQuestionStore();
const loading = ref(false);

const edit = async () => {
  if (selectedAction.value.title === "Перенаправить на оператора") {
    data.answer = "Перенаправить на оператора";
  }

  const result = await v$.value.$validate();
  if (!result) {
    return;
  }

  const myData = {
    id: selectedQuestion.value.id,
    main_question: data.main_question,
    answer:
      data.answer === "Перенаправить на оператора"
        ? "call_operator"
        : data.answer,
    action:
      data.answer === "Перенаправить на оператора" ? "call_operator" : "answer",
    similar_questions: data.similar.split("\n"),
  };

  store
    .editQuestion(myData)
    .then(() => {
      toast.add({
        severity: "success",
        summary: "Изменено",
        detail: "Вопрос успешно изменено",
        life: 3000,
      });
      allQuestions();
    })
    .catch(() => {
      toast.add({ severity: "error", summary: "Ошибка", life: 3000 });
    });

  editQuestionModal.value = false;

  data.main_question = "";
  data.answer = "";
  data.similar = "";
};

const updateData = (newData) => {
  editQuestionModal.value = true;
  selectedQuestion.value = newData;

  if (newData.answer === "call_operator") {
    selectedAction.value = actions.value[1];
  }

  data.main_question = newData.main_question || "";
  data.similar = newData.similar || "";
  data.answer = newData.answer || "";
};

const addQuestionModal = ref(false);
const editQuestionModal = ref(false);
const selectedQuestion = ref();

const data = reactive({
  main_question: "",
  similar: "",
  answer: "",
});

const customMessages = {
  required: "Это поле не может быть пустым",
};

const rules = reactive({
  main_question: {
    required: helpers.withMessage(customMessages.required, required),
  },
  answer: {
    required: helpers.withMessage(customMessages.required, required),
  },
});

const questionsList = ref([]);

const allQuestions = () => {
  store
    .getAllQuestions()
    .then((res) => {
      questionsList.value = res.data;
    })
    .catch((res) => {
      questionsList.value = [];
    });
};

allQuestions();

const actions = ref([
  { title: "Ответ" },
  { title: "Перенаправить на оператора" },
]);

const selectedAction = ref(actions.value[0]);

const remove = (id) => {
  store
    .removeQuestion(id)
    .then(() => {
      allQuestions();
      toast.add({
        severity: "success",
        summary: "Успешно",
        detail: "Вопрос успешно удалено",
        life: 3000,
      });
    })
    .catch((err) => {
      console.log(err)
      toast.add({ severity: "error", summary: "Ошибка", life: 3000 });
    });
};
const add = async () => {
  loading.value = true;

  if (selectedAction.value.title === "Перенаправить на оператора") {
    data.answer = "Перенаправить на оператора";
  }

  const result = await v$.value.$validate();
  if (!result) {
    loading.value = false;
    return;
  }

  const myData = {
    main_question: data.main_question,
    answer:
      data.answer === "Перенаправить на оператора"
        ? "call_operator"
        : data.answer,
    similar: data.similar.split("\n"),
  };

  store
    .createQuestion(myData)
    .then(() => {
      addQuestionModal.value = false;
      allQuestions();
      toast.add({
        severity: "success",
        summary: "Успешно",
        detail: "Вопрос успешно создано",
        life: 3000,
      });
    })
    .catch(() => {
      toast.add({ severity: "error", summary: "Ошибка", life: 3000 });
    })
    .finally(() => {
      loading.value = false;
      addQuestionModal.value = false;
      data.main_question = "";
      data.answer = "";
      data.similar = "";
    });
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