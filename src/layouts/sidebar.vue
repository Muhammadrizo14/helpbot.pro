<template>
  <div class="flex">
    <Box :class="`sidebar ${expandedSidebar ? 'expanded' : 'non-expanded'}`">
      <div class="flex align-items-center justify-content-between">
        <router-link to="/"
          ><img class="sidebar__logo" src="../assets/images/Logo.png" alt=""
        /></router-link>
        <div class="burgermenu" @click="expandedSidebar = false">
          <div class="menu"></div>
          <div class="menu"></div>
          <div class="menu"></div>
        </div>
      </div>
      <Dropdown
        class="dashboard-select mt-3"
        checkmark
        v-model="selectedCity"
        :options="cities"
        optionLabel="name"
      >
        <template #dropdownicon>
          <svg
            width="12"
            height="19"
            viewBox="0 0 14 21"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6.4733 0.966068C6.76534 0.677977 7.23466 0.677977 7.5267 0.966068L13.0267 6.3916C13.3216 6.68249 13.3248 7.15735 13.0339 7.45224C12.743 7.74712 12.2682 7.75035 11.9733 7.45946L7 2.5535L2.0267 7.45946C1.73182 7.75035 1.25696 7.74712 0.966068 7.45224C0.675178 7.15735 0.678414 6.68249 0.973297 6.3916L6.4733 0.966068ZM0.966068 13.5478C1.25696 13.2529 1.73182 13.2496 2.0267 13.5405L7 18.4465L11.9733 13.5405C12.2682 13.2496 12.743 13.2529 13.0339 13.5478C13.3248 13.8426 13.3216 14.3175 13.0267 14.6084L7.5267 20.0339C7.23466 20.322 6.76534 20.322 6.4733 20.0339L0.973297 14.6084C0.678414 14.3175 0.675178 13.8426 0.966068 13.5478Z"
              fill="#14182C"
            />
          </svg>
        </template>
        <template #footer>
          <div class="dropdown__link">
            <router-link to="/settings" class="no-underline">
              <Button
                label="Создать бота"
                icon="pi pi-plus-circle"
                unstyled
                class="dropdown-btn flex gap-1 cursor-pointer"
              />
            </router-link>
          </div>
        </template>
      </Dropdown>

      <div class="sidebar__line" />

      <ul class="sidebar__list">
        <router-link to="/">
          <li
            class="flex align-items-center p-2"
            :class="route.path === '/' && 'active'"
          >
            <HomeIcon />
            <p>Обзор</p>
          </li>
        </router-link>

        <li class="flex flex-column">
          <div
            class="flex align-items-center p-2"
            :class="
              (route.path.includes('content') && 'active',
              contentSubmenu && 'activesub')
            "
            @click="contentToggle"
          >
            <contentIcon />
            <p>Контент</p>
          </div>
          <ul
            class="sidebar__submenu align-items-start"
            :style="!contentSubmenu && 'display: none; !important'"
          >
            <div class="sidebar__submenu-line" />
            <div class="w-full">
              <router-link to="/content/questions">
                <li
                  class="p-2 flex w-full justify-content-between"
                  :style="
                    route.path === '/content/questions' && {
                      color: 'var(--grey-01)',
                    }
                  "
                >
                  <p>Вопросы без ответа</p>
                  <Badge value="2" severity="danger"></Badge>
                </li>
              </router-link>
              <router-link to="/content/database">
                <li
                  class="p-2 flex w-full justify-content-between"
                  :style="
                    route.path === '/content/database' && {
                      color: 'var(--grey-01)',
                    }
                  "
                >
                  <p>База данных</p>
                </li>
              </router-link>
              <router-link to="/content/templates">
                <li
                  class="p-2 flex w-full justify-content-between"
                  :style="
                    route.path === '/content/templates' && {
                      color: 'var(--grey-01)',
                    }
                  "
                >
                  <p>Шаблоны</p>
                </li>
              </router-link>
            </div>
          </ul>
        </li>
        <router-link to="/integration">
          <li
            class="flex align-items-center p-2"
            :class="route.path === '/integration' && 'active'"
          >
            <integrationIcon />
            <p>Интеграции</p>
          </li>
        </router-link>
        <router-link to="/users">
          <li
            class="flex align-items-center p-2"
            :class="route.path === '/users' && 'active'"
          >
            <UsersIcon />
            <p>Пользователи</p>
          </li>
        </router-link>
        <router-link to="/settings">
          <li
            class="flex align-items-center p-2"
            :class="route.path === '/settings' && 'active'"
          >
            <SettingsIcon />
            <p>Настройки</p>
          </li>
        </router-link>
      </ul>

      <div class="flex align-items-end h-full sidebar__user-wrap">
        <OverlayPanel ref="userInfo">
          <div class="flex flex-column gap-3 w-25rem sidebar__user-panel">
            <ul class="flex flex-column">
              <router-link to="/payment" style="text-decoration: none">
                <li class="flex align-items-center p-1">
                  <PaymentIcon width-="10px" />
                  <p>Оплата</p>
                </li>
              </router-link>
              <router-link to="/bots" class="no-underline">
                <li
                  class="flex align-items-center p-1"
                  :class="route.path === '/bots' && 'active'"
                >
                  <svg
                    width="24px"
                    height="20px"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16,19a6.9908,6.9908,0,0,1-5.833-3.1287l1.666-1.1074a5.0007,5.0007,0,0,0,8.334,0l1.666,1.1074A6.9908,6.9908,0,0,1,16,19Z"
                    />
                    <path d="M20,8a2,2,0,1,0,2,2A1.9806,1.9806,0,0,0,20,8Z" />
                    <path d="M12,8a2,2,0,1,0,2,2A1.9806,1.9806,0,0,0,12,8Z" />
                    <path
                      d="M17.7358,30,16,29l4-7h6a1.9966,1.9966,0,0,0,2-2V6a1.9966,1.9966,0,0,0-2-2H6A1.9966,1.9966,0,0,0,4,6V20a1.9966,1.9966,0,0,0,2,2h9v2H6a3.9993,3.9993,0,0,1-4-4V6A3.9988,3.9988,0,0,1,6,2H26a3.9988,3.9988,0,0,1,4,4V20a3.9993,3.9993,0,0,1-4,4H21.1646Z"
                    />
                  </svg>
                  <p>Боты</p>
                </li>
              </router-link>
              <router-link to="/user-settings" style="text-decoration: none">
                <li class="flex align-items-center p-1">
                  <SettingsIcon />
                  <p>Настройки</p>
                </li>
              </router-link>
              <div class="sidebar__user-panel-line" />
              <li class="flex align-items-center p-1" @click="logout">
                <SingoutIcon />
                <p>Выйти</p>
              </li>
            </ul>
          </div>
        </OverlayPanel>
        <div
          class="flex align-items-center w-full border-round-lg justify-column-between"
          :class="
            (route.path === '/payment' && 'active',
            userInfoActivity === true && 'active')
          "
          @click="toggleUserInfo()"
        >
          <div class="flex align-items-center sidebar__user">
            <div class="sidebar__user-icon">И</div>
            <p>Иван Иванов</p>
          </div>
          <div class="flex flex-column user-menu gap-1">
            <div class="user-burger"></div>
            <div class="user-burger"></div>
            <div class="user-burger"></div>
          </div>
        </div>
      </div>
    </Box>
    <div :class="`${expandedSidebar && 'sidebar-wrap'}`"></div>
  </div>
  <div
    class="burgermenu tonon-expand"
    v-if="!expandedSidebar"
    @click="expandedSidebar = true"
  >
    <div class="menu"></div>
    <div class="menu"></div>
    <div class="menu"></div>
  </div>
