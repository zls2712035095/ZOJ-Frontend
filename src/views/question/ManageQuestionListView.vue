<template>
  <div id="manageQuestionListView">
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
          <a-tag v-for="(tag, index) of record.tags" :key="index" color="blue"
            >{{ tag }}
          </a-tag>
        </a-space>
      </template>
      <template #questionCase="{ record }">
        <a-space>
          {{ record.questionCase.length }}
        </a-space>
      </template>
      <template #userName="{ record }">
        <a-space>
          {{ record.userVO.userName }}
        </a-space>
      </template>
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD") }}
      </template>
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="doUpdate(record)">修改</a-button>
          <a-button status="danger" @click="doDelete(record)">删除</a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import {
  Question,
  QuestionControllerService,
  QuestionListControllerService,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import ACCESS_ENUM from "@/access/ACCESS_ENUM";
import { useStore } from "vuex";
import moment from "moment";

const store = useStore();

const dataList = ref([]);
const total = ref(0);
const searchParams = ref({
  pageSize: 10,
  current: 1,
});

const loadData = async () => {
  if (store.state.user?.loginUser.userRole === ACCESS_ENUM.USER) {
    const res =
      await QuestionListControllerService.listMyQuestionListVoByPageUsingPost(
        searchParams.value
      );
    if (res.code === 0) {
      dataList.value = res.data.records;
      total.value = res.data.total;
    } else {
      message.error("加载失败" + res.message);
    }
  } else {
    const res =
      await QuestionListControllerService.listQuestionListVoByPageUsingPost(
        searchParams.value
      );
    if (res.code === 0) {
      dataList.value = res.data.records;
      total.value = res.data.total;
    } else {
      message.error("加载失败" + res.message);
    }
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
    slotName: "tags",
  },
  {
    title: "题目用例个数",
    slotName: "questionCase",
  },
  {
    title: "用户id",
    dataIndex: "userId",
  },
  {
    title: "用户昵称",
    slotName: "userName",
  },
  {
    title: "创建时间",
    slotName: "createTime",
  },
  {
    title: "操作",
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

const doDelete = async (question: Question) => {
  const res = await QuestionListControllerService.deleteQuestionListUsingPost({
    id: question.id,
  });
  if (res.code === 0) {
    message.success("删除成功");
    loadData();
  } else {
    message.error("删除失败");
  }
};

const router = useRouter();

const doUpdate = (question: Question) => {
  router.push({
    path: "/update/questionList",
    query: {
      id: question.id,
    },
  });
};
</script>

<style scoped>
#manageQuestionListView {
  max-width: 1500px;
  margin: 0 auto;
}
</style>
