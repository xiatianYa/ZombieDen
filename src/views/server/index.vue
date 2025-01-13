<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { addColorAlpha, mixColor } from '@sa/color';
import { useThemeStore } from '@/store/modules/theme';
import { useAppStore } from '@/store/modules/app';
import { fetchGetMapList, fetchGetServerInfo } from '@/service/api';
import ThemeDrawer from '../../layouts/modules/theme-drawer/index.vue';
import ServerCard from './modules/server-card.vue';

// 主体仓库
const themeStore = useThemeStore();

// appStore

const appStore = useAppStore();

// 背景色
const bgColor = computed(() => {
  const COLOR_WHITE = '#ffffff';

  const ratio = themeStore.darkMode ? 0.5 : 0.2;

  return addColorAlpha(mixColor(COLOR_WHITE, themeStore.themeColor, ratio), 0.7);
});

// 服务器数据列表
const serverData = ref([
  {
    modelName: 'CS2-僵尸逃跑',
    serverList: [
      {
        address: 'cs1.zombieden.cn:27016',
        serverData: null
      },
      {
        address: 'cs3.zombieden.cn:27015',
        serverData: null
      },
      {
        address: 'cs3.zombieden.cn:27016',
        serverData: null
      },
      {
        address: 'cs5.zombieden.cn:27015',
        serverData: null
      },
      {
        address: 'cs5.zombieden.cn:27016',
        serverData: null
      }
    ]
  },
  {
    modelName: 'CS2-挂机大厅',
    serverList: [
      {
        address: 'cs1.zombieden.cn:27015',
        serverData: null
      }
    ]
  },
  {
    modelName: 'CS-僵尸逃跑',
    serverList: [
      {
        address: 'cs2.zombieden.cn:27050',
        serverData: null
      },
      {
        address: 'cs2.zombieden.cn:27051',
        serverData: null
      }
    ]
  },
  {
    modelName: 'CS-你画我猜',
    serverList: [
      {
        address: 'cs2.zombieden.cn:27053',
        serverData: null
      }
    ]
  },
  {
    modelName: 'CS-匪镇谍影',
    serverList: [
      {
        address: 'cs6.zombieden.cn:27055',
        serverData: null
      }
    ]
  },
  {
    modelName: 'CS-连跳',
    serverList: [
      {
        address: 'cs3.zombieden.cn:27052',
        serverData: null
      }
    ]
  },
  {
    modelName: 'CS-攀岩',
    serverList: [
      {
        address: 'cs6.zombieden.cn:27103',
        serverData: null
      }
    ]
  },
  {
    modelName: 'CS-闯关',
    serverList: [
      {
        address: 'cs3.zombieden.cn:27053',
        serverData: null
      },
      {
        address: 'cs3.zombieden.cn:27054',
        serverData: null
      },
      {
        address: 'cs4.zombieden.cn:27055',
        serverData: null
      }
    ]
  },
  {
    modelName: 'CS-娱乐对抗',
    serverList: [
      {
        address: 'cs4.zombieden.cn:27052',
        serverData: null
      },
      {
        address: 'cs4.zombieden.cn:27053',
        serverData: null
      }
    ]
  },
  {
    modelName: 'CS-混战',
    serverList: [
      {
        address: 'cs4.zombieden.cn:27054',
        serverData: null
      }
    ]
  },
  {
    modelName: 'CS-滑翔',
    serverList: [
      {
        address: 'cs6.zombieden.cn:27203',
        serverData: null
      }
    ]
  },
  {
    modelName: 'CS-死亡奔跑',
    serverList: [
      {
        address: 'cs2.zombieden.cn:27054',
        serverData: null
      }
    ]
  }
]);

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

// 初始化地图列表
const initMap = async () => {
  // 获取地图列表
  const { data } = await fetchGetMapList();
  if (data) mapData.value = data;
};

