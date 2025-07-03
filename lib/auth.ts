import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin } from "better-auth/plugins";
import { prisma } from "./db";
import { env } from "./env";

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "postgresql", // or "mysql", "postgresql", ...etc
	}),
	emailAndPassword: {
		enabled: true,
	},
	socialProviders: {
		google: {
			clientId: env.AUTH_GOOGLE_CLIENT_ID,
			clientSecret: env.AUTH_GITHUB_CLIENT_SECRET,
		},
	},
	plugins: [admin()],
});
