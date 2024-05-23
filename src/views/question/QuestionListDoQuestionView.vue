<template>
  <div id="doQuestionListsView">
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
          <a-tab-pane key="comment" title="评论">
            题单中做题不可评论
          </a-tab-pane>
          <a-tab-pane key="answer" title="题解">
            题单中做题不可查看题解
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
              <a-option>cpp</a-option>
              <a-option>java</a-option>
              <a-option>golang</a-option>
            </a-select>
          </a-form-item>
        </a-form>
        <CodeEditor
          :value="form.code as string"
          :language="form.language as string"
          :handle-change="changeCode"
        />
        <a-divider size="0" />
        <a-button type="primary" style="min-width: 200px" @click="doSubmit"
          >提交代码
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, withDefaults, defineProps, reactive } from "vue";
import {
  CommentAddRequest,
  CommentControllerService,
  CommentQueryRequest,
  Comments,
  QuestionControllerService,
  QuestionSubmitAddRequest,
  QuestionVO,
  User,
  UserControllerService,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import CodeEditor from "@/components/CodeEditor.vue";
import MdViewer from "@/components/MdViewer.vue";
import moment from "moment";

const addComment = reactive<CommentAddRequest>({});
const formComment = ref<Comments[]>([] as Comments[]);
const query = reactive<CommentQueryRequest>({});
const currentUser = ref<User>({});

interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});

const question = ref<QuestionVO>();

const loadData = async () => {
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(
    props.id as any
  );
  if (res.code === 0) {
    console.log(res.data);
    question.value = res.data;
  } else {
    message.error("题目加载失败" + res.message);
  }
  const resComment = await CommentControllerService.listCommentsByPageUsingPost(
    {
      ...query,
      foreignId: props.id as any,
      sortField: "creatTime",
    }
  );
  const resUser = await UserControllerService.getLoginUserUsingGet();
  if (res.code === 0) {
    console.log(res);
    formComment.value = resComment.data.records as Comments[];
    currentUser.value = resUser.data as User;
  } else {
    message.error("加载评论失败" + res.message);
  }
};

/**
 * 页面加载时加载数据
 */
onMounted(() => {
  loadData();
});

/**
 * 添加新评论
 */
const submitNewComment = async () => {
  const res = await CommentControllerService.addCommentUsingPost({
    ...addComment,
    foreignId: props.id as any,
    userId: currentUser.value.id,
    userName: currentUser.value.userName,
  });
  if (res.code === 0) {
    loadData();
    console.log(res);
    console.log("foreignId:" + props.id);
    addComment.content = "";
  } else {
    message.error("评论失败！", res.message);
  }
};
/**
 * 回复评论
 * @param comment
 */
const replyComment = async (comment: Comments) => {
  console.log(addComment);
  const res = await CommentControllerService.addCommentUsingPost({
    ...addComment,
    foreignId: props.id as any,
    userId: currentUser.value.id,
    userName: currentUser.value.userName,
    pid: comment.id,
  });
  if (res.code === 0) {
    loadData();
    console.log(res);
    console.log("pid:" + comment.pid);
    console.log("foreignId:" + props.id);
    addComment.content = "";
  } else {
    message.error("评论失败！", res.message);
  }
};

/**
 * 清楚内容
 */
const restartComment = () => {
  addComment.content = "";
};

const form = ref<QuestionSubmitAddRequest>({
  questionId: "" as any,
  language: "java",
  code: "",
});
const changeCode = (value: string) => {
  form.value.code = value;
};
/**
 * 提交代码
 */
const doSubmit = async () => {
  if (!question.value?.id) {
    return;
  }
  const res = await QuestionControllerService.doQuestionSubmitUsingPost({
    ...form.value,
    questionId: question.value.id,
  });
  if (res.code === 0) {
    message.success("提交成功");
  } else {
    message.error("提交失败" + res.message);
  }
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