// 初始化
const init = async () => {
  // 用于收集所有获取服务器信息的异步操作Promise
  const allPromises: Promise<void>[] = [];

  serverData.value.forEach(server => {
    server.serverList.forEach(serverItem => {
      // 为每个serverItem的信息获取操作创建Promise并添加到数组
      allPromises.push(
        (async () => {
          const data = await fetchGetServerInfo({ address: serverItem.address });
          if (!data) {
            serverItem.serverData = null;
          } else {
            const map = mapData.value.find((item: any) => item.mapName === data.Map);
            if (map) {
              data.mapUrl = map.mapUrl;
              data.mapLabel = map.mapLabel;
              data.tag = JSON.parse(map.tag);
              data.type = String(map.type);
            }
            serverItem.serverData = data;
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
  }, 15000);
};

onMounted(async () => {
  // 初始化服务器数据
  await initMap();
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
    <div class="server-header mt-20px flex p-10px" :style="{ backgroundColor: bgColor }">
      <div class="server-header-left flex-y-center">
        <div class="server-header-logo mr-5px cursor-pointer" @click="goHref('https://zombieden.cn/')">
          <img src="@/assets/imgs/logo.png" />
        </div>
        <div class="server-header-logger font-size-18px">
          <ButtonIcon class="p-5px" @click="goHref('https://bbs.zombieden.cn/')">
            <SvgIcon icon="fluent:game-chat-20-regular" />
            <span class="text-16px">论坛</span>
          </ButtonIcon>
          <ButtonIcon class="p-5px" @click="goHref('https://bbs.zombieden.cn/thread-80146-1-1.html')">
            <SvgIcon icon="carbon:game-console" />
            <span class="text-16px">登录器</span>
          </ButtonIcon>
        </div>
      </div>
      <div class="server-header-right flex-y-center font-size-18px">
        <div class="server-header-icon">
          <ThemeSchemaSwitch
            :theme-schema="themeStore.themeScheme"
            :is-dark="themeStore.darkMode"
            @switch="themeStore.toggleThemeScheme"
          />
        </div>
        <div class="server-header-icon">
          <ButtonIcon
            class="p-5px"
            icon="majesticons:color-swatch-line"
            :tooltip-content="$t('icon.themeConfig')"
            @click="appStore.openThemeDrawer"
          />
        </div>
      </div>
    </div>
    <div class="server-body mb-20px mt-20px p-10px" :style="{ backgroundColor: bgColor }">
      <NSpin :show="loading" class="min-h-800px">
        <div v-for="(server, index) in serverData" v-show="!loading" :key="index" class="servers mb-10px">
          <NText>{{ server.modelName }}</NText>
          <NGrid :x-gap="10" :y-gap="10" cols="1 s:2 m:3 l:4 xl:5 2xl:5" responsive="screen">
            <NGridItem
              v-for="(serverItem, serverItemIndex) in server.serverList"
              v-show="serverItem.serverData"
              :key="serverItemIndex"
            >
              <ServerCard :game-server-vo="serverItem.serverData" />
            </NGridItem>
          </NGrid>
        </div>
      </NSpin>
    </div>
    <div class="server-footer mb-20px p-5px" :style="{ backgroundColor: bgColor }">
      <NText>Copyright © 2025 僵尸乐园 All Rights Reserved.</NText>
      <NText class="cursor-pointer" @click="goHref('https://beian.miit.gov.cn/')">鄂ICP备18027986号-1</NText>
    </div>
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
    height: 48px;
    border-radius: 10px;

    .server-header-left {
      flex: 1;
      .server-header-logo {
        display: flex;
        align-items: center;

        img {
          min-width: 50px;
          height: 28px;
        }
      }

      .server-header-logger {
        display: flex;
        align-items: center;
        height: 100%;
      }
    }

    .server-header-right {
      display: flex;
      justify-content: end;

      .server-header-icon {
        display: flex;
        align-items: center;
        height: 100%;
      }
    }
  }

  .server-body {
    width: 90%;
    border-radius: 10px;
  }

  .server-footer {
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;

    .cursor-pointer {
      color: #0d6efd;
    }
  }
}
</style>
