<template>
  <div id="rankView">
    <h1 align="center">排行榜</h1>
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
      <template #acRate="{ record }">
        {{
          `${record.submitNum ? record.acNum / record.submitNum : "0"}% (${
            record.acNum
          }/${record.submitNum})`
        }}
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import {
  Question,
  QuestionControllerService,
  UserRankQueryRequest,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment";

const show = ref(true);

const dataList = ref([]);
const total = ref(0);
const searchParams = ref<UserRankQueryRequest>({
  pageSize: 10,
  current: 1,
});

const loadData = async () => {
  const res = await QuestionControllerService.listUserRankByPageUsingPost({
    ...searchParams.value,
    sortField: "submitNum",
    sortOrder: "descend",
  });
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
    title: "#",
    dataIndex: "id",
  },
  {
    title: "昵称",
    dataIndex: "userName",
  },
  {
    title: "简介",
    dataIndex: "userProfile",
  },
  {
    title: "过题数",
    dataIndex: "acNum",
  },
  {
    title: "提交数",
    dataIndex: "submitNum",
  },
  {
    title: "通过率",
    slotName: "acRate",
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
    path: `/view/question/${question.id}`,
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
#rankView {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
