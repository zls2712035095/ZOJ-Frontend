<template>
  <div id="userInfoMessageView">
    <h2 style="margin-bottom: 16px">用户信息</h2>
    <a-form
      style="max-width: 480px; margin: 0 auto"
      label-align="left"
      auto-label-width="true"
      :model="form"
      @submit="handleSubmit"
    >
      <a-form-item field="userAvatar" label="头像">
        <a-avatar>
          <IconUser />
        </a-avatar>
      </a-form-item>
      <a-form-item field="userName" label="昵称">
        <a-input v-model="form.userName" placeholder="" />
      </a-form-item>
      <a-form-item field="userProfile" label="用户简介">
        <a-input v-model="form.userProfile" placeholder="" />
      </a-form-item>
      <a-form
        style="max-width: 480px; margin: 0 auto"
        label-align="left"
        auto-label-width="true"
        :model="questionform"
      >
        <a-form-item field="acNum" label="通过总题数">
          {{ questionform.acNum }}
        </a-form-item>
        <a-form-item field="submitNum" label="提交总数">
          {{ questionform.submitNum }}
        </a-form-item>
        <a-form-item field="questionPassRate" label="通过率">
          <template v-if="questionform.submitNum === 0"> 0 </template>
          <template v-else>
            {{ questionform.acNum / questionform.submitNum }}</template
          >
        </a-form-item>
      </a-form>
      <a-form-item>
        <a-button type="primary" style="width: 120px" @click="router.push('/')">
          返回
        </a-button>
      </a-form-item>
    </a-form>
    <!--    {{ form }}-->
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
import {
  QuestionControllerService,
  UserControllerService,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

/**
 * 表单信息
 */
const form = reactive({
  userName: "",
  userAvatar: "",
  userProfile: "",
});

const questionform = reactive({
  acNum: "0",
  submitNum: "0",
});
/**
 * 提交表单
 */
const handleSubmit = async () => {
  const res = await UserControllerService.updateMyUserUsingPost(form);
  if (res.code === 0) {
    message.success("更新成功");
  } else {
    message.error("更新失败" + res.message);
  }
};

/**
 * 加载数据
 */
const loadData = async () => {
  const res = await UserControllerService.getLoginUserUsingGet();
  const userRankRes = await QuestionControllerService.getUserRankUsingGet();
  if (res.code === 0 && userRankRes.code === 0) {
    if (res.data?.userName) {
      form.userName = res.data.userName;
    }
    if (res.data?.userAvatar) {
      form.userAvatar = res.data.userAvatar;
    }
    if (res.data?.userProfile) {
      form.userProfile = res.data.userProfile;
    }
    if (userRankRes.data?.acNum) {
      questionform.acNum = userRankRes.data.acNum as any;
    }
    if (userRankRes.data?.submitNum) {
      questionform.submitNum = userRankRes.data.submitNum as any;
    }
    message.success("加载成功");
  } else {
    message.error("加载失败" + res.message);
    message.error("请重新登录");
    router.push("/user/login");
    return;
  }
};
onMounted(() => {
  loadData();
});
</script>
