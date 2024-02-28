<script lang="js" setup>
const users = ref(null)
const currentUser = await useAuthenticatedUser()

function isFollowed(username) {
  if(currentUser.value.following) {
    if(currentUser.value.following.includes(username)) {
      return "Unfollow"
    }
    else {
      return "Follow"
    }
  }
  else {
    return "Follow"
  }
}

async function followUser(username) {
  if(!currentUser.value.following) {
    currentUser.value.following = []
  }
  if(currentUser.value.following.includes(username)) {
    const i = currentUser.value.following.indexOf(username)
    console.log(i)
    currentUser.value.following.splice(i, 1)
    await $fetch('/api/unfollow', {
      method: 'POST',
      body: {
        toUnfollowUsername: username
      }
    })
  }
  else {
    currentUser.value.following.push(username)
    await $fetch('/api/follow', {
      method: 'POST',
      body: {
        toFollowUsername: username
      }
    })
  }
  users.value.forEach(element => {
    if(element.username==username) {
      const index = users.value.indexOf(element)
      if(!users.value[index].followers) {
        users.value[index].followers = []
      }
      if(users.value[index].followers.includes(currentUser.value.username)) {
        const i = users.value[index].followers.indexOf(currentUser.value.username)
        users.value[index].followers.splice(i, 1)
      }
      else {
      users.value[index].followers.push(currentUser.value.username)
      }
    }
  });
}

onMounted(async ()=>{
  const results = await $fetch('/api/userData',{
  method : 'POST',
  })
  users.value = results.data

})


</script>

<template>
  <div>
    <div class="absolute">
		  <navbar />
	  </div>
    <div class="ml-96 mr-80 mt-10">
      <div class="grid grid-cols-3 gap-10 gap-y-6">
        <template v-for="u in users">
        <div class="bg-gray-500/10 shadow-xl rounded-xl p-5 grid grid-cols-2" v-if="!(u.username == currentUser.username)">
          <img src="/istockphoto-1337144146-612x612-removebg-preview.png" class="size-[7rem]"/>
          <div class="mt-5">
            <h1 class="font-bold text-xl">@{{ u.username }}</h1>
            <p class="">{{ u.fname || "Name Doesn't Exist" }}</p> 
            <p>{{ u.followers?.length || 0 }} Followers</p>    
            <p>{{ u.following?.length || 0 }} Following</p>  
          </div>
          <div class="col-span-2 mt-2">
            <button :class="{'!bg-white': isFollowed(u.username)=='Unfollow', '!text-black': isFollowed(u.username)=='Unfollow'}" @click="followUser(u.username)" class="px-5 w-full bg-blue-500 border-blue-500 text-white rounded-lg shadow-xl hover:bg-blue-600">{{ isFollowed(u.username) }}</button>
          </div>
        </div>
        </template>
      </div>
    </div>
  </div>
</template>



<style>

</style>