<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import type { DropdownOption } from 'naive-ui';
import axios from 'axios';
import { useThemeStore } from '@/store/modules/theme';
import { useAppStore } from '@/store/modules/app';
import { fetchGetHotList, fetchGetMapList, fetchGetServerInfo } from '@/service/api';
import { useSvgIcon } from '@/hooks/common/icon';
import ThemeDrawer from '../../layouts/modules/theme-drawer/index.vue';
import ServerCard from './modules/server-card.vue';

const { SvgIconVNode } = useSvgIcon();

// 主体仓库
const themeStore = useThemeStore();

// appStore

const appStore = useAppStore();

// 服务器数据列表
const serverData = ref<any[]>([]);

// 地图列表
const mapData = ref();

// 定时更新服务器任务
const timer = ref<any | null>(null);

// 是否在加载
const loading = ref(true);

// 打开其他网页
const goHref = (url: string) => {
  // 新开窗口 调整到目标 url
  window.open(url);
};

// 移动端配置项
const mobileOptions = ref<DropdownOption[]>([
  {
    label: '论坛',
    key: 'forum',
    icon: SvgIconVNode({ icon: 'fluent:game-chat-20-regular', fontSize: 18 })
  },
  {
    label: '登录器',
    key: 'login',
    icon: SvgIconVNode({ icon: 'carbon:game-console', fontSize: 18 })
  },
  {
    label: 'QQ群',
    key: 'qq',
    icon: SvgIconVNode({ icon: 'mingcute:qq-line', fontSize: 18 })
  }
]);

// 移动端配置项点击
const handleDropdown = (key: string) => {
  if (key === 'forum') {
    goHref('https://bbs.zombieden.cn/');
  } else if (key === 'login') {
    goHref('https://bbs.zombieden.cn/thread-80146-1-1.html');
  } else if (key === 'qq') {
    goHref('https://qm.qq.com/q/UJTk5VrNia');
  }
};

// 初始化地图列表
const initMap = async () => {
  // 获取地图列表
  try {
    const { data, error } = await fetchGetMapList();
    if (!error) {
      mapData.value = data;
    }
  } catch (error) {
    window?.$message?.error(`获取地图列表失败${error}`);
  }
};

// 初始化服务器列表
const initServers = async () => {
  // 获取服务器列表
  try {
    // 使用axios获取JSON文件
    const response = await axios.get('/config/servers.json');
    // 将响应数据赋值给响应式变量
    serverData.value = response.data;
  } catch (error) {
    window?.$message?.error(`获取服务器列表失败${error}`);
  }
};

// 初始化
const init = async () => {
  const hotList = await fetchGetHotList();
  // 用于收集所有获取服务器信息的异步操作Promise
  const allPromises: Promise<void>[] = [];

  serverData.value.forEach((server: any) => {
    server.serverList.forEach((serverItem: any) => {
      // 为每个serverItem的信息获取操作创建Promise并添加到数组
      allPromises.push(
        (async () => {
          try {
            // 避免请求报错 导致网页渲染错误
            const data: any = await fetchGetServerInfo({ address: serverItem.address });
            if (!data && !serverItem.serverData) {
              serverItem.serverData = null;
            } else {
              if (mapData.value) {
                const map = mapData.value.find((item: any) => item.mapName === data.Map);
                if (map) {
                  data.mapUrl = map.mapUrl;
                  data.mapLabel = map.mapLabel;
                  data.tag = JSON.parse(map.tag);
                  data.type = String(map.type);
                }
              }

              serverItem.serverData = data;

              // 查找是否是热门服务器
              const hotServer = hotList.data.list.find((item: any) => item.serverAddress === serverItem.serverAddress);
              if (hotServer && hotServer.isHot) {
                serverItem.serverData.isHot = true;
              } else {
                serverItem.serverData.isHot = false;
              }
            }
          } catch (error) {
            // 捕获错误并进行处理，这里将 serverItem.serverData 设置为 null
            console.error(`获取服务器信息时出错，地址: ${serverItem.address}`, error);
          }
        })()
      );
    });
  });

  // 等待所有异步操作完成
  await Promise.all(allPromises);

  // 这里可以添加后续需要执行的逻辑，比如触发一个事件通知外部相关代码数据已准备好等
  loading.value = false;
};
// 开启定时任务
const startTimer = () => {
  // 开启定时任务 轮询服务器数据
  timer.value = setInterval(() => {
    init();
  }, 60000);
};

onMounted(async () => {
  // 初始化服务器数据
  await initMap();
  await initServers();
  init();
  startTimer();
});

onUnmounted(() => {
  if (timer.value) clearInterval(timer.value);
});
</script>

