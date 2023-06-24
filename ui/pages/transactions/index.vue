<template>
  <div>
    <ExportTransactions v-if="transactions.length" :transactions="transactions" />

    <GetTransactions />

  </div>
</template>

<script>
export default {
  name: 'TransactionsPage',
  data() {
    return {
      walletId: null,
      transactions: [],
    };
  },
  mounted() {
    this.listenerForTransactions()
  },
  methods: {
    listenerForTransactions() {
      this.$listen('transactions-updated', (data) => {
        this.transactions = [...data]
      })
    }
  },
};
</script>

<style scoped></style>
