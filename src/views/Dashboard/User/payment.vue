<template>
  <div class="users">
    <h1 class="pb-3">Тарифы</h1>
    <div class="plans flex align-items-stretch gap-3">
      <Box class="rates" v-for="subscription in store.subscriptions">
        <h2>{{  subscription.title }}</h2>
        <p class="text-500 pt-2 pb-1">{{ subscription.description }}</p>
        <h1 class="pb-3">{{ subscription.price }} ₽</h1>
        <Button class="flex justify-content-center w-full p-3 buy-btn" v-if="subscription.recommended" @click="purchaseSubscription(subscription.id)"
          >Купить пакет
        </Button>
        <Button class="flex justify-content-center w-full p-3 buy-btn" severity="light" v-else @click="purchaseSubscription(subscription.id)"
          >Купить пакет
        </Button>
        <ul class="pt-5 flex flex-column gap-2">
          <li class="flex align-items-center gap-2">
            <img src="@/assets/images/icons/verified.png" alt="" /> {{ subscription.tokens_included }} кредитов
          </li>
          <li class="flex align-items-center gap-2" v-for="module in subscription.default_modules">
            <img src="@/assets/images/icons/verified.png" alt="" /> 
            {{ module.name }}
          </li>
        </ul>
      </Box>
    </div>

    <h2>Платежи</h2>
    <p class="text-500 pt-1 pb-1">Просмотр текущей статистики расходов</p>
    <div class="payments__card_container flex gap-3">
      <Box class="payments__card">
        <p class="text-500 pb-1">Текущий пакет</p>
        <h2 v-if="auth.user?.subscription">{{ auth.user?.subscription }}</h2>
        <h2 v-else>Бесплатный</h2>
      </Box>
      <Box class="payments__card">
        <p class="text-500 pb-1 flex justify-content-between">
          Баланс
          <button class="changer" @click="topUpDialog = true">
            Пополнить
          </button>
        </p>
        <h2 style="display: inline">{{ auth.user?.balance }}</h2>
        <p style="font-size: 1.40rem; display: inline;">₽</p>
      </Box>
      <Box class="payments__card">
        <p class="text-500 pb-1">Остаток кредитов</p>
        <h2>{{ auth.user?.tokens }}</h2>
      </Box>
    </div>
    <h2 class="pb-3">История</h2>

    <TabMenu
      v-model:activeIndex="active"
      :model="items"
      class="settings-tabmenu pt-3"
    />

    <DataTable
      class="users-data"
      :tableClass="'users-data'"
      :value="store.payments"
      tableStyle="min-width: 50rem"
      v-if="active === 0"
    >
      <Column field="amount" header="Сумма"></Column>
      <Column field="created_at" header="Дата"></Column>
    </DataTable>
    <DataTable
      class="users-data"
      :tableClass="'users-data'"
      :value="store.purchases"
      tableStyle="min-width: 50rem"
      v-if="active === 1"
    >
      <Column field="price" header="Стоимость"></Column>
      <Column field="purchased_object_name" header="Предмет"></Column>
      <Column field="created_at" header="Дата"></Column>
    </DataTable>
    <Dialog
      v-model:visible="topUpDialog"
      modal
      :closable="false"
      :draggable="false">
      <template #header>
        <div class="flex pb-2 gap-5 align-items-center">
          <h2>Пополнение баланса</h2>
          <img
            src="@/assets/images/icons/close.png"
            alt="Close"
            class="close-icon"
            @click="topUpDialog = false"
          />
        </div>
      </template>
      <form>
        <div class="flex flex-column gap-2">
          <label for="new_email" class="database-add__label">
            Сумма пополнения
          </label>
          <InputText
              id="current"
              v-model="data.top_up_amount"
              :invalid="v$.top_up_amount.$errors.length > 0"
          />
          <label
              for="login__form-title"
              v-for="error in v$.top_up_amount.$errors"
              :key="error.$uid"
              style="color: var(--red)"
          >{{ error.$message }}
          </label>
        </div>
        <div class="flex justify-content-center gap-3 pt-4">
          <Button  @click.prevent="topUpBalance" type="submit">Пополнить</Button>
        </div>
      </form>
    </Dialog>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/AuthStore";
import { usePaymentsStore } from "@/stores/PaymentsStore";
import { helpers, numeric, required } from "@vuelidate/validators";
import { ref, reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const store = usePaymentsStore();
const auth = useAuthStore();
const topUpDialog = ref(false);
const active = ref(0);
const items = ref([{ label: "Пополнения" }, { label: "Покупки" }]);
const history = ref([
  {
    data: "23.03.2024",
    size: "100",
    remainder: "100",
    type: "Бесплатно",
  },
]);

const data = reactive({
  top_up_amount: 0,
});

const customMessages = {
  required: "Это поле не может быть пустым",
  numeric: "Это поле может содержать только цифры.",
};

const rules = reactive({
  top_up_amount: {
    required: helpers.withMessage(customMessages.required, required),
    numeric: helpers.withMessage(customMessages.numeric, numeric),
  },
});

const v$ = useVuelidate(rules, data);

store.getSubscriptions();
store.getPayments();
store.getPurchases();

const topUpBalance = async () => {
  const result = await v$.value.$validate();
  if (!result) {
    return;
  }
  if (data.top_up_amount < 100) {
    toast.add({ severity: 'error', summary: 'Ошибка', detail: "Сумма платежа должна превышать 100 рублей.", life: 3000 })
  }
  store.topUpBalance(data.top_up_amount)
}

const purchaseSubscription = async (subscription_id) => {
  store
    .purchaseSubscription(subscription_id)
    .then(() => {
      toast.add({
        severity: "success",
        summary: "Успешно",
        detail: "Подписка куплена",
        life: 3000,
      });
      auth.getUser();
      store.getPurchases();
    })
    .catch((err) => {
      if (err.response.data.detail == "User does not have enough balance for purchasing this subscription.") {
        toast.add({ severity: "error", summary: "Ошибка", detail: "Недостаточно денег на балансе. Пополните баланс.", life: 3000 });
      }
    });
}
</script>

<style scoped lang="scss">
.payments__card_container {
  width: 35rem;
}
.payments__card {
  padding: 20px;
}

.close-icon {
  width: 14px;
  height: 14px;
  position: static;
  cursor: pointer;
}

.changer {
    border: 0;
    background: none;
    text-decoration: underline;
    font-size: 12px;
    cursor: pointer;
    padding: 0;
    color: var(--grey-01);
  }

.plans {
  display: flex;
  @media (max-width: 1300px) {
    display: grid !important;
    grid-template-columns: 1fr 1fr;
    margin-bottom: 30px;
  }
}

.rates {
  flex: 1;
  padding: 15px;
  display: flex;
  flex-direction: column;
  min-height: 370px;
  height: auto;
  @media (max-width: 1300px) {
    margin: 0px;
  }
  p {
    height: 64px;
  }

}

ul {
  li {
    list-style: none;
    font-size: 18px;
    font-weight: 400;
  }
}

.buy-btn {
  @media (max-width: 1300px) {
    & {
      padding: 10px !important;
    }
  }
}
</style>
