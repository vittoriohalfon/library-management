const Loan = require('../models/loan');

const createLoan = async (loanData) => {
  const loan = new Loan(loanData);
  return await loan.save();
};

const getLoanById = async (id) => {
  const loan = await Loan.findById(id).populate('book_id').populate('user_id');
  if (!loan) {
    throw new Error('Loan not found!');
  }
  return loan;
};

const updateLoan = async (id, updateData) => {
  const loan = await Loan.findByIdAndUpdate(id, updateData, { new: true });
  if (!loan) {
    throw new Error('Loan not found!');
  }
  return loan;
};

module.exports = {
  createLoan,
  getLoanById,
  updateLoan
};
