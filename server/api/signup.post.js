import * as EmailValidator from "email-validator"

export default defineEventHandler(async (event) => {
	const { username, password, numormail, fname } = await readBody(event);
	var phoneno = /^\d{10}$/;

	

	
	if (
		typeof username !== "string" ||
		username.length < 4 ||
		username.length > 31
	) {
		throw createError({
			message: "Invalid username",
			statusCode: 400
		});
	}
	if (
		typeof password !== "string" ||
		password.length < 6 ||
		password.length > 255
	) {
		throw createError({
			message: "Invalid password",
			statusCode: 400
		});
	}
	if(
		typeof numormail !="string"|| 
		!numormail.match(phoneno)
	)
	{
		if(typeof numormail !="string" || !EmailValidator.validate(numormail))
		{
			console.log(numormail, typeof numormail)
			throw createError({
				message: "Invalid Phoneno or email",
				statusCode: 400
			});
		}
	}
	if(
		typeof fname !="string"
	){
		throw createError({
			message: "Invalid name type",
			statusCode: 400
		});
	}
	try {
		const user = await auth.createUser({
			key: {
				providerId: "username", 
				providerUserId: username.toLowerCase(), 
				password 
			},
			attributes: {
				username: username,
				fname:fname,
				phone_no : numormail.match(phoneno) ? numormail : null ,
				email : numormail.match(phoneno) ? null : numormail
			}
		});
		const session = await auth.createSession({
			userId: user.userId,
			attributes: {}
		});
		const authRequest = auth.handleRequest(event);
		authRequest.setSession(session);
		return sendRedirect(event, "/"); 
	} catch (e) {
		
		
		
		
		
		
		
		
		
		
		console.log(e)
		throw createError({
			message: "An unknown error occurred",
			statusCode: 500
		});
	}
});
