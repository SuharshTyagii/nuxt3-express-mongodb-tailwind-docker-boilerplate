<template>
  <div class="mx-auto max-w-md py-12 shadow-2xl flex flex-col items-center">
    <h1 class="text-2xl font-semibold p-4 text-gray-700 ">Make Transactions</h1>

    <div class="max-w-md mx-auto bg-white rounded-md  p-6 flex flex-col">
      <div class="mb-4">
        <label for="walletId" class="block text-gray-700 font-semibold mb-2">Wallet ID:</label>
        <input type="text" id="walletId" :value="walletId" disabled="disabled"
          class="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-600 font-semibold focus:outline-none focus:ring-blue-500 focus:border-blue-500">
      </div>

      <div class="mb-4">
        <label for="amount" class="block text-gray-700 font-semibold mb-2">Amount:</label>
        <input type="number" id="amount" v-model="amount" @input="setFourNumDecimal" step="0.0001" ref="amountField"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
      </div>

      <div class="mb-4">
        <label for="description" class="block text-gray-700 font-semibold mb-2">Description:</label>
        <input type="text" id="description" v-model="description" ref="descriptionField" max="100"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
      </div>

      <button @click="makeTransaction" class=" text-white py-2 px-4 rounded-md  transition-colors"
        :class="[amount < 0 ? 'bg-red-500 hover:bg-red-800' : 'bg-green-600 hover:bg-green-800']">
        {{ amount < 0 ? 'Debit' : 'Credit' }} </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      amount: 5,
      description: this.pickRandomDescription(),
    };
  },
  props: ['walletId'],
  mounted() {
    console.log('wallet id', this.walletId)
  },
  methods: {
    async makeTransaction() {
      if (!this.checkEmptyFields()) {
        return
      }
      const data = JSON.stringify({
        "amount": this.amount,
        "description": this.description
      });

      const config = {
        method: 'post',
        url: `${this.$config.public.apiBase}/api/transact/${this.walletId}`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };

      await this.$axios(config).then(res => {
        console.log(res.data)
        // this.wallet = res.data
        this.$event('made-transaction', res.data)
        // this.amount = null;
        this.description = this.pickRandomDescription();
      })

    },
    setFourNumDecimal(event) {
      const inputValue = event.target.value;
      const decimalIndex = inputValue.indexOf('.');
      if (decimalIndex !== -1 && inputValue.length - decimalIndex > 5) {
        this.amount = Math.round(inputValue * 10000) / 10000;
      }
    },
    pickRandomDescription() {
      const items = ['Apple', 'Orange', 'Grapes', 'Hat', 'Sunglasses', 'Bag', 'Watch'];
      return `For ${items[Math.floor(Math.random() * items.length)]}`
    },

    checkEmptyFields() {
      if (!this.amount) {
        this.$refs.amountField.classList.add('highlight-field');
        return false;
      }
      else if (!this.description) {
        this.$refs.descriptionField.classList.add('highlight-field');
        return false;
      }
      else if (this.amount && this.description) {
        this.$refs.amountField.classList.remove('highlight-field');
        this.$refs.descriptionField.classList.remove('highlight-field');
        return true;
      }
    }

  },
};
</script>

<style scoped>
.highlight-field {
  border: 2px solid red;
}
</style>
