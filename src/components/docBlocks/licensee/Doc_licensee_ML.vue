<template>
      <div class="form">
        <hr />
        <h2>Лицензиат</h2>
        <label for="first_name">ФИО</label>
        <input type="text" v-model="formData.name_licensee" />
        <label for="last_name">Псевдоним</label>
        <input type="text" v-model="formData.last_name" placeholder="Babangida" />
        <label for="age">Возраст</label>
        <input type="number" v-model="formData.age" />
        <label for="age">ИНН</label>
        <input type="text" v-model="formData.age" />
      </div>
</template>
  
<script setup lang="ts">
import { reactive, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['update:modelValue']);

const formData = reactive({ ...props.modelValue });

watch(formData, (newVal) => {
  emit('update:modelValue', { ...newVal });
}, { deep: true });

watch(() => props.modelValue, (newVal) => {
  Object.assign(formData, newVal);
}, { deep: true });
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
  