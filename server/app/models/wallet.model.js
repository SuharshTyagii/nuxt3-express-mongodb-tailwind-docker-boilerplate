module.exports = mongoose => {
  const walletSchema = mongoose.Schema(
    {
      balance: {
        type: Number,
        required: true,
        default: 0
      },
      name: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        required: true
      }
    },
    { timestamps: true }
  );

  walletSchema.method("toJSON", function () {
    const { __v, _id, createdAt, balance, amount, updatedAt, ...object } = this.toObject();
    return {
      id: _id,
      amount: Number(amount.toFixed(4)),
      balance: Number(balance.toFixed(4)),
      ...object
    };

  });

  const Wallet = mongoose.model('Wallet', walletSchema);
  return Wallet;
}
