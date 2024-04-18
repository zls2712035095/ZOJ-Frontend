<template>
  <div id="addQuestionView">创建题目</div>
  <a-form :model="form" :layout="layout">
    <a-form-item field="answer" label="官方题解">
      <MdEditor />
    </a-form-item>
    <a-form-item field="content" label="题目内容">
      <MdEditor />
    </a-form-item>
    <a-form-item field="title" label="题目标题">
      <a-input v-model="form.title" placeholder="题目标题" />
    </a-form-item>
    <a-form-item field="tags" label="标签">
      <a-input-tag v-model="form.tags" placeholder="请选择标签" allow-clear />
    </a-form-item>
    <a-form-item label="题目限制" :content-flex="false" :merge-props="false">
      <a-space direction="vertical" style="min-width: 480px">
        <a-form-item field="judgeConfig.timeLimit" label="时间限制">
          <a-input-number
            v-model="form.judgeConfig.timeLimit"
            placeholder="请输入时间限制"
            mode="button"
            size="large"
            min="0"
          />
        </a-form-item>

        <a-form-item field="judgeConfig.memoryLimit" label="内存限制">
          <a-input-number
            v-model="form.judgeConfig.memoryLimit"
            placeholder="请输入内存限制"
            mode="button"
            size="large"
            min="0"
          />
        </a-form-item>

        <a-form-item field="judgeConfig.stackLimit" label="堆栈限制">
          <a-input-number
            v-model="form.judgeConfig.stackLimit"
            placeholder="请输入堆栈限制"
            mode="button"
            size="large"
            min="0"
          />
        </a-form-item>
      </a-space>
    </a-form-item>
    <!--    <a-form-item label="Username" :content-flex="false" :merge-props="false">-->
    <!--      <a-row :gutter="8">-->
    <!--        <a-col :span="12">-->
    <!--          <a-form-item-->
    <!--            field="separate.firstname"-->
    <!--            validate-trigger="input"-->
    <!--            extra="Show error message separate"-->
    <!--            :rules="[{ required: true, message: 'firstname is required' }]"-->
    <!--            hide-label-->
    <!--          >-->
    <!--            <a-input-->
    <!--              v-model="form.separate.firstname"-->
    <!--              placeholder="please enter your firstname..."-->
    <!--            />-->
    <!--          </a-form-item>-->
    <!--        </a-col>-->
    <!--        <a-col :span="12">-->
    <!--          <a-form-item-->
    <!--            field="separate.lastname"-->
    <!--            validate-trigger="input"-->
    <!--            :rules="[{ required: true, message: 'lastname is required' }]"-->
    <!--            hide-label-->
    <!--          >-->
    <!--            <a-input-->
    <!--              v-model="form.separate.lastname"-->
    <!--              placeholder="please enter your lastname..."-->
    <!--            />-->
    <!--          </a-form-item>-->
    <!--        </a-col>-->
    <!--      </a-row>-->
    <!--    </a-form-item>-->
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
