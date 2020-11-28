<template>
  <template v-if="isSubMenu">
    <a-sub-menu :key="menuItem.name">
      <template v-slot:title>
        <span>
          <AppstoreOutlined />
          <span>{{menuItem.title}}</span>
        </span>

      </template>
      <SiderMenuItem v-for="subMenu in menuItem.children"
        :key="subMenu.name"
        :menuItem="subMenu" />
    </a-sub-menu>
  </template>

  <template v-else>
    <a-menu-item :key="menuItem.name">
      <router-link :to="{ name: menuItem.name}">
        {{menuItem.title}}
      </router-link>
    </a-menu-item>
  </template>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { AppstoreOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  name: 'SiderMenuItem',
  components: { AppstoreOutlined },
  props: {
    menuItem: { required: true, type: Object as PropType<Menu> },
  },
  setup(props) {
    const isSubMenu = computed(
      () => Array.isArray(props.menuItem.children)
        && !!props.menuItem.children.length,
    );
    return {
      isSubMenu,
    };
  },
});
</script>
