export function debounce(ms: number) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    let timeout: any;

    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(() => {
        originalMethod.apply(this, args);
      }, ms);
    };

    return descriptor;
  };
}
