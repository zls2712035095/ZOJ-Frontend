<template>
  <div id="userUpdateByAdminView">
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
        <a-space>
          <a-button type="primary" html-type="submit" style="width: 120px"
            >更改
          </a-button>
          <a-button
            type="primary"
            style="width: 120px"
            @click="router.push('/user/adminmanager')"
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
import { defineProps, onMounted, reactive, withDefaults } from "vue";
import { UserControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});
const router = useRouter();
/**
 * 表单信息
 */
const form = reactive({
  id: props.id as any,
  userName: "未设置昵称",
  userAvatar: "",
  userProfile: "未设置简介",
});
/**
 * 提交表单
 */
const handleSubmit = async () => {
  const res = await UserControllerService.updateUserUsingPost(form);
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
  const res = await UserControllerService.getUserByIdUsingGet(props.id as any);
  console.log(res);
  if (res.code === 0) {
    console.log(res.data);
    if (res.data?.userName) {
      form.userName = res.data.userName;
      console.log("----name-------");
    } else {
      form.userName = "未设置昵称";
    }
    if (res.data?.userAvatar) {
      form.userAvatar = res.data.userAvatar;
    }
    if (res.data?.userProfile) {
      form.userProfile = res.data.userProfile;
    } else {
      form.userProfile = "未设置简介";
    }
  } else {
    message.error("加载失败" + res.message);
  }
};
onMounted(() => {
  loadData();
});
</script>
