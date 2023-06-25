<template>
  <div>
    <!-- Incase the wallet is not initialized yet -->

    <!-- Main component -->
    <div class="mx-auto py-8 max-w-md">
      <h1 v-if="!walletId" class="text-3xl font-bold text-gray-700 mb-4 self-center">Please Initialize a <a href="/"
          class="underline text-purple-600"> Wallet</a></h1>
      <div v-else class="flex flex-col">
        <h1 class="text-3xl font-bold text-gray-700 mb-4 self-center">Transaction History</h1>


        <!-- sorting options -->

        <div class="flex space-x-4 flex-row items-center px-4 my-5 py-5 bg-gray-300 rounded-lg shadow-md ">
          <div class="relative">
            <span class="font-semibold px-2">Sort By</span>
            <select v-model="orderBy" @change="setSortOption"
              class="text-purple-600 hover:text-purple-800 transition-colors appearance-none bg-white py-2 px-4 pr-8 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
              <option value="decreasing">Most Amount First</option>
              <option value="increasing">Least Amount First</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
              <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M7 7l3-3 3 3M7 13l3 3 3-3"></path>
              </svg>
            </div>
          </div>
          <div class="flex sm:flex-row flex-col sm:space-x-2">
            <div>
              <label class="inline-flex items-center">
                <input type="checkbox" v-model="showDebit" @change="handleTransactionType"
                  class="form-checkbox text-purple-500">
                <span class="ml-2 text-gray-600">Debit</span>
              </label>
            </div>
            <div>
              <label class="inline-flex items-center">
                <input type="checkbox" v-model="showCredit" @change="handleTransactionType"
                  class="form-checkbox text-purple-500">
                <span class="ml-2 text-gray-600">Credit</span>
              </label>
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <div v-for="transaction in transactions" :key="transaction.id"
            class=" shadow-xl rounded-lg overflow-hidden grid grid-cols-3 gap-4 px-6 py-4"
            :class="[transaction.type === 'DEBIT' ? 'bg-red-100' : 'bg-green-100']">
            <div class="col-span-3">
              <h2 class="text-2xl font-semibold text-purple-700">
                {{ transaction.amount }}
              </h2>
              <p class="text-gray-600 mt-2 sm:text-base text-xs ">
                {{ transaction.description }}
              </p>
            </div>
            <div class="col-start-4 col-end-5 justify-self-end text-xl font-semibold text-gray-600"
              :class="getTransactionTypeClass(transaction.type)">
              {{ transaction.type }}
            </div>
            <div class="col-start-4 col-end-5 self-end text-xs text-gray-600">
              {{ formatTime(transaction.date) }}
            </div>
          </div>
        </div>
        <div class="flex items-center flex-row self-center mt-4">

          <div>
            <button @click="loadMoreTransactions"
              class="text-gray-600 font-bold hover:text-gray-800 text-center transition-colors">
              Load More..
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GetTransactions',
  data() {
    return {
      walletId: null,
      userWalletId: null,
      transactions: [],
      type: 'all',
      skip: 0,
      limit: 10,
      showDebit: true,
      showCredit: true,
      orderBy: 'newest',
      isSortDropdownOpen: false,
    };
  },
  computed: {

  },
  watch: {
    transactions(newTransactions, oldTransactions) {
      this.$event('transactions-updated', newTransactions)
    }
  },
  async mounted() {
    const walletInStorage = this.getWalletFromLocalStorage();
    if (walletInStorage) {
      this.transactions = await this.fetchTransactions()
    }
  },
  methods: {
    getTransactionTypeClass(type) {
      return {
        'text-green-500': type === 'CREDIT',
        'text-red-500': type === 'DEBIT',
      };
    },
    async fetchTransactions() {
      if (this.type === 'NONE') {
        return
      }
      const config = {
        method: 'get',
        url: `${this.$config.public.apiBase}/api/transactions?walletId=${this.walletId}&orderBy=${this.orderBy}&type=${this.type}&skip=${this.skip}&limit=${this.limit}`,
        headers: {}
      };
      const transactions = await this.$axios(config).then(res => {
        if (res.data.length === 0) {
          alert("No more transactions are available")
        }
        return res.data
      }).catch(err => {
        console.log(err.response)
      })
      return transactions;
    },
    getWalletFromLocalStorage() {
      const walletData = localStorage.getItem('wallet');
      if (walletData) {
        const wallet = JSON.parse(walletData);
        this.walletId = wallet.id;
        return true
      }
      else {
        return false
      }
    },
    toggleSortDropdown() {
      this.isSortDropdownOpen = !this.isSortDropdownOpen;
    },
    async setSortOption() {
      // this.orderBy = option;
      this.skip = 0
      this.transactions = await this.fetchTransactions();
    },
    async loadMoreTransactions() {
      this.skip += this.limit;
      if (this.type === 'NONE') {
        return
      }
      await this.fetchTransactions()
        .then((newTransactions) => {
          if (newTransactions.length) {
            this.transactions = [...this.transactions, ...newTransactions];
          }
        })
        .catch((error) => {
          console.error('Error loading more transactions:', error);
        });
    },
    async handleTransactionType() {
      if (this.showDebit && !this.showCredit) {
        this.type = 'DEBIT'
        this.skip = 0
        this.transactions = await this.fetchTransactions();
      }
      else if (this.showCredit && !this.showDebit) {
        this.type = 'CREDIT';
        this.skip = 0
        this.transactions = await this.fetchTransactions();
      }
      else if (!this.showDebit && !this.showCredit) {
        this.skip = 0
        this.type = 'NONE'
        this.transactions = []
      }
      else {
        this.type = 'ALL';
        this.skip = 0
        this.transactions = await this.fetchTransactions();
      }

    },
    formatTime(time) {
      const timeFormatted = new Date(time);
      return `${timeFormatted.toLocaleTimeString()}, ${timeFormatted.toLocaleDateString()}`
    }
  },
};
</script>

<style>
/* Add any additional styles here */
</style>
