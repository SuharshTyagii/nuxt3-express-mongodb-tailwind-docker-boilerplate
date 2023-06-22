module.exports = mongoose => {
  const transactionSchema = mongoose.Schema(
    {
      walletId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wallet',
        required: true
      },
      amount: {
        type: Number,
        required: true
      },
      balance: {
        type: Number,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        required: true
      },
      type: {
        type: String,
        enum: ['CREDIT', 'DEBIT'],
        required: true
      }
    },
    { timestamps: true }
  );

  transactionSchema.method("toJSON", function () {
    const { __v, _id, createdAt, balance, updatedAt, ...object } = this.toObject();
    return { id: _id, balance: Number(balance.toFixed(4)), ...object };

  });


  const Transaction = mongoose.model('Transaction', transactionSchema);
  return Transaction;
}