<template>
  <a-menu v-model:openKeys="openeds"
    v-model:selectedKeys="actives"
    :inline-collapsed="collapsed"
    :theme="theme"
    :mode="mode"
    class="sider-menu">
    <SiderMenuItem v-for="menu in menus"
      :key="menu.name"
      :menuItem="menu" />
  </a-menu>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import SiderMenuItem from './SiderMenuItem.vue';

export default defineComponent({
  name: 'SiderMenu',
  components: { SiderMenuItem },
  props: {
    menus: { required: true, type: Array as PropType<Menu[]> },
    collapsed: { type: Boolean, default: false },
    openKeys: { type: Array as PropType<string[]> },
    selectedKeys: { type: Array as PropType<string[]> },
    theme: { type: String as PropType<'dark' | 'light'>, default: 'dark' },
    mode: {
      type: String as PropType<'inline' | 'vertical'>,
      default: 'inline',
    },
  },
  setup(props, { emit }) {
    const openeds = computed({
      get() {
        return props.openKeys;
      },
      set(value) {
        emit('update:openKeys', value);
      },
    });
    const actives = computed({
      get() {
        return props.selectedKeys;
      },
      set(value) {
        emit('update:selectedKeys', value);
      },
    });
    return {
      openeds,
      actives,
    };
  },
});
</script>