</template>

<script setup>
import Box from "../components/box.vue";
import { computed, ref, watch } from "vue";
import HomeIcon from "../components/Icons/Sidebar/home-icon.vue";
import ContentIcon from "../components/Icons/Sidebar/content-icon.vue";
import IntegrationIcon from "../components/Icons/Sidebar/integration-icon.vue";
import UsersIcon from "../components/Icons/Sidebar/users-icon.vue";
import SettingsIcon from "../components/Icons/Sidebar/settings-icon.vue";
import PaymentIcon from "../components/Icons/Sidebar/payment-icon.vue";
import SingoutIcon from "../components/Icons/Sidebar/singout-icon.vue";
import { useRoute } from "vue-router";
import router from "../router";
import { useBotStore } from "@/stores/BotStore.ts";

const store = useBotStore();

const route = useRoute();
const contentSubmenu = ref(false);
const userInfo = ref(false);
const userInfoActivity = ref(false);
const expandedSidebar = ref(true);

const selectedCity = ref(null);

const cities = computed(() => [
  { name: store.bot, code: "MyBot" },
  { name: "Супер Бот", code: "SuperBot" },
]);

selectedCity.value = cities.value[0];
const toggleUserInfo = () => {
  userInfo.value.toggle(event);
  userInfoActivity.value = !userInfoActivity.value;
};

const logout = () => {
  window.localStorage.removeItem("token");
  router.push({ path: "/auth" });
};

const contentToggle = () => {
  contentSubmenu.value = !contentSubmenu.value;
};

watch(
  () => store.bot,
  (newBotName) => {
    selectedCity.value = { name: newBotName, code: "MyBot" };
  }
);
</script>

<style scoped lang="scss">
.sidebar-wrap {
  width: 360px;

}


.tonon-expand {
  height: fit-content;
  margin-top: 15px;
}

.burgermenu {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  padding: 5px;
  gap: 3px;

  .menu {
    width: 30px;
    height: 2px;
    background-color: black;
  }
}

.sidebar {
  position: fixed;
  height: 100vh;
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
    width: 155px;
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
        display: flex;
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
            content: "";
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
          color: var(--grey-01);
        }
      }
    }

    .active {
      background-color: var(--primary-04);
      border-radius: 8px;
      color: var(--primary-01);

      svg {
        fill: var(--primary-01);

        * {
          fill: var(--primary-01);
        }
      }
    }
  }

  &__user-wrap {
    .sidebar__user {
      width: 100%;
      padding: 8px;
      border-radius: 8px;
      cursor: pointer;
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

.non-expanded {
  transform: translateX(-380px);
}

.expanded {
  transform: translateX(0px);
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
      cursor: pointer;
      gap: 8px;

      p {
        color: var(--grey-02);
      }

      svg {
        width: 17px;
      }

      &:hover {
        background: var(--grey-07);
      }
    }
  }
}

.cls-1 {
  fill: none;
}

.dropdown__link {
  padding: 0.6rem 0.2rem;
  border-top: 1px solid var(--grey-03);

  * {
    font-size: 16px;
  }

  .dropdown-btn {
    color: #334155;
    width: 100%;
    height: 100%;
    background: transparent;
    border: 0;
    text-align: left;
  }
}

.user-menu {
  padding-right: 1rem;

  .user-burger {
    width: 5px;
    height: 5px;
    background-color: var(--grey-01);
    border-radius: 100%;
  }
}
</style>
