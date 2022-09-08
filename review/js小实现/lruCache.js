class LRUCache {
  constructor(size) {
    // 存储每一个需要访问的对象
    this.cacheMap = new Map();
    // 可以存储的容量
    this.size = size;
  }

  get(key) {
    const hasCacheOfKey = this.cacheMap.has(key);
    if (hasCacheOfKey) {
      // 获取该指
      const val = this.cacheMap.get(key);
      // 删除原有的 再将key val 新加入到缓存中， 定义最新的位置
      this.cacheMap.delete(key);
      this.cacheMap.set(key, val)
      return val
    } else {
      return -1
    }
  }
  set(key, value) {
    const hasCacheOfKey = this.cacheMap.has(key);
    if (hasCacheOfKey) {
      this.cacheMap.delete(key);
    }
    this.cacheMap.set(key, value)
    if(this.cacheMap.size > this.size) {
      // this.cacheMap.keys() 迭代器 next 获取到第一个指
      this.cacheMap.delete(this.cacheMap.keys().next().value)
    }
  }
}

let lruCache = new LRUCache(3);

lruCache.set('key1', '这是什么指数')
lruCache.set('key2', '这是什么垃圾指数')
lruCache.set('key3', '这是什么特大垃圾指数')
lruCache.set('key4', '啊,这是什么特大垃圾指数')
console.log(lruCache.get('key4'))