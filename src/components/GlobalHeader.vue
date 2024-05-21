<template>
  <a-row id="globalHeader" align="center" :wrap="false">
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        :selected-keys="selectedKeys"
        @menu-item-click="doMenuClick"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div class="title-bar">
            <img class="logo" src="../assets/ZOJ-Logo.jpg" />
            <div class="title">ZOJ</div>
          </div>
        </a-menu-item>
        <a-menu-item v-for="item in visibleRouts" :key="item.path">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <div>
        <a-space direction="vertical" style="align-items: center">
          <a-dropdown trigger="hover">
            <template v-if="store.state.user?.loginUser">
              <template v-if="store.state.user?.loginUser.userAvatar">
                <a-avatar shape="circle"
                  ><img
                    alt="avatar"
                    :src="store.state.user?.loginUser.userAvatar"
                    class="userAvatar"
                /></a-avatar>
              </template>
              <template v-else>
                <a-avatar shape="circle">
                  <IconUser />
                </a-avatar>
              </template>
            </template>
            <template v-else>
              <a-avatar>未登录</a-avatar>
            </template>
            <template #content>
              <template
                v-if="
                  store.state.user?.loginUser &&
                  store.state.user?.loginUser.userRole !== ACCESS_ENUM.NOT_LOGIN
                "
              >
                <a-doption>
                  <template #icon>
                    <icon-idcard />
                  </template>
                  <template #default>
                    <a-anchor-link href="/user/infomessage"
                      >个⼈信息</a-anchor-link
                    >
                  </template>
                </a-doption>
                <a-doption>
                  <template #icon>
                    <icon-idcard />
                  </template>
                  <template #default>
                    <a-anchor-link href="/user/update"
                      >修改个⼈信息
                    </a-anchor-link>
                  </template>
                </a-doption>
                <a-doption>
                  <template #icon>
                    <icon-poweroff />
                  </template>
                  <template #default>
                    <a-anchor-link href="/user/updatepwd"
                      >修改密码
                    </a-anchor-link>
                  </template>
                </a-doption>
                <a-doption>
                  <template #icon>
                    <icon-poweroff />
                  </template>
                  <template #default>
                    <a-anchor-link @click="logout">退出登录</a-anchor-link>
                  </template>
                </a-doption>
              </template>
              <template v-else>
                <a-doption>
                  <template #icon>
                    <icon-user />
                  </template>
                  <template #default>
                    <a-anchor-link href="/user/login">⽤户登录</a-anchor-link>
                  </template>
                </a-doption>
                <a-doption>
                  <template #icon>
                    <icon-user-add />
                  </template>
                  <a-anchor-link href="/user/register">⽤户注册</a-anchor-link>
                </a-doption>
              </template>
            </template>
          </a-dropdown>
          {{ store.state.user?.loginUser?.userName ?? "未登录" }}
        </a-space>
      </div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { routes } from "../router/routes";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";
import ACCESS_ENUM from "@/access/ACCESS_ENUM";
import { UserControllerService } from "../../generated";

const router = useRouter();
const store = useStore();

//展示在菜单的路由数组
const visibleRouts = computed(() => {
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    //根据权限过滤菜单
    if (
      !checkAccess(store.state.user.loginUser, item?.meta?.access as string)
    ) {
      return false;
    }
    return true;
  });
});

//默认主页
const selectedKeys = ref(["/"]);
//路由跳转时，更新选中的菜单项
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});

// console.log();
// setTimeout(() => {
//   store.dispatch("user/getLoginUser", {
//     userName: "zackzhang管理员",
//     userRole: ACCESS_ENUM.ADMIN,
//   });
// }, 3000);
const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};
const logout = () => {
  UserControllerService.userLogoutUsingPost();
  location.reload();
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.title {
  color: #444;
  margin-left: 16px;
}

.logo {
  height: 48px;
}
</style>
