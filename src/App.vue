<template>
  <a-config-provider :locale="locale">
    <router-view />
  </a-config-provider>
</template>

<script lang="ts">
/**
 * @author cyh
 */

import zhCN from 'ant-design-vue/es/locale/zh_CN';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  setup() {
    return {
      locale: zhCN,
    };
  },
});
</script>
