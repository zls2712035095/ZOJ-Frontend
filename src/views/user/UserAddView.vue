<template>
  <div id="userRegisterView">
    <h2 style="margin-bottom: 16px">添加用户</h2>
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
          placeholder="密码默认为12345678"
        />
      </a-form-item>
      <a-form-item>
        <a-space>
          <a-button type="primary" href="/user/adminmanager">返回</a-button>
          <a-button
            type="primary"
            style="width: 120px; margin: 0 auto"
            html-type="submit"
            >添加
          </a-button>
        </a-space>
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
  userPassword: "12345678",
  checkPassword: "12345678",
  userName: "",
} as UserRegisterRequest);
/**
 * 提交表单
 */
const handleSubmit = async () => {
  const res = await UserControllerService.userRegisterUsingPost(form);
  // 注册成功，跳转到登录⻚⾯
  if (res.code === 0) {
    message.success("添加成功！");
    await store.dispatch("getLoginUser");
    router.push({
      path: "/user/adminmanager",
      replace: true,
    });
  } else {
    message.error("添加失败，" + res.message);
  }
};
</script>
