<template>
  <div>
    <h2>Поиск по категориям</h2>
    <select
      name="region"
      id="region"
      class="filter__item"
      v-model="selectedRegion"
      @change="setRegionFilter(selectedRegion)"
    >
      <option value="">Выберите регион</option>
      <option v-for="region in regionNames" :key="region" :value="region">
        {{ region }}
      </option>
    </select>

    <!-- <select
      name="city"
      id="city"
      class="filter__item"
      v-model="selectedCity"
      @change="setCityFilter(selectedCity)"
    >
      <option value="">Выберите город</option>
      <option v-for="city in cityNames" :key="city" :value="city">
        {{ city }}
      </option>
    </select> -->

    <div class="custom-select">
      <p class="custom-select__top-label">Город</p>
      <div class="select-label" @click="toggleOptionsCity">
        {{ selectedCity || "Выберите город" }}
        <span class="arrow">&#9660;</span>
      </div>
      <div class="options" v-show="showOptionsCity">
        <div v-if="selectedCity" class="option" @click="setDefaultCity">
          Все города
        </div>
        <!--This line seems redundant. Consider removing it.-->
        <div
          v-for="(option, index) in cityNames"
          :key="index"
          class="option"
          :class="{ 'selected-option': option === selectedCity }"
          @click="setCityFilter(option)"
        >
          {{ option }}
        </div>
      </div>

      <!-- <select
      name="organisation"
      id="organisationNames"
      class="filter__item"
      v-model="selectedOrganisation"
      @change="setOrganisationFilter(selectedOrganisation)"
    >
      <option value="" class="organisation__option">
        Выберите организацию
      </option>
      <option
        v-for="organisation in organisationNames"
        :key="organisation"
        :value="organisation"
        class="organisation__option"
      >
        {{ organisation }}
      </option>
    </select> -->
      <div class="custom-select">
        <p class="custom-select__top-label">Организация</p>
        <div class="select-label" @click="toggleOptions">
          {{ shortSelectedOrganisation || "Выберите организацию" }}
          <span class="arrow">&#9660;</span>
        </div>
        <div class="options" v-show="showOptions">
          <div
            v-if="selectedOrganisation"
            class="option"
            @click="setDefaultOrganisations"
          >
            Все организации
          </div>
          <!--This line seems redundant. Consider removing it.-->
          <div
            v-for="(option, index) in organisationNames"
            :key="index"
            class="option"
            :class="{ 'selected-option': option === selectedOrganisation }"
            @click="setOrganisationFilter(option)"
          >
            {{ option }}
          </div>
        </div>
      </div>
    </div>
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

const shortSelectedOrganisation = computed(() => {
  if (selectedOrganisation.value && selectedOrganisation.value.length >= 20) {
    return selectedOrganisation.value.substring(0, 20) + "...";
  } else {
    return selectedOrganisation.value;
  }
});

const showOptions = ref(false);
const showOptionsCity = ref(false);

const toggleOptionsCity = () => {
  debugger;
  showOptionsCity.value = !showOptionsCity.value;
};
const toggleOptions = () => {
  showOptions.value = !showOptions.value;
};
const setDefaultCity = () => {
  jobsStore.setCityFilter("all");

  selectedCity.value = "";
  showOptionsCity.value = false;
};
const setDefaultOrganisations = () => {
  jobsStore.setOrganisationFilter("all");

  selectedOrganisation.value = "";
  showOptions.value = false;
};
const setRegionFilter = (selectedRegion) => {
  debugger;
  jobsStore.setRegionFilter(selectedRegion);
};
const setCityFilter = (value) => {
  jobsStore.setCityFilter(value);

  showOptionsCity.value = false;
  selectedCity.value = value;
};
const setOrganisationFilter = (value) => {
  jobsStore.setOrganisationFilter(value);

  showOptions.value = false;
  selectedOrganisation.value = value;
};
</script>
<style scoped>
.filter__item {
  width: 100%;
}
.filter__item {
  /* Basic select styling */
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  width: 244px;
  background-color: white;
  /* background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20d%3D%22M8%2011L3%206h10l-5%205z%22%20fill%3D%22%23333%22%2F%3E%3C%2Fsvg%3E");  */
  background-repeat: no-repeat;
  background-position: right center;
  background-size: 16px 16px;
  margin-bottom: 10px;
}

.filter__item option {
  font-size: 14px;
  padding: 5px;
  /* Added overflow properties */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: wrap;
  max-width: 150px;
  width: 150px;
}
.options {
  max-height: 300px;
  overflow: auto;
}
.custom-select {
  position: relative;
  border: 1px solid #ccc;
  border-radius: 8px;
}
.custom-select__top-label {
  background-color: #fff;
  padding: 2px;
  z-index: 40;
  position: absolute;
  left: 10px;
  top: -10px;

  font-size: 10px;
}
/* Style the selected option */
.selected-option {
  background-color: lightblue;
}
.select-label {
  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: #fff;
  padding: 10px;
  border-radius: 8px;

  padding-bottom: 32px;
}
.select-label:hover {
  cursor: pointer;
}
.options::-webkit-scrollbar {
  width: 5px;
}
.options::-webkit-scrollbar-thumb {
  width: 5px;
  background-color: #ccc;
}
.option {
  padding: 10px;
  transition: 0.3s ease;
}
.option:hover {
  background-color: rgb(145, 197, 218);
  cursor: pointer;
}
.arrow {
  color: #ccc;
}
</style>
