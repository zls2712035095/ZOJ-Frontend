<template>
  <div
    id="code-editor"
    ref="codeEditorRef"
    style="min-height: 400px; height: 60vh"
  />
  <!--  <a-button @click="fillValue">填充值</a-button>-->
</template>

<script setup lang="ts">
import * as monaco from "monaco-editor";
import { toRaw, onMounted, ref, withDefaults, defineProps, watch } from "vue";

/**
 * 定义组件属性类型
 */
interface Props {
  value: string;
  language: string;
  codeDefault: string;
  handleChange: (v: string) => void;
}

const codeEditorRef = ref();
const codeEditor = ref();
/**
 * 给组件指定初始值
 */
const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  language: () => "java",
  codeDefault: () => "",
  handleChange: (v: string) => {
    console.log(v);
  },
});
// const fillValue = () => {
//   if (!codeEditor.value) {
//     return;
//   }
//   toRaw(codeEditor.value).setValue("新的值");
// };

watch(
  () => props.language,
  () => {
    if (codeEditor.value) {
      monaco.editor.setModelLanguage(
        toRaw(codeEditor.value).getModel(),
        props.language
      );
    }
  }
);
watch(
  () => props.codeDefault,
  () => {
    if (codeEditor.value) {
      toRaw(codeEditor.value).setValue(props.codeDefault);
    }
  }
);

onMounted(() => {
  if (!codeEditorRef.value) {
    return;
  }
  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    value: props.value,
    language: props.language,
    automaticLayout: true,
    colorDecorators: true,
    minimap: {
      enabled: false,
    },
    readOnly: false,
    theme: "vs-dark",
  });

  codeEditor.value.onDidChangeModelContent(() => {
    props.handleChange(toRaw(codeEditor.value).getValue());
  });
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
