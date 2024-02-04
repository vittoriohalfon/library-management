const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const server = require('../server');
const Loan = require('../models/loan'); 
const Book = require('../models/book');
const User = require('../models/user'); 

chai.use(chaiHttp);
const expect = chai.expect;

describe('Loan Management', function() {
  let loanId; // To store the loan ID for updating tests
  let bookId; // To store a book ID for creating loans
  let userId; // To store a user ID for creating loans

  before(function(done) {
    mongoose.connect('mongodb://localhost/library_test', { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        const user = new User({ name: 'Test User', email: 'user@example.com', password: 'password' });
        const book = new Book({ title: 'Test Book', author: 'Author', genre: 'Genre', isbn: '123456', summary: 'Summary' });
        Promise.all([user.save(), book.save()])
          .then(results => {
            userId = results[0]._id;
            bookId = results[1]._id;
            done();
          })
          .catch(err => done(err));
      })
      .catch((err) => done(err));
  });

  beforeEach(function(done) {
    // Clean up the Loan collection before each test
    Loan.deleteMany({}, () => done());
  });

  after(function(done) {
    // Cleanup: Remove test user and book, then disconnect from DB
    Promise.all([
      User.deleteMany({}),
      Book.deleteMany({})
    ]).then(() => mongoose.disconnect())
      .then(() => done());
  });

  it('Creates a new loan successfully', function(done) {
    const newLoanDetails = { userId: userId.toString(), bookId: bookId.toString(), dueDate: '2023-12-31' };
    chai.request(server)
      .post('/api/loans')
      .send(newLoanDetails)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.include({ dueDate: '2023-12-31' });
        loanId = res.body._id; // Save loan ID for later tests
        done();
      });
  });

  it('Updates a loan to mark as returned', function(done) {
    // Assuming a loan has been created in a previous test or setup phase
    if (!loanId) return done(new Error("Loan ID not set. Previous test likely failed."));
    chai.request(server)
      .put(`/api/loans/${loanId}`)
      .send({ returned: true })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('returned', true);
        done();
      });
  });
});
