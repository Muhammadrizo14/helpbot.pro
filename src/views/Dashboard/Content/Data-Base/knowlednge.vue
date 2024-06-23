<template>
  <div>
    <div class="flex align-items-center justify-content-between py-4">
      <div class="flex align-items-center gap-3">
        <Chip class="bg-white text-sm" label="Общее количество страниц: 3"/>
        <Chip class="bg-white text-sm" label="Проиндексированные страницы: 3"/>
        <Chip class="bg-white text-sm" label="Общее количество эмбеддингов: 32"/>
      </div>
      <div class="flex gap-3 align-items-center flex-nowrap">
        <Button label="Добавить данные" icon="pi pi-plus" @click="addDataModal = true"/>
        <Button severity="light" label="Редактировать источник данных"/>
      </div>
    </div>
    <Divider/>
    <div class="flex justify-content-between align-items-center py-4">
      <InputText placeholder="Отфильтровать данные..." class="w-20rem border-none"/>
      <div class="flex align-items-center gap-2">
        <Button outlined label="Добавить в индекс"/>
        <Button outlined label="Удалить из индекса"/>
        <Button outlined label="Перезагрузить страницы"/>
      </div>
    </div>

    <DataTable v-model:selection="selectedKnowledge" :tableClass="'users-data'" :value="knowledge" paginator
               :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem"
               paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
               currentPageReportTemplate="{first} to {last} of {totalRecords}">
      <Column selectionMode="multiple" style="width: 50px"></Column>
      <Column field="title" header="Страница датасета"></Column>
      <Column field="quality" header="Качество">
        <template #body="slotProps">
          <div style="width: 12px; height: 12px; background-color: var(--red);" class="border-round" v-if="!slotProps.data.quality"></div>
          <div style="width: 12px; height: 12px; background-color: #48B8AC;" class="border-round" v-if="slotProps.data.quality"></div>
        </template>
      </Column>
      <Column field="status" header="Статус индекса">
        <template #body="slopProps">
          <div class="flex align-items-center gap-1" v-if="slopProps.data.status">
            <svg width="15" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.998 2.005c5.517 0 9.997 4.48 9.997 9.997 0 5.518-4.48 9.998-9.997 9.998-5.518 0-9.998-4.48-9.998-9.998 0-5.517 4.48-9.997 9.998-9.997zm0 1.5c-4.69 0-8.498 3.807-8.498 8.497s3.808 8.498 8.498 8.498 8.497-3.808 8.497-8.498-3.807-8.497-8.497-8.497zm-5.049 8.886 3.851 3.43c.142.128.321.19.499.19.202 0 .405-.081.552-.242l5.953-6.509c.131-.143.196-.323.196-.502 0-.41-.331-.747-.748-.747-.204 0-.405.082-.554.243l-5.453 5.962-3.298-2.938c-.144-.127-.321-.19-.499-.19-.415 0-.748.335-.748.746 0 .205.084.409.249.557z" fill-rule="nonzero"/></svg>
            <p>Включено</p>
          </div>
          <div class="flex align-items-center gap-1" v-if="!slopProps.data.status">
            <svg width="15" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 1.5c-4.69 0-8.497 3.807-8.497 8.497s3.807 8.498 8.497 8.498 8.498-3.808 8.498-8.498-3.808-8.497-8.498-8.497zm4.253 7.75h-8.5c-.414 0-.75.336-.75.75s.336.75.75.75h8.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75z" fill-rule="nonzero"/></svg>
            <p>Не включено</p>
          </div>
        </template>
      </Column>
      <Column field="create_data" header="Дата добавления"></Column>
      <Column field="update_data" header="Дата изменения"></Column>
      <Column field="update_data" header="Дата изменения"></Column>
      <Column field="update_data">
        <template #body="slotProps">
          <div class="flex align-items-center gap-3">
            <Button>
              <template #icon>
                <svg width="10" height="15" viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M1.75 6C1.75 5.58579 2.08579 5.25 2.5 5.25H5C5.41421 5.25 5.75 5.58579 5.75 6V13.25H8.5C8.91421 13.25 9.25 13.5858 9.25 14C9.25 14.4142 8.91421 14.75 8.5 14.75H1.5C1.08579 14.75 0.75 14.4142 0.75 14C0.75 13.5858 1.08579 13.25 1.5 13.25H4.25V6.75H2.5C2.08579 6.75 1.75 6.41421 1.75 6Z" fill="white"/>
                  <path d="M6.5 2C6.5 2.82843 5.82843 3.5 5 3.5C4.17157 3.5 3.5 2.82843 3.5 2C3.5 1.17157 4.17157 0.5 5 0.5C5.82843 0.5 6.5 1.17157 6.5 2Z" fill="white"/>
                </svg>
              </template>
            </Button>
            <Button icon="pi pi-trash" severity="danger" outlined>

            </Button>
          </div>
        </template>
      </Column>
    </DataTable>




    <Dialog v-model:visible="addDataModal" header="Добавить данные" modal :closable="false" :draggable="false"
            style="width: 600px">
      <img src="@/assets/images/icons/close.png" alt="Close" class="close-icon" @click="addDataModal = false">

      <TabMenu v-model:activeIndex="selectedAddTab" :model="addItems" class="settings-tabmenu pb-2"/>

      <p class="text-500 pb-4">Заполните форму, чтобы добавить сайт</p>

      <form v-if="selectedAddTab === 0">
        <div class="flex flex-column gap-2 pb-4">
          <label for="action" class="database-add__label">Адрес</label>
          <InputText id="question" placeholder="URL источника данных" v-model="data.answer"
                     :invalid="v$.answer.$errors.length > 0"/>
          <label for="login__form-title" v-for="error in v$.answer.$errors" :key="error.$uid"
                 style="color: var(--red)">{{ error.$message }}</label>
        </div>

        <div class="flex flex-column gap-2 pb-4">
          <label for="action" class="database-add__label">Парсер</label>
          <Dropdown v-model="selectedParser" :options="parsers" optionLabel="title"/>
        </div>

        <div class="flex flex-column gap-2 pb-3">
          <label for="action" class="database-add__label">Парсинг</label>
          <div class="flex align-items-center">
            <RadioButton checked v-model="parseType" value="Весь сайт" input-id="parseType1"/>
            <label for="parseType1" class="ml-2">Весь сайт</label>
          </div>
          <div class="flex align-items-center">
            <RadioButton v-model="parseType" value="Одна страница" input-id="parseType2"/>
            <label for="parseType2" class="ml-2">Одна страница</label>
          </div>
          <div class="flex align-items-center">
            <RadioButton v-model="parseType" value="Папка" input-id="parseType3"/>
            <label for="parseType3" class="ml-2">Папка</label>
          </div>
        </div>

        <Button type="submit" class="flex justify-content-center mx-auto">Добавить</Button>

      </form>

      <form v-if="selectedAddTab === 1">
        <div class="flex flex-column gap-2 pb-4">
          <label for="action" class="database-add__label">Заголовок</label>
          <InputText id="question" placeholder="Укажите заголовок" v-model="data.answer"
                     :invalid="v$.answer.$errors.length > 0"/>
          <label for="login__form-title" v-for="error in v$.answer.$errors" :key="error.$uid"
                 style="color: var(--red)">{{ error.$message }}</label>
        </div>
        <!--<div class="flex flex-column gap-2 pb-4">-->
        <!--  <label for="action" class="database-add__label">Файл</label>-->
        <!--  <FileUpload  auto name="demo[]" url="/api/upload"  @upload="onTemplatedUpload($event)" :multiple="false" accept=".doc,.docx, .pdf" :maxFileSize="1000000" @select="onSelectedFiles">-->
        <!--    <template #header="{ chooseCallback, uploadCallback, clearCallback, files }">-->
        <!--      <div class="flex align-items-center w-full justify-content-between">-->
        <!--        <div class="flex align-items-center">-->
        <!--          <p  style="color: var(&#45;&#45;grey-02)">-->
        <!--            <span @click="chooseCallback" style="color: var(&#45;&#45;primary-01); cursor: pointer;"><i class="pi pi-file-plus pr-1"></i>Загрузите</span>-->
        <!--            или перетащите файл сюда</p>-->
        <!--        </div>-->
        <!--        <span style="color: var(&#45;&#45;grey-04)">pdf, docx</span>-->
        <!--      </div>-->
        <!--    </template>-->
        <!--  </FileUpload>-->
        <!--</div>-->


        <Button type="submit" class="flex justify-content-center mx-auto">Добавить</Button>

      </form>

      <form v-if="selectedAddTab === 2">
        <div class="flex flex-column gap-2 pb-4">
          <label for="action" class="database-add__label">Заголовок</label>
          <InputText id="question" placeholder="Укажите заголовок" v-model="data.answer"
                     :invalid="v$.answer.$errors.length > 0"/>
          <label for="login__form-title" v-for="error in v$.answer.$errors" :key="error.$uid"
                 style="color: var(--red)">{{ error.$message }}</label>
        </div>

        <div class="flex flex-column gap-2 pb-4">
          <label for="action" class="database-add__label">Контент</label>
          <Textarea id="question" placeholder="Разместите контент здесь" rows="6" :autoResize="false" v-model="data.answer"
                    :invalid="v$.answer.$errors.length > 0"/>
          <label for="login__form-title" v-for="error in v$.answer.$errors" :key="error.$uid"
                 style="color: var(--red)">{{ error.$message }}</label>
        </div>
        <!--<div class="flex flex-column gap-2 pb-4">-->
        <!--  <label for="action" class="database-add__label">Файл</label>-->
        <!--  <FileUpload  auto name="demo[]" url="/api/upload"  @upload="onTemplatedUpload($event)" :multiple="false" accept=".doc,.docx, .pdf" :maxFileSize="1000000" @select="onSelectedFiles">-->
        <!--    <template #header="{ chooseCallback, uploadCallback, clearCallback, files }">-->
        <!--      <div class="flex align-items-center w-full justify-content-between">-->
        <!--        <div class="flex align-items-center">-->
        <!--          <p  style="color: var(&#45;&#45;grey-02)">-->
        <!--            <span @click="chooseCallback" style="color: var(&#45;&#45;primary-01); cursor: pointer;"><i class="pi pi-file-plus pr-1"></i>Загрузите</span>-->
        <!--            или перетащите файл сюда</p>-->
        <!--        </div>-->
        <!--        <span style="color: var(&#45;&#45;grey-04)">pdf, docx</span>-->
        <!--      </div>-->
        <!--    </template>-->
        <!--  </FileUpload>-->
        <!--</div>-->


        <Button type="submit" class="flex justify-content-center mx-auto p-3">Добавить</Button>

      </form>

    </Dialog>

  </div>

