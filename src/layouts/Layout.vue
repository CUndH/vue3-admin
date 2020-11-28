<template>
  <a-layout class="layout"></a-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Layout',
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
