<template>
  <div class="pt-3">
    <div class="flex items-center gap-2">
      <h1 class="text-[32px] font-medium">Настройка продолжительности рабочего дня</h1>
      <InputSwitch
          input-id="switch"
          input-class="default-switch"
          v-model="data.schedule"
      />
    </div>
    <div class="flex items-stretch gap-5 pt-3">
      <div class="flex flex-col gap-2">
        <p :class="!data.schedule && 'text-[#747783]'">рабочие часы <br> (по умолчанию)</p>
        <div class="flex items-center gap-2">
          <InputMask type="text" mask="99:99" class="text-center w-[73px] border border-grey-04 p-2 schedule__input"
                     v-model="data.defaultWorkTimeStart" placeholder="8:00" :disabled="!data.schedule"/>
          <InputMask type="text" mask="99:99" class="text-center w-[73px] border border-grey-04 p-2 schedule__input"
                     v-model="data.defaultWorkTimeFinish" placeholder="19:00" :disabled="!data.schedule"/>
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <p :class="!data.schedule && 'text-[#747783]'">изменить <br> часовой пояс</p>
        <div class="flex items-center gap-2">
          <Dropdown v-model="data.workTimeZone" :options="UTC" class="w-[20px] md:w-fit schedule__dropdown"
                    :disabled="!data.schedule"/>
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <div class="flex relative">
          <p :class="!data.schedule && 'text-[#747783]'">
            производственный <br> календарь
            <button class="bg-transparent border-none inline-flex align-middle ml-1 p-1"
                    @mouseenter="calendarinfo = true" @mouseleave="calendarinfo = false">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M7.57143 8.75C7.57143 8.33579 7.90721 8 8.32143 8H9.75C10.1642 8 10.5 8.33579 10.5 8.75V13H11.75C12.1642 13 12.5 13.3358 12.5 13.75C12.5 14.1642 12.1642 14.5 11.75 14.5H7.75C7.33579 14.5 7 14.1642 7 13.75C7 13.3358 7.33579 13 7.75 13H9V9.5H8.32143C7.90721 9.5 7.57143 9.16421 7.57143 8.75Z"
                      fill="#14182C"/>
                <path
                    d="M10.75 5.75C10.75 6.30228 10.3023 6.75 9.75 6.75C9.19772 6.75 8.75 6.30228 8.75 5.75C8.75 5.19772 9.19772 4.75 9.75 4.75C10.3023 4.75 10.75 5.19772 10.75 5.75Z"
                    fill="#14182C"/>
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M9.75 1.5C5.19365 1.5 1.5 5.19365 1.5 9.75C1.5 14.3063 5.19365 18 9.75 18C14.3063 18 18 14.3063 18 9.75C18 5.19365 14.3063 1.5 9.75 1.5ZM0 9.75C0 4.36522 4.36522 0 9.75 0C15.1348 0 19.5 4.36522 19.5 9.75C19.5 15.1348 15.1348 19.5 9.75 19.5C4.36522 19.5 0 15.1348 0 9.75Z"
                      fill="#14182C"/>
              </svg>
            </button>
          </p>
          <div
              class="absolute bg-white p-3 top-[100%] left-[75%]  rounded-xl w-[427px] border border-solid border-[#C4C7D3]"
              style="box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.07)" v-if="calendarinfo">
            <p class="text-[16px] ">разновидность календаря, в которой указаны рабочие, выходные и праздничные дни за
              каждый месяц, квартал и год.</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <InputSwitch
              input-id="switch"
              input-class="default-switch"
              v-model="data.calendar"
              :disabled="!data.schedule"
          />
        </div>
      </div>
    </div>
    <div class="pt-3 w-fit">
      <p class="text-grey-01">настройте по дням недели</p>
      <div class="flex items-stretch gap-10">
        <div class="flex items-center flex-col gap-2 pt-3" v-for="day in week" :key="day">
          <p :class="!data.schedule && 'text-[#747783]'">{{ translateDayToRussian(day.day_of_week).short }}</p>
          <InputMask type="text" mask="99:99" class="text-center w-[73px] border border-grey-04 p-2 schedule__input"
                     :disabled="!data.schedule || day.is_working_day"
                     v-model="day.start_time"
                     placeholder="8:00"/>
          <InputMask type="text" mask="99:99" class="text-center w-[73px] border border-grey-04 p-2 schedule__input"
                     :disabled="!data.schedule || day.is_working_day"
                     v-model="day.end_time"
                     placeholder="19:00"/>
          <p class="text-[#747783]">выходной</p>
          <Checkbox :disabled="!data.schedule" :binary="true" class="schedule__checkbox" v-model="day.is_working_day"/>
        </div>
      </div>

      <p v-if="loading">loading</p>
      <Button label="Сохранить" class="mt-3 w-fit flex ml-auto py-[10px] px-[22px]" type="submit" :loading="loading"
              @click="changeSchedule()" :disabled="!data.schedule"/>
    </div>

  </div>
