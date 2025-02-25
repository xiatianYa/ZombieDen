<script setup lang="ts">
import { addColorAlpha, mixColor } from '@sa/color';
import { computed, onMounted, ref, watch } from 'vue';
import { useThemeStore } from '@/store/modules/theme';
import { fetchGetPlayerList } from '@/service/api';

// 主体仓库
const themeStore = useThemeStore();

defineOptions({
  name: 'ServerCard'
});

interface Props {
  /** 社区服务器数据 */
  gameServerVo: any;
}

// 定义props
const props = defineProps<Props>();

// 定义游戏服务器数据
const gameServer = ref<any | null>();

// 服务器在线玩家列表
const gamePlayerList = ref();

// 服务器在线数据框
const gameInfoShowModel = ref(false);

// 定义标签数据
const tagOptions = ref<any[]>([
  {
    id: null,
    createTime: null,
    updateTime: null,
    label: '娱乐',
    value: '0',
    type: 'info',
    sort: 1
  },
  {
    id: null,
    createTime: null,
    updateTime: null,
    label: 'obj',
    value: '1',
    type: 'default',
    sort: 2
  },
  {
    id: null,
    createTime: null,
    updateTime: null,
    label: '狒狒',
    value: '2',
    type: 'default',
    sort: 3
  },
  {
    id: null,
    createTime: null,
    updateTime: null,
    label: '闯关',
    value: '3',
    type: 'default',
    sort: 4
  },
  {
    id: null,
    createTime: null,
    updateTime: null,
    label: '陷阱',
    value: '4',
    type: 'default',
    sort: 5
  },
  {
    id: null,
    createTime: null,
    updateTime: null,
    label: '神图',
    value: '5',
    type: 'default',
    sort: 6
  },
  {
    id: null,
    createTime: null,
    updateTime: null,
    label: '长征',
    value: '6',
    type: 'default',
    sort: 7
  },
  {
    id: null,
    createTime: null,
    updateTime: null,
    label: '神器',
    value: '7',
    type: 'default',
    sort: 8
  },
  {
    id: null,
    createTime: null,
    updateTime: null,
    label: '弹幕',
    value: '8',
    type: 'default',
    sort: 9
  },
  {
    id: null,
    createTime: null,
    updateTime: null,
    label: '跳刀',
    value: '9',
    type: 'error',
    sort: 9
  },
  {
    id: null,
    createTime: null,
    updateTime: null,
    label: '滑翔',
    value: '10',
    type: 'default',
    sort: 10
  },
  {
    id: null,
    createTime: null,
    updateTime: null,
    label: '卤粉',
    value: '11',
    type: 'default',
    sort: 11
  }
]);

// 初始化游戏服务器数据
function handleInitModel() {
  if (gameServer.value && props.gameServerVo) {
    Object.assign(gameServer.value, props.gameServerVo);
  } else {
    gameServer.value = { ...props.gameServerVo };
  }
}

// 计算进度颜色
const getOnLineColor = (server: any) => {
  if (!server) return '';
  if (server.Players <= 20) {
    return `background-color: #00f91a;height: ${(server.Players / server.MaxPlayers) * 100}%;`;
  } else if (server.Players <= 40) {
    return `background-color: #5470ee;height: ${(server.Players / server.MaxPlayers) * 100}%;`;
  } else if (server.Players <= 60) {
    return `background-color: #ffa325;height: ${(server.Players / server.MaxPlayers) * 100}%;`;
  } else if (server.Players <= 80) {
    return `background-color: #ff4f00;height: ${(server.Players / server.MaxPlayers) * 100}%;`;
  }
  return `background-color: #ff0000;height: ${(server.Players / server.MaxPlayers) * 100}%;`;
};

// 注册tag颜色
const renderColor = (typeName: string) => {
  switch (typeName) {
    case '0':
      return {
        color: '#f6ffed',
        textColor: '#389e0d'
      };
    case '1':
      return {
        color: '#e6fffb',
        textColor: '#08979c'
      };
    case '2':
      return {
        color: '#fff0f6',
        textColor: '#c41d7f'
      };
    case '3':
      return {
        color: '#fff2e8',
        textColor: '#d4380d'
      };
    case '4':
      return {
        color: '#fff1f0',
        textColor: '#cf1322'
      };
    default:
      return {
        color: '#f6ffed',
        textColor: '#389e0d'
      };
  }
};

