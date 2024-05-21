<template>
  <div id="userLoginView">
    <h2 style="margin-bottom: 16px">修改密码</h2>
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
      <a-form-item field="userPassword" label="用户新密码">
        <a-input v-model="form.userPassword" placeholder="请输入新密码" />
      </a-form-item>
      <a-form-item>
        <a-space>
          <a-button type="primary" html-type="submit" style="width: 120px"
            >更改
          </a-button>
          <a-button
            type="primary"
            style="width: 120px"
            @click="router.push('/')"
          >
            返回
          </a-button>
        </a-space>
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
  userPassword: "",
});
/**
 * 提交表单
 */
const handleSubmit = async () => {
  const res = await UserControllerService.updateMyUserUsingPost(form);
  if (res.code === 0) {
    message.success("密码修改成功");
    router.push("/user/login");
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
