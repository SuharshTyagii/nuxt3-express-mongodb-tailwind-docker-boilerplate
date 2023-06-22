<template>
  <div>
    <div>
      <div class="max-w-md mx-auto bg-white shadow-2xl rounded-lg overflow-hidden">
        <div class="px-6 py-4">
          <h2 class="text-2xl font-semibold text-purple-700">{{ wallet.name }}</h2>
          <p class="text-gray-600 mt-2">ID: <span class="font-normal">{{ wallet.id }}</span></p>

          <div class="flex justify-between items-baseline mt-4">
            <div>
              <p class="text-gray-600">Balance:</p>
              <p class="text-4xl font-bold text-purple-600">{{ walletBalance }}</p>
            </div>

            <p class="text-sm text-gray-600 self-end">Date: <span class="font-semibold">{{ formatDate(wallet.date)
            }}</span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  props: ['wallet', 'walletBalance'],
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    },
  },

}
</script>