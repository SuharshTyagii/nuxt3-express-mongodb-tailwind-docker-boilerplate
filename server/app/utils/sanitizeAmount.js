const sanitizeAmount = (amount, currentBalance, maxBalance) => {
  // Convert amount, currentBalance, and maxBalance to numbers
  amount = Number(amount);
  currentBalance = Number(currentBalance);
  maxBalance = Number(maxBalance);

  // Ensure amount is a valid number
  if (isNaN(amount) || !isFinite(amount)) {
    return 0;
  }

  // Calculate the new balance without rounding
  const newBalance = currentBalance + amount;

  // Round the amount to 4 decimal places
  const roundedAmount = Number(newBalance.toFixed(4));

  // Check if the rounded amount exceeds the maximum balance limit
  if (roundedAmount > maxBalance) {
    throw new Error("The amount you are trying to credit exceeds the maximum creditable amount")
  }

  return amount;
};

module.exports = sanitizeAmount;