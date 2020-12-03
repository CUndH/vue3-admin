/* eslint-disable @typescript-eslint/no-explicit-any */
import { computed, reactive } from 'vue';
import { useRequest } from './useRequest';

type BuildParams<Requests extends Array<any>> = (page: number, size: number) => Requests;

interface Opt<Requests extends Array<any>, T> {
  initData: TableResponse<T>;
  buildParams: BuildParams<Requests>;
}

export function useTable<Requests extends Array<any>, T>(
  getList: (...params: Requests) => HttpResponseP<TableResponse<T>>,
  opt?: Partial<Opt<Requests, T>>,
) {
  const {
    loading, data, requestFn,
  } = useRequest(getList, {
    initData: opt?.initData,
  });

  const pagination = reactive({
    currentPage: 1,
    pageSize: 20,
    total: 0,
  });

  function buildParams(page: number, size: number) {
    const defaultFn = opt?.buildParams;
    if (defaultFn) {
      return defaultFn(page, size);
    }
    return [{ page, size }] as any;
  }

  function processResp(res: Response<TableResponse<T>>): Response<TableResponse<T>> {
    pagination.total = res.data.total;
    pagination.currentPage = res.data.page + 1;
    return res;
  }

  function fetchList(page?: number): Promise<Response<TableResponse<T>>> {
    let params: any = [];
    pagination.currentPage = page || pagination.currentPage;
    params = [{
      page: pagination.currentPage - 1,
      size: pagination.pageSize,
    }];
    params = buildParams(pagination.currentPage, pagination.pageSize);
    return requestFn(...params).then(processResp);
  }

  function onChangePage(page: number, pageSize: number): void {
    pagination.currentPage = page;
    if (pagination.pageSize !== pageSize) {
      pagination.pageSize = pageSize;
    }
    fetchList(page);
  }

  function onChangePageSize(page: number, size: number) {
    pagination.pageSize = size;
    pagination.currentPage = 1;
    fetchList(pagination.currentPage);
  }

  const list = computed(() => {
    if (data.value) {
      return data.value.content;
    }
    return [];
  });

  return {
    loading,
    list,
    pagination,
    fetchList,
    onChangePage,
    onChangePageSize,
  };
}
