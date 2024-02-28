export default defineEventHandler(async (event)=>{
    const authRequest = auth.handleRequest(event);
	
	const session = await authRequest.validate();
    console.log(session)
	if (!session) {
		throw createError({
			message: "Unauthorized",
			statusCode: 401
		});
    }
    const body = await readBody(event)
    const userId = session?.user.userId
    const currentUserUsername = session?.user.username
    const toUnfollowUsername = body.toUnfollowUsername
    await sql`Update auth_user 
    set following= array_remove(following, ${toUnfollowUsername}) where id=${userId}`
    await sql`Update auth_user set followers = array_remove(followers, ${currentUserUsername}) where username=${toUnfollowUsername}`
})