<!-- Job.vue -->
<template>
  <div class="job">
    <h6 class="job__item job--city">{{ job.placetitle }}</h6>
    <h1 class="job__item job--title">{{ job.proftitle }}</h1>
    <p class="job__item job--salary">
      {{ job.salary_volume }} {{ job.salary_type_title }}
    </p>
    <p class="job__item job--direction">{{ job.directiontitle }}</p>
    <p class="job__item job--clientname">{{ clientName }}</p>
    <p>{{ job.price }}</p>
    <button class="button button--details">Подробнее</button>
    <button class="button button--reply">Откликнуться</button>
  </div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  job: {
    type: Object,
    required: true,
  },
});
const clientName = computed(() => {
  if (
    props.job.clientname.includes("(") &&
    props.job.clientname.includes(")")
  ) {
    const startIndex = props.job.clientname.indexOf("(");
    const endIndex = props.job.clientname.indexOf(")");
    return props.job.clientname.slice(startIndex + 1, endIndex);
  }
  return props.job.clientname;
});
</script>
<style scoped>
.job {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 28px;

  background-color: #fff;
  border-radius: 12px;
}
.job__item {
  color: #000;
  line-height: 1.1;
}
.job__item.job--city {
  color: #535353;
}
.job--city {
  font-size: 16px;
}
.job--title {
  font-size: 32px;
  padding: 20px 0 36px;
  position: relative;
}
.job--title::after {
  content: "";
  background-color: rgb(219, 219, 219);
  width: 100%;
  height: 2px;
  position: absolute;
  bottom: 0;
  left: 0;
}
.job--salary,
.job--direction,
.job--clientname {
  font-size: 20px;
  font-weight: 600;

  margin-bottom: 36px;
}
.job--salary {
  margin-top: 36px;
}
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 16px 0;

  border-radius: 12px;
  border: 2px solid #fd8828;
}
.button--details {
  background-color: #fff;
  color: #fd8828;
}

.button--reply {
  background-color: #fd8828;
  color: #fff;
}
</style>
