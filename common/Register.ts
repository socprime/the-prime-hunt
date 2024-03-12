export class Register {
  private storage = new Map<unknown, unknown>();

  set<K = string, V = unknown>(key: K, value: V): V {
    this.storage.set(key, value);
    return value;
  }

  get<V = unknown>(key: unknown): V | undefined {
    return this.storage.get(key) as V | undefined;
  }

  remove(key: unknown): boolean {
    if (this.storage.has(key)) {
      this.storage.delete(key);
      return true;
    }
    return false;
  }

  has(key: unknown): boolean {
    return this.storage.has(key);
  }
}
