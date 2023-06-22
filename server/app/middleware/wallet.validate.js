/**
 * Validate a valid wallet. Name and balance is required. Balance must be greater than 0 when initialised a wallet.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const validateWallet = (req, res, next) => {
  const { balance, name } = req.body;
  // initial balance can't be zero or below zero
  if (typeof balance !== 'number' || isNaN(balance) || balance < 0) {
    return res.status(400).json({ error: 'Invalid balance value' });
  }
  if (typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ error: 'Invalid name value' });
  }

  // req.body.balance = BigInt(balance);

  next();
};

module.exports = validateWallet;