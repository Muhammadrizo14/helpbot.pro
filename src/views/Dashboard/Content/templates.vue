<template>
  <div>
    <h1>Шаблоны</h1>
    <p>Задайте шаблоны сообщений для различных сценарий работы бота</p>


    <form>
      <div class="flex flex-column gap-2">
        <label for="email">Приветственное сообщение</label>
        <Textarea id="question" placeholder="Разместите контент здесь" rows="6" :autoResize="false"
                  v-model="data.answer"
                  :invalid="v$.answer.$errors.length > 0"/>
        <label for="login__form-email" v-for="error in v$.email.$errors" :key="error.$uid"
               style="color: var(--red)">{{ error.$message }}</label>
      </div>
    </form>
  </div>
</template>

<script setup>
</script>

<style scoped lang="scss">

</style>