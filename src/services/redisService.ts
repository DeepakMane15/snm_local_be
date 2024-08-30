const Redis = require("ioredis");
const redis = new Redis();

export const deleteKeysWithPrefix = async (prefix: string) => {
  let cursor = "0"; // Starting point for SCAN
  do {
    // Scan for keys with the specified prefix
    const result = await redis.scan(cursor, "MATCH", `${prefix}*`);
    cursor = result[0];
    const keys = result[1];

    if (keys.length > 0) {
      // Delete keys
      await redis.del(keys);
    }
  } while (cursor !== "0"); // Continue until the scan cursor returns to 0
};

