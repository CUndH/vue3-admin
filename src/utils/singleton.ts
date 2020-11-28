/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
interface SingletonConstructor<T> {
  new(...args: Array<any>): T;
  instance: T;
  getInstance(...args: Array<any>): T;
}

export function Singleton<T>(Target: SingletonConstructor<T>) {
  Target.getInstance = (...args) => {
    if (!Target.instance) {
      Target.instance = new Target(...args);
    }
    return Target.instance;
  };
}
