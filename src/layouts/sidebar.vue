<template>
  <Box class="sidebar">
    <router-link to="/"><img class="sidebar__logo " src="../assets/images/Logo.png" alt=""></router-link>

    <Dropdown class="dashboard-select mt-3" checkmark v-model="selectedCity" :options="cities" optionLabel="name">
      <template #dropdownicon>
        <svg width="12" height="19" viewBox="0 0 14 21" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M6.4733 0.966068C6.76534 0.677977 7.23466 0.677977 7.5267 0.966068L13.0267 6.3916C13.3216 6.68249 13.3248 7.15735 13.0339 7.45224C12.743 7.74712 12.2682 7.75035 11.9733 7.45946L7 2.5535L2.0267 7.45946C1.73182 7.75035 1.25696 7.74712 0.966068 7.45224C0.675178 7.15735 0.678414 6.68249 0.973297 6.3916L6.4733 0.966068ZM0.966068 13.5478C1.25696 13.2529 1.73182 13.2496 2.0267 13.5405L7 18.4465L11.9733 13.5405C12.2682 13.2496 12.743 13.2529 13.0339 13.5478C13.3248 13.8426 13.3216 14.3175 13.0267 14.6084L7.5267 20.0339C7.23466 20.322 6.76534 20.322 6.4733 20.0339L0.973297 14.6084C0.678414 14.3175 0.675178 13.8426 0.966068 13.5478Z" fill="#14182C"/>
        </svg>
      </template>
    </Dropdown>
    
    <div class="sidebar__line"/>

    <ul class="sidebar__list">

      <router-link to="/">
        <li class="flex align-items-center p-3" :class="route.path === '/' && 'active'">
          <HomeIcon/>
          <p>Обзор</p>
        </li>
      </router-link>

      <li class="flex flex-column">
        <div class="flex align-items-center p-3" :class="route.path.includes('content') && 'active'">
          <contentIcon/>
          <p>Контент</p>
        </div>
        <ul class="sidebar__submenu flex align-items-start">
          <div class="sidebar__submenu-line"/>
          <div class="w-full">
            <router-link to="/content/questions">
              <li class="p-2 flex w-full justify-content-between" :style="route.path === '/content/questions' && {color: 'var(--grey-01)'}">
                <p>Вопросы без ответа</p>
                <Badge value="2" severity="danger"></Badge>
              </li>
            </router-link>
            <router-link to="/content/database">
              <li class="p-2  flex w-full justify-content-between" :style="route.path === '/content/database' && {color: 'var(--grey-01)'}">
              <p>База данных</p>
            </li>
            </router-link>
            <router-link to="/content/templates">
              <li class="p-2  flex w-full justify-content-between" :style="route.path === '/content/templates' && {color: 'var(--grey-01)'}">
              <p>Шаблоны</p>
            </li>
            </router-link>
          </div>
        </ul>
      </li>
      <router-link to="/integration">
        <li class="flex align-items-center p-3" :class="route.path === '/integration' && 'active'">
        <integrationIcon/>
        <p>Интеграции</p>
      </li>
      </router-link>
      <router-link to="/users">
        <li class="flex align-items-center p-3" :class="route.path === '/users' && 'active'">
        <UsersIcon/>
        <p>Пользователи</p>
      </li>
      </router-link>
      <router-link to="/settings">
        <li class="flex align-items-center p-3"  :class="route.path === '/settings' && 'active'">
        <SettingsIcon/>
        <p>Настройки</p>
      </li>
      </router-link>
    </ul>



    <div class="flex align-items-end h-full sidebar__user-wrap">
      <OverlayPanel ref="userInfo" :dismissable="false">
        <div class="flex flex-column gap-3 w-25rem sidebar__user-panel">
          <ul class="flex flex-column">
            <li class="flex align-items-center">
              <PaymentIcon width-="10px"/>
              <p>Оплата</p>
            </li>
            <li class="flex align-items-center">
              <SettingsIcon/>
              <p>Настройки</p>
            </li>
            <div class="sidebar__user-panel-line"/>
            <li class="flex align-items-center">
              <SingoutIcon/>
              <p>Выйти</p>
            </li>
          </ul>
        </div>
      </OverlayPanel>
      <div class="flex align-items-center sidebar__user " :class="userInfoActivity ? 'active' : 'asdf'" @click="toggleUserInfo()">
        <div class="sidebar__user-icon">
          И
        </div>
        <p>Иван Иванов</p>
      </div>
    </div>
  </Box>
