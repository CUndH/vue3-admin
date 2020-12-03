<template>
  <a-form layout="inline"
    class="m-t-10">
    <a-form-item label="姓名">
      <a-input placeholder="请输入姓名"
        v-model:value="searchOpts.name"/>
    </a-form-item>
    <a-form-item label="性别">
      <a-select v-model:value="searchOpts.gender">
        <a-select-option :value="0">不限</a-select-option>
        <a-select-option :value="1">男</a-select-option>
        <a-select-option :value="2">女</a-select-option>
      </a-select>
    </a-form-item>
    <a-table :dataSource="dataList"
      class="m-t-10"
      :pagination="false"
      :loading="loading"
      rowKey="id">
      <a-table-column title="ID"
        dataIndex="id">
      </a-table-column>
      <a-table-column title="姓名"
        dataIndex="name">
      </a-table-column>
      <a-table-column title="手机"
        dataIndex="phone">
      </a-table-column>
      <a-table-column title="邮箱"
        dataIndex="phone">
      </a-table-column>
      <a-table-column title="性别"
        dataIndex="gender"
        v-slot="{text: gender}">
        {{getGender(gender)}}
      </a-table-column>
    </a-table>
  </a-form>

  <a-pagination v-model:current="pagination.currentPage"
    v-model:pageSize="pagination.pageSize"
    class="m-t-20"
    :total="pagination.total"
    showSizeChanger
    :showTotal="false"
    @showSizeChange="onChangePageSize"
    @change="onChangePage" />
</template>

<script lang="ts">
import { PersonApi } from '@/api/Person.api';
import { useTable } from '@/hooks/useTable';
import {
  defineComponent, onMounted, ref, unref,
} from 'vue';

export default defineComponent({
  setup() {
    const searchOpts = ref({
      gender: 0,
      name: '',
    });

    function buildParams(
      page: number,
      size: number,
    ): [Partial<PersonModel.ListSendQuery & PageQuery>] {
      const { ...other } = unref(searchOpts);
      return [
        {
          ...other,
          size,
          page: page - 1,
        },
      ] as [Partial<PersonModel.ListSendQuery & PageQuery>];
    }

    const {
      list: dataList,
      pagination,
      loading,
      fetchList,
      onChangePage,
      onChangePageSize,
    } = useTable(PersonApi.getList, {
      buildParams,
    });

    function getList(page = 1) {
      return fetchList(page);
    }

    const genderMap = {
      0: '未知',
      1: '男',
      2: '女',
    };

    function getGender(gender: 0 | 1 | 2): string {
      return genderMap[gender];
    }

    onMounted(() => {
      getList();
    });

    return {
      dataList,
      pagination,
      loading,
      fetchList,
      onChangePage,
      onChangePageSize,
      getGender,
      searchOpts,
    };
  },
});
</script>
