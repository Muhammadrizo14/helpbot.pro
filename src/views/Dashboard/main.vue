<template>
  <div class="home">
    <div class="home__side">
      <Box class="flex align-items-end gap-3 p-3 m-0 justify-content-between">
        <div style="width: 70%">
          <h1 class="pb-3">МойБот</h1>
          <div class="flex align-items-center w-full justify-content-between">
            <p class="text-500">Количество токенов</p>
            <p>145</p>
          </div>
          <div class="flex align-items-center w-full justify-content-between">
            <p class="text-500">Дата повторного платежа</p>
            <p>05.05.2024</p>
          </div>
        </div>
        <div style="width: 30%" class="flex justify-content-center">
          <router-link to="/payment"> <Button>Пополнить</Button></router-link>
        </div>
      </Box>
      <Box class="p-3">
        <div class="flex justify-content-between align-items-center">
          <h1>Оценка службы поддержки</h1>
          <Dropdown
            checkmark
            v-model="selectedPeriodOfSupport"
            :options="periods"
            optionLabel="name"
            class="w-fit"
          />
        </div>
        <div class="flex gap-3">
          <div class="rate">
            <div class="rate-bg" style="background-color: #76c4ff"></div>
            <span class="ml-2">5</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.53167 1.25247C5.69364 0.819299 6.30636 0.819299 6.46833 1.25247L7.61219 4.31153C7.68246 4.49946 7.85825 4.62718 8.05869 4.63594L11.3215 4.77851C11.7835 4.7987 11.9729 5.38142 11.6109 5.66932L9.05508 7.7025C8.89807 7.8274 8.83092 8.03406 8.88453 8.2274L9.7572 11.3746C9.88077 11.8202 9.38508 12.1804 8.99942 11.9251L6.27595 10.1226C6.10865 10.0119 5.89135 10.0119 5.72405 10.1226L3.00058 11.9251C2.61492 12.1804 2.11923 11.8202 2.2428 11.3746L3.11547 8.2274C3.16908 8.03406 3.10193 7.8274 2.94492 7.7025L0.389054 5.66932C0.027135 5.38142 0.216473 4.7987 0.678498 4.77851L3.94131 4.63594C4.14175 4.62718 4.31754 4.49946 4.38781 4.31153L5.53167 1.25247Z"
                fill="#FAD143"
              />
            </svg>
          </div>
          <div class="rate">
            <div class="rate-bg" style="background-color: #6faafb"></div>
            <span class="ml-2">4</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.53167 1.25247C5.69364 0.819299 6.30636 0.819299 6.46833 1.25247L7.61219 4.31153C7.68246 4.49946 7.85825 4.62718 8.05869 4.63594L11.3215 4.77851C11.7835 4.7987 11.9729 5.38142 11.6109 5.66932L9.05508 7.7025C8.89807 7.8274 8.83092 8.03406 8.88453 8.2274L9.7572 11.3746C9.88077 11.8202 9.38508 12.1804 8.99942 11.9251L6.27595 10.1226C6.10865 10.0119 5.89135 10.0119 5.72405 10.1226L3.00058 11.9251C2.61492 12.1804 2.11923 11.8202 2.2428 11.3746L3.11547 8.2274C3.16908 8.03406 3.10193 7.8274 2.94492 7.7025L0.389054 5.66932C0.027135 5.38142 0.216473 4.7987 0.678498 4.77851L3.94131 4.63594C4.14175 4.62718 4.31754 4.49946 4.38781 4.31153L5.53167 1.25247Z"
                fill="#FAD143"
              />
            </svg>
          </div>
          <div class="rate">
            <div class="rate-bg" style="background-color: #949cea"></div>
            <span class="ml-2">3</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.53167 1.25247C5.69364 0.819299 6.30636 0.819299 6.46833 1.25247L7.61219 4.31153C7.68246 4.49946 7.85825 4.62718 8.05869 4.63594L11.3215 4.77851C11.7835 4.7987 11.9729 5.38142 11.6109 5.66932L9.05508 7.7025C8.89807 7.8274 8.83092 8.03406 8.88453 8.2274L9.7572 11.3746C9.88077 11.8202 9.38508 12.1804 8.99942 11.9251L6.27595 10.1226C6.10865 10.0119 5.89135 10.0119 5.72405 10.1226L3.00058 11.9251C2.61492 12.1804 2.11923 11.8202 2.2428 11.3746L3.11547 8.2274C3.16908 8.03406 3.10193 7.8274 2.94492 7.7025L0.389054 5.66932C0.027135 5.38142 0.216473 4.7987 0.678498 4.77851L3.94131 4.63594C4.14175 4.62718 4.31754 4.49946 4.38781 4.31153L5.53167 1.25247Z"
                fill="#FAD143"
              />
            </svg>
          </div>
          <div class="rate">
            <div class="rate-bg" style="background-color: #b286f3"></div>
            <span class="ml-2">2</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.53167 1.25247C5.69364 0.819299 6.30636 0.819299 6.46833 1.25247L7.61219 4.31153C7.68246 4.49946 7.85825 4.62718 8.05869 4.63594L11.3215 4.77851C11.7835 4.7987 11.9729 5.38142 11.6109 5.66932L9.05508 7.7025C8.89807 7.8274 8.83092 8.03406 8.88453 8.2274L9.7572 11.3746C9.88077 11.8202 9.38508 12.1804 8.99942 11.9251L6.27595 10.1226C6.10865 10.0119 5.89135 10.0119 5.72405 10.1226L3.00058 11.9251C2.61492 12.1804 2.11923 11.8202 2.2428 11.3746L3.11547 8.2274C3.16908 8.03406 3.10193 7.8274 2.94492 7.7025L0.389054 5.66932C0.027135 5.38142 0.216473 4.7987 0.678498 4.77851L3.94131 4.63594C4.14175 4.62718 4.31754 4.49946 4.38781 4.31153L5.53167 1.25247Z"
                fill="#FAD143"
              />
            </svg>
          </div>
          <div class="rate">
            <div class="rate-bg" style="background-color: #d06bf3"></div>
            <span class="ml-2">1</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.53167 1.25247C5.69364 0.819299 6.30636 0.819299 6.46833 1.25247L7.61219 4.31153C7.68246 4.49946 7.85825 4.62718 8.05869 4.63594L11.3215 4.77851C11.7835 4.7987 11.9729 5.38142 11.6109 5.66932L9.05508 7.7025C8.89807 7.8274 8.83092 8.03406 8.88453 8.2274L9.7572 11.3746C9.88077 11.8202 9.38508 12.1804 8.99942 11.9251L6.27595 10.1226C6.10865 10.0119 5.89135 10.0119 5.72405 10.1226L3.00058 11.9251C2.61492 12.1804 2.11923 11.8202 2.2428 11.3746L3.11547 8.2274C3.16908 8.03406 3.10193 7.8274 2.94492 7.7025L0.389054 5.66932C0.027135 5.38142 0.216473 4.7987 0.678498 4.77851L3.94131 4.63594C4.14175 4.62718 4.31754 4.49946 4.38781 4.31153L5.53167 1.25247Z"
                fill="#FAD143"
              />
            </svg>
          </div>
        </div>
        <div>
          <Chart
            type="bar"
            :data="chartData"
            :options="chartOptions"
            class="h-20rem"
          />
        </div>
      </Box>
      <Box class="p-3">
        <div class="flex justify-content-between align-items-start">
          <h1>Среднее количество токен на запрос</h1>
          <Dropdown
            checkmark
            v-model="selectedPeriod"
            :options="periods"
            optionLabel="name"
            class="w-fit"
          />
        </div>
        <div>
          <Chart
            type="line"
            :data="chartData2"
            :options="chartOptions2"
            class="h-20rem"
          />
        </div>
      </Box>
    </div>
    <div class="home__side">
      <Box class="p-3 m-0">
        <div class="flex justify-content-between align-items-center">
          <h1>Количество обработанных и необработанных вопросов</h1>
          <Dropdown
            checkmark
            v-model="selectedPeriodOfQuantity"
            :options="periods"
            optionLabel="name"
            class="w-fit"
          />
        </div>
        <div class="flex gap-3">
          <div class="rate">
            <div class="rate-bg" style="background-color: #76c4ff"></div>
            <span class="ml-2">обработанные вопросы</span>
          </div>
          <div class="rate">
            <div class="rate-bg" style="background-color: #b286f3"></div>
            <span class="ml-2">необработанные вопросы</span>
          </div>
        </div>
        <div>
          <Chart
            type="bar"
            :data="quantityData"
            :options="quantityOptions"
            class="h-20rem"
          />
        </div>
      </Box>
      <Box class="p-3">
        <h1>Время решения запроса</h1>

        <div class="flex justify-content-between pt-4 align-items-center gap-3">
          <div class="times w-full flex flex-column gap-3">
            <div
              class="time flex align-items-center justify-content-between w-full"
            >
              <div class="rate p-0">
                <div class="rate-bg" style="background-color: #76c4ff"></div>
                <span class="ml-2">0-5 мин</span>
              </div>
              <div class="time__percent">
                <p>19%</p>
              </div>
            </div>
            <div
              class="time flex align-items-center justify-content-between w-full"
            >
              <div class="rate p-0">
                <div class="rate-bg" style="background-color: #d06bf3"></div>
                <span class="ml-2">5-10 мин</span>
              </div>
              <div class="time__percent">
                <p>42%</p>
              </div>
            </div>
            <div
              class="time flex align-items-center justify-content-between w-full"
            >
              <div class="rate p-0">
                <div class="rate-bg" style="background-color: #6faafb"></div>
                <span class="ml-2">более 10 мин</span>
              </div>
              <div class="time__percent">
                <p>31%</p>
              </div>
            </div>
            <div
              class="time flex align-items-center justify-content-between w-full"
            >
              <div class="rate p-0">
                <div class="rate-bg" style="background-color: #b286f3"></div>
                <span class="ml-2">перевод на оператора</span>
              </div>
              <div class="time__percent">
                <p>8%</p>
              </div>
            </div>
          </div>
          <div>
            <Chart
              type="doughnut"
              :data="timeData"
              :options="timeOptions"
              class="h-20rem"
            />
          </div>
        </div>
      </Box>
      <Box class="p-3">
        <div class="flex align-items-start justify-content-between">
          <h1>Данные</h1>
          <router-link to="/content/database">
            <Button severity="light">Настроить</Button>
          </router-link>
        </div>

        <div class="flex gap-2 align-items-center w-full pt-4">
          <div class="flex align-items-center justify-content-between w-full">
            <p class="text-500">Вопрос-ответ загружено</p>
            <p>24</p>
          </div>
          <div class="flex align-items-center justify-content-between w-full">
            <p class="text-500">Файлов загружено</p>
            <p>12</p>
          </div>
        </div>

        <div class="flex gap-2 align-items-center w-full py-4">
          <div class="flex align-items-center justify-content-between w-full">
            <p class="text-500">Статей загружено</p>
            <p>156</p>
          </div>
          <div class="flex align-items-center justify-content-between w-full">
            <p class="text-500">Веб-страниц загружено</p>
            <p>9</p>
          </div>
        </div>
        <Button>Выгрузить аналитику</Button>
      </Box>
    </div>
  </div>
