<script lang="js" setup>
const pageName = ref(null)
function getPage(x){
  if(pageName.value == x){
    console.log(x)
    return true
  }
  else{
    return false
  }
}

onMounted(()=>{
  const route = useRoute()
  pageName.value = route.name
  console.log(pageName.value)
})
</script>

<template>
  <div class="border-r-2 border-gray-500/20 p-5 w-64 min-h-screen cursor-pointer ">
    
    <div  :class="{'!font-bold':getPage('home')}" class="text-xl roboto-light mt-5 rounded-xl  hover:bg-slate-200/45 text-center p-2">
      <icon name="material-symbols:home-rounded" size="22"></icon>
      <nuxt-link to="/home">Home</nuxt-link></div>
    <div :class="{'!font-bold':getPage('search')}" class="text-xl roboto-light mt-5 rounded-xl hover:bg-slate-200/45 text-center p-2">
      <icon name="material-symbols:search-rounded" size="22"></icon>
      <nuxt-link to="/search">Search</nuxt-link></div>
    <div :class="{'!font-bold':getPage('explore')}" class="text-xl roboto-light mt-5 rounded-xl hover:bg-slate-200/45 text-center p-2">
      <icon name="ic:sharp-explore" size="22"></icon>
      <nuxt-link to="/explore">Explore</nuxt-link></div>
    <div :class="{'!font-bold':getPage('index')}" class="text-xl roboto-light mt-5 rounded-xl  hover:bg-slate-200/45 text-center p-2">
      <icon name="material-symbols:account-circle" size="22"></icon>
      <nuxt-link to="/">Profile</nuxt-link></div>
  </div>
</template>

<style> 

</style>