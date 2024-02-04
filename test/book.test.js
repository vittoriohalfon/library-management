const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const server = require('../server'); 
const Book = require('../models/book');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Book Management', function() {
  before(function(done) {
    mongoose.connect('mongodb://localhost/library_test', { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => done())
      .catch((err) => done(err));
  });

  beforeEach(function(done) {
    Book.deleteMany({}, () => done());
  });

  after(function(done) {
    mongoose.disconnect().then(() => done());
  });

  it('Creates a new book with valid details', function(done) {
    const newBookDetails = { title: 'New Book', author: 'Author Name', genre: 'Genre', isbn: '123456789', summary: 'Summary of the book' };
    chai.request(server)
      .post('/api/books')
      .send(newBookDetails)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.include({ title: 'New Book', author: 'Author Name' });
        done();
      });
  });

  it('Fails to create a book with incomplete details', function(done) {
    const incompleteBookDetails = { title: 'Incomplete Book' };
    chai.request(server)
      .post('/api/books')
      .send(incompleteBookDetails)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('Updates a book by its ID', function(done) {
    const book = new Book({
      title: 'Book to Update',
      author: 'Author',
      genre: 'Genre',
      isbn: '654321',
      summary: 'Summary before update'
    });

    book.save((err, savedBook) => {
      chai.request(server)
        .put(`/api/books/${savedBook._id}`)
        .send({ title: 'Updated Book', summary: 'Updated Summary' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.title).to.equal('Updated Book');
          expect(res.body.summary).to.equal('Updated Summary');
          done();
        });
    })
  });
});