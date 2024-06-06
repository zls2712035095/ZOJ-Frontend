import { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/ExampleView.vue";
import AdminView from "@/views/AdminView.vue";
import NoAuthView from "@/views/NoAuthView.vue";
import ACCESS_ENUM from "@/access/ACCESS_ENUM";
import UserLayout from "@/layouts/UserLayout.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";
import AddQuestionView from "@/views/question/AddQuestionView.vue";
import ManageQuestionView from "@/views/question/ManageQuestionView.vue";
import QuestionsView from "@/views/question/QuestionsView.vue";
import DoQuestionsView from "@/views/question/DoQuestionsView.vue";
import QuestionSubmitView from "@/views/question/QuestionSubmitView.vue";
import QuestionSubmitCodeView from "@/views/question/QuestionSubmitCodeView.vue";
import UserUpdateView from "@/views/user/UserUpdateView.vue";
import UserUpdatePwdView from "@/views/user/UserUpdatePwdView.vue";
import UserInfoMessageView from "@/views/user/UserInfoMessageView.vue";
import ManageUserView from "@/views/user/ManageUserView.vue";
import ExampleView from "@/views/ExampleView.vue";
import UserUpdateByAdminView from "@/views/user/UserUpdateByAdminView.vue";
import RankView from "@/views/question/RankView.vue";
import UserAddView from "@/views/user/UserAddView.vue";
import AboutView from "@/views/AboutView.vue";
import QuestionListView from "@/views/question/QuestionListView.vue";
import AddQuestionListView from "@/views/question/AddQuestionListView.vue";
import ManageQuestionListView from "@/views/question/ManageQuestionListView.vue";
import QuestionListQuestionView from "@/views/question/QuestionListQuestionView.vue";
import QuestionListDoQuestionView from "@/views/question/QuestionListDoQuestionView.vue";

export const routes: Array<RouteRecordRaw> = [
  // todo 嵌套路由改造 -》嵌套菜单
  {
    path: "/user",
    name: "用户",
    component: UserLayout,
    children: [
      {
        path: "/user/login",
        name: "用户登录",
        component: UserLoginView,
      },
      {
        path: "/user/register",
        name: "用户注册",
        component: UserRegisterView,
      },
      {
        path: "/user/add",
        name: "添加用户",
        component: UserAddView,
      },
      {
        path: "/user/infomessage",
        name: "查看用户信息",
        component: UserInfoMessageView,
      },
      {
        path: "/user/update",
        name: "用户信息修改",
        component: UserUpdateView,
      },
      {
        path: "/user/updatepwd",
        name: "用户修改密码",
        component: UserUpdatePwdView,
      },
      {
        path: "/user/adminmanager",
        name: "管理员页面",
        component: ManageUserView,
      },
      {
        path: "/user/update/:id",
        name: "管理员修改用户信息页面",
        component: UserUpdateByAdminView,
        props: true,
        meta: {
          access: ACCESS_ENUM.USER,
        },
      },
    ],
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/",
    name: "主页 ",
    component: QuestionsView,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/questions",
    name: "主页",
    component: QuestionsView,
  },
  {
    path: "/questionList",
    name: "题单",
    component: QuestionListView,
  },
  {
    path: "/view/question/:id",
    name: "做题页面",
    component: DoQuestionsView,
    props: true,
    meta: {
      access: ACCESS_ENUM.USER,
      hideInMenu: true,
    },
  },
  {
    path: "/view/questionList/do/:id",
    name: "题单中做题页面",
    component: QuestionListDoQuestionView,
    props: true,
    meta: {
      access: ACCESS_ENUM.USER,
      hideInMenu: true,
    },
  },
  {
    path: "/view/question_submit",
    name: "提交榜",
    component: QuestionSubmitView,
    props: true,
    meta: {
      access: ACCESS_ENUM.USER,
    },
  },
  {
    path: "/view/question_submit/:id",
    name: "提交记录详情页面",
    component: QuestionSubmitCodeView,
    props: true,
    meta: {
      access: ACCESS_ENUM.USER,
      hideInMenu: true,
    },
  },
  {
    path: "/add/question",
    name: "创建题目",
    component: AddQuestionView,
    meta: {
      access: ACCESS_ENUM.USER,
    },
  },
  {
    path: "/add/questionList",
    name: "创建题单",
    component: AddQuestionListView,
    meta: {
      access: ACCESS_ENUM.USER,
    },
  },
  {
    path: "/update/question",
    name: "更新题目",
    component: AddQuestionView,
    meta: {
      access: ACCESS_ENUM.USER,
      hideInMenu: true,
    },
  },
  {
    path: "/view/questionList/:id",
    name: "查看题单页面",
    component: QuestionListQuestionView,
    props: true,
    meta: {
      access: ACCESS_ENUM.USER,
      hideInMenu: true,
    },
  },
  {
    path: "/update/questionList",
    name: "更新题单",
    component: AddQuestionListView,
    meta: {
      access: ACCESS_ENUM.USER,
      hideInMenu: true,
    },
  },
  {
    path: "/manage/question",
    name: "管理题目",
    component: ManageQuestionView,
    meta: {
      access: ACCESS_ENUM.USER,
    },
  },
  {
    path: "/manage/questionList",
    name: "管理题单",
    component: ManageQuestionListView,
    meta: {
      access: ACCESS_ENUM.USER,
    },
  },
  {
    path: "/rank",
    name: "排行榜",
    component: RankView,
  },
  // {
  //   path: "/hide",
  //   name: "隐藏页面",
  //   component: HomeView,
  //   meta: {
  //     hideInMenu: true,
  //   },
  // },
  {
    path: "/noAuth",
    name: "无权限",
    component: NoAuthView,
    meta: {
      hideInMenu: true,
    },
  },
  // {
  //   path: "/admin",
  //   name: "管理员可见",
  //   component: AdminView,
  //   meta: {
  //     access: ACCESS_ENUM.ADMIN,
  //   },
  // },
  {
    path: "/about",
    name: "我的",
    component: AboutView,
    meta: {
      hideInMenu: true,
    },
  },
];
