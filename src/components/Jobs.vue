<!-- Jobs.vue -->
<template>
  <div>
    <p>Найдено: 2 вакансии</p>
    <div class="jobs">
      <Job v-for="job in jobsStore.jobs" :key="job.vacancy_id" :job="job" />
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount } from "vue";
import { useJobsStore } from "../stores/jobs";
import Job from "./Job.vue";

const jobsStore = useJobsStore();
onBeforeMount(() => {
  jobsStore.setJobs();
});
</script>
<style scoped>
.jobs {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
}
</style>