</template>
`
<script setup>
import { ref, onMounted } from "vue";

const periods = ref([{ name: "неделя" }, { name: "месяц" }, { name: "год" }]);

const selectedPeriod = ref(periods.value[0]);
const selectedPeriodOfSupport = ref(periods.value[0]);
const selectedPeriodOfQuantity = ref(periods.value[0]);

onMounted(() => {
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
  chartData2.value = setChartData2();
  chartOptions2.value = setChartOptions2();
  quantityData.value = setQuantityData();
  quantityOptions.value = setQuantityOptions();
  timeData.value = setTimeData();
  timeOptions.value = setTimeOptions();
});

const quantityData = ref();
const quantityOptions = ref();
const timeData = ref();
const timeOptions = ref();
const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
  const documentStyle = getComputedStyle(document.documentElement);

  return {
    labels: [
      "01 апр",
      "02 апр",
      "03 апр",
      "04 апр",
      "05 апр",
      "06 апр",
      "07 апр",
    ],
    datasets: [
      {
        type: "bar",
        label: "5★",
        backgroundColor: "#76C4FF",
        data: [6, 12, 10, 18, 12, 15, 10],
        borderRadius: 4,
      },
      {
        type: "bar",
        label: "4★",
        backgroundColor: "#6FAAFB",
        data: [2, 18, 8, 22, 10, 8, 5],
        borderRadius: 4,
      },
      {
        type: "bar",
        label: "3★",
        backgroundColor: "#949CEA",
        data: [1, 10, 5, 20, 5, 3, 2],
        borderRadius: 4,
      },
    ],
  };
};
const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--text-color");
  const textColorSecondary = documentStyle.getPropertyValue(
    "--text-color-secondary"
  );
  const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

  const data = setChartData().datasets;

  const maxValue = Math.max(...data.flatMap((dataset) => dataset.data));

  const spacing = 10;

  // console.log(maxValue + spacing);

  return {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      tooltips: {
        mode: "index",
        intersect: false,
      },
      legend: {
        display: false,
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        max: 70,
        beginAtZero: true,
        stacked: true,
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
    },
  };
};

const chartData2 = ref();

const chartOptions2 = ref();

const setChartData2 = () => {
  const documentStyle = getComputedStyle(document.documentElement);

  return {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Third Dataset",
        data: [12, 51, 62, 33, 21, 62, 45],
        fill: true,
        borderColor: "#76C4FF80",
        tension: 0.4,
        backgroundColor: "rgba(107, 114, 128, 0.2)",
        borderRadius: 4,
      },
    ],
  };
};
const setChartOptions2 = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--text-color");
  const textColorSecondary = documentStyle.getPropertyValue(
    "--text-color-secondary"
  );
  const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

  return {
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        display: false,

        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
    },
  };
};

const setQuantityData = () => {
  const documentStyle = getComputedStyle(document.documentElement);

  return {
    labels: [
      "01 апр",
      "02 апр",
      "03 апр",
      "04 апр",
      "05 апр",
      "06 апр",
      "30 апр",
    ],
    datasets: [
      {
        type: "bar",
        label: "не обработано",
        backgroundColor: "#B286F3",
        data: [1, 10, 5, 20, 5, 3, 2],
        borderRadius: 4,
      },
      {
        type: "bar",
        label: "обработано",
        backgroundColor: "#76C4FF",
        data: [5, 12, 10, 18, 12, 15, 10],
        borderRadius: 4,
      },
    ],
  };
};
const setQuantityOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--text-color");
  const textColorSecondary = documentStyle.getPropertyValue(
    "--text-color-secondary"
  );
  const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

  return {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      tooltips: {
        mode: "index",
        intersect: false,
      },
      legend: {
        display: false,
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        stacked: true,
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
    },
  };
};

const setTimeData = () => {
  const documentStyle = getComputedStyle(document.body);

  return {
    labels: ["0-5%", "5-10%", ">10%", "перевод на оператора"],
    datasets: [
      {
        data: [19, 42, 31, 8],
        backgroundColor: ["#76C4FF", "#B286F3", "#6FAAFB", "#D06BF3"],
      },
    ],
  };
};

const setTimeOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--text-color");

  return {
    plugins: {
      legend: {
        display: false,

        labels: {
          cutout: "60%",
          color: textColor,
        },
      },
    },
  };
};
</script>

<style scoped lang="scss">
.rate {
  display: flex;
  align-items: center;
  gap: 3px;
  padding-top: 24px;

  &-bg {
    width: 20px;
    height: 20px;
    border-radius: 4px;
  }

  span {
    color: var(--grey-02);
    font-size: 14px;
  }
}

.home {
  width: 100%;
  justify-content: center;
  display: flex;
  gap: 30px;
  align-items: flex-start;

  &__side {
    width: 100%;
    max-width: 742px;
  }
}
</style>
