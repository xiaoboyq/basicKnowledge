/*
 * @Author: your name
 * @Date: 2021-04-11 22:38:48
 * @LastEditTime: 2022-02-17 23:35:40
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /dayday/day04.TS-路白/新建文件夹/Typescript/demo/src/decorator/index.ts
 */
/**
 * 装饰函数的装饰器
 * 大概率是用来基于原有的函数，在不修改使用的情况下，通过装饰器的写法，去修改原有逻辑
*/


export function before(beforeFn: any) {
    return function(target: any, name: any, descriptor: any) {
        const oldValue = descriptor.value;

        descriptor.value = function() {
            beforeFn.apply(this, arguments);
            return oldValue.apply(this, arguments);
        };

        return descriptor;
    };
}


export function after(afterFn: any) {
    return function(target: any, name: any, descriptor: any) {
        const oldValue = descriptor.value;

        descriptor.value = function() {
            const ret = oldValue.apply(this, arguments);
            afterFn.apply(this, arguments);
            return ret;
        };

        return descriptor;
    };
}

export function measure(target: any, name: any, descriptor: any) {
    const oldValue = descriptor.value;

    descriptor.value = async function() {
        const start = Date.now();
        const ret = await oldValue.apply(this, arguments);
        console.log(`${name}执行耗时 ${Date.now() - start}ms`);
        return ret;
    };

    return descriptor;
}
