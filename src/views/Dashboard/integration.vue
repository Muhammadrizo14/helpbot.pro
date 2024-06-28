<template>
  <div class="integration">
    <h1 class="pb-3">Интеграции</h1>

    <Divider />

    <div class="flex py-3 integration-wrap">
      <div class="menu-wrap flex">
        <ul class="integration__menu">
          <li>Usedesk</li>
          <li>Telegram</li>
          <li class="active flex align-items-center justify-content-between">
            Другая интеграция
            <svg
              v-if="isIntegrated"
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8 2.25C4.54822 2.25 1.75 5.04822 1.75 8.5C1.75 11.9518 4.54822 14.75 8 14.75C11.4518 14.75 14.25 11.9518 14.25 8.5C14.25 5.04822 11.4518 2.25 8 2.25ZM0.25 8.5C0.25 4.21979 3.71979 0.75 8 0.75C12.2802 0.75 15.75 4.21979 15.75 8.5C15.75 12.7802 12.2802 16.25 8 16.25C3.71979 16.25 0.25 12.7802 0.25 8.5Z"
                fill="#14182C"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.5087 5.9489C11.8131 6.22985 11.8321 6.70434 11.5511 7.00871L7.85879 11.0087C7.58405 11.3064 7.1226 11.3321 6.81649 11.0668L4.5088 9.06677C4.19579 8.79549 4.16195 8.32182 4.43323 8.0088C4.70451 7.69579 5.17818 7.66195 5.4912 7.93323L7.24961 9.45719L10.4489 5.99129C10.7299 5.68692 11.2043 5.66794 11.5087 5.9489Z"
                fill="#14182C"
              />
            </svg>
          </li>
        </ul>
        <div class="divider"></div>
      </div>
      <div class="integration-content">
        <div class="flex align-items-center justify-content-between">
          <div>
            <h2 class="pb-3">Другая интеграция</h2>
            <p style="color: var(--grey-02)">Краткое описание интеграции</p>
          </div>
          <div class="flex gap-3 align-items-center">
            <label for="switch" style="color: var(--grey-02)"
              >Интеграция <br />
              подключена</label
            >
            <InputSwitch
              input-id="switch"
              input-class="default-switch"
              v-model="isIntegrated"
            />
          </div>
        </div>
        <form
          class="pt-4"
          :class="!isIntegrated && 'dis'"
          @submit.prevent="addIntegration"
        >
          <div class="flex flex-column gap-2">
            <label for="token">Токен бота</label>
            <InputText
              :disabled="!isIntegrated"
              v-model="data.token"
              :invalid="v$.token.$errors.length > 0"
              id="token"
              placeholder="Скопируйте и вставьте токен"
              aria-describedby="username-help"
            />
            <label
              for="token"
              v-for="error in v$.token.$errors"
              :key="error.$uid"
              style="color: var(--red)"
              >{{ error.$message }}</label
            >
          </div>
          <div class="flex flex-column gap-2 pt-3">
            <label for="startMessage">Стартовый текст</label>
            <Textarea
              :disabled="!isIntegrated"
              id="startMessage"
              placeholder="Добавьте сообщение для команды /start в формате Markdown"
              rows="3"
              :autoResize="false"
              v-model="data.startMessage"
              :invalid="v$.startMessage.$errors.length > 0"
            />
            <label
              for="email"
              v-for="error in v$.startMessage.$errors"
              :key="error.$uid"
              style="color: var(--red)"
              >{{ error.$message }}</label
            >
          </div>
          <div class="flex flex-column gap-2 pt-3">
            <label for="webHook">Вебхук URL</label>
            <InputText
              :disabled="!isIntegrated"
              v-model="data.webHook"
              :invalid="v$.webHook.$errors.length > 0"
              id="webHook"
              placeholder="https://..."
              aria-describedby="username-help"
            />
            <label
              for="webHook"
              v-for="error in v$.webHook.$errors"
              :key="error.$uid"
              style="color: var(--red)"
              >{{ error.$message }}</label
            >
          </div>
          <div class="flex flex-column gap-2 pt-3">
            <label for="webHook">Вебхук URL</label>
            <Dropdown
              :disabled="!isIntegrated"
              v-model="data.selectedAgent"
              :options="agents"
              optionLabel="name"
              placeholder="Выберите агента"
            />
            <label
              for="webHook"
              v-for="error in v$.webHook.$errors"
              :key="error.$uid"
              style="color: var(--red)"
              >{{ error.$message }}</label
            >
          </div>
          <div class="flex gap-3 py-3">
            <Checkbox
              :disabled="!isIntegrated"
              inputId="optionalAgent"
              v-model="data.agent"
              :binary="true"
            />
            <label for="optionalAgent">
              <p>Агент (опционально)</p>
              <span style="color: var(--grey-02)"
                >Все ответы будут отправляться как заметки и будут видны только
                агентам</span
              >
            </label>
          </div>
          <Button v-if="isIntegrated" label="Добавить" type="submit" />
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { helpers, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

const isIntegrated = ref(false);
const items = ref([
  { label: "New", icon: "pi pi-plus" },
  { label: "Search", icon: "pi pi-search" },
]);

const agents = ref([
  { name: "Агент01", code: "1" },
  { name: "Агент02", code: "2" },
  { name: "Агент03", code: "3" },
  { name: "Агент04", code: "4" },
  { name: "Агент05", code: "5" },
]);

const addIntegration = async () => {
  const result = await v$.value.$validate();
  if (!result) {
    console.log("Form validation failed");
    return;
  }
};

const data = reactive({
  token: "",
  startMessage: "",
  webHook: "",
  selectedAgent: "",
  agent: false,
});

const customMessages = {
  required: "Это поле не может быть пустым",
};

const rules = {
  token: {
    required: helpers.withMessage(customMessages.required, required),
  },
  startMessage: {
    required: helpers.withMessage(customMessages.required, required),
  },
  webHook: {
    required: helpers.withMessage(customMessages.required, required),
  },
  selectedAgent: {
    required: helpers.withMessage(customMessages.required, required),
  },
};

const v$ = useVuelidate(rules, data);
</script>

<style scoped lang="scss">
.dis {
  * {
    color: var(--grey-04);
  }
}

.integration {
  height: 100%;
  overflow: hidden;

  &-wrap {
    gap: 30px;

    .menu-wrap {
      height: 100vh;
      flex-basis: 20%;
      position: relative;
    }

    .divider {
      position: absolute;
      top: -1rem;
      right: 0;
      width: 1px;
      height: calc(100vh + 1rem);
      z-index: 3333;
      background: var(--grey-06);
    }

    .integration__menu {
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 316px;
      padding-right: 8px;

      li {
        &.active {
          background-color: var(--primary-05);
          border-radius: 10px;
          color: black;
        }

        padding: 12px;
        color: var(--grey-02);
        font-size: 18px;
        list-style: none;
        cursor: pointer;

        &:hover {
          color: black;
        }
      }
    }

    .integration-content {
      flex-basis: 50%;
    }
  }
}
</style>
