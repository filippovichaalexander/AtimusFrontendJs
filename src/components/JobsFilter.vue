<template>
  <div>
    <h2>Поиск по категориям:</h2>
    <div class="filters">
      <CustomSelect
        label="Регион"
        class="filters__item"
        :options="regionNames"
        :placeholder="'Выберите регион'"
        :modelValue="selectedRegion"
        @update:modelValue="setRegionFilter"
        defaultOptionText="Все регионы"
      />
      <CustomSelect
        label="Город"
        class="filters__item"
        :options="cityNames"
        :placeholder="'Выберите город'"
        :modelValue="selectedCity"
        @update:modelValue="setCityFilter"
        defaultOptionText="Все города"
      />
      <CustomSelect
        label="Организация"
        :options="organisationNames"
        :placeholder="'Выберите организацию'"
        :modelValue="selectedOrganisation"
        @update:modelValue="setOrganisationFilter"
        defaultOptionText="Все организации"
      />
    </div>
  </div>
</template>
<script setup>
import { useJobsStore } from "../stores/jobs";
import CustomSelect from "./CustomSelect.vue";

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

const setRegionFilter = (value) => {
  jobsStore.setRegionFilter(value);
  selectedRegion.value = value;
};
const setCityFilter = (value) => {
  jobsStore.setCityFilter(value);
  selectedCity.value = value;
};
const setOrganisationFilter = (value) => {
  jobsStore.setOrganisationFilter(value);
  selectedOrganisation.value = value;
};
</script>
<style scoped>
.filters {
  background-color: #fff;
  padding: 20px;
  border-radius: 12px;
  margin-top: 30px;
}
.filters__item {
  margin-bottom: 30px;
}
</style>
