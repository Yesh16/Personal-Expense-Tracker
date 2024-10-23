"# Personal-Expense-Tracker" 
## Setup and Run Instructions

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the server: `node app.js`

## API Endpoints

### Add New Transaction

`POST /transactions`

**Request Body**:
```json
{
  "type": "income/expense",
  "category": "category_name",
  "amount": 100.00,
  "date": "YYYY-MM-DD",
  "description": "Description of the transaction"
}

Response:
{
  "id": 1
}


Retrieve All Transactions
GET /transactions

Response: 
[
  {
    "id": 1,
    "type": "income/expense",
    "category": "category_name",
    "amount": 100.00,
    "date": "YYYY-MM-DD",
    "description": "Description of the transaction"
  },
  ...
]

Retrieve a Transaction by ID
GET /transactions/:id

Response:
{
  "id": 1,
  "type": "income/expense",
  "category": "category_name",
  "amount": 100.00,
  "date": "YYYY-MM-DD",
  "description": "Description of the transaction"
}


Update a Transaction by ID
PUT /transactions/:id

Request Body:
{
  "type": "income/expense",
  "category": "category_name",
  "amount": 100.00,
  "date": "YYYY-MM-DD",
  "description": "Description of the transaction"
}

Response:
{
  "updated": 1
}


Delete a Transaction by ID
DELETE /transactions/:id

Response:
{
  "deleted": 1
}


Retrieve Summary of Transactions
GET /summary

Response:
{
  "total_income": 1000.00,
  "total_expenses": 500.00,
  "balance": 500.00
}


