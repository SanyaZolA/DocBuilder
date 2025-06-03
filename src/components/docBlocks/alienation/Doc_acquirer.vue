<template>
      <div class="form">
        <hr />
        <h2>Приобретатель</h2>
        <label for="name_acquirer">ФИО</label>
        <input type="text" v-model="formData.name_acquirer" />
        <label for="inn_acquirer">ИНН</label>
        <input type="text" v-model="formData.inn_acquirer" />
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
  