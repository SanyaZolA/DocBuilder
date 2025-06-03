<template>
    <hr />
    <button @click="toggleList">Открыть/закрыть таблицу произведений</button>
    <div v-if="isListVisible" class="work-list">
      <div v-for="(work, index) in formData.works" :key="index" class="work-row">
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
        <input type="text" v-model="work.totalShare" placeholder="100%"/>
        <button v-if="formData.works.length > 1 && index !== 0" @click="removeWork(index)" class="button_del">X</button>
      </div>
      <button @click="addWork">Добавить ещё произведение</button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue';
  
  interface Work {
    title: string;
    musicAuthor: string;
    musicShare: string;
    textAuthor: string;
    textShare: string;
    totalShare: string;
  }
  
  const isListVisible = ref(false);
  const toggleList = () => {
    isListVisible.value = !isListVisible.value;
  };
  
  const formData = ref<{ works: Work[] }>({
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
  
  const removeWork = (index: number) => {
  if (formData.value.works.length > 1) {
    formData.value.works.splice(index, 1);
  }
};
  
  const emit = defineEmits(['update:modelValue']);
  
  watch(formData, (newValue) => {
    emit('update:modelValue', newValue);
  }, { deep: true });
  </script>
  
  <style scoped>
  .work-row {
    margin-bottom: 20px;
    border: #829cea 5px dashed;
    position: relative;
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

  .button_del {
position: absolute;
    display: flex;
    width: 10px;
    bottom: 400px;
    right: 10px;
    margin: 0;
    align-content: center;
    justify-content: center;
    background-color:red;
  }
  
  button:hover {
    background-color: #45a049;
  }
  </style>
  