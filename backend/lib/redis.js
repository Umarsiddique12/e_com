import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config({ path: "./backend/.env" });

export const redis = new Redis(process.env.UPSTASH_REDIS_URL, {
	maxRetriesPerRequest: null,
	enableReadyCheck: false,
	retryStrategy: (times) => {
		const delay = Math.min(times * 50, 2000);
		return delay;
	},
});

redis.on("error", (err) => {
	console.error("Redis Client Error", err);
});

redis.on("connect", () => {
	console.log("Redis Client Connected");
});

// Helper function to safely execute Redis operations with error handling
export const redisAsync = async (operation) => {
	try {
		return await operation();
	} catch (error) {
		console.error("Redis operation error:", error.message);
		// Don't throw - allow graceful degradation
		return null;
	}
};
