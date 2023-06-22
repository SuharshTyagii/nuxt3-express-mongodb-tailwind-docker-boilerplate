/**
 * Validate a valid transaction. Description is required.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const validateTransaction = (req, res, next) => {
  const { amount, description } = req.body;

  // Check if amount is provided and is a valid number
  if (!amount || isNaN(amount) || !isFinite(amount)) {
    return res.status(400).json({ error: 'Invalid transaction amount, please provide a valid one' });
  }

  // Check if description is provided and is a non-empty string
  if (!description || typeof description !== 'string' || description.trim() === '') {
    return res.status(400).json({ error: 'Invalid transaction description' });
  }

  // Continue to the next middleware or route handler
  next();
};

/**
 * Validate params for the getTransactions handler.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const validateGetTransactions = (req, res, next) => {
  const { walletId, skip, limit } = req.query;
  if (!walletId || typeof walletId !== 'string' || walletId.trim() === '') {
    return res.status(400).json({ error: 'Invalid walletId' });
  }
  if (!skip) {
    req.query.skip = '0';
  }
  if (!limit) {
    req.query.limit = '10';
  }
  next();

}
module.exports = { validateTransaction, validateGetTransactions };
