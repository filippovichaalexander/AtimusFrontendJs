<!-- Job.vue -->
<template>
  <div class="wrapper">
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
      <button class="button button--reply" @click="showModal = true">
        Откликнуться
      </button>
    </div>
    <div class="modal-overlay" v-if="showModal" @click.self="showModal = false">
      <div class="modal-content">
        <span class="close" @click="showModal = false">&times;</span>
        <h2 class="modal-title">Откликнуться</h2>
        <form @submit.prevent="submitForm">
          <div class="input-wrapper">
            <label class="label" for="lastName">Фамилия:</label>
            <input
              class="input"
              placeholder="Фамилия"
              type="text"
              id="lastName"
              v-model="lastName"
              required
            />
          </div>
          <div class="input-wrapper">
            <label class="label" for="firstName">Имя:</label>
            <input
              class="input"
              placeholder="Имя"
              type="text"
              id="firstName"
              v-model="firstName"
              required
            />
          </div>
          <div class="input-wrapper">
            <label class="label" for="secondName">Отчестыо:</label>
            <input
              class="input"
              placeholder="Отчество"
              type="text"
              id="secondName"
              v-model="secondName"
            />
          </div>
          <div class="input-wrapper">
            <label class="label" for="phoneNumber">Номер телефона:</label>
            <input
              class="input"
              placeholder="+7(000)000-00-00"
              type="text"
              id="phoneNumber"
              v-model="formattedPhoneNumber"
              required
            />
          </div>
          <div>
            <input
              type="checkbox"
              id="termsCheckbox"
              v-model="acceptTerms"
              required
            />
            <label class="checkbox-label" for="termsCheckbox"
              >Я даю согласие на обработку своих персональных данных в
              соответствии с
              <span>положением об обработке персональных данных</span></label
            >
          </div>
          <button
            class="button button--reply button--modal"
            type="submit"
            @click="showModal = false"
          >
            Откликнуться
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
const props = defineProps({
  job: {
    type: Object,
    required: true,
  },
});

const firstName = ref("");
const lastName = ref("");
const secondName = ref("");
const phoneNumber = ref("");
const acceptTerms = ref(false);

const showModal = ref(false);

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

const formattedPhoneNumber = computed({
  get: () => phoneNumber.value,
  set: (value) => {
    const cleanedValue = value.replace(/\D/g, "");
    const formattedValue = cleanedValue.replace(
      /(\d{0})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/,
      (match, p1, p2, p3, p4, p5) =>
        [
          "+7",
          p2 ? `(${p2})` : "",
          p3 ? `${p3}-` : "",
          p4 ? `${p4}-` : "",
          p5 ? `${p5}` : "",
        ].join("")
    );
    phoneNumber.value = formattedValue;
  },
});

watch(formattedPhoneNumber, (newValue) => {
  if (newValue.length > 16) {
    phoneNumber.value = newValue.slice(0, 16);
  }
});
</script>
<style scoped>
.wrapper {
  height: 620px;
}
.job {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 28px;
  height: 100%;

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

  transition: all 0.3s;
}
.button:hover {
  cursor: pointer;
}
.button--details {
  background-color: #fff;
  color: #fd8828;
}
.button--details:hover {
  background-color: #f8e9dc;
}

.button--reply {
  background-color: #fd8828;
  color: #fff;
  margin-top: 30px;
}
.button--reply:hover {
  background-color: #ffa052;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}
.modal-title {
  margin-bottom: 30px;
}
.modal-content {
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
  position: relative;
  max-width: 500px;
  width: 100%;
}
.input-wrapper {
  position: relative;
}
.input {
  position: relative;
  width: 100%;
  border: none;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 30px;
}
.label {
  position: absolute;
  background-color: #fff;
  padding: 2px;
  z-index: 40;
  left: 10px;
  top: -10px;

  font-size: 10px;
}
.checkbox-label span {
  color: rgb(50, 50, 214);
}
#termsCheckbox {
  margin-right: 8px;
}
#termsCheckbox :hover {
  cursor: pointer;
}
.close {
  position: absolute;
  right: 20px;
  top: 10px;
  font-size: 28px;
  font-weight: bold;
}
.close:hover {
  cursor: pointer;
}
.button--reply.button--modal {
  width: 40%;
}
</style>
