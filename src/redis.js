import Redis from 'ioredis'
import url from 'url'

export const getRedisConfig = redisUrl => {
  const redisConfig = url.parse(redisUrl)
  return {
    host: redisConfig.hostname || '127.0.0.1',
    port: Number(redisConfig.port || 6379),
    db: (redisConfig.pathname || '/0').substr(1) || '0',
    // password: redisConfig.auth ? redisConfig.auth.split(':')[1] : undefined,
    maxRetriesPerRequest: null,
    enableReadyCheck: true,
    autoResubscribe: true
  }
}

const redis = config => new Redis(config)

export default redis