// 注册Type名称
const renderTypeName = (typeName: string) => {
  switch (typeName) {
    case '0':
      return 'T1-简单';
    case '1':
      return 'T2-普通';
    case '2':
      return 'T3-困难';
    case '3':
      return 'T4-极难';
    case '4':
      return 'T5-史诗';
    default:
      return 'T0-未知';
  }
};

// 连接服务器
const joinServer = () => {
  const aLink = document.createElement('a');
  aLink.href = `steam://rungame/730/76561198977557298/+connect ${gameServer.value.ip}`;
  aLink.click();
  window.$message?.success('连接成功');
};

// 复制服务器地址
const copyServerAddr = () => {
  navigator.clipboard.writeText(`connect ${gameServer.value.ip}`);
  window.$message?.success('复制成功');
};

// 打开服务器详细
const openServerInfo = async () => {
  const data = await fetchGetPlayerList({ address: gameServer.value.ip });
  if (!data) {
    window.$message?.error('服务器玩家信息获取失败');
  } else {
    gamePlayerList.value = data;
    gameInfoShowModel.value = true;
  }
};

// 背景色
const bgColor = computed(() => {
  const COLOR_WHITE = '#ffffff';

  const ratio = themeStore.darkMode ? 0.5 : 0.2;

  return addColorAlpha(mixColor(COLOR_WHITE, themeStore.themeColor, ratio), 1);
});

// 监听props变化
watch(
  props,
  () => {
    handleInitModel();
  },
  {
    deep: true,
    immediate: true
  }
);

onMounted(() => {});
</script>

<template>
  <div
    class="server-card flex overflow-hidden"
    :style="{
      backgroundImage: `url(${gameServer?.mapUrl ? gameServer?.mapUrl : themeStore?.baseBg})`
    }"
  >
    <div class="server-card-mask"></div>
    <div class="server-online" :style="`${getOnLineColor(gameServer!)}`"></div>
    <div class="server-card-left">
      <div class="server-card-name ml-1px mt-5px">
        <NEllipsis :line-clamp="1">
          {{ gameServer?.HostName }}
        </NEllipsis>
      </div>
      <div class="server-card-onLine flex-space-between ml-5px flex-y-center">
        <div class="flex-y-center">
          <SvgIcon icon="material-symbols:map-outline" class="mr-6px text-20px" />
          <NEllipsis :line-clamp="1">
            <div>
              {{ gameServer?.Players }}/{{ gameServer?.MaxPlayers }} | {{ gameServer?.mapLabel }}({{ gameServer?.Map }})
            </div>
          </NEllipsis>
        </div>
      </div>
      <div class="server-card-tag ml-5px mt-5px">
        <NTag v-for="(tag, index) in gameServer?.tag" :key="index" size="small" round class="mr-3px" type="success">
          {{ tagOptions.find((item: any) => item.value === String(tag))?.label }}
        </NTag>
      </div>
    </div>
    <div class="server-card-right">
      <div class="one-btn" @click="joinServer()">
        <SvgIcon icon="iconamoon:enter" class="text-20px" />
      </div>
      <div class="two-btn" @click="copyServerAddr()">
        <SvgIcon icon="solar:copy-outline" class="text-20px" />
      </div>
      <div class="three-btn" @click="openServerInfo()">
        <SvgIcon icon="material-symbols:featured-play-list-outline" class="text-20px" />
      </div>
    </div>
  </div>
  <NModal v-model:show="gameInfoShowModel" transform-origin="center">
    <DarkModeContainer class="game-info position-fixed" :style="{ backgroundColor: bgColor }">
      <div class="game-info-header">
        <div class="game-info-name mt-10px">{{ gameServer.HostName }}</div>
        <div class="game-info-map mt-30px">{{ gameServer.Map }}</div>
        <div class="game-info-type mt-60px">
          <NTag
            v-if="gameServer?.type"
            :color="renderColor(gameServer?.type ?? '-1')"
            size="small"
            strong
            class="ml-5px mr-10px"
          >
            {{ renderTypeName(gameServer?.type ?? '-1') }}
          </NTag>
        </div>
        <div class="game-info-close mr-5px mt-10px cursor-pointer" @click="gameInfoShowModel = false">
          <SvgIcon icon="ic:baseline-clear" class="mr-5px text-20px" />
        </div>
        <div class="game-info-map-img">
          <img :src="gameServer.mapUrl ? gameServer.mapUrl : themeStore?.baseBg" />
        </div>
      </div>
      <div class="game-info-body p-10px">
        <NSpace v-if="gamePlayerList.length === 0" align="center" justify="center" class="h-100%">暂无玩家</NSpace>
        <NButton
          v-for="(item, index) in gamePlayerList"
          :key="index"
          size="tiny"
          secondary
          strong
          round
          class="ml-1px mt-8px min-w-40px"
        >
          {{ item.Name }}
        </NButton>
      </div>
      <div class="game-info-button">
        <div class="oneBtn mt-20px cursor-pointer" @click="copyServerAddr()">
          <SvgIcon icon="solar:copy-outline" class="mr-5px text-20px" />
          复制地址
        </div>
        <div class="twoBtn mt-20px cursor-pointer" @click="joinServer()">
          <SvgIcon icon="iconamoon:enter" class="mr-5px text-20px" />
          加入服务器
        </div>
      </div>
    </DarkModeContainer>
  </NModal>
