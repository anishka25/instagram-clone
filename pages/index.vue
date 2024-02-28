<script lang="js" setup>
const menuSelected = ref(null)
function changeSelected(x) {
  menuSelected.value = x
}
onMounted(() => {
  menuSelected.value = "posts"

})
definePageMeta({
	middleware: ["protected"]
});


const bio = ref(" ")
async function changeBio(){
	var newBio = prompt("enter new Bio") 
	await $fetch('/api/profile/bio',{
		method : 'POST',
		body :{
			bio : newBio
		} 
	})
	bio.value = newBio
}

const user = await useAuthenticatedUser();
const handleSubmit = async (e) => {
	if (!(e.target instanceof HTMLFormElement)) return;
	await $fetch("/api/logout", {
		method: "POST",
		redirect: "manual" 
	});
	await navigateTo("/signin");
};

onMounted(()=>{
	console.log(user.value)
	bio.value = user.value.bio
})
</script>

<template>
  <div class="">
	  <div class="absolute">
		  <navbar />
	  </div>
    <div class="grid grid-cols-2 px-96">
      <img
        src="/istockphoto-1337144146-612x612-removebg-preview.png"
        width="250"
        class="ml-auto mt-6"
      />
      <div class="">
        <div class="text-2xl ml-4 w-fit mt-10">{{ user.username }}</div>
        <div class="grid grid-cols-3 col-span-2 ml-4 mt-8 text-lg roboto-light">
          <div>Post</div>
          <div>{{ user.followers?.length || 0 }} Follower</div>
          <div>{{ user.following?.length || 0 }} Following</div>
        </div>
        <div class="ml-4 mt-2 text-lg !font-bold roboto-light">
          {{ user.fname }}
        </div>
        <p class="mt-2 ml-4 ">
         {{ bio }}
        </p>
		<button class="ml-4 mt-2 p-[0.20rem] px-4 border-2 border-gray-300" @click="changeBio">Edit</button>
      </div>
    </div>
	<hr class="border-1 mx-96 mt-5 border-gray-900/30">
  
<div class="grid grid-cols-3 mx-96 text-center">
	<div class="text-lg roboto-light hover:text-gray-500 cursor-pointer" @click="changeSelected('posts')"     :class="{'text-yellow-400': menuSelected=='posts'}">Post</div>
	<div class="text-lg roboto-light hover:text-gray-500 cursor-pointer" @click="changeSelected('featured')"  :class="{'text-yellow-400': menuSelected=='featured'}">Featured</div>
	<div class="text-lg roboto-light hover:text-gray-500 cursor-pointer" @click="changeSelected('analytics')" :class="{'text-yellow-400': menuSelected=='analytics'}">Analytics</div>
	<div  v-if="menuSelected == 'posts'" class="col-span-3">
		he8uehuehygdyg
	</div>
	<div v-if="menuSelected == 'featured'" class="col-span-3">
		nhuuggwtygsaaaaaaaaaaa
	</div>
	<div v-if="menuSelected == 'analytics'" class="col-span-3">
		haugsygybhn
	</div>
</div>
<form class=" absolute top-0 right-0" method="post" action="/api/logout" @submit.prevent="handleSubmit">
    <input type="submit" value="Sign out" />
  </form>

  </div>
</template>
