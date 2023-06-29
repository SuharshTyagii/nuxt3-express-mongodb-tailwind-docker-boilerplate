# Prerequisites
Before running the API, ensure you have the following:

-   Node.js installed (v18.16.0 or above)
-   MongoDB instance running

1.  Clone the repository:
```bash
git clone https://github.com/SuharshTyagii/nuxt3-express-mongodb-tailwind-docker-boilerplate.git
```

2. Install the dependencies
```bash
npm install
```
3. Make sure the variables inside the .env are correct and suit

3. Navigate to the server folder and start the server
```bash
cd server && npm run start
```

# API Documentation


(**Documentation via Swagger is also available at `http://localhost:8082/api-docs` if the server is running.**)
**On prod server, its also made to be available for now at `http://68.183.81.108:8082/api-docs/`**
---------------------
You can also download Postman configuration from (here)

## Set up a new wallet

**Endpoint:** `POST /api/wallet/setup`

Set up a new wallet with the initial balance and create a transaction log.

#### Request Body

```json
{
  "balance": 100,
  "name": "Wallet A"
}
```
-   `balance` (number, required): The initial balance of the wallet.
-   `name` (string, required): The name of the wallet.

#### Response

-  Status: 201 Created


```json
{
  "id": "wallet_id",
  "balance": 100,
  "name": "Wallet A",
  "date": "2023-06-21T00:00:00Z"
}
```

Get a wallet by ID
------------------

Endpoint: `GET /api/wallet/{id}`

Find a single wallet by its ID.

#### Path Parameters

-   `id` (string, required): The ID of the wallet.

#### Response

-   Status: 200 OK

```json
{
  "id": "wallet_id",
  "balance": 100,
  "name": "Wallet A",
  "date": "2023-06-21T00:00:00Z"
}
```

Handle a transaction for a wallet
---------------------------------

Endpoint: `POST /api/transact/{walletId}`

Handle a transaction for a wallet.

#### Path Parameters

-   `walletId` (string, required): The ID of the wallet.

#### Request Body

```json
{
  "amount": 20,
  "description": "Recharge of 20 units"
}
```
-   `amount` (number, required): The amount of the transaction.
-   `description` (string, required): The description of the transaction.

#### Response

-   Status: 200 OK

```json
{
  "id": "transaction_id",
  "walletId": "wallet_id",
  "amount": 20,
  "description": "Recharge of 20 units",
  "type": "CREDIT",
  "balance": 120,
  "date": "2023-06-21T13:00:00Z"
}
```

Get transactions for a wallet
-----------------------------

Endpoint: `GET /api/transactions`

Get transactions sorted by newest/oldest/increasing/decreasing and within a limit.

#### Query Parameters

-   `walletId` (string, required): The ID of the wallet.
-   `skip` (number, optional): The number of transactions to skip (pagination).
-   `limit` (number, optional): The maximum number of transactions to return (pagination).
-   `orderBy` (string, optional): The order in which the transactions should be sorted. Possible values: `newest`, `oldest`, `increasing`, `decreasing`.
-   `type` (string, optional): The type of transactions to filter. Possible values: `DEBIT`, `CREDIT`.

#### Response

-   Status: 200 OK

```json
[
  {
    "id": "transaction_id",
    "walletId": "wallet_id",
    "amount": 20,
    "description": "Recharge of 20 units",
    "type": "CREDIT",
    "balance": 120,
    "date": "2023-06-21T13:00:00Z"
  },
  {
    "id": "transaction_id",
    "walletId": "wallet_id",
    "amount": -50,
    "description": "Purchase of item XYZ",
    "type": "DEBIT",
    "balance": 70,
    "date": "2023-06-20T10:30:00Z"
  }
]
```
This is the documentation for the Application's API. For detailed information on each API endpoint, refer to the corresponding sections above.

Make sure to set the appropriate base URL when making requests to the API.

