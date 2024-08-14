<template>
  <div class="home">
    <div class="home__side">
      <Box class="flex align-items-end gap-3 p-3 m-0 justify-content-between">
        <div style="width: 70%">
          <h1 class="pb-3">{{ bot.selectedBot.name }}</h1>
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
          <router-link to="/payment">
            <Button>Пополнить</Button>
          </router-link>
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
            :data="supportData"
            :options="supportOptions"
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
            :data="averageCountTokenData"
            :options="averageCountTokenChart"
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
                <p>{{ percentages[0] }}%</p>
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
                <p>{{ percentages[1] }}%</p>
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
                <p>{{ percentages[2] }}%</p>
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
                <p>{{ percentages[3] }}%</p>
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
        <Button @click="downloadAnalytic">Выгрузить аналитику</Button>
      </Box>
    </div>
  </div>
</template>
`
<script setup>
import { ref, onMounted, watch } from "vue";
import { useStaticStore } from "../../stores/StaticStore";
import { useBotStore } from "../../stores/BotStore";

const statics = useStaticStore();
const bot = useBotStore();

const periods = ref([{ name: "неделя" }, { name: "месяц" }]);

const selectedPeriod = ref(periods.value[0]);
const selectedPeriodOfSupport = ref(periods.value[0]);
const selectedPeriodOfQuantity = ref(periods.value[0]);

watch(selectedPeriodOfQuantity, async (newValue, oldValue) => {
  await setQuantityData(newValue);
});

watch(selectedPeriodOfSupport, async (newValue, oldValue) => {
    await setSupportData(newValue);
});

onMounted(async () => {
  supportData.value = await setSupportData(selectedPeriodOfSupport.value);
  supportOptions.value = setSupportOptions();
  averageCountTokenData.value = setAverageCountTokenData();
  averageCountTokenChart.value = setAverageCountTokenChart();
  quantityData.value = await setQuantityData(selectedPeriodOfQuantity.value);
  quantityOptions.value = setQuantityOptions();
  timeData.value = await setTimeData();
  timeOptions.value = setTimeOptions();
});

const quantityData = ref();
const quantityOptions = ref();
const timeData = ref();
const timeOptions = ref();
const supportData = ref();
const supportOptions = ref();
const percentages = ref([]);

const supportDataset = ref()


const downloadAnalytic = () => {
  statics.downloadAnalytic().then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;

    // Set the file name (you might get this from the response headers)
    const contentDisposition = response.headers["content-disposition"];
    let fileName = "statistics.xlsx"; // Default file name

    if (contentDisposition) {
      const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
      if (fileNameMatch.length === 2) fileName = fileNameMatch[1];
    }

    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
};

const setSupportData = async (type) => {
  const dataset = {
    labels: [],
    datasets: [
      {
        type: "bar",
        label: "5★",
        backgroundColor: "#76C4FF",
        data: [],
        borderRadius: 4,
      },
      {
        type: "bar",
        label: "4★",
        backgroundColor: "#6FAAFB",
        data: [],
        borderRadius: 4,
      },
      {
        type: "bar",
        label: "3★",
        backgroundColor: "#949cea",
        data: [],
        borderRadius: 4,
      },
      {
        type: "bar",
        label: "2★",
        backgroundColor: "#b286f3",
        data: [],
        borderRadius: 4,
      },
      {
        type: "bar",
        label: "1★",
        backgroundColor: "#d06bf3",
        data: [],
        borderRadius: 4,
      },
    ],
  }

  const period = type.name === "неделя" ? "week" : "month";
  const { data } = await statics.getGrades(period);

  const formatter = new Intl.DateTimeFormat("ru", { month: "short" });
  const datasets = dataset.datasets;

  const labels = data.map(item => {
    const { grade_1, grade_2, grade_3, grade_4, grade_5, day } = item;

    // Push data to datasets
    datasets[0].data.push(grade_5);
    datasets[1].data.push(grade_4);
    datasets[2].data.push(grade_3);
    datasets[3].data.push(grade_2);
    datasets[4].data.push(grade_1);

    const dateObj = new Date(day);
    const month = formatter.format(dateObj);

    return `${dateObj.getDate()} ${month}`;
  });

  dataset.labels = labels;


  supportDataset.value = dataset.datasets
  return dataset;
};


const setSupportOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--text-color");
  const textColorSecondary = documentStyle.getPropertyValue(
    "--text-color-secondary"
  );
  const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

  let cumulativeSums = [];

  // Iterate through each dataset
  supportDataset.value.forEach((dataset) => {
    dataset.data.forEach((entry, i) => {
      // Check if cumulativeSums array has enough elements, if not, append 0
      if (i >= cumulativeSums.length) {
        cumulativeSums.push(0);
      }

      // Add the value of entry directly to the cumulative sum for that index
      cumulativeSums[i] += entry;
    });
  });

  let maxSum = Math.max(...cumulativeSums);

  if (maxSum < 10) {
    maxSum += 2; // Add a fixed value for smaller sums
  } else {
    maxSum *= 1.2; // Add 20% padding for larger sums
  }

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
        max: maxSum,
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

const averageCountTokenData = ref();

const averageCountTokenChart = ref();

const setAverageCountTokenData = () => {
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
const setAverageCountTokenChart = () => {
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

const setQuantityData = async (type) => {
  const dataset = {
    labels: [],
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

  try {
    const { data } = await statics.getRequests(
      `${type.name === "неделя" ? "week" : "month"}`
    );
    const formatter = new Intl.DateTimeFormat("ru", { month: "short" });

    const res = data.map((item) => {
      const dateObj = new Date(item.date.replace(/-/g, ","));
      const month2 = formatter.format(dateObj);
      return `${dateObj.getDate()} ${month2}`;
    });

    dataset.labels = res;
  } catch (error) {
    console.error("Failed to fetch data", error);
  }

  return dataset;
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

const setTimeData = async () => {
  const dataset = {
    labels: ["0-5%", "5-10%", ">10%", "перевод на оператора"],
    datasets: [
      {
        data: [1, 2, 4, 5],
        backgroundColor: ["#76C4FF", "#B286F3", "#6FAAFB", "#D06BF3"],
      },
    ],
  };

  await statics.getTime().then(({ data }) => {
    const statics = [
      data[0].resolved_0_5,
      data[0].resolved_5_10,
      data[0].resolved_10_plus,
      data[0].redirected_to_operator,
    ];

    const total = statics.reduce((sum, value) => sum + value, 0);
    const calculatedPercentages = statics.map((value) =>
      ((value / total) * 100).toFixed()
    );

    percentages.value = calculatedPercentages;

    dataset.datasets[0].data = statics;
  });

  return dataset;
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
