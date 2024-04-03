<template>
  <div id="addQuestionView">创建题目</div>
  <a-form :model="form" :layout="layout">
    <a-form-item field="answer" label="官方题解">
      <MdEditor />
    </a-form-item>
    <a-form-item field="content" label="题目内容">
      <MdEditor />
    </a-form-item>
    <a-form-item field="title" label="题目">
      <a-input v-model="form.title" placeholder="题目标题" />
    </a-form-item>
    <a-form-item field="tags" label="标签">
      <a-input-tag v-model="form.tags" placeholder="请选择标签" allow-clear />
    </a-form-item>
    <a-form-item>
      <a-button>Submit</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import MdEditor from "@/components/MdEditor.vue";

const form = reactive({
  answer: "暴力破解",
  content: "内容",
  judgeCase: [
    {
      input: "1 2",
      output: "3 4",
    },
  ],
  judgeConfig: {
    memoryLimit: 1000,
    stackLimit: 1000,
    timeLimit: 1000,
  },
  tags: ["KMP"],
  title: "A + b",
});
</script>

<style scoped></style>
