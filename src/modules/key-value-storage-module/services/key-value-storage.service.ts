import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import ms from 'ms';
@Injectable()
export class KeyValueStorageService {
  constructor(
    @InjectRedis()
    private readonly redis: Redis,
  ) {}

  public async setex(
    key: string,
    regTime: string,
    value: string | Buffer | number,
  ): Promise<void> {
    const expires = Math.ceil(ms(regTime) / 1000);
    await this.redis.setex(key, expires, value);
  }

  public async set(
    key: string,
    value: string | Buffer | number,
  ): Promise<void> {
    await this.redis.set(key, value);
  }

  public async get(key: string): Promise<string> {
    const data = await this.redis.get(key);

    return data;
  }

  public async delete(key: string): Promise<void> {
    await this.redis.del(key);
  }

  // set means array
  public async addToSet(
    key: string,
    value: string | Buffer | number,
  ): Promise<void> {
    await this.redis.sadd(key, value);
  }

  public async removeFromSet(
    key: string,
    value: string | Buffer | number,
  ): Promise<void> {
    await this.redis.srem(key, value);
  }

  public async getSetLength(key: string): Promise<number> {
    const value = await this.redis.scard(key);

    return value;
  }

  public async getSet(key: string) {
    const data = await this.redis.smembers(key);

    return data;
  }

  public async isValueInSet(key: string, value: string): Promise<boolean> {
    const result = await this.redis.sismember(key, value);

    return Boolean(result);
  }
}
