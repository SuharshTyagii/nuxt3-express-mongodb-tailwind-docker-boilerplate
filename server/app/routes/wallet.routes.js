module.exports = app => {
  const wallet = require("./../controllers/wallet.controller.js");
  const validateWallet = require("./../middleware/wallet.validate.js")
  const { validateGetTransactions, validateTransaction } = require("./../middleware/transaction.validate.js")
  var router = require("express").Router();

  // Create a new wallet
  router.post("/wallet/setup", validateWallet, wallet.setupWallet);

  // Retrieve details about a single Wallet via id
  router.get("/wallet/:id", wallet.findOne);

  // Retrieve transactions for a specific wallet
  router.get("/transactions", validateGetTransactions, wallet.getTransactions);

  // Create a new transaction on a wallet
  router.post("/transact/:walletId", validateTransaction, wallet.transactionHandler);





  app.use("/api", router);
};
