import { LuciaError } from "lucia";
import * as EmailValidator from "email-validator"


export default defineEventHandler(async (event) => {
	var { username, password } = await readBody(event);
	var phoneno = /^\d{10}$/;
	
	if (
		typeof password !== "string" ||
		password.length < 1 ||
		password.length > 255
	) {
		throw createError({
			message: "Invalid password",
			statusCode: 400
		});
	}
	try {
		
		
		if(EmailValidator.validate(username)){
			const query = await sql`select username from auth_user where email=${username}`
			username = query[0].username
		}
		console.log(username)
		if(username.match(phoneno)){
			const num = await sql `select username from auth_user where phone_no=${username}`
			username = num[0].username
		}	
		
		const key = await auth.useKey("username", username.toLowerCase(), password);
		const session = await auth.createSession({
			userId: key.userId,
			attributes: {}
		});
		const authRequest = auth.handleRequest(event);
		authRequest.setSession(session);
		return sendRedirect(event, "/"); 
	} catch (e) {
		console.log(e)
		if (
			e instanceof LuciaError &&
			(e.message === "AUTH_INVALID_KEY_ID" ||
				e.message === "AUTH_INVALID_PASSWORD")
		) {
			
			
			throw createError({
				message: "Incorrect username or password",
				statusCode: 400
			});
		}
		throw createError({
			message: "An unknown error occurred",
			statusCode: 500
		});
	}
});