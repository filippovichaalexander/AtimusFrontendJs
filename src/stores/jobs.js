import { defineStore } from "pinia";

export const useJobsStore = defineStore("jobs", {
  state: () => ({
    jobs: [],
    selectedRegion: "",
    selectedCity: "",
    selectedOrganisation: "",
  }),
  actions: {
    async setJobs() {
      try {
        const response = await fetch(
          "https://gsr-rabota.ru/api/v2/Vacancies/All/List"
        );
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        this.jobs = data;
      } catch (error) {
        console.error("Error:", error);
      }
    },
    setRegionFilter(selectedRegion) {
      if (selectedRegion === "all") {
        this.selectedRegion = "";
      } else this.selectedRegion = selectedRegion;
    },
    setCityFilter(selectedCity) {
      if (selectedCity === "all") {
        this.selectedCity = "";
      } else this.selectedCity = selectedCity;
    },
    setOrganisationFilter(selectedOrganisation) {
      if (selectedOrganisation === "all") {
        this.selectedOrganisation = "";
      } else this.selectedOrganisation = selectedOrganisation;
    },
  },
  getters: {
    filteredJobs: (state) => {
      return state.jobs.filter((job) => {
        return (
          (state.selectedRegion === "" ||
            (job.regionname &&
              job.regionname
                .toLowerCase()
                .includes(state.selectedRegion.toLowerCase()))) &&
          (state.selectedCity === "" ||
            (job.placetitle && job.placetitle === state.selectedCity)) &&
          (state.selectedOrganisation === "" ||
            (job.clientname &&
              job.clientname
                .toLowerCase()
                .includes(state.selectedOrganisation?.toLowerCase())))
        );
      });
    },
  },
});
