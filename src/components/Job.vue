<!-- Job.vue -->
<template>
  <div class="job">
    <p>{{ job.name }}</p>
    <p>{{ job.price }}</p>
    <p>{{ job.directiontitle }}</p>
    <p>{{ job.clientname }}</p>
    <button>Подробнее</button>
    <button>Откликнуться</button>
  </div>
</template>

<script setup>
const props = defineProps({
  job: {
    type: Object,
    required: true,
  },
});
</script>
