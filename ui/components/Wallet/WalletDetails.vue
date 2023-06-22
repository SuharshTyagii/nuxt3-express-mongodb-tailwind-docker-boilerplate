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
              <p class="text-4xl font-bold text-purple-600 ">{{
                animatedBalance }}</p>
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
      console.log('newBalance', newBalance)
      console.log('oldBal', oldBalance)
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
      let balanceDiff;
      let goPlus = true;
      if (newBalance > oldBalance) {
        balanceDiff = newBalance - oldBalance;
      }
      else {
        balanceDiff = oldBalance - newBalance;
        goPlus = false;
      }
      this.animatedBalance = oldBalance;
      const increment = Number(balanceDiff / 60).toFixed(8);

      if (goPlus) {
        this.animationInterval = setInterval(() => {
          if (this.animatedBalance < newBalance) {
            this.animatedBalance = Number(Number(this.animatedBalance) + Number(increment)).toFixed(4);

          }

          else {
            this.stopBalanceAnimation();
            this.animatedBalance = newBalance;
          }
        }, 5);
      }
      else {
        this.animationInterval = setInterval(() => {
          if (this.animatedBalance > newBalance) {
            this.animatedBalance = Number(Number(this.animatedBalance) - Number(increment)).toFixed(4);

          }

          else {
            this.stopBalanceAnimation();
            this.animatedBalance = newBalance;
          }
        }, 5);
      }
    },
    stopBalanceAnimation() {
      // Clear the animation interval if it is running
      if (this.animationInterval) {
        clearInterval(this.animationInterval);
        this.animationInterval = null;
      }
    },
  },
  beforeDestroy() {
    this.stopBalanceAnimation();
  },

}
</script>
<style scoped>
.text-transition {
  transition: transform 0.2s ease-in-out;
}
</style>