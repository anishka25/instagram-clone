import { lucia } from "lucia";
import "lucia/polyfill/node";
import { h3 } from "lucia/middleware";
import { postgres as postgresAdapter } from "@lucia-auth/adapter-postgresql";
import postgres from "postgres";

const config = useRuntimeConfig()
export const sql = postgres(config.databaseUrl);


export const auth = lucia({
	env: "DEV", 
	middleware: h3(),
	adapter: postgresAdapter(sql, {
		user: "auth_user",
		key: "user_key",
		session: "user_session"
	}),
	getUserAttributes: (data) => {
		return {
			username: data.username,
			fname: data.fname,
			numormail: data.phone_no ? data.phone_no : data.email,
			bio : data.bio,
			followers: data.followers,
			following : data.following,
		};
	}
});


