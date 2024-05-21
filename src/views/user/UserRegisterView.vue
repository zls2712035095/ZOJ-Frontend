<template>
  <div id="userRegisterView">
    <h2 style="margin-bottom: 16px">注册</h2>
    <a-form
      style="max-width: 480px; margin: 0 auto"
      label-align="left"
      auto-label-width="true"
      :model="form"
      @submit="handleSubmit"
    >
      <a-form-item
        :rules="[{ required: true, message: '⽤户名不能为空' }]"
        field="userName"
        label="⽤户名"
      >
        <a-input v-model="form.userName" placeholder="请输⼊⽤户名" />
      </a-form-item>
      <a-form-item
        :rules="[
          { required: true, message: '账号不能为空' },
          { minLength: 4, message: '账号⻓度不能低于4位' },
        ]"
        field="userAccount"
        label="账号"
      >
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item
        :rules="[
          { required: true, message: '密码不能为空' },
          { minLength: 8, message: '密码⻓度不能低于8位' },
        ]"
        :validate-trigger="['change', 'input']"
        field="userPassword"
        tooltip="密码不少于8位"
        label="密码"
      >
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输⼊密码"
        />
      </a-form-item>
      <a-form-item
        :rules="[
          { required: true, message: '密码不能为空' },
          { minLength: 8, message: '密码⻓度不能低于8位' },
        ]"
        :validate-trigger="['change', 'input']"
        field="checkPassword"
        tooltip="密码不少于8位"
        label="重复密码"
      >
        <a-input-password
          v-model="form.checkPassword"
          placeholder="请重复输⼊密码"
        />
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          style="width: 120px; margin: 0 auto"
          html-type="submit"
          >注册
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { UserRegisterRequest, UserControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();
/**
 * 表单信息
 */
const form = reactive({
  userAccount: "",
  userPassword: "",
  checkPassword: "",
  userName: "",
} as UserRegisterRequest);
/**
 * 提交表单
 */
const handleSubmit = async () => {
  // 提前判断密码和重复密码是否相同
  if (
    form.userPassword?.length !== form.checkPassword?.length ||
    form.userPassword !== form.checkPassword
  ) {
    message.error("两次输⼊的密码不⼀致");
    return;
  }
  const res = await UserControllerService.userRegisterUsingPost(form);
  // 注册成功，跳转到登录⻚⾯
  if (res.code === 0) {
    message.success("注册成功！");
    await store.dispatch("getLoginUser");
    router.push({
      path: "/user/login",
      replace: true,
    });
  } else {
    message.error("注册失败，" + res.message);
  }
};
</script>
