/**
 * 存储工具类
 * 提供localStorage和sessionStorage的统一操作接口
 */

type StorageType = 'local' | 'session';

/**
 * 存储配置选项
 */
interface StorageConfig {
  /**
   * 存储key的前缀
   */
  prefix: string;
}

/**
 * 默认存储配置
 */
const DEFAULT_CONFIG: StorageConfig = {
  prefix: 'galaxy_app_',
};

/**
 * 当前存储配置
 */
let storageConfig: StorageConfig = { ...DEFAULT_CONFIG };

/**
 * 设置存储配置
 * @param config 配置选项
 */
export const setStorageConfig = (config: Partial<StorageConfig>): void => {
  storageConfig = { ...storageConfig, ...config };
};

/**
 * 获取当前存储配置
 * @returns 当前配置
 */
export const getStorageConfig = (): StorageConfig => {
  return { ...storageConfig };
};

/**
 * 获取带前缀的键名
 * @param key 原始键名
 * @returns 带前缀的键名
 */
export const getPrefixedKey = (key: string): string => {
  return `${storageConfig.prefix}${key}`;
};

/**
 * 获取对应的Storage对象
 * @param type 存储类型
 * @returns Storage对象
 */
const getStorageObject = (type: StorageType = 'local'): Storage => {
  return type === 'local' ? localStorage : sessionStorage;
};

/**
 * 从存储中获取数据
 * @param key 存储键名（不含前缀）
 * @param type 存储类型，默认为localStorage
 * @returns 解析后的数据，获取失败则返回null
 */
export const getStorageItem = <T>(key: string, type: StorageType = 'local'): T | null => {
  try {
    const storage = getStorageObject(type);
    const prefixedKey = getPrefixedKey(key);
    const item = storage.getItem(prefixedKey);

    if (item === null) {
      return null;
    }

    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`Error getting item ${key} from ${type} storage:`, error);
    return null;
  }
};

/**
 * 将数据存入存储
 * @param key 存储键名（不含前缀）
 * @param value 要存储的数据
 * @param type 存储类型，默认为localStorage
 * @returns 操作是否成功
 */
export const setStorageItem = <T>(key: string, value: T, type: StorageType = 'local'): boolean => {
  try {
    const storage = getStorageObject(type);
    const prefixedKey = getPrefixedKey(key);
    const stringValue = JSON.stringify(value);
    storage.setItem(prefixedKey, stringValue);
    return true;
  } catch (error) {
    console.error(`Error setting item ${key} in ${type} storage:`, error);
    return false;
  }
};

/**
 * 从存储中移除数据
 * @param key 存储键名（不含前缀）
 * @param type 存储类型，默认为localStorage
 * @returns 操作是否成功
 */
export const removeStorageItem = (key: string, type: StorageType = 'local'): boolean => {
  try {
    const storage = getStorageObject(type);
    const prefixedKey = getPrefixedKey(key);
    storage.removeItem(prefixedKey);
    return true;
  } catch (error) {
    console.error(`Error removing item ${key} from ${type} storage:`, error);
    return false;
  }
};

/**
 * 清除指定类型的所有存储
 * @param type 存储类型，默认为localStorage
 * @param onlyPrefixed 是否只清除带有当前前缀的项，默认为true
 * @returns 操作是否成功
 */
export const clearStorage = (
  type: StorageType = 'local',
  onlyPrefixed: boolean = true,
): boolean => {
  try {
    const storage = getStorageObject(type);

    if (onlyPrefixed) {
      // 只清除带前缀的项
      const prefix = storageConfig.prefix;
      const keysToRemove: string[] = [];

      for (let i = 0; i < storage.length; i++) {
        const key = storage.key(i);
        if (key && key.startsWith(prefix)) {
          keysToRemove.push(key);
        }
      }

      keysToRemove.forEach(key => storage.removeItem(key));
    } else {
      // 清除所有项
      storage.clear();
    }

    return true;
  } catch (error) {
    console.error(`Error clearing ${type} storage:`, error);
    return false;
  }
};

/**
 * 检查存储中是否存在指定键名的数据
 * @param key 存储键名（不含前缀）
 * @param type 存储类型，默认为localStorage
 * @returns 是否存在
 */
export const hasStorageItem = (key: string, type: StorageType = 'local'): boolean => {
  try {
    const storage = getStorageObject(type);
    const prefixedKey = getPrefixedKey(key);
    return storage.getItem(prefixedKey) !== null;
  } catch (error) {
    console.error(`Error checking item ${key} in ${type} storage:`, error);
    return false;
  }
};

/**
 * 获取存储中指定前缀的所有键名
 * @param type 存储类型，默认为localStorage
 * @param withoutPrefix 返回的键名是否移除前缀，默认为true
 * @returns 键名数组
 */
export const getStorageKeys = (
  type: StorageType = 'local',
  withoutPrefix: boolean = true,
): string[] => {
  try {
    const storage = getStorageObject(type);
    const keys: string[] = [];
    const prefix = storageConfig.prefix;

    for (let i = 0; i < storage.length; i++) {
      const key = storage.key(i);
      if (key && key.startsWith(prefix)) {
        keys.push(withoutPrefix ? key.slice(prefix.length) : key);
      }
    }

    return keys;
  } catch (error) {
    console.error(`Error getting keys from ${type} storage:`, error);
    return [];
  }
};
