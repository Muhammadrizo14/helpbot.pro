<template>
  <div>
    <h1>Настройки</h1>

    <TabMenu
      v-model:activeIndex="active"
      :model="items"
      class="settings-tabmenu pt-3"
    />

    <form @submit.prevent="changeName" class="pt-5" v-if="active === 0">
      <div class="flex flex-column gap-2 pb-3">
        <label for="title">
          <p>Название</p>
        </label>
        <InputText
          v-model="data.title"
          class="w-25rem"
          :invalid="v$.title.$errors.length > 0"
          id="title"
          placeholder="Название"
          aria-describedby="username-help"
        />
        <label
          for="login__form-title"
          v-for="error in v$.title.$errors"
          :key="error.$uid"
          style="color: var(--red)"
          >{{ error.$message }}</label
        >
      </div>
      <Button
        type="submit"
        label="Сохранить"
        class="px-3 py-2 border-round-lg"
      />
    </form>

    <form class="pt-5" v-if="active === 1">
      <div class="flex flex-column gap-2 pb-3">
        <label for="title">
          <p>Полностью удалите данные бота</p>
        </label>
        <!--        <InputText v-model="data.title" class="w-25rem" :invalid="v$.title.$errors.length > 0" id="title"-->
        <!--                   placeholder="Название" aria-describedby="username-help"/>-->
        <p :style="{ color: 'var(--grey-02)', width: '360px' }">
          Если вы удалите бота, пути назад уже не будет. Пожалуйста, будьте
          уверены.
        </p>
      </div>
      <Button
        label="Удалить этого бота"
        icon="pi pi-trash"
        severity="danger"
        outlined
        class="px-3 py-2 border-round-lg"
        @click="sureDialog = true"
      />
    </form>

    <Dialog
      v-model:visible="sureDialog"
      modal
      header="Вы абсолютно уверены?"
      :draggable="false"
    >
      <span class="p-text-secondary block mb-5 w-27rem">
        Это действие не может быть отменено. Это приведет к безвозвратному
        удалению вашего бота и его данных с наших серверов..
      </span>

      <div class="flex flex-column gap-2 pb-4">
        <label for="title" class="database-add__label"
          >Пожалуйста, введите название бота для продолжения</label
        >
        <InputText
          id="title"
          placeholder="Название бота"
          v-model="data.title"
        />
      </div>

      <div class="flex justify-content-center gap-2">
        <Button
          type="button"
          label="Отмена"
          @click="(sureDialog = false), (data.title = '')"
        ></Button>
        <Button
          type="button"
          label="Удалить"
          :severity="data.title === store.selectedBot.name ? 'danger' : ''"
          outlined
          :disabled="data.title !== store.selectedBot.name"
          icon="pi pi-trash"
          @click="deleteBot"
        ></Button>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { useBotStore } from "../../stores/BotStore";
import { reactive, ref, watch } from "vue";
import { email, helpers, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const store = useBotStore();

const sureDialog = ref(false);

const data = reactive({
  title: '',
});

const customMessages = {
  required: "Это поле не может быть пустым",
};

const rules = {
  title: {
    required: helpers.withMessage(customMessages.required, required),
  },
};

const v$ = useVuelidate(rules, data);

const active = ref(0);
const items = ref([{ label: "Название бота" }, { label: "Удаление" }]);

const deleteBot = () => {
  data.title = "";
  sureDialog.value = false;
  store.deleteBot(store.selectedBot.id)
    .then(()=>{
      toast.add({ severity: 'success', summary: 'Успешно', detail: 'Бот успешно удалено', life: 3000 });
    })
};

watch(sureDialog, (newState) => {
  if (newState === false) {
    data.title = store.bot;
  }
  if (newState === true) {
    data.title = "";
  }
});

const changeName = async () => {
  const result = await v$.value.$validate();
  if (!result) {
    toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Поле не может быть пустым', life: 3000 });
    return;
  }

  const newData = {
    name: data.title,
    is_active: store.selectedBot.is_active,
    welcome_message: store.selectedBot.welcome_message,
    operator_switch_message: store.selectedBot.operator_switch_message,
    feedback_message: store.selectedBot.feedback_message
  }

  store.editBot(newData)
};
</script>

<style scoped lang="scss">
.settings {
  &-tabmenu {
  }
}
</style>
