<template>
  <div>
    <div>
      <div class="max-w-md mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div class="px-6 py-4 flex flex-col">
          <h2 class="text-3xl font-semibold text-purple-700">{{ wallet.name }}</h2>
          <p class="text-gray-600 mt-2">ID: <span class="font-normal">{{ wallet.id }}</span></p>

          <div class="flex justify-between items-baseline mt-4">
            <div>
              <p class="text-gray-600">Balance:</p>
              <p class="text-4xl font-bold text-purple-600">{{ animatedBalance }}</p>
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
      animatedBalance: Number(this.walletBalance),
      animationInterval: null
    };
  },

  props: ['wallet', 'walletBalance'],

  watch: {
    walletBalance(newBalance, oldBalance) {
      this.startBalanceAnimation(newBalance, oldBalance);
    }
  },

  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    },

    startBalanceAnimation(newBalance, oldBalance) {
      this.stopBalanceAnimation();
      const balanceDiff = Math.abs(newBalance - oldBalance);
      const increment = Number(balanceDiff / 60).toFixed(4);
      const direction = newBalance > oldBalance ? 1 : -1;

      this.animatedBalance = oldBalance;

      this.animationInterval = setInterval(() => {
        if ((direction === 1 && this.animatedBalance < newBalance) || (direction === -1 && this.animatedBalance > newBalance)) {
          this.animatedBalance = Number(Number(this.animatedBalance) + Number(increment) * direction).toFixed(4);
        } else {
          this.stopBalanceAnimation();
          this.animatedBalance = newBalance;
        }
      }, 5);
    },

    stopBalanceAnimation() {
      if (this.animationInterval) {
        clearInterval(this.animationInterval);
        this.animationInterval = null;
      }
    }
  },

  beforeDestroy() {
    this.stopBalanceAnimation();
  }
};
</script>

<style scoped>
.text-transition {
  transition: transform 0.2s ease-in-out;
}
</style>
