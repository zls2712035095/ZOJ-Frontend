<template>
  <a-comment
    align="right"
    avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
  >
    <template #actions>
      <a-button type="secondary" @click="restartComment"> 取消</a-button>
      <a-button type="primary" @click="submitNewComment"> 提交</a-button>
    </template>
    <template #content>
      <a-input v-model="addComment.content" placeholder="输入评论" />
    </template>
  </a-comment>
  <div>
    <template v-for="(root, index) in formComment" :key="index">
      <a-comment
        :author="root.userName"
        avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
        :content="root.content"
        :datetime="moment(root.createTime).format('YYYY-MM-DD HH:mm:ss')"
      >
        <template #actions>
          <span class="action">
            <a-space>
              <a-collapse>
                <a-collapse-item header="回复">
                  <a-comment
                    align="right"
                    avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
                  >
                    <template #actions>
                      <a-button type="secondary" @click="restartComment">
                        取消</a-button
                      >
                      <a-button type="primary" @click="replyComment(root)">
                        回复</a-button
                      >
                    </template>
                    <template #content>
                      <a-input
                        v-model="addComment.content"
                        placeholder="输入评论"
                      />
                    </template>
                  </a-comment>
                </a-collapse-item>
              </a-collapse>
            </a-space>
          </span>
        </template>

        <div>
          <template v-for="(item, index) in root.childrenComment" :key="index">
            <a-comment
              :author="item.userName"
              avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/9eeb1800d9b78349b24682c3518ac4a3.png~tplv-uwbnlip3yd-webp.webp"
              :content="item.content"
              :datetime="moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')"
            >
              <template #actions>
                <span class="action">
                  <a-space>
                    <a-collapse>
                      <a-collapse-item header="回复">
                        <a-comment
                          align="right"
                          avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
                        >
                          <template #actions>
                            <a-button type="secondary" @click="restartComment">
                              取消</a-button
                            >
                            <a-button
                              type="primary"
                              @click="replyComment(item)"
                            >
                              回复</a-button
                            >
                          </template>
                          <template #content>
                            <a-input
                              v-model="addComment.content"
                              placeholder="输入评论"
                            />
                          </template>
                        </a-comment>
                      </a-collapse-item>
                    </a-collapse>
                  </a-space>
                </span>
              </template>
            </a-comment>
          </template>
        </div>
      </a-comment>
    </template>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, reactive, ref, withDefaults } from "vue";
import {
  UserRegisterRequest,
  CommentAddRequest,
  CommentControllerService,
  Comments,
  CommentQueryRequest,
  User,
  UserControllerService,
} from "../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import moment from "moment/moment";

interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => "1787005900166373378",
});

const router = useRouter();
const store = useStore();

const addComment = reactive<CommentAddRequest>({});
const formComment = ref<Comments[]>([] as Comments[]);
const query = reactive<CommentQueryRequest>({});
const currentUser = ref<User>({});

const submitNewComment = async () => {
  const res = await CommentControllerService.addCommentUsingPost({
    ...addComment,
    foreignId: props.id as any,
    userId: currentUser.value.id,
    userName: currentUser.value.userName,
  });
  if (res.code === 0) {
    loadData();
    console.log(res);
    console.log("foreignId:" + props.id);
    addComment.content = "";
  } else {
    message.error("评论失败！", res.message);
  }
};
const replyComment = async (comment: Comments) => {
  console.log(addComment);
  const res = await CommentControllerService.addCommentUsingPost({
    ...addComment,
    foreignId: props.id as any,
    userId: currentUser.value.id,
    userName: currentUser.value.userName,
    pid: comment.id,
  });
  if (res.code === 0) {
    loadData();
    console.log(res);
    console.log("pid:" + comment.pid);
    console.log("foreignId:" + props.id);
    addComment.content = "";
  } else {
    message.error("评论失败！", res.message);
  }
};

const restartComment = () => {
  addComment.content = "";
};
/**
 * 加载数据
 */
const loadData = async () => {
  const res = await CommentControllerService.listCommentsByPageUsingPost({
    ...query,
    foreignId: props.id as any,
    sortField: "creatTime",
  });
  const resUser = await UserControllerService.getLoginUserUsingGet();
  if (res.code === 0) {
    console.log(res);
    formComment.value = res.data.records as Comments[];
    currentUser.value = resUser.data as User;
  } else {
    message.error("加载失败" + res.message);
  }
};
onMounted(() => {
  loadData();
});
</script>
<style scoped>
.action {
  display: inline-block;
  padding: 0 4px;
  color: var(--color-text-1);
  line-height: 24px;
  background: transparent;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.1s ease;
}

.action:hover {
  background: var(--color-fill-3);
}
</style>
