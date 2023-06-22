<template>
  <div class="container mx-auto py-8">
    <div id="walletBox" v-if="!walletCreated">
      <h1 class="text-3xl font-bold mb-4 text-center">Create a New Wallet</h1>
      <div class="flex flex-col items-center">
        <div class="max-w-lg w-full bg-white rounded-lg shadow-2xl p-6">
          <div class="space-y-6 flex flex-col">
            <div class="flex flex-col">
              <label for="balance" class="text-gray-700 font-semibold mb-2">Balance</label>
              <div class="relative">
                <input type="number" id="balance" v-model="balance" placeholder="Enter balance" max="9000000000000"
                  ref="balanceField" step="0.0001"
                  class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" />

              </div>
            </div>
            <div class="flex flex-col">
              <label for="name" class="text-gray-700 font-semibold mb-2">Name</label>
              <input type="text" id="name" v-model="name" placeholder="Enter name" ref="nameField"
                class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" />
            </div>
            <button @click="createWallet"
              class="bg-purple-500 text-white justify-self-center mx-auto py-4 px-8 rounded-md font-semibold hover:bg-purple-800 transition-colors">
              Create Wallet
            </button>
          </div>
        </div>
      </div>

    </div>

    <!-- wallet created -->
    <div v-else>
      <h1>Created Wallet</h1>
    </div>
  </div>
</template>


<script>

export default {
  data() {
    return {
      balance: 80,
      name: '',
      walletCreated: false
    };
  },
  methods: {
    async createWallet() {
      this.checkEmptyFields();
      if (this.balance > 1000000000000) {
        alert('Total balance must be less than 1 trillion.');
        return;
      }
      if (this.checkEmptyFields()) {
        var data = JSON.stringify({
          "name": this.name,
          "balance": this.balance
        });

        var config = {
          method: 'post',
          url: `${this.$config.public.apiBase}/api/wallet/setup`,
          headers: {
            'Content-Type': 'application/json'
          },
          data: data
        };
        await this.$axios(config).then(res => {
          console.log(res.data)
          this.walletCreated = false
        })
      }
    },
    clearBalance() {
      this.balance = null;
    },
    checkEmptyFields() {
      if (!this.balance) {
        this.$refs.balanceField.classList.add('highlight-field');
        return false;
      }
      else if (!this.name) {
        this.$refs.nameField.classList.add('highlight-field');
        return false;
      }
      else if (this.balance && this.name) {
        this.$refs.balanceField.classList.remove('highlight-field');
        this.$refs.nameField.classList.remove('highlight-field');
        return true;
      }


    },
    generateRandomWalletName() {
      const nouns = ['Wallet', 'Purse', 'Cash', 'Money', 'Treasure', 'Safe', 'Vault', 'Coffer', 'Fortune', 'Bank'];
      const randomNounIndex = Math.floor(Math.random() * nouns.length);
      const randomNoun = nouns[randomNounIndex];

      return `Wallet_${randomNoun}`;
    }
  },
  mounted() {
    this.name = this.generateRandomWalletName();
    console.log(' i mounted')
  },

};
</script>
<style scoped>
.highlight-field {
  border: 2px solid red;
}

.animate-tick {
  animation: tick 1s linear;
}

@keyframes tick {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
