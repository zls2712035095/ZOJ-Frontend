<template>
  <div id="addQuestionListView">
    <template v-if="updatePage">
      <h2 align="center">修改题单</h2>
    </template>
    <template v-else>
      <h2 align="center">创建题单</h2>
    </template>
    <a-form :model="form" :layout="layout">
      <a-form-item field="title" label="题单标题">
        <a-input v-model="form.title" placeholder="题单标题" />
      </a-form-item>
      <a-form-item field="tags" label="标签">
        <a-input-tag v-model="form.tags" placeholder="请设置标签" allow-clear />
      </a-form-item>
      <a-form-item field="content" label="题单内容">
        <MdEditor
          :value="form.content as string"
          :handle-change="onContentChange"
        />
      </a-form-item>

      <a-form-item label="题单用例" :content-flex="false" :merge-props="false">
        <a-form-item
          v-for="(judgeCaseItem, index) of questionIdList"
          :field="`form.judgeCase[${index}]`"
          :label="`题目用例-${index}`"
          :key="index"
          no-style
        >
          <a-space direction="vertical" style="min-width: 800px">
            <a-form-item
              :field="`questionIdList[${index}]`"
              :label="`输入题单用例（题号）${index}`"
              :key="index"
            >
              <a-input
                v-model="questionCase[index]"
                placeholder="请输入题单（题号）"
              />
            </a-form-item>
            <a-button status="danger" @click="handleDelete(index)"
              >删除
            </a-button>
          </a-space>
        </a-form-item>
        <div style="margin-top: 32px">
          <a-button @click="handleAdd" type="outline" status="success"
            >新增题目用例
          </a-button>
        </div>
      </a-form-item>
      <div style="margin-top: 20px" />
      <a-form-item>
        <a-button type="primary" style="min-width: 200px" @click="doSubmit"
          >提交
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import {
  QuestionListControllerService,
  QuestionListAddRequest,
  Question,
  QuestionListEditRequest,
  QuestionListVO,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRoute } from "vue-router";
import { ref } from "vue";

const route = useRoute();

//如果页面地址包含 update，视为更新页面
const updatePage = route.path.includes("update");

let form = ref({
  title: "",
  tags: [],
  content: "",
  questionCase: [] as Question[],
} as QuestionListVO);

const questionIdList = ref([]);

/**
 * 根据题目 id 获取老的数据
 */
const loadData = async () => {
  const id = route.query.id;
  if (!id) {
    return;
  }
  const res = await QuestionListControllerService.getQuestionListVoByIdUsingGet(
    id as any
  );
  if (res.code === 0) {
    form.value = res.data as any;
    console.log(form.value);
    //Json 转 js 对象
    if (!form.value.questionCase) {
      form.value.questionCase = [] as any;
    } else {
      form.value.questionCase = JSON.parse(form.value.questionCase as any);
    }
    if (!form.value.tags) {
      form.value.tags = [];
    }
    // else {
    //   form.value.tags = JSON.parse(form.value.tags as any);
    // }
  } else {
    message.error("加载失败" + res.message);
  }
};

onMounted(() => {
  loadData();
});

const doSubmit = async () => {
  console.log(form.value);
  //判断当前页面时创建还是更新
  if (updatePage) {
    const res = await QuestionListControllerService.editQuestionListUsingPost({
      ...form.value,
      questionCase: questionIdList.value as number[],
    });
    if (res.code === 0) {
      message.success("更新成功");
    } else {
      message.error("更新失败" + res.message);
    }
  } else {
    const res = await QuestionListControllerService.addQuestionListUsingPost({
      ...form.value,
      questionCase: questionIdList.value as number[],
    });
    if (res.code === 0) {
      message.success("创建成功");
    } else {
      message.error("创建失败" + res.message);
    }
  }
};
/**
 * 新增题目用例
 */
const handleAdd = () => {
  questionIdList.value.push({});
};
/**
 * 删除题目用例
 * @param index
 */
const handleDelete = (index: number) => {
  questionIdList.value.splice(index, 1);
};

const onContentChange = (value: string) => {
  form.value.content = value;
};
</script>

<style scoped></style>
