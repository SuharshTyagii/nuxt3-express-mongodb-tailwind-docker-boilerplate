<template>
  <div class="mx-auto py-4 max-w-md flex flex-col">
    <button @click="exportToCSV"
      class="flex flex-row place-items-center justify-center items-center bg-purple-200 hover:bg-purple-700 hover:text-white text-black font-bold py-2 px-4 rounded text-center">
      <span class="mr-2">Export as .CSV</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download"
        viewBox="0 0 16 16">
        <path
          d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
        <path
          d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    transactions: {
      type: Array,
      required: true
    }
  },
  methods: {
    exportToCSV() {
      // Convert transactions array to CSV format
      const csvContent = this.convertToCSV(this.transactions);

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

      // Generate a temporary download link
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'transactions.csv';

      // Trigger the download
      link.click();

      // Clean up the temporary download link
      URL.revokeObjectURL(link.href);
    },
    convertToCSV(transactions) {
      const csvRows = [];

      const header = ['TransactionID', 'Balance', 'WalletID', 'Amount', 'Description', 'Date', 'Type'];
      csvRows.push(header.join(','));

      // Data rows
      for (const transaction of transactions) {
        const row = [
          transaction.id,
          transaction.balance,
          transaction.walletId,
          transaction.amount,
          transaction.description,
          transaction.date,
          transaction.type
        ];
        csvRows.push(row.join(','));
      }

      // Join rows with line breaks
      return csvRows.join('\n');
    }
  }
};
</script>