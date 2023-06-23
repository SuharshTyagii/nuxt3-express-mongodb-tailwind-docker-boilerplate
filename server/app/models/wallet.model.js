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
    const transformedObject = {
      id: _id,
      balance: Number(balance.toFixed(4)),
      ...object
    };

    if (amount !== undefined) {
      transformedObject.amount = Number(amount.toFixed(4));
    }

    return transformedObject;

  });

  const Wallet = mongoose.model('Wallet', walletSchema);
  return Wallet;
}
