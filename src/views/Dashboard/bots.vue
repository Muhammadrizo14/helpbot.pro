<template>
  <div>
    <h1>Боты</h1>

    <div class="bots__wrap pt-3">
      <Box class="bot">
        <div class="bot__background1"></div>
        <div class="bot__text">
          <h1>МойБот1</h1>
          <p class="text-500 pt-2">url</p>
        </div>
      </Box>
      <Box class="bot">
        <div class="bot__background2"></div>
        <div class="bot__text">
          <h1>СуперБот</h1>
          <p class="text-500 pt-2">url</p>
        </div>
      </Box>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped lang="scss">
.bots__wrap {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 30px;

  .bot {
    transition: all 0.6s ease;
    cursor: pointer;
    padding: 0px;
    margin: 0;

    &__background1 {
      width: 100%;
      height: 200px;
      background-image: url("@/assets/images/bg1.svg");
    }

    &__background2 {
      width: 100%;
      height: 200px;
      background-image: url("@/assets/images/bg2.svg");
    }

    &__text {
      padding: 20px;
    }

    &:hover {
      box-shadow: 0px 10px 23px 0px rgba(103, 96, 124, 0.2);
    }
  }
}
</style>
