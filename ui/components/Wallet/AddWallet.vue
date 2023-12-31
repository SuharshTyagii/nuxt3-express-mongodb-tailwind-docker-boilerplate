<template>
  <div class="mx-auto py-8">
    <div id="walletBox" v-if="!walletCreated">
      <h1 class="text-3xl font-bold mb-4 text-center">Create a New Wallet</h1>
      <div class="flex flex-col items-center">
        <div class="max-w-lg w-full bg-white rounded-lg shadow-xl p-6">
          <div class="space-y-6 flex flex-col">
            <div class="flex flex-col">
              <label for="balance" class="text-gray-700 font-semibold mb-2">Balance</label>
              <div class="relative">
                <input type="number" id="balanceInputField" v-model="balance" placeholder="Enter balance"
                  max="9000000000000" @input="setFourNumDecimal" ref="balanceField" step="0.0001"
                  class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" />
              </div>
            </div>
            <div class="flex flex-col">
              <label for="name" class="text-gray-700 font-semibold mb-2">Name</label>
              <input type="text" id="walletName" v-model="name" placeholder="Enter name" ref="nameField"
                class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" />
            </div>
            <button @click="createWallet" id="createWalletButton"
              class="bg-purple-500 text-white justify-self-center mx-auto py-4 px-8 rounded-md font-semibold hover:bg-purple-800 transition-colors">
              Create Wallet
            </button>
          </div>
        </div>
      </div>


      <div v-if="!walletCreated" class="flex flex-col">
        <h1 class="text-3xl font-bold mb-4 text-center pt-6">
          Or </h1>
        <span class="text-center font-semibold text-xl">Add an existing wallet</span>
        <div class="flex flex-col items-center">
          <div class="max-w-lg w-full bg-white rounded-lg shadow-xl p-6">
            <div class="space-y-6 flex flex-col">
              <div class="flex flex-col">
                <label for="balance" class="text-gray-700 font-semibold mb-2">Wallet ID</label>
                <div class="relative">
                  <input id="userInputWalletId" v-model="userInputWalletId" placeholder="Enter the Wallet ID"
                    maxlength="24" ref="userInputWalletIdField" step="0.0001"
                    class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" />
                </div>
              </div>
              <button @click="findwalletId" id="findWalletButton"
                class="bg-purple-500 text-white justify-self-center mx-auto py-4 px-8 rounded-md font-semibold hover:bg-purple-800 transition-colors">
                Find Wallet
              </button>
            </div>
          </div>
        </div>


      </div>
    </div>


    <!-- wallet created -->

  </div>
</template>


<script>

export default {
  data() {
    return {
      balance: 80,
      name: null,
      walletCreated: false,
      wallet: null,
      userInputWalletId: null,
    };
  },

  methods: {
    async createWallet() {
      this.checkEmptyFields();
      if (this.balance > 1000000000000) {
        alert('Total balance must be less than 1 trillion.');
        return;
      }
      if (!this.checkEmptyFields()) {
        return
      }
      const data = JSON.stringify({
        "name": this.name,
        "balance": this.balance
      });

      const config = {
        method: 'post',
        url: `${this.$config.public.apiBase}/api/wallet/setup`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };
      await this.$axios(config).then(res => {
        this.walletCreated = true
        this.wallet = res.data
        this.$event('wallet-created', this.wallet)
      }).
        catch(err => {
          alert(err.response.data.error)
        })

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
      const nouns = ['Money', 'Treasure', 'Vault', 'Bank'];
      const randomNounIndex = Math.floor(Math.random() * nouns.length);
      const randomNoun = nouns[randomNounIndex];

      return `Wallet_${randomNoun}`;
    },
    setFourNumDecimal(event) {
      const inputValue = event.target.value;
      const decimalIndex = inputValue.indexOf('.');
      if (decimalIndex !== -1 && inputValue.length - decimalIndex > 5) {
        this.balance = Math.round(inputValue * 10000) / 10000;
      }
    },

    // find wallet
    async findwalletId() {
      const config = {
        method: 'get',
        url: `${this.$config.public.apiBase}/api/wallet/${this.userInputWalletId}`,
        headers: {}
      };

      await this.$axios(config)
        .then(res => {
          this.walletCreated = true
          this.wallet = res.data
          this.$event('wallet-created', this.wallet)
        })
        .catch(function (error) {
          alert("No wallet is associated with that wallet ID")
          console.log(error);
        });

    },
  },


};
</script>
<style scoped>
.highlight-field {
  border: 2px solid red;
}
</style>