<template>
  <div
    class="server relative size-full flex-col flex-y-center overflow-hidden"
    :style="{
      backgroundImage: `url(${themeStore?.baseBg})`
    }"
  >
    <NCard class="server-header mt-20px" size="small" content-class="flex flex-wrap">
      <div class="server-header-left flex-y-center">
        <div class="server-header-logo mr-2px cursor-pointer" @click="goHref('https://zombieden.cn/')">
          <img src="@/assets/imgs/logo.png" />
        </div>
      </div>
      <div class="server-header-right flex-y-center font-size-18px">
        <ButtonIcon class="mr-10px p-2px" @click="goHref('https://bbs.zombieden.cn/')">
          <SvgIcon icon="fluent:game-chat-20-regular" />
          <span class="text-16px">论坛</span>
        </ButtonIcon>
        <ButtonIcon class="mr-10px p-2px" @click="goHref('https://bbs.zombieden.cn/thread-80146-1-1.html')">
          <SvgIcon icon="carbon:game-console" />
          <span class="text-16px">登录器</span>
        </ButtonIcon>
        <ButtonIcon class="mr-10px p-2px" @click="goHref('https://qm.qq.com/q/UJTk5VrNia')">
          <SvgIcon icon="mingcute:qq-line" />
          <span class="text-16px">QQ群</span>
        </ButtonIcon>
        <div class="server-header-icon">
          <ThemeSchemaSwitch
            class="theme-config-icon ml-5px p-5px"
            :theme-schema="themeStore.themeScheme"
            :is-dark="themeStore.darkMode"
            @switch="themeStore.toggleThemeScheme"
          />
        </div>
        <div class="server-header-icon">
          <ButtonIcon
            class="theme-config-icon ml-5px p-5px"
            icon="majesticons:color-swatch-line"
            th
            :tooltip-content="$t('icon.themeConfig')"
            @click="appStore.openThemeDrawer"
          />
        </div>
      </div>
      <div class="server-header-right-mobile flex-y-center font-size-22px">
        <div class="server-header-icon">
          <ThemeSchemaSwitch
            class="theme-config-icon mr-10px p-2px"
            :theme-schema="themeStore.themeScheme"
            :is-dark="themeStore.darkMode"
            @switch="themeStore.toggleThemeScheme"
          />
        </div>
        <div class="server-header-icon">
          <ButtonIcon
            class="theme-config-icon mr-10px p-2px"
            icon="majesticons:color-swatch-line"
            th
            :tooltip-content="$t('icon.themeConfig')"
            @click="appStore.openThemeDrawer"
          />
        </div>
        <NDropdown :options="mobileOptions" trigger="click" @select="handleDropdown">
          <NButton text class="font-size-22px">
            <SvgIcon icon="line-md:menu-unfold-left" />
          </NButton>
        </NDropdown>
      </div>
    </NCard>
    <NCard class="server-body mb-20px mt-20px p-10px" size="small" content-class="flex-x-center flex-wrap">
      <NSpin :show="loading" class="min-h-800px">
        <div v-for="(server, index) in serverData" v-show="!loading" :key="index" class="servers mb-10px">
          <NText>{{ server.modelName }}</NText>
          <NGrid :x-gap="10" :y-gap="10" cols="1 s:2 m:3 l:4 xl:5 2xl:5" responsive="screen">
            <NGridItem v-for="(serverItem, serverItemIndex) in server.serverList" :key="serverItemIndex">
              <ServerCard :game-server-vo="serverItem.serverData" />
            </NGridItem>
          </NGrid>
        </div>
      </NSpin>
    </NCard>
    <NCard class="server-footer mb-20px p-5px" size="small" content-class="flex flex-wrap">
      <NText class="w-full text-center">Copyright © 2025 僵尸乐园 All Rights Reserved.</NText>
      <NText class="w-full cursor-pointer text-center" @click="goHref('https://beian.miit.gov.cn/')">
        鄂ICP备18027986号-1
      </NText>
    </NCard>
    <ThemeDrawer />
  </div>
</template>

<style scoped lang="scss">
.server {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow-y: auto;

  .server-header {
    width: 90%;
    display: flex;
    opacity: 0.9;

    .server-header-left {
      width: 20%;

      .server-header-logo {
        display: flex;
        align-items: center;

        img {
          min-width: 50px;
          height: 28px;
        }
      }
    }

    .server-header-right {
      width: 80%;
      display: flex;
      justify-content: end;

      .server-header-icon {
        display: flex;
        align-items: center;
        height: 100%;
      }
    }

    .server-header-right-mobile {
      display: none;
    }
  }

  .server-body {
    width: 90%;
    opacity: 0.9;
  }

  .server-footer {
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    opacity: 0.9;

    .cursor-pointer {
      color: #0d6efd;
    }
  }
}

@media (max-width: 768px) {
  .server-header-right {
    display: none !important;
  }

  .server-header-right-mobile {
    width: 80%;
    display: flex !important;
    justify-content: end;
  }
}
</style>
