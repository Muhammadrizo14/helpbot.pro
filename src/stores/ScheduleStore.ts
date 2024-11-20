import {defineStore} from "pinia";
import {useBotStore} from "./BotStore";
import axios from "axios";
import {apiUrl} from "../main";
import {ref} from "vue";
import getTimezoneFromOffset, {formatDate, getOffsetFromTimezone, getTime} from "../util/helpers";

type IDay = {
  start_time: string,
  end_time: string,
  schedule_day: string,
  day_of_week: string,
  is_working_day: boolean,
  timezone: string,
  day_type: string,
  is_custom: boolean,
  is_active: boolean
}

type ISchedule = {
  defaultUTC: string,
  scheduleActive: boolean, // Is whole schedule is active
  calendar: boolean, // Is prod calendar is active
  week: IDay[] | string[], // here is only one week from 366 days -- in order to not to call 366
  scheduleList: IDay[], // here all days
  defaultWorkTimeStart: string,
  defaultWorkTimeFinish: string,
}


export const useScheduleStore = defineStore("schedule", () => {
  const schedule = ref<ISchedule>({
    defaultUTC: 'UTC+2',
    scheduleActive: false,
    calendar: false,
    week: [],
    scheduleList: [],
    defaultWorkTimeStart: '',
    defaultWorkTimeFinish: '',
  })

  const promises = ref([])


  const get_schedule = async () => {
    const store = useBotStore();

    const today = new Date();

    let is_custom = false

    await axios.get(`${apiUrl}/schedule/get_schedule?bot_id=${store.selectedBot.id}&year=${new Date().getFullYear()}&is_custom=${is_custom}&is_active=false`,
      {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      }
    ).then((res) => {
      schedule.value.calendar = res.data.length > 0;
      if (res.data.length === 0) {
        is_custom = true;
      }
    })


    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);

      const formattedDate = formatDate(date);

      const promise = axios.get(`${apiUrl}/schedule/get_day?bot_id=${store.selectedBot.id}&date=${formattedDate}&is_custom=${is_custom}`,
        {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        }
      ).then((res) => {
          schedule.value.scheduleActive = true
          schedule.value.week.push({
            ...res.data,
            is_working_day: !res.data.is_working_day,
            start_time: getTime(res.data.start_time),
            end_time: getTime(res.data.end_time)
          });
        })
        .catch((error) => {
          //turn on log if its needed
          // console.log(error)
        });

      promises.value.push(promise);
    }

    Promise.all(promises.value).then(() => {
      if (schedule.value.week.length === 0) {
        schedule.value.week = [{
          "start_time": "06:00:00",
          "end_time": "18:00:00",
          "schedule_day": "2024-11-11",
          "day_of_week": "Monday",
          "is_working_day": false,
          "timezone": "Europe/Moscow",
          "day_type": "WORK",
          "is_custom": true,
          "is_active": false
        }, {
          "start_time": "06:00:00",
          "end_time": "18:00:00",
          "schedule_day": "2024-11-12",
          "day_of_week": "Tuesday",
          "is_working_day": false,
          "timezone": "Europe/Moscow",
          "day_type": "WORK",
          "is_custom": true,
          "is_active": false
        }, {
          "start_time": "06:00:00",
          "end_time": "18:00:00",
          "schedule_day": "2024-11-13",
          "day_of_week": "Wednesday",
          "is_working_day": false,
          "timezone": "Europe/Moscow",
          "day_type": "WORK",
          "is_custom": true,
          "is_active": false
        }, {
          "start_time": "06:00:00",
          "end_time": "18:00:00",
          "schedule_day": "2024-11-14",
          "day_of_week": "Thursday",
          "is_working_day": false,
          "timezone": "Europe/Moscow",
          "day_type": "WORK",
          "is_custom": true,
          "is_active": false
        }, {
          "start_time": "06:00:00",
          "end_time": "18:00:00",
          "schedule_day": "2024-11-15",
          "day_of_week": "Friday",
          "is_working_day": false,
          "timezone": "Europe/Moscow",
          "day_type": "WORK",
          "is_custom": true,
          "is_active": false
        }, {
          "start_time": "06:00:00",
          "end_time": "18:00:00",
          "schedule_day": "2024-11-09",
          "day_of_week": "Saturday",
          "is_working_day": true,
          "timezone": "Europe/Moscow",
          "day_type": "WEEKEND",
          "is_custom": true,
          "is_active": false
        }, {
          "start_time": "06:00:00",
          "end_time": "18:00:00",
          "schedule_day": "2024-11-10",
          "day_of_week": "Sunday",
          "is_working_day": true,
          "timezone": "Europe/Moscow",
          "day_type": "WEEKEND",
          "is_custom": true,
          "is_active": false
        }]
      }
      schedule.value.week.sort((a, b) => {
        const dayOrder = [1, 2, 3, 4, 5, 6, 0]; // Monday = 1, ..., Sunday = 0

        const dayOfWeekA = new Date(a.schedule_day).getDay();
        const dayOfWeekB = new Date(b.schedule_day).getDay();

        // Sort according to the custom dayOrder array
        return dayOrder.indexOf(dayOfWeekA) - dayOrder.indexOf(dayOfWeekB);
      });


      schedule.value.defaultUTC = schedule.value.week.length !== 0 && getOffsetFromTimezone(schedule.value?.week[0].timezone);
      schedule.value.defaultWorkTimeStart = schedule.value.week.length !== 0 && schedule.value?.week[0].start_time
      schedule.value.defaultWorkTimeFinish = schedule.value.week.length !== 0 && schedule.value?.week[0].end_time

    }).catch((error) => {
      console.error('Error waiting for all requests to complete:', error);
    });
  };


  const get_day = () => {
    const store = useBotStore()

    return axios.get(`${apiUrl}/schedule/get_day?bot_id=${store.selectedBot.id}&date=${new Date().toLocaleDateString("en-CA")}`, {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    })
  }
  const set_prod = () => {
    const store = useBotStore()

    return axios.post(`${apiUrl}/schedule/set_prod?bot_id=${store.selectedBot.id}`, {}, {
      headers: {
        'Accept': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    })
  }

  const set_custom = () => {
    const store = useBotStore()

    return axios.post(`${apiUrl}/schedule/generate_custom_calendar?bot_id=${store.selectedBot.id}&year=${new Date().getFullYear()}&start_time=06%3A00%3A00&end_time=18%3A00%3A00`, {
      "days": {
        "monday": {
          "start_time": "06:00:00",
          "end_time": "18:00:00",
          "is_working_day": true,
          "timezone": "Europe/Moscow",
          "day_type": "WORK"
        },
        "tuesday": {
          "start_time": "06:00:00",
          "end_time": "18:00:00",
          "is_working_day": true,
          "timezone": "Europe/Moscow",
          "day_type": "WORK"
        },
        "wednesday": {
          "start_time": "06:00:00",
          "end_time": "18:00:00",
          "is_working_day": true,
          "timezone": "Europe/Moscow",
          "day_type": "WORK"
        },
        "thursday": {
          "start_time": "06:00:00",
          "end_time": "18:00:00",
          "is_working_day": true,
          "timezone": "Europe/Moscow",
          "day_type": "WORK"
        },
        "friday": {
          "start_time": "06:00:00",
          "end_time": "18:00:00",
          "is_working_day": true,
          "timezone": "Europe/Moscow",
          "day_type": "WORK"
        },
        "saturday": {
          "start_time": "06:00:00",
          "end_time": "18:00:00",
          "is_working_day": false,
          "timezone": "Europe/Moscow",
          "day_type": "WEEKEND"
        },
        "sunday": {
          "start_time": "06:00:00",
          "end_time": "18:00:00",
          "is_working_day": false,
          "timezone": "Europe/Moscow",
          "day_type": "WEEKEND"
        }
      }
    }, {
      headers: {
        'Accept': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    }).then(() => {
      get_schedule()
    })
  }


  // Change default time of working
  const update_time = (starts, ends) => {
    const store = useBotStore()

    return axios.patch(`${apiUrl}/schedule/update_time?bot_id=${store.selectedBot.id}&is_custom=${(schedule.value.calendar !== true)}`, {
      "start_time": starts,
      "end_time": ends,
      "day_type": "WORK"
    }, {
      headers: {
        'Accept': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    })
  }

  const update_timezone = (timezone) => {
    const store = useBotStore()

    return axios.patch(`${apiUrl}/schedule/update_timezone?bot_id=${store.selectedBot.id}&timezone=${timezone}&is_custom=${(schedule.value.calendar !== true)}`, {}, {
      headers: {
        'Accept': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    })
  }


  const update_day_week = (changedDays: IDay[]) => {
    const store = useBotStore()


    console.log(changedDays)

    for (let i = 0; i < changedDays.length; i++) {
      axios.patch(`${apiUrl}/schedule/update_day_week?bot_id=${store.selectedBot.id}&is_custom=${(schedule.value.calendar !== true)}`, {
        "day_of_week": schedule.value.calendar === true ? changedDays[i].day_of_week.charAt(0).toUpperCase() + changedDays[i].day_of_week.slice(1) : changedDays[i].day_of_week.charAt(0).toLocaleLowerCase() + changedDays[i].day_of_week.slice(1),
        "start_time": `${changedDays[i].start_time}`,
        "end_time": `${changedDays[i].end_time}`,
        "day_type": changedDays[i].is_working_day === false ? 'WORK' : 'WEEKEND',
        "is_working_day": !changedDays[i].is_working_day
      }, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      })
    }
  }


  // waiting for income -- is it custom? type-boolean
  const turnoff = (custom) => {
    const store = useBotStore()

    return axios.delete(`${apiUrl}/schedule/delete_schedule?bot_id=${store.selectedBot.id}&is_custom=${custom}`, {
      headers: {
        'Accept': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    }).then(() => {
      schedule.value.calendar = false
      if (custom === true) {
        schedule.value.scheduleActive = false
        schedule.value.calendar = false
        axios.delete(`${apiUrl}/schedule/delete_schedule?bot_id=${store.selectedBot.id}&is_custom=${false}`, {
          headers: {
            'Accept': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        })
      }
    })
  }

  return {
    set_prod,
    get_schedule,
    get_day,
    schedule,
    update_time,
    update_timezone,
    turnoff,
    set_custom,
    update_day_week
  };
});
