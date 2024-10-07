import { defineStore } from "pinia";

export const useJobsStore = defineStore("jobs", {
  state: () => ({
    jobs: [],
  }),
  actions: {
    async setJobs() {
      debugger;
      // try {
      //   const apiResponse = await fetch(
      //     "https://gsr-rabota.ru/api/v2/Vacancies/All/List"
      //   );
      //   if (!apiResponse.ok) {
      //     throw new Error(`HTTP error fetching API: ${apiResponse.status}`);
      //   }

      //   const json = await apiResponse.json();

      //   const response = await fetch("http://localhost:8000/decode.php", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json", // Ensure correct content type
      //     },
      //     body: JSON.stringify(json),
      //   });

      //   if (response.ok) {
      //     // const contentType = response.headers.get("Content-Type");
      //     const data = await response.json();
      //     this.jobs = data.data;
      //   } else {
      //     throw new Error(`HTTP error ${response.status}`);
      //   }
      // } catch (err) {
      //   console.error("Error:", err.message);
      //   this.jobs = []; // Fallback
      // }
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
  },
});
