<template>
    <div class="form">
        <hr />
      <label for="first_name">Номер договора</label>
      <input type="text" v-model="inputData.name_licensor" placeholder="01/01/25-ВВП(ФИО)">

    <div class="doc_date">
    <div class="doc_date2">
      <label for="last_name">Дата (день) </label>
      <input type="text" v-model="inputData.last_name" placeholder="01"/>
      </div>
      <div class="doc_date2">
      <label for="last_name">Дата (месяц)</label>
      <input type="text" v-model="inputData.last_name" placeholder="декабря"/>
      </div>
      <div class="doc_date2">
      <label for="last_name">Дата (год) </label>
      <input type="text" v-model="inputData.last_name" placeholder="2025"/>
      </div>
    </div>
      <label for="age">Срок договора (дата окончания)</label>
      <input type="number" v-model="inputData.age" placeholder="31 декабря 2025"/>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue';
  
  const props = defineProps({
    modelValue: {
      type: Object,
      required: true
    }
  });
  
  const emit = defineEmits(['update:modelValue']);
  
  const inputData = ref({ ...props.modelValue });
  
  watch(inputData.value, (newValue) => {
    emit('update:modelValue', newValue);
  });
  </script>

  <style scoped>
  .doc_date {
    display: flex;
    justify-content: center;
  }

  .doc_date2 {
    display: flex;
    flex-direction: column;
    width: 100px;
  }
  </style>
  