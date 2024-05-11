<template>
  <Viewer :value="value" :plugins="plugins" />
</template>

<script setup lang="ts">
import gfm from "@bytemd/plugin-gfm";
import { Viewer } from "@bytemd/vue-next";
import { withDefaults, defineProps } from "vue";
import breaks from "@bytemd/plugin-breaks";
import frontmatter from "@bytemd/plugin-frontmatter";
import gemoji from "@bytemd/plugin-gemoji";
import highlight from "@bytemd/plugin-highlight";
import highlightSsr from "@bytemd/plugin-highlight-ssr";
import math from "@bytemd/plugin-math";
import mathSsr from "@bytemd/plugin-math-ssr";
import mediumZoom from "@bytemd/plugin-medium-zoom";
import mermaid from "@bytemd/plugin-mermaid";

interface Props {
  value: string;
}

const plugins = [
  gfm(),
  // Add more plugins here
  breaks(),
  frontmatter(),
  gemoji(),
  highlight(),
  highlightSsr(),
  math(),
  mathSsr(),
  mediumZoom(),
  mermaid(),
];

const props = withDefaults(defineProps<Props>(), {
  value: () => "",
});
</script>

<style>
.bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy-right:last-child {
  display: none;
}
</style>
