<template>
  <div class="integration">
    <h1 class="pb-3">Интеграции</h1>

    <Divider />

    <div class="flex py-3 integration-wrap">
      <div class="menu-wrap flex">
        <ul class="integration__menu">
          <li
            :class="selectedTab === 0 && 'active'"
            class="flex align-items-center justify-content-between"
            @click="selectedTab = 1"
          >
            Telegram
            <svg
              v-if="isIntegratedTelegram"
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
        <div v-if="selectedTab === 0">
          <div class="flex align-items-center justify-content-between">
            <div>
              <h2 class="pb-3">Telegram</h2>
            </div>
            <div class="flex gap-3 align-items-center">
              <label for="switch" style="color: var(--grey-02)">
                Интеграция <br />
                подключена
              </label>
              <InputSwitch
                input-id="switch"
                input-class="default-switch"
                v-model="isIntegratedTelegram"
              />
            </div>
          </div>
          <form
            class="pt-4"
            :class="!isIntegratedTelegram && 'dis'"
            @submit.prevent="addIntegration()"
          >
            <div class="flex flex-column gap-2 pt-3 pb-3">
              <label for="webHook">Секретный ключ</label>
              <InputText
                :disabled="!isIntegratedTelegram"
                v-model="data.webHook"
                :invalid="v$.webHook.$errors.length > 0"
                id="webHook"
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
            <Button
              class="px-3 py-2"
              v-if="isIntegratedTelegram"
              label="Добавить"
              type="submit"
            />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from "vue";
import { helpers, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { useTelegram } from "../../stores/TelegramStore";
import { useToast } from "primevue/usetoast";

const toast = useToast();

const store = useTelegram();
const isIntegratedTelegram = ref(store.integration);

const selectedTab = ref(0);

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



const data = reactive({
  token: "",
});

const customMessages = {
  required: "Это поле не может быть пустым",
};

const rules = {
  webHook: {
    required: helpers.withMessage(customMessages.required, required),
  },
};

const v$ = useVuelidate(rules, data);

watch(isIntegratedTelegram, (newValue) => {
  if (!newValue) {
    store.disable();
  }
});


const addIntegration = async () => {
  const result = await v$.value.$validate();
  if (!result) {
    console.log("Form validation failed");
    return;
  }

  store
      .addTelegram(data.webHook)
      .then(() => {
        // store.disable();
      })
      .catch((err) => {
        console.log(err);
        if (err.code === "ERR_NETWORK") {
          toast.add({
            severity: "error",
            summary: "Ошибка",
            detail: "Попробуйте позже",
            life: 3000,
          });
        }
      });
};
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
