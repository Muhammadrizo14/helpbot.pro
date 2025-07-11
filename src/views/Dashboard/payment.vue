<template>
  <div class="users">
    <h1 class="pb-3">Тарифы</h1>
    <div class="plans flex align-items-stretch gap-3">
      <Box class="rates">
        <h2>Старт</h2>
        <p class="text-500 pt-2 pb-1">Все необходимое для поддержки клиентов</p>
        <h1 class="pb-3">4 900 ₽</h1>
        <Button class="flex justify-content-center w-full p-3 buy-btn" severity="light"
          >Купить пакет
        </Button>
        <ul class="pt-5 flex flex-column gap-2">
          <li class="flex align-items-center gap-2">
            <img src="@/assets/images/icons/verified.png" alt="" /> 500 кредитов
          </li>
          <li class="flex align-items-center gap-2">
            <img src="@/assets/images/icons/verified.png" alt="" /> Базовые
            отчеты
          </li>
          <li class="flex align-items-center gap-2">
            <img src="@/assets/images/icons/verified.png" alt="" /> Техническая
            поддержка
          </li>
        </ul>
      </Box>
      <Box class="rates">
        <h2>Рост</h2>
        <p class="text-500 pt-2 pb-1">
          Для растущих компаний, набирающих обороты
        </p>
        <h1 class="pb-3">19 900 ₽</h1>
        <Button class="flex justify-content-center w-full p-3 buy-btn">
          Купить пакет
        </Button>
        <ul class="pt-5 flex flex-column gap-2">
          <li class="flex align-items-center gap-2">
            <img src="@/assets/images/icons/verified.png" alt="" /> 2500
            кредитов
          </li>
          <li class="flex align-items-center gap-2">
            <img src="@/assets/images/icons/verified.png" alt="" /> Базовые
            отчеты
          </li>
          <li class="flex align-items-center gap-2">
            <img src="@/assets/images/icons/verified.png" alt="" /> Базовая
            поддержка
          </li>
          <li class="flex align-items-center gap-2">
            <img src="@/assets/images/icons/verified.png" alt="" /> Базовые
            сценарии
          </li>
        </ul>
      </Box>
      <Box class="rates">
        <h2>Бизнес</h2>
        <p class="text-500 pt-2 pb-1">
          Комплексное предложение для крупных компаний
        </p>
        <h1 class="pb-3">49 900 ₽</h1>
        <Button class="flex justify-content-center w-full p-3 buy-btn" severity="light"
          >Купить пакет
        </Button>
        <ul class="pt-5 flex flex-column gap-2">
          <li class="flex align-items-center gap-2">
            <img src="@/assets/images/icons/verified.png" alt="" />
            10000 кредитов
          </li>
          <li class="flex align-items-center gap-2">
            <img src="@/assets/images/icons/verified.png" alt="" /> Продвинутые
            отчеты
          </li>
          <li class="flex align-items-center gap-2">
            <img src="@/assets/images/icons/verified.png" alt="" /> Премиум
            поддержка
          </li>
          <li class="flex align-items-center gap-2">
            <img src="@/assets/images/icons/verified.png" alt="" /> Сценарии с
            автоматизацией
          </li>
          <li class="flex align-items-center gap-2">
            <img src="@/assets/images/icons/verified.png" alt="" /> Улучшенный
            парсер
          </li>
        </ul>
      </Box>
    </div>

    <h2>Платежи</h2>
    <p class="text-500 pt-1 pb-1">Просмотр текущей статистики расходов</p>
    <div class="flex gap-3 w-30rem">
      <Box class="payments__card">
        <p class="text-500 pb-1">Текущий пакет</p>
        <h2>Бесплатный</h2>
      </Box>
      <Box class="payments__card">
        <p class="text-500 pb-1">Остаток кредитов</p>
        <h2>100</h2>
      </Box>
    </div>
    <h2 class="pb-3">История покупок</h2>

    <DataTable
      class="users-data"
      :tableClass="'users-data'"
      :value="history"
      tableStyle="min-width: 50rem"
    >
      <Column field="data" header="Дата"></Column>
      <Column field="size" header="Размер"></Column>
      <Column field="remainder" header="Остаток"></Column>
      <Column field="type" header="Тип"></Column>
    </DataTable>
  </div>
</template>

<script setup>
import { ref } from "vue";

const history = ref([
  {
    data: "23.03.2024",
    size: "100",
    remainder: "100",
    type: "Бесплатно",
  },
]);
</script>

<style scoped lang="scss">
.payments__card {
  padding: 20px;
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