</template>

<script setup>
import {reactive, ref} from "vue";
import {helpers, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";






const parseType = ref('Весь сайт');
const addDataModal = ref(false);
const selectedAddTab = ref(0);
const selectedKnowledge = ref()


const data = reactive({
  question: '',
  similar: '',
  answer: '',
});
const customMessages = {
  required: 'Это поле не может быть пустым',
};


const rules = reactive({
  question: {
    required: helpers.withMessage(customMessages.required, required)
  },
  similar: {
    required: helpers.withMessage(customMessages.required, required)
  },
  answer: {
    required: helpers.withMessage(customMessages.required, required)
  }
});

const v$ = useVuelidate(rules, data);

const parsers = ref([
  {title: 'По умолчанию'},
  {title: 'По умолчанию1'},
]);

const selectedParser = ref(parsers.value[0]);


const addItems = ref([
  {label: 'Веб-страница'},
  {label: 'Файл'},
  {label: 'Статья'},
]);


const knowledge = ref([
  {
    title: 'Название страницы сайта',
    quality: true,
    status: true,
    create_data: '26.03.2024',
    update_data: '26.03.2024',
  },
  {
    title: 'Название статьи',
    quality: false,
    status: false,
    create_data: '26.03.2024',
    update_data: '26.03.2024',
  },

])

</script>

<style scoped>

</style>