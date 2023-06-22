<template>
  <div>
    <AddWallet v-if="!walletCreated" />
    <WalletDetails v-if="walletCreated" :wallet="wallet" :walletBalance="walletBalance" />
    <MakeTransaction v-if="walletCreated" :walletId="wallet.id" />
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      walletCreated: false,
      wallet: null,
      walletBalance: null,
    }
  },
  mounted() {
    this.retrieveWalletFromLocalStorage()
    this.walletListener()
    this.transactionListener()

  },
  methods: {
    // listeners
    walletListener() {
      this.$listen('wallet-created', (data) => {
        this.walletCreated = true
        this.wallet = data
        this.walletBalance = data.balance
        this.saveWalletToLocalStorage(data)

      })
    },
    transactionListener() {
      this.$listen('made-transaction', (data) => {
        this.walletBalance = data.balance
        this.updateWalletInLocalStorage(data)

      })
    },

    // for local storage
    saveWalletToLocalStorage(wallet) {
      localStorage.setItem('wallet', JSON.stringify(wallet))
    },
    updateWalletInLocalStorage(wallet) {
      const storedWallet = JSON.parse(localStorage.getItem('wallet'))
      if (storedWallet && storedWallet.id === wallet.walletId) {
        storedWallet.balance = wallet.balance
        localStorage.setItem('wallet', JSON.stringify(storedWallet))
      }
    },
    retrieveWalletFromLocalStorage() {
      const storedWallet = JSON.parse(localStorage.getItem('wallet'))
      if (storedWallet) {
        this.walletCreated = true
        this.wallet = storedWallet
        this.walletBalance = storedWallet.balance
      }
    },

  }
}
</script>
