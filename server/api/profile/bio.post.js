export default defineEventHandler(async (event)=>{
    const authRequest = auth.handleRequest(event);
	
	const session = await authRequest.validate();
	if (!session) {
		throw createError({
			message: "Unauthorized",
			statusCode: 401
		});
	}
    const userId = session.user.userId
    const body= await readBody(event)
    const bio = body.bio
    
    try{
        const query = await sql`update auth_user set bio=${bio} where id=${userId}`
        return {
            statusCode : 200
        }
    }catch(error){
        console.log(error)
        return{
            statusCode : 500
        }
    }
    
})