</template>

<script setup>
import {reactive, ref, watch} from "vue";
import {useScheduleStore} from "../../../stores/ScheduleStore";
import getTimezoneFromOffset, {getOffsetFromTimezone, translateDayToRussian} from "../../../util/helpers";
import {useToast} from "primevue/usetoast";

const store = useScheduleStore()
const toast = useToast();




const week = ref(JSON.parse(JSON.stringify(store.schedule.week)))
const loading = ref(false);
const UTC = ref([
  "UTC-12",
  "UTC-11",
  "UTC-10",
  "UTC-9",
  "UTC-8",
  "UTC-7",
  "UTC-6",
  "UTC-5",
  "UTC-4",
  "UTC-3",
  "UTC-2",
  "UTC-1",
  "UTC+0",
  "UTC+1",
  "UTC+2",
  "UTC+3",
  "UTC+4",
  "UTC+5",
  "UTC+6",
  "UTC+7",
  "UTC+8",
  "UTC+9",
  "UTC+10",
  "UTC+11",
  "UTC+12",
]);


const getChangedDays = () => {
  const changedDays = [];
  week.value.forEach((day, index) => {
    const originalDay = store.schedule.week[index];
    if (
        day.start_time !== originalDay.start_time ||
        day.end_time !== originalDay.end_time ||
        day.is_working_day !== originalDay.is_working_day
    ) {
      changedDays.push({
        day_of_week: day.day_of_week,
        start_time: day.start_time,
        end_time: day.end_time,
        is_working_day: day.is_working_day,
      });
    }
  });
  return changedDays;
};

const data = reactive({
  schedule: store.schedule.scheduleActive,
  calendar: store.schedule.calendar,
  defaultWorkTimeStart: store.schedule.defaultWorkTimeStart,
  defaultWorkTimeFinish: store.schedule.defaultWorkTimeFinish,
  workTimeZone: store.schedule.defaultUTC,
});



const changeSchedule = async () => {
  loading.value = true;

  const changedDays = getChangedDays();

  try {
    if (changedDays.length > 0) {
      await store.update_day_week(changedDays);  // Make sure this returns a promise
    }

    if (data.schedule !== store.schedule.scheduleActive && data.schedule) {
      store.schedule.scheduleActive = true;
      await store.set_custom();  // Make sure this is asynchronous if necessary
    }

    if (data.calendar !== store.schedule.calendar && data.calendar === true) {
      await store.set_prod();  // Make sure this is asynchronous if necessary
    }

    if (data.calendar !== store.schedule.calendar) {
      store.turnoff(false);  // Assuming this is synchronous, otherwise add await
    }

    if (data.defaultWorkTimeFinish !== store.schedule.defaultWorkTimeFinish ||
        data.defaultWorkTimeStart !== store.schedule.defaultWorkTimeStart) {
      await store.update_time(data.defaultWorkTimeStart, data.defaultWorkTimeFinish);  // Make sure this is a promise
    }

    if (data.workTimeZone !== store.schedule.defaultUTC) {
      await store.update_timezone(getTimezoneFromOffset(data.workTimeZone));  // Ensure this is async
    }
  } catch (error) {
    toast.add({severity: 'error', summary: 'Ошибка при выполнение операции попробуйте позже.', life: 3000});
  } finally {
    toast.add({severity: 'success', summary: 'Успешно изменили расписание', life: 3000});
    loading.value = false;
  }
};


watch(
    () => data.schedule,
    (newValue) => {
      if (!newValue) {
        store.turnoff(true);
      }
    }
);
const calendarinfo = ref(false)
</script>

<style lang="scss" scoped>

</style>
