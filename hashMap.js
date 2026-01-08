class HashMap {
  constructor() {
    this.load_factor = 0.75;
    this.capacity = 16;
    this.size = 0;
    this.buckets = [];
    for (let i = 0; i < this.capacity; i++) {
      this.buckets.push([]);
    }
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key == key) {
        bucket[i].value = value;
        return;
      }
    }
    bucket.push({ key, value });

    this.size++;
    if (this.size / this.capacity > this.load_factor) {
      this.grow();
    }
  }

  grow() {
    this.capacity = 2 * this.capacity;
    let oldBucket = this.buckets;
    this.buckets = [];
    this.size = 0;
    for (let i = 0; i < this.capacity; i++) {
      this.buckets.push([]);
    }

    for (const bucket of oldBucket) {
      for (const entry of bucket) {
        set(entry.key, entry.value);
      }
    }
  }

  get(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (const entry of bucket) {
      if (entry.key === key) return entry.value;
    }
    return null;
  }

  has(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (const entry of bucket) {
      if (entry.key === key) return true;
    }
    return false;
  }

  remove(key) {
    const index = this.hash(key);
    let bucket = this.buckets[index];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key == key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }
    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this.size = 0;
  }

  keys() {
    let keyArray = [];

    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        keyArray.push(entry.key);
      }
    }

    return keyArray;
  }

  values() {
    let valArray = [];

    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        valArrayArray.push(entry.value);
      }
    }

    return valArray;
  }

  entries() {
    let entryArray = [];
    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        entryArray.push([entry.key, entry.value]);
      }
    }
    return entryArray;
  }
}

export { HashMap };
