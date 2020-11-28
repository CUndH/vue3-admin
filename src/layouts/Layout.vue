<template>
  <a-layout class="layout">
    <a-layout-sider v-model:collapsed="collapsed"
      collapsed
      class="sider">
      <h1 class="m-y-0 app-name">ADMIN</h1>
      <div class="side-menu-wrapper">
        <SiderMenu :menus="menus"
          :collapsed="collapsed" />
      </div>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="header">header</a-layout-header>
    </a-layout>
    <a-layout-content class="content">
      <router-view />
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
// eslint-disable-next-line import/no-cycle
import { menuService } from '@/services/Menu.service';
import SiderMenu from './SiderMenu.vue';

export default defineComponent({
  name: 'Layout',
  components: {
    SiderMenu,
  },
  setup() {
    const collapsed = ref(false);

    onMounted(() => {
      console.log(menuService.menus);
    });

    return {
      collapsed,
      menus: menuService.menus,
    };
  },
});
</script>

<style lang="scss" scoped>
.layout {
  min-height: 100vh;

  .sider {
    min-height: 100vh;

    .app-name {
      background-color: rgb(2, 29, 60);
      max-height: 64px;
      overflow: hidden;
      line-height: 64px;
      color: #fff;
      letter-spacing: 1px;
      font-size: 17px;
      padding-left: 24px;
    }
  }

  .header {
    height: 58px;
    line-height: 58px;
    background: #fff;
    padding: 0 20px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eee;
  }

  .content {
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
    height: 100%;
    background: #fff;
    padding: 0 12px;
    margin: 0;
    min-height: 280px;
  }
}
</style>
