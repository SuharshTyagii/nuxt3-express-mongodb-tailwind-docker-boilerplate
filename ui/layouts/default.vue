<template>
  <div class="container mx-auto py-8">
    <h1 class="text-3xl font-bold mb-4 text-center">Hello, GoHighLevel Team!</h1>
    <div class="flex flex-col items-center">
      <div class="my-4 px-6 mx-6">
        <NuxtLink to="/" class="nav-primary">Homepage</NuxtLink>
        <NuxtLink to="/transactions" class="nav-primary ml-4">Transactions</NuxtLink>
      </div>
    </div>
    <div class="p-10">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LayoutPage',
}
</script>

<style>
.router-link-exact-active {
  background-color: aqua;
}

.nav-primary {
  background-color: rgba(76, 82, 191, 0.275);
  color: #000000;
  padding: 8px 16px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: bold;
  position: relative;
  overflow: hidden;
}

.nav-primary:before {
  content: '';
  position: absolute;
  top: 110%;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: #4c51bf;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease-in-out;
}

.nav-primary.router-link-exact-active:before {
  transform: scaleX(1);
}
</style>
