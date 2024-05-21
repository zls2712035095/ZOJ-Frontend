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
import { UserControllerService } from "../../../generated";
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
  if (res.code === 0) {
    if (res.data?.userName) {
      form.userName = res.data.userName;
    }
    if (res.data?.userAvatar) {
      form.userAvatar = res.data.userAvatar;
    }
    if (res.data?.userProfile) {
      form.userProfile = res.data.userProfile;
    }
  } else {
    message.error("加载失败" + res.message);
  }
};
onMounted(() => {
  loadData();
});
</script>
