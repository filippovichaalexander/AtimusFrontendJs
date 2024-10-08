<template>
  <div>
    <div v-if="jobsStore.filteredJobs.length > 0">
      <h2>Найдено: {{ jobsStore.filteredJobs.length }} вакансии</h2>
      <div class="jobs">
        <Job
          v-for="(job, idx) in jobsStore.filteredJobs"
          :key="idx"
          :job="job"
        />
      </div>
    </div>
    <h2 v-else>Вакансий не найдено</h2>
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
  margin-top: 30px;
}
</style>
