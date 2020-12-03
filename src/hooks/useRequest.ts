import { message } from 'ant-design-vue';
import { Ref, ref } from 'vue';

interface Opt<T> {
  initData?: T,
  msg?: string;
  errMsg?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useRequest<Request extends Array<any>, Resp>(
  apiFn: (...args: Request) => HttpResponseP<Resp>,
  opt?: Opt<Resp>,
) {
  const loading = ref(false);
  const data = ref(opt?.initData) as Ref<Resp>;

  function requestFn(...args: Request): Promise<Response<Resp>> {
    loading.value = true;
    return apiFn(...args).then((res) => {
      data.value = res.data.data;
      if (opt?.msg) {
        message.success(opt.msg);
      }
      return res.data;
    }).catch((err: ResponseError) => {
      if (opt?.errMsg) {
        message.error(opt.errMsg);
      } else {
        message.error(err.msg);
      }
      return Promise.reject(err);
    }).finally(() => {
      loading.value = false;
    });
  }

  return {
    loading,
    data,
    requestFn,
  };
}
