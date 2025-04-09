<template>
    <div class="form">
      <label for="first_name">Номер договора</label>
      <input type="text" v-model="inputData.name_licensor" />
  
      <label for="last_name">Дата договора</label>
      <input type="text" v-model="inputData.last_name" />
  
      <label for="age">Срок договора</label>
      <input type="number" v-model="inputData.age" />
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
  