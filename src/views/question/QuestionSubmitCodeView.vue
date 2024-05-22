<template>
  <div id="doQuestionsView">
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <a-tabs default-active-key="question">
          <a-tab-pane key="question" title="题目">
            <a-card v-if="question" :title="question.title">
              <a-descriptions
                title="题目限制"
                :column="{ xs: 1, md: 2, lg: 3 }"
              >
                <a-descriptions-item label="时间限制">
                  {{ question.judgeConfig.timeLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="内存限制">
                  {{ question.judgeConfig.memoryLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="堆栈限制">
                  {{ question.judgeConfig.stackLimit ?? 0 }}
                </a-descriptions-item>
              </a-descriptions>
              <MdViewer :value="question.content || ''" />
              <template #extra>
                <a-space wrap>
                  <a-tag
                    v-for="(tag, index) of question.tags"
                    :key="index"
                    color="blue"
                    >{{ tag }}
                  </a-tag>
                </a-space>
              </template>
            </a-card>
          </a-tab-pane>
        </a-tabs>
      </a-col>
      <a-col :md="12" :xs="24">
        <a-form :model="form" layout="inline">
          <a-form-item field="title" label="题目语言" style="min-width: 240px">
            <a-select
              v-model="form.language"
              :style="{ width: '320px' }"
              placeholder="编程语言"
            >
              <a-option>java</a-option>
            </a-select>
          </a-form-item>
        </a-form>
        <CodeEditor
          :value="form.code as string"
          :language="form.language as string"
          :code-default="questionSubmit.code as string"
          :handle-change="changeCode"
        />
        <a-divider size="0" />
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import {
  onMounted,
  ref,
  withDefaults,
  defineProps,
  reactive,
  watch,
} from "vue";
import {
  QuestionControllerService,
  QuestionSubmitAddRequest,
  QuestionVO,
  QuestionSubmitVO,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import CodeEditor from "@/components/CodeEditor.vue";
import MdViewer from "@/components/MdViewer.vue";

interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});

const question = ref<QuestionVO>();
const questionSubmit = reactive<QuestionSubmitVO>({
  judgeInfo: {},
  code: "",
});
const form = reactive({
  questionId: "" as any,
  language: "java",
  code: questionSubmit.code,
});
watch(
  () => questionSubmit.code,
  () => {
    form.code = questionSubmit.code as string;
  }
);
const loadData = async () => {
  const res = await QuestionControllerService.getQuestionSubmitVoByIdUsingGet(
    props.id as any
  );
  if (res.code === 0) {
    console.log(res.data);
    question.value = res.data?.questionVO;
    questionSubmit.code = res.data?.code;
    questionSubmit.code = res.data?.code;
    if (res.data?.code) {
      form.code = res.data.code;
    }
    if (res.data?.language) {
      form.language = res.data.language;
    }
    form.code = questionSubmit.code as string;
    console.log(form.code);
  } else {
    message.error("题目加载失败" + res.message);
  }
};

/**
 * 页面加载时加载数据
 */
onMounted(() => {
  loadData();
});

const changeCode = (value: string) => {
  form.code = value;
};
</script>

<style>
#doQuestionsView {
  max-width: 1400px;
  margin: 0 auto;
}

#doQuestionsView .arco-space-horizontal .arco-space-item {
  margin-bottom: 0 !important;
}
</style>
