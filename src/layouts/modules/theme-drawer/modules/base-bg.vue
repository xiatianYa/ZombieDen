<script setup lang="ts">
import { ref } from 'vue';
import { useThemeStore } from '@/store/modules/theme';
import { $t } from '@/locales';

defineOptions({
  name: 'DarkMode'
});

const themeStore = useThemeStore();

const bgList = ref([
  'https://www.bluearchive.top/statics/2025/01/11/bg01_20250111122922A001.png',
  'https://www.bluearchive.top/statics/2025/01/11/bg02_20250111123633A002.png',
  'https://www.bluearchive.top/statics/2025/01/11/bg03.png',
  'https://www.bluearchive.top/statics/2025/01/11/bg04.png',
  'https://www.bluearchive.top/statics/2025/01/11/bg05.png'
]);
</script>

<template>
  <NDivider>{{ $t('theme.baseBg') }}</NDivider>
  <div class="flex-col-stretch gap-16px">
    <div class="i-flex-center">
      <NImageGroup>
        <NSpace>
          <NImage
            v-for="(item, index) in bgList"
            :key="index"
            class="mr-5px min-h-50px cursor-pointer"
            width="80"
            preview-disabled
            :src="item"
            @click="themeStore.setBaseBg(item)"
          ></NImage>
        </NSpace>
      </NImageGroup>
    </div>
  </div>
</template>

<style scoped>
.sider-inverted-enter-active,
.sider-inverted-leave-active {
  --uno: h-22px transition-all-300;
}

.sider-inverted-enter-from,
.sider-inverted-leave-to {
  --uno: translate-x-20px opacity-0 h-0;
}
</style>
