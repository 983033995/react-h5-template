/*
 * @FilePath: /h5-react/src/hooks/storageHooks.ts
 * @Description: 自定义的storage钩子
 */

import { useCallback, useEffect, useState } from 'react';
import {
  getStorageItem,
  setStorageItem,
  removeStorageItem,
  hasStorageItem,
  clearStorage,
  getPrefixedKey,
  setStorageConfig,
  getStorageConfig,
} from '../utils/storageUtils';

type StorageType = 'local' | 'session';

/**
 * 配置存储前缀
 * @param prefix 新的前缀字符串
 */
export const configureStoragePrefix = (prefix: string): void => {
  setStorageConfig({ prefix });
};

/**
 * 获取当前配置的存储前缀
 * @returns 当前前缀
 */
export const getStoragePrefix = (): string => {
  return getStorageConfig().prefix;
};

/**
 * 自定义钩子，用于在组件中操作存储
 * @param key 存储键名（不含前缀）
 * @param initialValue 初始值，当存储中不存在该键时使用
 * @param type 存储类型，默认为localStorage
 * @returns [存储的值, 设置值的函数, 删除值的函数]
 */
export function useStorage<T>(
  key: string,
  initialValue: T,
  type: StorageType = 'local',
): [T, (value: T | ((val: T) => T)) => void, () => void] {
  // 使用懒初始化获取存储的值
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // 尝试从存储中获取值
      const item = getStorageItem<T>(key, type);
      // 如果存储中有值则返回，否则返回初始值
      return item !== null ? item : initialValue;
    } catch (error) {
      console.error(`Error in useStorage hook initialization for ${key}:`, error);
      return initialValue;
    }
  });

  // 更新存储中的值并同步状态
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        // 允许传入函数来基于先前的值进行更新
        const valueToStore = value instanceof Function ? value(storedValue) : value;

        // 更新React状态
        setStoredValue(valueToStore);

        // 保存到存储中
        setStorageItem(key, valueToStore, type);

        // 触发存储事件，以便同步多个组件中的状态
        if (typeof window !== 'undefined') {
          // 创建自定义事件用于跨组件通信
          const event = new CustomEvent('storage-change', {
            detail: {
              key,
              prefixedKey: getPrefixedKey(key),
              value: valueToStore,
              type,
            },
          });
          window.dispatchEvent(event);
        }
      } catch (error) {
        console.error(`Error setting ${key} in useStorage hook:`, error);
      }
    },
    [key, storedValue, type],
  );

  // 从存储中移除值并重置为初始值
  const removeValue = useCallback(() => {
    try {
      removeStorageItem(key, type);
      setStoredValue(initialValue);

      if (typeof window !== 'undefined') {
        // 创建移除事件用于跨组件通信
        const event = new CustomEvent('storage-change', {
          detail: {
            key,
            prefixedKey: getPrefixedKey(key),
            value: initialValue,
            type,
            action: 'remove',
          },
        });
        window.dispatchEvent(event);
      }
    } catch (error) {
      console.error(`Error removing ${key} in useStorage hook:`, error);
    }
  }, [initialValue, key, type]);

  // 监听存储变化事件，以同步多个组件的状态
  useEffect(() => {
    const prefixedKey = getPrefixedKey(key);

    const handleStorageChange = (event: StorageEvent | CustomEvent) => {
      if (
        (event instanceof StorageEvent && event.key === prefixedKey) ||
        (event instanceof CustomEvent &&
          event.type === 'storage-change' &&
          (event.detail?.key === key || event.detail?.prefixedKey === prefixedKey) &&
          event.detail?.type === type)
      ) {
        try {
          if (event instanceof StorageEvent) {
            // 原生StorageEvent处理
            if (event.newValue === null) {
              setStoredValue(initialValue);
            } else {
              setStoredValue(JSON.parse(event.newValue));
            }
          } else if (event instanceof CustomEvent) {
            // 自定义CustomEvent处理
            if (event.detail.action === 'remove') {
              setStoredValue(initialValue);
            } else {
              setStoredValue(event.detail.value);
            }
          }
        } catch (error) {
          console.error(`Error syncing storage in useStorage hook for ${key}:`, error);
        }
      }
    };

    // 同时监听原生存储事件和自定义事件
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('storage-change', handleStorageChange as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('storage-change', handleStorageChange as EventListener);
    };
  }, [initialValue, key, type]);

  return [storedValue, setValue, removeValue];
}

/**
 * 用于操作localStorage的自定义钩子
 * @param key 存储键名（不含前缀）
 * @param initialValue 初始值
 * @returns [存储的值, 设置值的函数, 删除值的函数]
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((val: T) => T)) => void, () => void] {
  return useStorage<T>(key, initialValue, 'local');
}

/**
 * 用于操作sessionStorage的自定义钩子
 * @param key 存储键名（不含前缀）
 * @param initialValue 初始值
 * @returns [存储的值, 设置值的函数, 删除值的函数]
 */
export function useSessionStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((val: T) => T)) => void, () => void] {
  return useStorage<T>(key, initialValue, 'session');
}

/**
 * 检查存储中是否存在指定键（Hook版本）
 * @param key 存储键名（不含前缀）
 * @param type 存储类型
 * @returns 布尔值，表示键是否存在
 */
export function useStorageExists(key: string, type: StorageType = 'local'): boolean {
  const [exists, setExists] = useState<boolean>(() => {
    return hasStorageItem(key, type);
  });

  useEffect(() => {
    const prefixedKey = getPrefixedKey(key);

    const checkExists = () => {
      setExists(hasStorageItem(key, type));
    };

    // 初始检查
    checkExists();

    // 监听存储变化
    const handleStorageChange = (event: StorageEvent | CustomEvent) => {
      if (
        (event instanceof StorageEvent && event.key === prefixedKey) ||
        (event instanceof CustomEvent &&
          event.type === 'storage-change' &&
          (event.detail?.key === key || event.detail?.prefixedKey === prefixedKey))
      ) {
        checkExists();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('storage-change', handleStorageChange as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('storage-change', handleStorageChange as EventListener);
    };
  }, [key, type]);

  return exists;
}

/**
 * 清除指定类型的所有存储（Hook版本）
 * @param type 存储类型
 * @param onlyPrefixed 是否只清除带有当前前缀的项，默认为true
 * @returns 清除存储的函数
 */
export function useClearStorage(
  type: StorageType = 'local',
  onlyPrefixed: boolean = true,
): () => void {
  return useCallback(() => {
    clearStorage(type, onlyPrefixed);

    if (typeof window !== 'undefined') {
      // 创建清除事件用于跨组件通信
      const event = new CustomEvent('storage-clear', {
        detail: { type, onlyPrefixed },
      });
      window.dispatchEvent(event);
    }
  }, [type, onlyPrefixed]);
}
