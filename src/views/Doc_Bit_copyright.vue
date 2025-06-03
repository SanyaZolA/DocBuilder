<template>
  <div class="document-form">
    <h1>{{ displayName }}</h1>

    <Doc_details v-model="formData"/>
    <Doc_musicTable_alienation_bit v-model="formData" />
    <div class="formAll">
      <Doc_copyright_holder v-model="formData" />
      <div class="strelf">→</div>
      <Doc_acquirer v-model="formData" />
    </div>

    <button @click="generateDocument">Создание документа</button>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';
import { documentList } from '../data/documentList'; // Подключаем список документов
import Doc_details from '../components/docBlocks/Doc_details.vue';
import Doc_musicTable_alienation_bit from '../components/docBlocks/alienation/Doc_musicTable_alienation_bit.vue';
import Doc_copyright_holder from '../components/docBlocks/alienation/Doc_copyright_holder.vue';
import Doc_acquirer from '../components/docBlocks/alienation/Doc_acquirer.vue';


const internalName = 'Doc_Bit_copyright.docx';

const formData = ref({
  name_copyright_holder: '',
  inn_copyright_holder: '',
  name_acquirer: '',
  inn_acquirer: ''
});

// Вычисляем отображаемое имя документа
const displayName = computed(() => {
  const doc = documentList.find(d => d.internalName === internalName);
  return doc?.displayName ?? 'Документ не найден'; // Если не нашли документ, выводим сообщение
});

// Функция для генерации документа
const generateDocument = async () => {
  try {
    console.log(`Загружаем шаблон с пути: /templates/${internalName}`);

    // Загружаем шаблон по имени файла
    const response = await fetch(`/templates/${internalName}`);
    
    // Проверяем, что файл найден
    if (!response.ok) {
      throw new Error(`Ошибка при загрузке файла: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();

    // Проверяем содержимое файла
    console.log('Файл загружен, размер:', arrayBuffer.byteLength);

    // Используем Pizzip и Docxtemplater для обработки документа
    const zip = new PizZip(arrayBuffer);
    const doc = new Docxtemplater(zip);

    doc.setData(formData.value);
    doc.render();

    const output = doc.getZip().generate({ type: 'blob' });
    saveAs(output, `${displayName.value} ${formData.value.name_copyright_holder}.docx`);  
  } catch (error) {
    console.error('Ошибка при генерации документа:', error);
  }
};

</script>

<style >
.document-form {
  padding: 20px;
  font-family: 'Arial', sans-serif;
  color: #333;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 500px;
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #2c3e50;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #34495e;
}

.form {
  margin-bottom: 20px;
}

.form label {
  font-size: 1rem;
  margin-bottom: 8px;
  display: block;
  color: #7f8c8d;
}

.form input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #cccccc;
  border-radius: 5px;
  font-size: 1rem;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
  background-color: #46454f;
  color: rgb(187, 167, 167);
}

input::placeholder {
  color: #e8c9c957;
  font-style: italic;
}

.form input:focus {
  outline: none;
  border-color: #3498db;
}

.formAll {
  display: flex;
  justify-content: space-between;
  gap: 0px;
}

.formAll .form {
  flex: 1;
}

.strelf {
  display: flex;
  justify-content: center;
  font-size: 2rem;
  color: #7f8c8d;
  width: 50px;
  margin-top: 24px;
}

button {
  padding: 12px 25px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  margin-top: 20px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #2980b9;
}

button:focus {
  outline: none;
}
</style>