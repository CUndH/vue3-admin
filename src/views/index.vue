<template>
  <a-spin>
  </a-spin>
</template>

<script lang="ts">
/**
 * @author zhushiqi
 */

import { defineComponent, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { routeService } from '@/services/Route.service';

export default defineComponent({
  name: 'Index',
  setup() {
    const router = useRouter();
    const route = useRoute();
    onMounted(() => {
      routeService.routerSetup(router, route).then((to) => {
        if (to.name === route.name) {
          /**
           * todo 是否有必要在 meta 中添加标记用于识别第一个路由必须需要参数才能跳转？
           */
          router.push(routeService.getFirstRoute());
        } else {
          router.push(to);
        }
      });
    });
  },
});
</script>
