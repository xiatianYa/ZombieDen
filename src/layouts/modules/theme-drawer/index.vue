<script setup lang="ts">
import { useAppStore } from '@/store/modules/app';
import { $t } from '@/locales';
import DarkMode from './modules/dark-mode.vue';
import ThemeColor from './modules/theme-color.vue';
import BaseBg from './modules/base-bg.vue';

defineOptions({
  name: 'ThemeDrawer'
});

const appStore = useAppStore();
</script>

<template>
  <NDrawer v-model:show="appStore.themeDrawerVisible" display-directive="show" :width="360">
    <NDrawerContent :title="$t('theme.themeDrawerTitle')" :native-scrollbar="false" closable>
      <BaseBg />
      <DarkMode />
      <ThemeColor />
    </NDrawerContent>
  </NDrawer>
</template>

<style scoped></style>
