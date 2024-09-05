<template>
  <div>
    <div
      class="flex align-items-center justify-content-between py-4 gap-3 sub__header"
    >
      <div class="flex align-items-center gap-3">
        <Chip
          class="bg-white text-sm"
          :label="`Общее количество страниц: ${
            knowledge.filter((e) => e.type === 'website').length
          }`"
        />
      </div>
      <div class="flex gap-3 align-items-center flex-nowrap">
        <Button
          class="px-3 py-2"
          label="Добавить данные"
          icon="pi pi-plus"
          @click="addDataModal = true"
        />
        <Button
          class="px-3 py-2"
          severity="light"
          @click="editDataModal = true"
          label="Редактировать источник данных"
        />
      </div>
    </div>
    <Divider />
    <div
      class="flex justify-content-between align-items-center py-4 sub__header"
    >
      <InputText
        placeholder="Отфильтровать данные..."
        class="w-20rem border-none"
      />
      <div class="flex align-items-center gap-2">
        <Button outlined label="Добавить в индекс" />
        <Button outlined label="Удалить из индекса" />
        <Button outlined label="Перезагрузить страницы" />
      </div>
    </div>
    <DataTable
      v-model:selection="selectedKnowledge"
      :tableClass="'users-data'"
      :value="knowledge"
      paginator
      :rows="10"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      tableStyle="min-width: 50rem"
      paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      currentPageReportTemplate="{first} to {last} of {totalRecords}"
    >
      <Column selectionMode="multiple" style="width: 50px"></Column>
      <Column field="title" header="Страница датасета">
        <template #body="slotProps">
          <div
            v-if="slotProps.data.type === 'website'"
            class="flex flex-column"
          >
            <p>{{ slotProps.data.title }}</p>
            <a
              target="_blank"
              class="w-3 white-space-nowrap overflow-hidden text-overflow-ellipsis"
              :href="slotProps.data.url"
              >{{ slotProps.data.url }}</a
            >
          </div>
          <div
            v-if="slotProps.data.type === 'document'"
            class="flex flex-column"
          >
            <!--            <p>{{ slotProps.data?.path.substring(slotProps.data?.path.lastIndexOf('/') + 1) }}</p>-->
          </div>
          <div
            v-if="slotProps.data.type === 'article'"
            class="flex flex-column"
          >
            <p>{{ slotProps.data.title }}</p>
          </div>
        </template>
      </Column>
      <Column field="quality" header="Качество">
        <template #body="slotProps">
          <!--          <div-->
          <!--            style="width: 12px; height: 12px; background-color: var(&#45;&#45;red)"-->
          <!--            class="border-round"-->
          <!--            v-if="!slotProps.data.quality"-->
          <!--          ></div>-->
          <div
            style="width: 12px; height: 12px; background-color: #48b8ac"
            class="border-round"
          ></div>
        </template>
      </Column>
      <Column field="status" header="Статус индекса">
        <template #body="slopProps">
          <div
            class="flex align-items-center gap-1"
            v-if="slopProps.data.status"
          >
            <svg
              width="15"
              clip-rule="evenodd"
              fill-rule="evenodd"
              stroke-linejoin="round"
              stroke-miterlimit="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m11.998 2.005c5.517 0 9.997 4.48 9.997 9.997 0 5.518-4.48 9.998-9.997 9.998-5.518 0-9.998-4.48-9.998-9.998 0-5.517 4.48-9.997 9.998-9.997zm0 1.5c-4.69 0-8.498 3.807-8.498 8.497s3.808 8.498 8.498 8.498 8.497-3.808 8.497-8.498-3.807-8.497-8.497-8.497zm-5.049 8.886 3.851 3.43c.142.128.321.19.499.19.202 0 .405-.081.552-.242l5.953-6.509c.131-.143.196-.323.196-.502 0-.41-.331-.747-.748-.747-.204 0-.405.082-.554.243l-5.453 5.962-3.298-2.938c-.144-.127-.321-.19-.499-.19-.415 0-.748.335-.748.746 0 .205.084.409.249.557z"
                fill-rule="nonzero"
              />
            </svg>
            <p>Включено</p>
          </div>
          <div
            class="flex align-items-center gap-1"
            v-if="!slopProps.data.status"
          >
            <svg
              width="15"
              clip-rule="evenodd"
              fill-rule="evenodd"
              stroke-linejoin="round"
              stroke-miterlimit="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 1.5c-4.69 0-8.497 3.807-8.497 8.497s3.807 8.498 8.497 8.498 8.498-3.808 8.498-8.498-3.808-8.497-8.498-8.497zm4.253 7.75h-8.5c-.414 0-.75.336-.75.75s.336.75.75.75h8.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75z"
                fill-rule="nonzero"
              />
            </svg>
            <p>Не включено</p>
          </div>
        </template>
      </Column>
      <Column field="create_data" header="Дата добавления"></Column>
      <Column field="update_data" header="Дата изменения"></Column>
      <Column field="update_data">
        <template #body="slotProps">
          <div class="flex align-items-center gap-3">
            <Button>
              <template #icon>
                <svg
                  width="10"
                  height="15"
                  viewBox="0 0 10 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M1.75 6C1.75 5.58579 2.08579 5.25 2.5 5.25H5C5.41421 5.25 5.75 5.58579 5.75 6V13.25H8.5C8.91421 13.25 9.25 13.5858 9.25 14C9.25 14.4142 8.91421 14.75 8.5 14.75H1.5C1.08579 14.75 0.75 14.4142 0.75 14C0.75 13.5858 1.08579 13.25 1.5 13.25H4.25V6.75H2.5C2.08579 6.75 1.75 6.41421 1.75 6Z"
                    fill="white"
                  />
                  <path
                    d="M6.5 2C6.5 2.82843 5.82843 3.5 5 3.5C4.17157 3.5 3.5 2.82843 3.5 2C3.5 1.17157 4.17157 0.5 5 0.5C5.82843 0.5 6.5 1.17157 6.5 2Z"
                    fill="white"
                  />
                </svg>
              </template>
            </Button>
            <Button
              icon="pi pi-trash"
              severity="danger"
              outlined
              @click="removeDataset(slotProps.data.id)"
            ></Button>
          </div>
        </template>
      </Column>
    </DataTable>

    <Dialog
      modal
      v-model:visible="editDataModal"
      header="Редактировать источник данных"
      :closable="false"
      style="width: 1000px"
      :draggable="false"
    >
      <img
        src="@/assets/images/icons/close.png"
        alt="Close"
        class="close-icon"
        @click="editDataModal = false"
      />
      <p class="text-500 pb-4">Необходим хотя бы один источник данных</p>
      <Box class="p-4">
        <div class="flex gap-2 flex-column">
          <div class="flex align-items-center justify-content-between">
            <div class="w-6">
              <p>https://mysite-bigname.site/page-1-1-1</p>
            </div>
            <div class="w-3">
              <p>По умолчанию</p>
            </div>
            <div class="w-3">
              <p>Сайт</p>
            </div>
            <div class="flex gap-2 align-items-center w-3 justify-content-end">
              <Button icon="pi pi-copy" />
              <Button icon="pi pi-sync" />
              <Button icon="pi pi-trash" severity="danger" outlined />
            </div>
          </div>
          <div class="flex align-items-center justify-content-between">
            <div class="w-6"></div>
            <div class="w-3">
              <p>По умолчанию</p>
            </div>
            <div class="w-3">
              <p>Сайт</p>
            </div>
            <div class="flex gap-2 align-items-center justify-content-end w-3">
              <Button icon="pi pi-trash" severity="danger" outlined />
            </div>
          </div>
          <div class="flex align-items-center justify-content-between">
            <div class="w-6"></div>
            <div class="w-3">
              <p>По умолчанию</p>
            </div>
            <div class="w-3">
              <p>Сайт</p>
            </div>
            <div class="flex gap-2 align-items-center justify-content-end w-3">
              <Button icon="pi pi-trash" severity="danger" outlined />
            </div>
          </div>
        </div>
      </Box>
    </Dialog>

    <Dialog
      v-model:visible="addDataModal"
      header="Добавить данные"
      modal
      :closable="false"
      :draggable="false"
      style="width: 600px"
    >
      <img
        src="@/assets/images/icons/close.png"
        alt="Close"
        class="close-icon"
        @click="addDataModal = false"
      />

      <TabMenu
        v-model:activeIndex="selectedAddTab"
        :model="addItems"
        class="settings-tabmenu pb-4"
      />

      <p class="text-500 pb-2">Заполните форму, чтобы добавить сайт</p>

      <form v-if="selectedAddTab === 0" @submit.prevent="add_website">
        <div class="flex flex-column gap-2 pb-4">
          <label for="action" class="database-add__label">Адрес</label>
          <InputText
            id="question"
            placeholder="URL источника данных"
            v-model="website_data.url"
            :invalid="w$.url.$errors.length > 0"
          />
          <label
            for="login__form-title"
            v-for="error in w$.url.$errors"
            :key="error.$uid"
            style="color: var(--red)"
            >{{ error.$message }}</label
          >
        </div>

        <div class="flex flex-column gap-2 pb-4">
          <label for="action" class="database-add__label">Заголовок</label>
          <InputText
            id="question"
            placeholder="Заголовок"
            v-model="website_data.title"
            :invalid="w$.title.$errors.length > 0"
          />
          <label
            for="login__form-title"
            v-for="error in w$.title.$errors"
            :key="error.$uid"
            style="color: var(--red)"
            >{{ error.$message }}</label
          >
        </div>

        <div class="flex flex-column gap-2 pb-3">
          <label for="action" class="database-add__label">Парсинг</label>
          <div class="flex align-items-center">
            <RadioButton
              checked
              v-model="parseType"
              value="Весь сайт"
              input-id="parseType1"
            />
            <label for="parseType1" class="ml-2">Весь сайт</label>
          </div>
          <div class="flex align-items-center">
            <RadioButton
              v-model="parseType"
              value="Одна страница"
              input-id="parseType2"
            />
            <label for="parseType2" class="ml-2">Одна страница</label>
          </div>
          <div class="flex align-items-center">
            <RadioButton
              v-model="parseType"
              value="Папка"
              input-id="parseType3"
            />
            <label for="parseType3" class="ml-2">Папка</label>
          </div>
        </div>

        <Button type="submit" class="flex justify-content-center mx-auto"
          >Добавить
        </Button>
      </form>

      <form v-if="selectedAddTab === 1" @submit.prevent="uploadFile">
        <div class="flex flex-column gap-2 pb-4">
          <label for="action" class="database-add__label">Заголовок</label>
          <InputText
            id="question"
            placeholder="Укажите заголовок"
            v-model="upload_data.title"
            :invalid="e$.title.$errors.length > 0"
          />
          <label
            for="question"
            v-for="error in e$.title.$errors"
            :key="error.$uid"
            style="color: var(--red)"
            >{{ error.$message }}</label
          >
        </div>
        <div
          class="file-upload"
          @drop.prevent="handleDrop"
          @dragover.prevent
          @dragenter.prevent
        >
          <input
            type="file"
            @change="handleFileUpload"
            ref="fileInput"
            class="file-input"
            accept=".pdf, .docx"
          />
          <div
            v-if="!upload_data.file"
            class="file-upload-text flex align-items-center justify-content-between"
          >
            <p class="flex gap-2">
              <span
                @click="triggerFileInput"
                class="upload-link flex align-item-center gap-1"
                style="color: var(--primary-01)"
              >
                <svg
                  width="15"
                  height="20"
                  viewBox="0 0 15 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2.75 2C2.05964 2 1.5 2.55964 1.5 3.25V15.75C1.5 16.4404 2.05964 17 2.75 17H4.5C4.91421 17 5.25 17.3358 5.25 17.75C5.25 18.1642 4.91421 18.5 4.5 18.5H2.75C1.23122 18.5 0 17.2688 0 15.75V3.25C0 1.73122 1.23122 0.5 2.75 0.5H6.75C6.94891 0.5 7.13968 0.579018 7.28033 0.71967L13.7803 7.21967C13.921 7.36032 14 7.55109 14 7.75V9.5C14 9.91421 13.6642 10.25 13.25 10.25C12.8358 10.25 12.5 9.91421 12.5 9.5V8.5H7.75C6.7835 8.5 6 7.7165 6 6.75V2H2.75ZM7.5 3.06066L11.4393 7H7.75C7.61193 7 7.5 6.88807 7.5 6.75V3.06066Z"
                    fill="#7958DB"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10.5 10.7145C10.9142 10.7145 11.25 11.0503 11.25 11.4645V14.25H14.0355C14.4497 14.25 14.7855 14.5858 14.7855 15C14.7855 15.4142 14.4497 15.75 14.0355 15.75L11.25 15.75V18.5355C11.25 18.9497 10.9142 19.2855 10.5 19.2855C10.0858 19.2855 9.75 18.9497 9.75 18.5355V15.75L6.96447 15.75C6.55025 15.75 6.21447 15.4142 6.21447 15C6.21447 14.5858 6.55025 14.25 6.96447 14.25H9.75V11.4645C9.75 11.0503 10.0858 10.7145 10.5 10.7145Z"
                    fill="#7958DB"
                  />
                </svg>
                Загрузите
              </span>
              или перетащите файл сюда
            </p>
            <p>pdf, docx</p>
          </div>
          <div v-if="upload_data.file" class="file-upload-text">
            {{ upload_data.file[0].name }}
          </div>
        </div>

        <Button type="submit" class="flex justify-content-center mx-auto mt-4"
          >Добавить
        </Button>
      </form>

      <form v-if="selectedAddTab === 2" @submit.prevent="add_article">
        <div class="flex flex-column gap-2 pb-4">
          <label for="action" class="database-add__label">Заголовок</label>
          <InputText
            id="question"
            placeholder="Укажите заголовок"
            v-model="data.title"
            :invalid="v$.title.$errors.length > 0"
          />
          <label
            for="login__form-title"
            v-for="error in v$.title.$errors"
            :key="error.$uid"
            style="color: var(--red)"
            >{{ error.$message }}</label
          >
        </div>

        <div class="flex flex-column gap-2 pb-4">
          <label for="action" class="database-add__label">Контент</label>
          <Textarea
            id="question"
            placeholder="Разместите контент здесь"
            rows="6"
            :autoResize="false"
            v-model="data.content"
            :invalid="v$.content.$errors.length > 0"
          />
          <label
            for="login__form-title"
            v-for="error in v$.content.$errors"
            :key="error.$uid"
            style="color: var(--red)"
            >{{ error.$message }}</label
          >
        </div>

        <Button type="submit" class="flex justify-content-center mx-auto"
          >Добавить
        </Button>
      </form>
    </Dialog>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { helpers, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import Box from "../../../../components/box.vue";
import { useKnowledgeStore } from "../../../../stores/KnowledgeStore";
import { useToast } from "primevue/usetoast";

const toast = useToast();

const store = useKnowledgeStore();

const knowledge = ref([]);

const getDataset = () => {
  store
    .getDataset()
    .then((res) => {
      knowledge.value = res.data;
    })
    .catch((res) => {
      knowledge.value = [];
    });
};

getDataset();

const fileInput = ref(null);

const editDataModal = ref(false);

const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileUpload = (event) => {
  const files = event.target.files || event.dataTransfer.files;
  if (files.length) {
    upload_data.file = files;
    // Process the files here
  }
};

const handleDrop = (event) => {
  const files = event.dataTransfer.files;
  if (files.length) {
    upload_data.file = files;
  }
};
const parseType = ref("Весь сайт");
const addDataModal = ref(false);
const selectedAddTab = ref(0);
const selectedKnowledge = ref([]);

const data = reactive({
  title: "",
  content: "",
});

const website_data = reactive({
  url: "",
  title: "",
});

const upload_data = reactive({
  title: "",
  file: null,
});

const uploadFile = async () => {
  const result = await e$.value.$validate();
  if (!result) {
    console.log("Form validation failed");
    return;
  }

  store
    .uploadFile(upload_data.title, upload_data.file[0])
    .then(() => {
      getDataset();
      toast.add({
        severity: "success",
        summary: "Успешно",
        detail: "Статья успешно создан",
        life: 3000,
      });
    })
    .finally(() => {
      addDataModal.value = false;
    });
};

const customMessages = {
  required: "Это поле не может быть пустым",
};

const rules = reactive({
  title: {
    required: helpers.withMessage(customMessages.required, required),
  },
  content: {
    required: helpers.withMessage(customMessages.required, required),
  },
});

const website_rules = reactive({
  title: {
    required: helpers.withMessage(customMessages.required, required),
  },
  url: {
    required: helpers.withMessage(customMessages.required, required),
  },
});

const upload_rules = reactive({
  title: {
    required: helpers.withMessage(customMessages.required, required),
  },
  file: {
    required: helpers.withMessage(customMessages.required, required),
  },
});

const add_article = async () => {
  const result = await v$.value.$validate();
  if (!result) {
    console.log("Form validation failed");
    return;
  }

  store
    .createArticle(data)
    .then(() => {
      getDataset();

      selectedAddTab.value = 0;

      data.title = "";
      data.content = "";

      addDataModal.value = false;
      toast.add({
        severity: "success",
        summary: "Успешно",
        detail: "Статья успешно создан",
        life: 3000,
      });
    })
    .catch(() => {
      toast.add({
        severity: "error",
        summary: "Ошибка",
        life: 3000,
      });
    });
};

const removeDataset = (id) => {
  const ids = selectedKnowledge.value.map((item) => item.id);

  if (ids.length) {
    store
      .removeMultipleDatasets(ids)
      .then(() => {
        getDataset();
        toast.add({
          severity: "success",
          summary: "Успешно",
          life: 3000,
        });
      })
      .catch(() => {
        toast.add({
          severity: "error",
          summary: "Ошибка",
          life: 3000,
        });
      });
  } else {
    store
      .removeDataset(id)
      .then(() => {
        getDataset();
        toast.add({
          severity: "success",
          summary: "Успешно",
          life: 3000,
        });
      })
      .catch(() => {
        toast.add({
          severity: "error",
          summary: "Ошибка",
          life: 3000,
        });
      });
  }
};

const add_website = async () => {
  const result = await w$.value.$validate();
  if (!result) {
    console.log("Form validation failed");
    return;
  }

  const myData = {
    ...website_data,
    parse_method:
      (parseType.value === "Весь сайт" && "whole_website") ||
      (parseType.value === "Одна страница" && "one_page") ||
      (parseType.value === "Папка" && "folder"),
  };

  store
    .createWebsite(myData)
    .then(() => {
      getDataset();

      addDataModal.value = false;
      toast.add({
        severity: "success",
        summary: "Успешно",
        detail: "Операция успешно выполнено",
        life: 3000,
      });
      website_data.title = "";
      website_data.url = "";
    })
    .catch(() => {
      toast.add({
        severity: "error",
        summary: "Ошибка",
        detail: "Ошибка при выполнении операции",
        life: 3000,
      });
    });
};

const v$ = useVuelidate(rules, data);

const w$ = useVuelidate(website_rules, website_data);
const e$ = useVuelidate(upload_rules, upload_data);

const parsers = ref([{ title: "По умолчанию" }, { title: "По умолчанию1" }]);

const addItems = ref([
  { label: "Веб-страница" },
  { label: "Файл" },
  { label: "Статья" },
]);
</script>

<style scoped>
.file-upload {
  border: 1px dashed #b3b3b3;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  position: relative;
}

.file-input {
  display: none;
}

.file-upload-text {
  color: #6c757d;
}

.file-upload:hover {
  border-color: #007bff;
}

@media (max-width: 1220px) {
  .sub__header {
    flex-direction: column;
    justify-content: start !important;
    align-items: start !important;
    gap: 30px;
  }
}
</style>