</template>

<style scoped lang="scss">
.server-card {
  position: relative;
  min-width: 150px;
  height: 85px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 8px;
  font-size: 12px;

  /* 遮罩层样式 */
  .server-card-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 1;
    transition: opacity 0.5s ease;
  }

  .server-online {
    max-width: 4px;
    width: 100%;
    position: sticky;
  }

  .server-card-left {
    width: 90%;
    height: 100%;

    .server-card-name {
      position: sticky;
      color: #ffffff;
      font-weight: bold;
    }

    .server-card-onLine {
      position: sticky;
      color: #ffffff;
    }
  }

  .server-card-right {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    position: sticky;
    width: 10%;
    height: 100%;
    color: #ffffff;
    flex-direction: column;

    /* 改为列方向布局 */
    .one-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 3;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      cursor: pointer;
      border-radius: 10px 0 0 0;

      &:hover {
        background-color: rgba(255, 255, 255, 0.3);
      }
    }

    .two-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 3;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      cursor: pointer;

      &:hover {
        background-color: rgba(150, 150, 150, 0.3);
      }
    }

    .three-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 3;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      cursor: pointer;
      border-radius: 0 0 0 10px;

      &:hover {
        background-color: rgba(255, 255, 255, 0.3);
      }
    }
  }

  /* 当鼠标移入盒子时，遮罩层消失 */
  &:hover .server-card-mask {
    opacity: 0.5;
  }

  /* 当鼠标移入盒子时，添加盒子阴影 */
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
    transition: opacity 0.1s ease;
  }
}

.game-info {
  width: 40%;
  min-width: 350px;
  height: 600px;
  position: absolute;
  left: 50%;
  top: 10%;
  border-radius: 20px;
  transform: translateX(-50%);
  overflow: hidden;

  .game-info-header {
    width: 100%;
    height: 35%;
    position: relative;

    img {
      object-fit: cover;
      mask-image: linear-gradient(180deg, #ffffff 0, transparent);
    }

    .game-info-close {
      position: absolute;
      right: 0;
      z-index: 9;
    }

    .game-info-map-img {
      width: 100%;
      height: 100%;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .game-info-name {
      width: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      z-index: 9;
      text-align: center;
    }

    .game-info-map {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      z-index: 9;
    }

    .game-info-type {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      z-index: 9;
    }
  }

  .game-info-body {
    width: 90%;
    height: 55%;
    margin: 0 auto;
    overflow-y: auto;
    border-radius: 15px;
    background-color: rgba(#d2bed3, 0.2);
    z-index: 9;
  }

  .game-info-button {
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;

    .oneBtn {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .twoBtn {
      height: 10%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
