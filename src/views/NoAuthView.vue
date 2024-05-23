<template>
  <div id="manageUserView">
    <a-space>
      <a-button type="primary" href="/">返回</a-button>
      <a-button type="primary" href="/user/add">新增</a-button>
    </a-space>
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
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="doUpdate(record)">修改</a-button>
          <a-button type="primary" @click="doRestartPwd(record)"
            >重置密码
          </a-button>
          <a-button status="danger" @click="doDelete(record)">删除</a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watchEffect } from "vue";
import { UserControllerService, User } from "../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";

const show = ref(true);

const dataList = ref([]);
const total = ref(0);
const searchParams = ref({
  pageSize: 10,
  current: 1,
});

const loadData = async () => {
  const res = await UserControllerService.listUserByPageUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
    console.log(dataList);
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
    title: "id",
    dataIndex: "id",
  },
  {
    title: "昵称",
    dataIndex: "userName",
  },
  {
    title: "用户简介",
    dataIndex: "userProfile",
  },
  {
    title: "用户权限",
    dataIndex: "userRole",
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

const doDelete = async (user: User) => {
  const res = await UserControllerService.deleteUserUsingPost({
    id: user.id,
  });
  if (res.code === 0) {
    message.success("删除成功");
    loadData();
  } else {
    message.error("删除失败");
  }
};

const router = useRouter();

const doUpdate = (user: User) => {
  router.push({
    path: `/user/update/${user.id}`,
  });
};
const form = reactive({
  id: 0 as number,
  userName: "",
  userAvatar: "",
  userProfile: "",
  userPassword: "12345678",
});
const doRestartPwd = async (user: User) => {
  form.id = user.id as number;
  form.userPassword = "12345678";
  const res = await UserControllerService.updateUserUsingPost(form);
  if (res.code === 0) {
    message.success("密码重置成功");
    loadData();
  } else {
    message.error("更新失败" + res.message);
  }
};
</script>

<style scoped></style>
