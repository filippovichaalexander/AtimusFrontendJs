<template>
  <div>
    <h2>Поиск по категориям</h2>
    <select
      name="region"
      id="region"
      class="filter__item"
      v-model="selectedRegion"
    >
      <option value="">Выберите регион</option>
      <option v-for="region in regionNames" :key="region" :value="region">
        {{ region }}
      </option>
    </select>

    <select name="city" id="city" class="filter__item" v-model="selectedCity">
      <option value="">Выберите город</option>
      <option v-for="city in cityNames" :key="city" :value="city">
        {{ city }}
      </option>
    </select>

    <select
      name="organisation"
      id="organisationNames"
      class="filter__item"
      v-model="selectedOrganisation"
    >
      <option value="">Выберите организацию</option>
      <option
        v-for="organisation in organisationNames"
        :key="organisation"
        :value="organisation"
      >
        {{ organisation }}
      </option>
    </select>
  </div>
</template>
<script setup>
import { useJobsStore } from "../stores/jobs";

import { computed, ref } from "vue";

const jobsStore = useJobsStore();

const regionNames = computed(() => {
  if (!jobsStore.jobs || jobsStore.jobs.length === 0) {
    return null;
  }

  let regions = Array.from(
    new Set(jobsStore.jobs.map((j) => j.regionname?.trim() || ""))
  );
  regions = regions.filter((region) => region !== "");

  return regions;
});

const cityNames = computed(() => {
  if (!jobsStore.jobs || jobsStore.jobs.length === 0) {
    return null;
  }

  let cities = Array.from(
    new Set(jobsStore.jobs.map((j) => j.placetitle?.trim() || ""))
  );
  cities = cities.filter((city) => city !== "");

  return cities;
});

const organisationNames = computed(() => {
  let organisations = Array.from(
    new Set(jobsStore.jobs.map((j) => j.clientname))
  );
  return organisations.map((organisation) => {
    if (organisation.includes("(") && organisation.includes(")")) {
      const startIndex = organisation.indexOf("(");
      const endIndex = organisation.indexOf(")");
      return organisation.slice(startIndex + 1, endIndex);
    }
    return organisation;
  });
});

const selectedRegion = ref("");
const selectedCity = ref("");
const selectedOrganisation = ref("");
</script>
