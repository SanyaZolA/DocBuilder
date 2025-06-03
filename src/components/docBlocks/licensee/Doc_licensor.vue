<template>
      <div class="form">
        <hr />
        <h2>Лицензиар</h2>
        <label for="name_licensor">ФИО</label>
        <input type="text" v-model="formData.name_licensor" />
        <label for="last_name">Псевдоним</label>
        <input type="text" v-model="formData.last_name" placeholder="Babangida"/>
        <label for="age">Возраст</label>
        <input type="number" v-model="formData.age" />
        <label for="age">ИНН</label>
        <input type="text" v-model="formData.age" />
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
  
  const formData = ref({ ...props.modelValue });
  
  watch(formData.value, (newValue) => {
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
  