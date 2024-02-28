<script lang="js" setup>
const user = useUser();
if (user.value) {
	await navigateTo("/"); 
}



const handleSubmit = async (e) => {
	if (!(e.target instanceof HTMLFormElement)) return;
	const formData = new FormData(e.target);
	await $fetch("/api/login", {
		method: "POST",
		body: {
			username: formData.get("username"),
			password: formData.get("password")
		},
		redirect: "manual" 
	});
	await navigateTo("/"); 
};
</script>

<template>
	<div class="border-2 border-red-500 min-h-screen ">
		<div class="mx-auto border-2 border-gray-200 min-h-[40rem] w-fit p-10 mt-5 flex items-center rounded-xl justify-center flex-col">
			<h1 class="pacifico-regular text-5xl text-center">Anigram</h1>
			<form
				method="post"
				action="/api/login"
				@submit.prevent="handleSubmit"
				enctype="multipart/form-data"
			>
				<input type="text" id="username" name="username" class="p-2 text-sm roboto-light border-2 mt-12 border-gray-300 h-10 w-96 rounded-xl" placeholder="Phone no, email or username" /><br />
				<input type="password" name="password" id="password" class="p-2 rounded-xl roboto-light text-sm border-2 mt-4 border-gray-300 h-10 w-96 " placeholder="Password"/><br />
				<input type="submit" value="Log In" class="mt-5 roboto-light bg-blue-500  text-center py-1 !font-bold rounded-xl w-96 text-white cursor-pointer"/>
			</form>
			<hr class="mt-4 border-1">
			<NuxtLink to="/signup" class="mt-4 block text-center underline underline-offset-2 text-blue-600">Create an account</NuxtLink>
			
		</div>	
	</div>
	
</template>


<style >

input::placeholder{
	font-size: small;
	color: gray;
}


</style>