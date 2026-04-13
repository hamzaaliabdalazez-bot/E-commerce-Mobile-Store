# API Reference Documentation

## Base URL

```
Development:  http://localhost:3000/api
Production:   https://yourdomain.com/api
```

---

## Authentication Endpoints

### Sign In (Credentials)

**POST** `/auth/signin`

Sign in with email and password.

```bash
curl -X POST http://localhost:3000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "redirect": "false"
  }'
```

**Response:**

```json
{
  "ok": true,
  "error": null,
  "status": 200,
  "url": null
}
```

### Sign Out

**GET** `/auth/signout`

Sign out current user and destroy session.

```bash
curl -X GET http://localhost:3000/api/auth/signout
```

### Get Session

**GET** `/auth/session`

Retrieve current user session.

```bash
curl -X GET http://localhost:3000/api/auth/session \
  -H "Cookie: next-auth.session-token=..."
```

**Response:**

```json
{
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "USER",
    "image": "https://..."
  },
  "expires": "2026-05-11T19:56:42.421Z"
}
```

---

## Products Endpoints

### List All Products

**GET** `/products`

Retrieve all products with pagination support.

**Query Parameters:**

- `take`: Number of records (default: 50)
- `skip`: Number of records to skip (default: 0)
- `category`: Filter by category slug

```bash
curl -X GET "http://localhost:3000/api/products?take=10&skip=0"
```

**Response:**

```json
[
  {
    "id": "product_id_1",
    "name": "Nova Smart Phone",
    "slug": "nova-smart-phone",
    "description": "Modern mobile with long battery...",
    "price": 629.99,
    "category": {
      "id": "category_id",
      "name": "Mobiles",
      "slug": "mobiles"
    },
    "images": ["https://..."],
    "stock": 50,
    "rating": 4.7,
    "createdAt": "2026-04-11T10:00:00Z"
  }
]
```

### Get Product Details

**GET** `/products/[id]`

Retrieve single product by ID.

```bash
curl -X GET http://localhost:3000/api/products/product_id_1
```

**Response:**

```json
{
  "id": "product_id_1",
  "name": "Nova Smart Phone",
  "slug": "nova-smart-phone",
  "description": "...",
  "price": 629.99,
  "images": ["https://..."],
  "category": {
    "id": "category_id",
    "name": "Mobiles",
    "slug": "mobiles"
  },
  "stock": 50,
  "rating": 4.7,
  "createdAt": "2026-04-11T10:00:00Z"
}
```

### Create Product (Admin)

**POST** `/products`

Create a new product. Requires admin role.

**Required Headers:**

- `Authorization: Bearer <token>` (admin session required)

**Request Body:**

```json
{
  "name": "Product Name",
  "slug": "product-slug",
  "description": "Product description",
  "price": 99.99,
  "categoryId": "category_id",
  "images": ["https://image1.jpg", "https://image2.jpg"],
  "stock": 100
}
```

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Product",
    "slug": "new-product",
    "description": "Description here",
    "price": 99.99,
    "categoryId": "cat_123",
    "images": ["https://..."],
    "stock": 50
  }'
```

**Response:** `201 Created`

```json
{
  "id": "new_product_id",
  "name": "New Product",
  "slug": "new-product",
  "price": 99.99,
  "stock": 50
}
```

### Update Product (Admin)

**PATCH** `/products/[id]`

Update product details. Requires admin role.

**Request Body:**

```json
{
  "name": "Updated Name",
  "price": 119.99,
  "stock": 75
}
```

```bash
curl -X PATCH http://localhost:3000/api/products/product_id_1 \
  -H "Content-Type: application/json" \
  -d '{"price": 119.99, "stock": 75}'
```

**Response:**

```json
{
  "id": "product_id_1",
  "name": "Updated Name",
  "price": 119.99,
  "stock": 75
}
```

### Delete Product (Admin)

**DELETE** `/products/[id]`

Delete a product. Requires admin role.

```bash
curl -X DELETE http://localhost:3000/api/products/product_id_1
```

**Response:** `204 No Content`

---

## Cart Endpoints

### Get Cart

**GET** `/cart?userId=<user_id>`

Retrieve user's cart.

**Query Parameters:**

- `userId`: User ID (required)

```bash
curl -X GET "http://localhost:3000/api/cart?userId=user_123"
```

**Response:**

```json
{
  "id": "cart_id",
  "userId": "user_123",
  "items": [
    {
      "id": "product_id_1",
      "name": "Product 1",
      "price": 99.99,
      "quantity": 2
    }
  ],
  "updatedAt": "2026-04-11T12:00:00Z"
}
```

### Update Cart

**POST** `/cart`

Update cart items for user.

**Request Body:**

```json
{
  "userId": "user_123",
  "items": [
    {
      "id": "product_id",
      "name": "Product Name",
      "price": 99.99,
      "quantity": 2,
      "images": ["https://..."]
    }
  ]
}
```

```bash
curl -X POST http://localhost:3000/api/cart \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user_123",
    "items": [
      {
        "id": "product_1",
        "name": "Phone",
        "price": 629.99,
        "quantity": 1
      }
    ]
  }'
```

**Response:**

```json
{
  "id": "cart_id",
  "userId": "user_123",
  "items": [...],
  "updatedAt": "2026-04-11T12:05:00Z"
}
```

---

## Orders Endpoints

### List User Orders

**GET** `/orders?userId=<user_id>`

Retrieve orders for a specific user.

```bash
curl -X GET "http://localhost:3000/api/orders?userId=user_123" \
  -H "Cookie: next-auth.session-token=..."
