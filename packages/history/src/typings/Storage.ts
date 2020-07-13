/**
 * MIT License
 *
 * Copyright (c) 2017 Zack Story
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * These definition obtained from
 * @see https://github.com/rt2zz/redux-persist/blob/master/types/types.d.ts
 */
/* storage types */
export interface WebStorage {
  /**
   * Fetches key and returns item in a promise.
   */
  getItem(key: string): Promise<string>
  /**
   * Sets value for key and returns item in a promise.
   */
  setItem(key: string, item: string): Promise<string>
  /**
   * Removes value for key.
   */
  removeItem(key: string): Promise<void>
}
/**
 * User for local storage in react-native.
 *
 * AsyncStorage is a simple, unencrypted, asynchronous, persistent, key-value storage
 * system that is global to the app.  It should be used instead of LocalStorage.
 *
 * It is recommended that you use an abstraction on top of `AsyncStorage`
 * instead of `AsyncStorage` directly for anything more than light usage since
 * it operates globally.
 *
 * On iOS, `AsyncStorage` is backed by native code that stores small values in a
 * serialized dictionary and larger values in separate files. On Android,
 * `AsyncStorage` will use either [RocksDB](http://rocksdb.org/) or SQLite
 * based on what is available.
 *
 * The definition obtained from
 * @see https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react-native/index.d.ts
 */
export interface AsyncStorage {
  /**
   * Fetches key and passes the result to callback, along with an Error if there is any.
   */
  getItem(
    key: string,
    callback?: (error?: Error, result?: string) => void
  ): Promise<string>
  /**
   * Sets value for key and calls callback on completion, along with an Error if there is any.
   */
  setItem(
    key: string,
    value: string,
    callback?: (error?: Error) => void
  ): Promise<void>
  /**
   * Removes value for key and calls callback on completion, along with an Error if there is any.
   */
  removeItem(key: string, callback?: (error?: Error) => void): Promise<void>
  /**
   * Merges existing value with input value, assuming they are stringified json. Returns a Promise object.
   * Not supported by all native implementation
   */
  mergeItem(
    key: string,
    value: string,
    callback?: (error?: Error) => void
  ): Promise<void>
  /**
   * Erases all AsyncStorage for all clients, libraries, etc. You probably don't want to call this.
   * Use removeItem or multiRemove to clear only your own keys instead.
   */
  clear(callback?: (error?: Error) => void): Promise<void>
  /**
   * Gets all keys known to the app, for all callers, libraries, etc
   */
  getAllKeys(
    callback?: (error?: Error, keys?: string[]) => void
  ): Promise<string[]>
  /**
   * multiGet invokes callback with an array of key-value pair arrays that matches the input format of multiSet
   */
  multiGet(
    keys: string[],
    callback?: (errors?: Error[], result?: [string, string][]) => void
  ): Promise<[string, string][]>
  /**
   * multiSet and multiMerge take arrays of key-value array pairs that match the output of multiGet,
   *
   * multiSet([['k1', 'val1'], ['k2', 'val2']], cb);
   */
  multiSet(
    keyValuePairs: string[][],
    callback?: (errors?: Error[]) => void
  ): Promise<void>
  /**
   * Delete all the keys in the keys array.
   */
  multiRemove(
    keys: string[],
    callback?: (errors?: Error[]) => void
  ): Promise<void>
  /**
   * Merges existing values with input values, assuming they are stringified json.
   * Returns a Promise object.
   *
   * Not supported by all native implementations.
   */
  multiMerge(
    keyValuePairs: string[][],
    callback?: (errors?: Error[]) => void
  ): Promise<void>
}
/**
 * LocalForage: Offline storage, improved. Wraps IndexedDB, WebSQL or localStorage using a simple
 * but powerful API.
 *
 * The type definition was obtained from:
 * @see https://github.com/localForage/localForage/blob/master/typings/localforage.d.ts
 */
export interface LocalForageStorage {
  getItem<T>(key: string, callback?: (err: any, value: T) => void): Promise<T>
  setItem<T>(
    key: string,
    value: T,
    callback?: (err: any, value: T) => void
  ): Promise<T>
  removeItem(key: string, callback?: (err: any) => void): Promise<void>
  clear(callback?: (err: any) => void): Promise<void>
  length(callback?: (err: any, numberOfKeys: number) => void): Promise<number>
  key(
    keyIndex: number,
    callback?: (err: any, key: string) => void
  ): Promise<string>
  keys(callback?: (err: any, keys: string[]) => void): Promise<string[]>
  iterate<T, U>(
    iteratee: (value: T, key: string, iterationNumber: number) => U,
    callback?: (err: any, result: U) => void
  ): Promise<U>
}
export interface Storage {
  getItem(key: string, ...args: any[]): any
  setItem(key: string, value: any, ...args: any[]): any
  removeItem(key: string, ...args: any[]): any
}
