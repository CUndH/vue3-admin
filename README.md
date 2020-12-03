# 基于 Vue3 + Antd Vue + TS 的后台管理快速模板

## 0. 介绍

集成了 Antd Vue 并封装了一些常用方法和业务组件（逐步完善中），同时使用了 Vue3.0 + TS 让你能一窥新版本所带来的变化。那么，我具体做了什么？

* 分离并模块化改造路由，添加动态生成路由树、路由鉴权等功能
* 架设 service 层解藕业务代码和功能代码，替代当年不好用的 mixins
* 封装 hook 方法，提取并封装重复性高的功能代码
* 搭建基本 UI 框架
* 更多功能敬请期待，希望能给萌新带来帮助，大佬多多指点，**互相学习**

## 1. 使用

先下载前端项目：

```
git clone https://github.com/CUndH/vue3-admin.git
npm i
npm run serve
```

再下载后端项目：

```
git clone https://github.com/CUndH/vue3-admin-server.git
npm i
npm run start
```

## 2. 目录

其他文件不做过多介绍，主要讲一下 `src` 文件夹下的一些文件：

```
src
-- api		存放接口相关文件，很好理解
-- components		通用组件
-- hooks		公用方法
-- layouts		主要布局
-- models		定义TS接口，类型
-- router		路由相关配置
-- services		服务层
-- store		 vuex
-- utils		工具方法
```
