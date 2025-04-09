<template>
    <hr />
    <button @click="toggleList">Открыть/закрыть таблицу произведений</button>
    <div v-if="isListVisible" class="work-list">
    <h2>Таблица произведений</h2>
    <div v-for="(work, index) in formData.works" :key="index" class="work-row">
        <hr />
      <h3>Произведение №{{ index + 1 }}</h3>
  
      <label>Название произведения:</label>
      <input type="text" v-model="work.title" placeholder="Название песни" />
  
      <label>Автор музыки:</label>
      <input type="text" v-model="work.musicAuthor" placeholder="ФИО автора" />
  
      <label>Доля в музыке:</label>
      <input type="text" v-model="work.musicShare" placeholder="Напр. 50%" />
  
      <label>Автор текста:</label>
      <input type="text" v-model="work.textAuthor" placeholder="ФИО автора" />
  
      <label>Доля в тексте:</label>
      <input type="text" v-model="work.textShare" placeholder="Напр. 50%" />
  
      <label>Общая доля:</label>
      <input type="text" v-model="work.totalShare" placeholder="100%" />
    </div>
    <button @click="addWork">Добавить ещё песню</button>
</div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue';

  const isListVisible = ref(false);

const toggleList = () => {
  isListVisible.value = !isListVisible.value;
};
  
  const formData = ref({
    works: [
      {
        title: '',
        musicAuthor: '',
        musicShare: '',
        textAuthor: '',
        textShare: '',
        totalShare: '',
      },
    ],
  });
  
  // Функция для добавления новой строки с песней
  const addWork = () => {
    formData.value.works.push({
      title: '',
      musicAuthor: '',
      musicShare: '',
      textAuthor: '',
      textShare: '',
      totalShare: '',
    });
  };
  
  const emit = defineEmits(['update:modelValue']);
  
  // Синхронизация данных с родительским компонентом
  watch(formData, (newValue) => {
    emit('update:modelValue', newValue);
  }, { deep: true });
  
  </script>
  
  <style scoped>
  .work-list {
    border: #45a049 10px solid;
  }
  .work-row {
    margin-bottom: 20px;
  }
  
  input {
    margin-bottom: 10px;
    padding: 6px;
    width: 90%;
  }
  
  button {
    margin-top: 20px;
    padding: 10px 15px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  </style>
  