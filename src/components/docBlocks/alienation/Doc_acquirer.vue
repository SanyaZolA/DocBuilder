<template>
      <div class="form">
        <hr />
        <h2>Приобретатель</h2>
        <label for="name_acquirer">ФИО</label>
        <input type="text" v-model="formData.name_acquirer" placeholder="Иванов Иван Иванович" />
        <label for="inn_acquirer">ИНН</label>
        <input type="text" v-model="formData.inn_acquirer" />
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
  
watch(() => props.modelValue, (newVal) => {
  Object.assign(formData, newVal);
}, { deep: true });

watch(formData, (newVal) => {
  emit('update:modelValue', { ...newVal });
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
  