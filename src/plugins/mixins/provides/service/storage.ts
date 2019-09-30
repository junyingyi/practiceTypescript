export interface StorageBase {
  /**
   *
   *
   * @param {string} key
   * @param {*} value
   * @memberof StorageBase
   */
  setItem(key: string, value: any): void;
  getItem<T>(key: string): T | null;
  removeItem<T>(key: string): void;
}

class LocStorage implements StorageBase {
  setItem(key: string, value: any) {
    if (typeof value != 'string') {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
  }
  getItem(key: string): any {
    let value: string = localStorage.getItem(key) || '';
    if (value && value != 'undefined' && value != 'null') {
      if (value.indexOf('{') !== -1) {
        return JSON.parse(value);
      } else {
        return value;
      }
    }
    return null;
  }
  removeItem(name: string) {
    localStorage.removeItem(name);
  }
}

class SesStorage implements StorageBase {
  setItem(key: string, value: any) {
    if (typeof value != 'string') {
      value = JSON.stringify(value);
    }
    sessionStorage.setItem(key, value);
  }
  getItem<T>(key: string): any {
    let value: string = sessionStorage.getItem(key) || '';
    if (value && value != 'undefined' && value != 'null') {
      if (value.indexOf('{') !== -1) {
        return JSON.parse(value);
      } else {
        return value;
      }
    }
    return null;
  }
  removeItem(name: string) {
    sessionStorage.removeItem(name);
  }
}
export const locStorage = new LocStorage();
export const sesStorage = new SesStorage();
