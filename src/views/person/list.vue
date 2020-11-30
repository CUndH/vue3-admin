<template>
  <a-form layout="inline"
    class="m-t-10">
    <a-form-item label="姓名">
      <a-input/>
    </a-form-item>
    <a-table :dataSource="[{id: 1, name: '陈'}, {id: 2, name: '王'}]"
      rowKey="id">
      <a-table-column title="ID"
        dataIndex="id">
      </a-table-column>
      <a-table-column title="姓名"
        dataIndex="name">
      </a-table-column>
    </a-table>
  </a-form>
</template>
