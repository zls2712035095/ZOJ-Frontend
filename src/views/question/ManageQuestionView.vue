<template>
  <div id="manageQuestionView">
    <a-table :columns="columns" :data="dataList">
      <template #optional="{ record }">
        <a-button @click="$modal.info({ title: 'Name', content: record.name })"
          >view
        </a-button>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { QuestionControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";

const show = ref(true);

const dataList = ref([]);
const total = ref(0);
const searchParams = ref({
  pageSize: 10,
  pageNum: 1,
});

const loadData = async () => {
  const res = await QuestionControllerService.listQuestionByPageUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("加载失败" + res.message);
  }
};

/**
 * 页面加载时加载数据
 */
onMounted(() => {
  loadData();
});
const columns = [
  {
    title: "id",
    dataIndex: "id",
  },
  {
    title: "标题",
    dataIndex: "title",
  },
  {
    title: "内容",
    dataIndex: "content",
  },
  {
    title: "标签",
    dataIndex: "tags",
  },
  {
    title: "答案",
    dataIndex: "answer",
  },
  {
    title: "提交总数",
    dataIndex: "submitNum",
  },
  {
    title: "通过总数",
    dataIndex: "acceptNum",
  },
  {
    title: "题目限制",
    dataIndex: "judgeConfig",
  },
  {
    title: "题目用例",
    dataIndex: "judgeCase",
  },
  {
    title: "用户id",
    dataIndex: "userid",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
  },
  {
    title: "Optional",
    slotName: "optional",
  },
];
</script>

<style scoped></style>
