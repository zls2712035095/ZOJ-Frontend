<template>
  <div id="questionSubmitView">
    <h1 align="center">ZOJ在线题库</h1>
    <a-form :model="searchParams" layout="inline">
      <a-form-item field="questionId" label="题号" style="min-width: 240px">
        <a-input v-model="searchParams.questionId" placeholder="请输入题号" />
      </a-form-item>
      <a-form-item
        field="language"
        label="编程语言"
        style="min-width: 240px"
        allow-clear
      >
        <a-select
          v-model="searchParams.language"
          :style="{ width: '320px' }"
          placeholder="选择编程语言"
        >
          <a-option></a-option>
          <a-option>java</a-option>
          <a-option>cpp</a-option>
          <a-option>go</a-option>
          <a-option>html</a-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="doSubmit">搜索</a-button>
      </a-form-item>
    </a-form>
    <a-divider size="0" />
    <a-table
      :ref="tableRef"
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
      <template #judgeInfo="{ record }">
        <a-space direction="horizontal" style="align-items: center">
          <a-link
            :style="getLinkStyle(record.judgeInfo.message)"
            :href="'/view/question_submit/' + record.id"
          >
            {{ record.judgeInfo.message }}
          </a-link>
          <span style="margin-right: 8px"
            >Memory: {{ record.judgeInfo.memory }}b</span
          >
          <span style="margin-right: 8px"
            >Time: {{ record.judgeInfo.time }}ms</span
          >
        </a-space>
      </template>
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD") }}
      </template>
      <template #status="{ record }">
        <span :style="getStatusStyle(record.status)">{{
          getStatusText(record.status)
        }}</span>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import {
  QuestionControllerService,
  QuestionSubmitQueryRequest,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment";

const tableRef = ref();
const dataList = ref([]);
const total = ref(0);
const searchParams = ref<QuestionSubmitQueryRequest>({
  questionId: undefined,
  language: undefined,
  pageSize: 10,
  current: 1,
});

const loadData = async () => {
  const res = await QuestionControllerService.listQuestionSubmitByPageUsingPost(
    {
      ...searchParams.value,
      sortField: "createTime",
      sortOrder: "descend",
    }
  );
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
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
    title: "题目提交号",
    dataIndex: "id",
  },
  {
    title: "编程语言",
    dataIndex: "language",
  },
  {
    title: "判题信息",
    slotName: "judgeInfo",
  },
  {
    title: "判题状态",
    slotName: "status",
  },
  {
    title: "题目 id",
    dataIndex: "questionId",
  },
  {
    title: "提交者 id",
    dataIndex: "userId",
  },
  {
    title: "创建时间",
    slotName: "createTime",
  },
];

const getStatusText = (status: number) => {
  const statusMap = {
    0: "等待中",
    1: "运行中",
    2: "成功",
    3: "失败",
  };
  return statusMap[status] || "未知状态";
};

const getStatusStyle = (status: number) => {
  const statusColors = {
    0: { color: "black" }, // 等待中默认颜色为黑色
    1: { color: "gray" }, // 运行中为灰色
    2: { color: "green" }, // 成功为绿色
    3: { color: "red" }, // 失败为红色
  };
  return statusColors[status] || { color: "black" }; // 默认颜色为黑色
};

const onPageChange = (page: number) => {
  // todo 奇妙的bug 会出现分页切换后内容不更新这种情况,但是当在别的地方（监控的地方或者loadData里面）输出看一下current时，就正常显示了
  //searchParams.value.current = page;
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

const router = useRouter();

const getLinkStyle = (message: string) => {
  const styleMap = {
    Accepted: { color: "#90EE90" },
    WrongAnswer: { color: "red" },
    // ...其他状态的颜色映射
    // 可以根据您提供的枚举值继续添加更多的颜色映射
  };
  return styleMap[message] || { color: "inherit" }; // 默认颜色为继承
};
/**
 * 跳转到代码详情页面
 * @param question
 */
const toQuestionSubmitPage = (questionSubmitId: number) => {
  router.push({
    path: `/view/question_submit/${questionSubmitId}`,
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
#questionSubmitView {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
