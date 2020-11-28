<template>
  <a-result :status="status"
    :title="title"
    :sub-title="subTitle">
    <template #extra>
      <a-button type="primary"
        @click="$router.push({name: 'Index'})">
        回到首页
      </a-button>
    </template>
  </a-result>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'Result',
  props: {
    status: {
      type: String as PropType<'404' | '403' | '500'>,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    subTitle: {
      type: String,
      default: '',
    },
  },
});
</script>
