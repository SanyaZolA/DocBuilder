<template>
    <div class="form">
        <hr />
      <label for="Myname">ФИО</label>
      <input type="text" v-model="inputData.Myname" placeholder="Иванов Александр Александрович"/>
        <hr />
      <label for="optionDocument">Вид документа</label>
      <input type="text" v-model="inputData.optionDocument" placeholder="паспорт"/>
      <label for="numberDocument">Номер документа</label>
      <input type="number" v-model="inputData.numberDocument" placeholder="5476 945758"/>
      <label for="stateDocument">Кем выдан</label>
      <input type="text" v-model="inputData.stateDocument" placeholder="МВД России"/>
      <label for="addressDocument">Адрес регистрации</label>
      <input type="text" v-model="inputData.addressDocument" placeholder="г. Санкт-Петербург, ул. Пушкина, д. 1"/>
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
  