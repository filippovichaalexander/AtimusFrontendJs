<script setup>
import Jobs from "../components/Jobs.vue";
import JobsFilter from "../components/JobsFilter.vue";
</script>

<template>
  <main class="main">
    <div class="container">
      <div class="main__inner">
        <JobsFilter class="main__filter" />
        <Jobs class="main__jobs" />
      </div>
    </div>
  </main>
</template>
<style scoped>
.main {
  background-color: #edf1f3;
}
.container {
  margin: 0 auto;
  padding: 50px 60px;
  width: 70vw;
}
.main__inner {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}
.main__filter {
  width: 26%;
  min-width: 26%;
  max-width: 26%;
}
.main__jobs {
  width: 70%;
  min-width: 70%;
  max-width: 70%;
}
@media screen and (max-width: 1280px) {
  .container {
    padding: 40px;
  }
}
@media screen and (max-width: 680px) {
  .container {
    padding: 25px 20px;
  }
}
</style>
