<template>
      <div class="form">
        <hr />
        <h2>Правообладатель</h2>
        <label for="name_copyright_holder">ФИО</label>
        <input type="text" v-model="formData.name_copyright_holder" />
        <label for="inn_copyright_holder">ИНН</label>
        <input type="text" v-model="formData.inn_copyright_holder" />
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
  