</template>

<script setup>
import Box from '../components/box.vue'
import {ref} from "vue";
import HomeIcon from "../components/Icons/Sidebar/home-icon.vue";
import ContentIcon from "../components/Icons/Sidebar/content-icon.vue";
import IntegrationIcon from "../components/Icons/Sidebar/integration-icon.vue";
import UsersIcon from "../components/Icons/Sidebar/users-icon.vue";
import SettingsIcon from "../components/Icons/Sidebar/settings-icon.vue";
import PaymentIcon from "../components/Icons/Sidebar/payment-icon.vue";
import SingoutIcon from "../components/Icons/Sidebar/singout-icon.vue";
import {useRoute} from "vue-router";

const route = useRoute()
const userInfo = ref(false);
const userInfoActivity = ref(false);


const cities = ref([
  {name: 'МойБот', code: 'MyBot'},
  {name: 'Супер Бот', code: 'SuperBot'},
]);


const selectedCity = ref(cities.value[0]);



const toggleUserInfo = () => {
  userInfo.value.toggle(event);
  userInfoActivity.value = !userInfoActivity.value
}


</script>

<style scoped lang="scss">
.sidebar {
  width: 360px;
  min-width: 360px;
  margin: 0;
  padding: 20px;
  border-radius: 0;
  display: flex;
  flex-direction: column;
  a {
    text-decoration: none;
    color: black;
  }

  &__logo {
    width: 209px;
  }

  &__line {
    position: relative;
    width: calc(100% + 40px);
    height: 1px;
    background: var(--grey-07);
    margin: 15px 0 15px -20px;
  }

  &__list {
    padding: 0;

    li {
      cursor: pointer;
      list-style: none;

      svg {
        width: 17px;
      }

      p {
        padding-left: 10px;
      }
      .sidebar__submenu {
        margin-left: 24px;
        &-line {
          height: 90px;
          width: 1px;
          background: var(--grey-06);
        }
        li {
          position: relative;
          color: var(--grey-02);
          &:before {
            content: '';
            display: flex;
            position: absolute;
            top: 5px;
            left: 0;
            width: 12px;
            height: 12px;
            border-bottom: 1px solid var(--grey-06);
            border-bottom-left-radius: 3px 4px;
          }
        }
        .active-sub {
          color: var(--grey-01)
        }
      }
    }


    .active {
      background-color: var(--primary-04);
      border-radius: 8px;
      color: var(--primary-01);

      svg {
        * {
          fill: var(--primary-01)
        }
      }
    }
  }

  &__user-wrap {
    .sidebar__user {
      width: 100%;
      padding: 8px;
      border-radius: 8px;
      cursor:pointer;
      gap: 20px;
      p {
        text-transform: capitalize;
      }
      &-icon {
        padding: 6px 11px;
        background: var(--primary-04);
        border-radius: 100%;
      }
    }
    .active {
      background: var(--primary-04);
      .sidebar__user-icon {
        background: var(--grey-09);
      }
    }
  }
}

.sidebar__user-panel {
  width: 200px !important;
  ul {
    gap: 4px;
    .sidebar__user-panel-line {
        width: 100%;
        height: 1px;
        background: var(--grey-07);
    }
    li {
      padding: 8px;
      cursor: pointer;
      gap: 8px;
      p {
       color: var(--grey-02);
      }
      svg {
        width: 17px;
      }
      &:hover {
        background: var(--grey-07)
      }
    }
  }
}
</style>