<template>
  <div id="questionListsView">
    <h1 align="center">ZOJ在线题库</h1>
    <a-form :model="searchParams" layout="inline">
      <a-form-item field="title" label="题目名称" style="min-width: 240px">
        <a-input v-model="searchParams.title" placeholder="请输入题目名称" />
      </a-form-item>
      <a-form-item field="tags" label="标签" style="min-width: 240px">
        <a-input-tag v-model="searchParams.tags" placeholder="请输入标签" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="doSubmit">搜索</a-button>
      </a-form-item>
    </a-form>
    <a-table
      :columns="columns"
      :data="dataList"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total,
      }"
      @page-change="onPageChange"
    >
      <template #tags="{ record }">
        <a-space wrap>
          <a-tag
            v-for="(tag, index) of JSON.parse(record.tags as any)"
            :key="index"
            color="blue"
            >{{ tag }}
          </a-tag>
        </a-space>
      </template>
      <template #acRate="{ record }">
        {{
          `${record.submitNum ? record.acceptNum / record.submitNum : "0"}% (${
            record.acceptNum
          }/${record.submitNum})`
        }}
      </template>
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD") }}
      </template>
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="toQuestionPage(record)"
            >做题
          </a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref, watchEffect, withDefaults } from "vue";
import {
  Question,
  QuestionListQueryRequest,
  QuestionListControllerService,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment";

interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});

const dataList = ref([] as Question[]);
const total = ref(0);
const searchParams = ref<QuestionListQueryRequest>({
  title: "",
  tags: [],
  pageSize: 10,
  current: 1,
});

const loadData = async () => {
  const res = await QuestionListControllerService.getQuestionListVoByIdUsingGet(
    props.id as any
  );
  if (res.code === 0) {
    dataList.value = res.data?.questionCase as Array<Question>;
    total.value = res.data?.questionCase?.length as any;
  } else {
    message.error("加载失败" + res.message);
  }
};

/**
 * 监听 searchParams 变量改变， 触发页面的重新加载
 */
watchEffect(() => {
  loadData();
});

/**
 * 页面加载时加载数据
 */
onMounted(() => {
  loadData();
});
const columns = [
  {
    title: "题号",
    dataIndex: "id",
  },
  {
    title: "标题",
    dataIndex: "title",
  },
  {
    title: "标签",
    slotName: "tags",
  },
  {
    title: "创建时间",
    slotName: "createTime",
  },
  {
    slotName: "optional",
  },
];

const onPageChange = (page: number) => {
  // todo 奇妙的bug 会出现分页切换后内容不更新这种情况,但是当在别的地方（监控的地方或者loadData里面）输出看一下current时，就正常显示了
  //searchParams.value.current = page;
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

const router = useRouter();
/**
 * 跳转到做题页面
 * @param question
 */
const toQuestionPage = (question: Question) => {
  router.push({
    path: `/view/questionList/do/${question.id}`,
  });
};

/**
 * 搜索题目,重新加载数据
 */
const doSubmit = () => {
  //重置搜索页号
  searchParams.value = {
    ...searchParams.value,
    current: 1,
  };
};
</script>

<style scoped>
#questionsView {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
