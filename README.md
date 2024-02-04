**Introduction**
This Library Management System is a simple yet powerful tool designed to manage library operations efficiently. Built with Node.js, Express, and MongoDB, it offers functionalities to add, retrieve, update, and delete books, manage user registrations and logins, and handle book loans.

**Features**
Book Management: Add, update, retrieve, and delete books in the library.
User Management: Register new users, log in, and retrieve user information.
Loan Management: Create new loans and update loan details, such as returning books.

**Getting Started**
To run this project, you need to have Node.js, npm, and MongoDB installed on your machine.

**1. Clone the Repo**
git clone github.com/vittoriohalfon/library-management

**2. Install Required Dependencies**
cd library-management
npm install

**Set up environment variables**
Create a .env file in the root directory and add the following:
PORT=3000
DB_URI=your mongoDB URI

**4. Start the server**
npm start

**API Endpoints**
**Books**
POST /api/books - Add a new book
GET /api/books/:id - Retrieve a book by ID
PUT /api/books/:id - Update a book
DELETE /api/books/:id - Delete a book

**Users**
POST /api/users/register - Register a new user
POST /api/users/login - User login
GET /api/users/:id - Get user by ID

**Loans**
POST /api/loans - Create a new loan
GET /api/loans/:id - Get loan by ID
PUT /api/loans/:id - Update loan details

**Testing**
To run tests, ensure you have a MongoDB instance running for the test database. Then, execute the following command:
npm test