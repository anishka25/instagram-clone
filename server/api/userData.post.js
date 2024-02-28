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
    try{
        const query = await sql`select username,fname,followers, following  from auth_user`
        console.log(query)
        return {
            statusCode : 200,
            data : query
        }
    }catch(error){
        console.log(error)
        return{
            statusCode : 500
        }
    }
    

})