```

**Response:**

```json
[
  {
    "id": "order_id_1",
    "userId": "user_123",
    "items": [
      {
        "id": "product_1",
        "name": "Product",
        "price": 99.99,
        "quantity": 1
      }
    ],
    "totalAmount": 99.99,
    "status": "PENDING",
    "address": "123 Main St",
    "paymentMethod": "CARD",
    "createdAt": "2026-04-11T10:00:00Z"
  }
]
```

### Create Order (Checkout)

**POST** `/orders`

Create a new order from cart.

**Request Body:**

```json
{
  "userId": "user_123",
  "items": [
    {
      "id": "product_1",
      "name": "Product",
      "price": 99.99,
      "quantity": 2
    }
  ],
  "totalAmount": 199.98,
  "address": "123 Main Street, City",
  "paymentMethod": "CARD"
}
```

```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user_123",
    "items": [...],
    "totalAmount": 199.98,
    "address": "123 Main St",
    "paymentMethod": "CARD"
  }'
```

**Response:** `201 Created`

```json
{
  "id": "order_id_new",
  "userId": "user_123",
  "items": [...],
  "totalAmount": 199.98,
  "status": "PENDING",
  "createdAt": "2026-04-11T14:00:00Z"
}
```

### List All Orders (Admin)

**GET** `/orders`

List all orders in system. Requires admin role.

```bash
curl -X GET http://localhost:3000/api/orders
```

**Response:**

```json
[
  {
    "id": "order_1",
    "userId": "user_123",
    "totalAmount": 199.98,
    "status": "PENDING",
    "createdAt": "2026-04-11T10:00:00Z"
  }
]
```

### Update Order Status (Admin)

**PATCH** `/orders/[id]`

Update order status. Requires admin role.

**Request Body:**

```json
{
  "status": "SHIPPED"
}
```

```bash
curl -X PATCH http://localhost:3000/api/orders/order_id_1 \
  -H "Content-Type: application/json" \
  -d '{"status": "SHIPPED"}'
```

**Status Options:**

- `PENDING` - Order received, awaiting processing
- `PROCESSING` - Order being prepared
- `SHIPPED` - Order sent to customer
- `DELIVERED` - Order delivered
- `CANCELLED` - Order cancelled

**Response:**

```json
{
  "id": "order_id_1",
  "status": "SHIPPED",
  "updatedAt": "2026-04-11T15:00:00Z"
}
```

### Delete Order (Admin)

**DELETE** `/orders/[id]`

Delete an order. Requires admin role.

```bash
curl -X DELETE http://localhost:3000/api/orders/order_id_1
```

**Response:** `204 No Content`

---

## Users Endpoints

### List All Users (Admin)

**GET** `/users`

Retrieve all users. Requires admin role.

```bash
curl -X GET http://localhost:3000/api/users
```

**Response:**

```json
[
  {
    "id": "user_1",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "USER",
    "image": "https://...",
    "createdAt": "2026-04-01T10:00:00Z"
  }
]
```

### Register User

**POST** `/users`

Create new user account.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

**Response:** `201 Created`

```json
{
  "id": "user_new_id",
  "email": "john@example.com"
}
```

**Error Responses:**

- `409 Conflict` - Email already in use
- `400 Bad Request` - Missing required fields

---

## Error Handling

### Standard Error Response

```json
{
  "message": "Error description",
  "status": 400,
  "code": "ERROR_CODE"
}
```

### Common HTTP Status Codes

| Status | Meaning                                  |
| ------ | ---------------------------------------- |
| 200    | OK - Request successful                  |
| 201    | Created - Resource created               |
| 204    | No Content - Resource deleted            |
| 400    | Bad Request - Invalid input              |
| 401    | Unauthorized - Not authenticated         |
| 403    | Forbidden - Insufficient permissions     |
| 404    | Not Found - Resource not found           |
| 409    | Conflict - Resource conflict (duplicate) |
| 500    | Server Error - Internal problem          |

### Example Error Response

```json
{
  "message": "Email already in use",
  "status": 409,
  "code": "EMAIL_EXISTS"
}
```

---

## Rate Limiting

API rate limits (when implemented):

- **Unauthenticated**: 100 requests/hour
- **Authenticated**: 1000 requests/hour
- **Admin**: 10000 requests/hour

---

## Pagination

Supported for list endpoints:

```bash
# Get 10 products, skip first 5
GET /api/products?take=10&skip=5

# Get next page (page 2, 20 items per page)
GET /api/products?take=20&skip=20
```

---

## Filtering

Product filtering example:

```bash
# Filter by category
GET /api/products?category=mobiles

# Combine filters
GET /api/products?category=covers&stock=true
```

---

## Client Code Examples

### JavaScript/Fetch

```javascript
// Register user
const registerUser = async (name, email, password) => {
  const response = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  return response.json();
};

// Get products
const getProducts = async () => {
  const response = await fetch("/api/products");
  return response.json();
};

// Create order
const createOrder = async (orderData) => {
  const response = await fetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });
  return response.json();
};
```

### React Hook

```javascript
const useProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  return products;
};
```

---

## Authentication Headers

Session-dependent endpoints require:

```bash
curl -X GET http://localhost:3000/api/cart?userId=user_123 \
  -H "Cookie: next-auth.session-token=<token>"
```

Or use NextAuth's hooks:

```javascript
const { data: session } = useSession();
// session.user available for logged-in users
```

---

## Webhook Ready

Endpoints support webhook notifications for:

- Order status updates
- Payment confirmations
- Inventory changes

(Configure in dashboard settings when implemented)
