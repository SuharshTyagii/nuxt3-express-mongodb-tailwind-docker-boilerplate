const db = require("../models");
const Wallet = db.wallet;
const Transaction = db.transaction;
const sanitizeAmount = require("./../utils/sanitizeAmount.js")
require("dotenv").config();

const MAX_BALANCE = process.env.MAX_BALANCE;

/**
 * Set up a new wallet with the initial balance and create a transaction log.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.setupWallet = (req, res) => {
  const { balance, name } = req.body;

  const wallet = new Wallet({
    balance,
    name,
    date: new Date()
  });

  const initialAmount = Number(balance);
  const transactionType = 'CREDIT';

  wallet.save((err, createdWallet) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Failed to create wallet' });
    }

    // Create a transaction log for the initial balance
    const transaction = new Transaction({
      walletId: createdWallet._id,
      amount: initialAmount,
      description: 'Initial balance when the wallet is created',
      type: transactionType,
      balance: initialAmount,
      date: new Date()
    });

    transaction.save((err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'Failed to create transaction log' });
      }

      res.status(201).json({
        id: createdWallet._id,
        balance: createdWallet.balance,
        name: createdWallet.name,
        date: createdWallet.date
      });
    });
  });
};

/**
 * Find a single wallet by its ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.findOne = (req, res) => {
  const id = req.params.id;
  Wallet.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Wallet with id " + id });
      else res.send(data);
    })
    .catch(err => {
      console.log(err)
      res
        .status(500)
        .send({ message: "Error retrieving Wallet with id=" + id });
    });
};


/**
 * Handle a transaction for a wallet.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.transactionHandler = async (req, res) => {
  const walletId = req.params.walletId;

  let { amount, description } = req.body;

  try {
    // Retrieve the wallet from the database
    const wallet = await Wallet.findById(walletId);

    if (!wallet) {
      return res.status(404).json({ error: 'Wallet not found with that id' });
    }

    // Sanitize the amount before processing
    const sanitizedAmount = sanitizeAmount(amount, wallet.balance, MAX_BALANCE);
    console.log('sanitizeAmount', sanitizedAmount)
    // Check if the sanitized amount exceeds the available balance for debit transactions
    if (sanitizedAmount < 0 && Math.abs(sanitizedAmount) > wallet.balance) {
      return res.status(500).json({ error: 'Insufficient balance for credit transaction' });
    }

    const type = sanitizedAmount > 0 ? "CREDIT" : (sanitizedAmount < 0 ? "DEBIT" : null);
    console.log('type', type)
    // Calculate the new balance
    const newBalance = wallet.balance + sanitizedAmount;

    // Create a new transaction document
    const transaction = new Transaction({
      walletId: walletId,
      amount: sanitizedAmount,
      description: description,
      type: type,
      balance: newBalance,
      date: new Date()
    });

    // Save the transaction
    await transaction.save();

    // Update the wallet balance
    wallet.balance = newBalance;
    await wallet.save();

    res.status(200).json({
      id: transaction._id,
      walletId: transaction.walletId,
      amount: transaction.amount,
      description: transaction.description,
      balance: transaction.balance.toFixed(4),
      date: transaction.date
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not complete the transaction" });
  }
};

/**
 * Get transactions sorted by newest/oldest/increasing/decreasing and within a limit.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.getTransactions = async (req, res) => {
  const { walletId, skip, limit, orderBy, type } = req.query;
  try {
    let sortOption = { date: -1 }; // Default sort by newest

    if (orderBy === 'oldest') {
      sortOption = { date: 1 };
    } else if (orderBy === 'increasing') {
      sortOption = { amount: 1 };
    } else if (orderBy === 'decreasing') {
      sortOption = { amount: -1 };
    }

    const query = { walletId };

    // Add filter for transaction type if provided
    if (type === 'DEBIT') {
      query.type = 'DEBIT';
    } else if (type === 'CREDIT') {
      query.type = 'CREDIT';
    }

    // Query the transactions based on the walletId, type, and apply pagination and sorting
    const transactions = await Transaction.find(query)
      .sort(sortOption)
      .skip(Number(skip) || 0)
      .limit(Number(limit) || 10);

    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};




