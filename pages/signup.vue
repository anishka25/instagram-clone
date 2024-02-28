<script lang="js" setup>
const user = useUser();
if (user.value) {
	await navigateTo("/"); // redirect to profile page
}

// signin page jaise idhar bhi ham vhi kar rahe hain

const handleSubmit = async (e) => {
	if (!(e.target instanceof HTMLFormElement)) return;
	const formData = new FormData(e.target);
	// body pe ham formdata send kar rahe hain jo ham html form se le rahe hain
	// ismein do fields hain username and password
	// ye fields server per nikal rahe hain

	await $fetch("/api/signup", {
		method: "POST",
		body: {
			username: formData.get("username"),
			password: formData.get("password"),
			fname:formData.get("fname"),
			numormail: formData.get("numormail")
		},
		redirect: "manual" // ignore redirect responses
	});
	await navigateTo("/"); // profile page
};
</script>

<template>
	<div class="min-h-screen">
		<div class="mx-auto border-2 border-gray-200 min-h-[40rem] w-fit p-10 mt-5 flex items-center rounded-xl justify-center flex-col">
			<h1 class="pacifico-regular text-5xl text-center">Anigram</h1>
			<form method="post" action="/api/signup" @submit.prevent="handleSubmit">
				<input required name ="fname" id="fname" class="p-2 text-sm roboto-light border-2 mt-12 border-gray-300 h-10 w-96 rounded-xl" placeholder="Full name"/><br/>
				<input required name="numormail" id="numormail" class="p-2 text-sm roboto-light border-2 mt-4 border-gray-300 h-10 w-96 rounded-xl" placeholder="Phone no or email " /><br />
				<input required name="username" id="username" class="p-2 text-sm roboto-light border-2 mt-4 border-gray-300 h-10 w-96 rounded-xl" placeholder="Username"><br />
				<input required type="password" name="password" id="password"  class="p-2 rounded-xl roboto-light text-sm border-2 mt-4 border-gray-300 h-10 w-96 " placeholder="Password"/><br />
				<input type="submit" value="Sign Up" class="mt-5 roboto-light bg-blue-500  text-center py-1 !font-bold rounded-xl w-96 text-white cursor-pointer" />
			</form>
			<hr class="mt-4 border-1">
			<NuxtLink to="/signin" class="mt-4 block text-center underline underline-offset-2 text-blue-600">Sign in</NuxtLink>
		</div>
	</div>
</template>


<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Roboto:wght@300;500&display=swap');

input::placeholder{
	font-size: small;
	color: gray;
}

.roboto-light {
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  font-style: normal;
}

.pacifico-regular {
  font-family: "Pacifico", cursive;
  font-weight: 400;
  font-style: normal;
}

</style>