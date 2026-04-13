# 📱 Mobile E-Commerce Web App - Setup Instructions

## Installation Overview

### Step 1: Install Dependencies

Run the following command to install all required packages:

```bash
npm install
```

If you encounter dependency conflicts, use:

```bash
npm install --legacy-peer-deps
```

### Step 2: Configure Environment Variables

Create a `.env.local` file in the root directory and update it with your credentials:

```bash
cp .env.example .env.local
```

Required environment variables:

```env
DATABASE_URL="mongodb+srv://username:password@cluster0.mongodb.net/ecommerce?retryWrites=true&w=majority"
NEXTAUTH_SECRET="your-secret-key-here-generate-with-openssl-rand-base64-32"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
FACEBOOK_CLIENT_ID="your-facebook-client-id"
FACEBOOK_CLIENT_SECRET="your-facebook-client-secret"
```

### Step 3: Setup Database

Initialize the Prisma client and sync with MongoDB:

```bash
npm run db:push
```

### Step 4: Seed Database with Initial Data

Populate the database with admin user, categories, and sample products:

```bash
npm run db:seed
```

This creates:
- Admin user: `admin@store.com` / Password: `Admin@123`
- Categories: Mobiles, Covers, Chargers
- Sample products in each category

### Step 5: Start Development Server

Launch the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏗 Project Structure

```
├── app/
│   ├── api/                          # API routes
│   │   ├── auth/[...nextauth]/       # NextAuth handlers
│   │   ├── products/                 # Product CRUD operations
│   │   ├── cart/                     # Cart management
│   │   ├── orders/                   # Order operations
│   │   └── users/                    # User management
│   ├── auth/
│   │   ├── login/                    # Login page
│   │   └── register/                 # Registration page
│   ├── categories/
│   │   ├── mobiles/                  # Mobiles category
│   │   ├── covers/                   # Covers category
│   │   └── chargers/                 # Chargers category
│   ├── product/[productId]/          # Product details page
│   ├── cart/                         # Shopping cart page
│   ├── checkout/                     # Checkout page
│   ├── dashboard/
│   │   ├── user/                     # User dashboard
│   │   └── admin/                    # Admin dashboard
│   ├── page.js                       # Home page
│   ├── products/page.js              # All products page
│   ├── layout.js                     # Root layout
│   └── globals.css                   # Global styles
├── components/
│   ├── layout/
│   │   ├── Navbar.js                 # Navigation bar
│   │   ├── Footer.js                 # Footer component
│   │   ├── ThemeRegistry.js          # Theme provider
│   │   └── ContainerLayout.js        # Container wrapper
│   ├── admin/
│   │   ├── ProductManager.js         # Manage products
│   │   ├── OrderManager.js           # Manage orders
│   │   └── UserManager.js            # Manage users
│   ├── ProductCard.js                # Product card component
│   ├── ProductDetailsClient.js       # Product details (client)
├── context/
│   ├── ThemeContext.js               # Theme & language context
│   └── CartContext.js                # Cart state management
├── lib/
│   ├── prisma.js                     # Prisma client instance
│   ├── auth.js                       # NextAuth configuration
│   ├── getServerSession.js           # Server session helper
│   └── createEmotionCache.js         # Emotion cache for SSR
├── prisma/
│   ├── schema.prisma                 # Database schema
│   └── seed.js                       # Database seeding script
├── public/                           # Static assets
├── styles/                           # Additional styles
├── package.json                      # Dependencies
├── next.config.js                    # Next.js config
├── jsconfig.json                     # JS path aliases
└── .env.example                      # Environment template
```

---

## 🔐 Authentication

### Implemented Auth Methods

1. **Credentials Provider** (Email/Password)
   - Register new account
   - Login with credentials
   - Password hashing with bcrypt

2. **OAuth Providers**
   - Google Sign-in
   - Facebook Sign-in

### User Roles

- **USER**: Regular customer
- **ADMIN**: Full access to admin dashboard

---

## 🛒 Features

### Customer Features

- ✅ Browse products by category
- ✅ View product details
- ✅ Add/remove items to cart
- ✅ Checkout and place orders
- ✅ View order history
- ✅ Dark/Light mode
- ✅ Language toggle (EN/AR support ready)

### Admin Features

- ✅ Dashboard with stats (orders, revenue, users, products)
- ✅ Manage products (CRUD)
- ✅ Manage orders (update status)
- ✅ Manage users
- ✅ Order metrics

---

## 🎨 Design System (Material UI)

### Components Used

- `AppBar` - Navigation
- `Drawer` - Mobile menu
- `Card` - Product display
- `Grid` - Responsive layout
- `TextField` - Form inputs
- `Button` - Actions
- `Rating` - Product ratings
- `Snackbar` - Notifications
- `Paper` - Container

### Theme Features

- Dark/Light mode toggle
- MUI default color palette
- Responsive design
- Mobile-first approach
- Clean, professional UI

---

## 🔧 Database Schema (Prisma)

### Models

1. **User**
   - Email authentication
   - OAuth account linking
   - Cart & Orders
   - Reviews

2. **Product**
   - Slug for URLs
   - Multiple images
   - Category relation
   - Stock management
   - Rating system

3. **Category**
   - Mobiles
   - Covers
   - Chargers

4. **Cart**
   - Per-user cart
   - JSON items array
   - Auto-updated

5. **Order**
   - Status tracking
   - Payment method
   - Items JSON
   - Shipping address

6. **Review**
   - User reviews
   - Product ratings

---

## 📡 API Endpoints

### Products
- `GET /api/products` - List all products
- `POST /api/products` - Create product (admin)
- `GET /api/products/[id]` - Get product
- `PATCH /api/products/[id]` - Update product (admin)
- `DELETE /api/products/[id]` - Delete product (admin)

### Cart
- `GET /api/cart?userId=xxx` - Get cart
- `POST /api/cart` - Update cart

### Orders
- `GET /api/orders?userId=xxx` - Get user orders
- `POST /api/orders` - Create order
- `PATCH /api/orders/[id]` - Update order status (admin)

### Users
- `GET /api/users` - List users (admin)
- `POST /api/users` - Register user

### Auth
- `POST /api/auth/signin` - Sign in
- `POST /api/auth/callback/credentials` - Credentials auth
- `GET /api/auth/session` - Get session

---

## 🚀 Build & Deployment

### Production Build

```bash
npm run build
npm start
```

### Deploy to Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables
4. Deploy

---

## 🔒 Security Considerations

- ✅ Password hashing with bcrypt
- ✅ JWT sessions
- ✅ Protected routes (admin/dashboard)
- ✅ NextAuth CSRF protection
- ✅ Secure session storage
- ✅ Environment variable isolation

---

## ⚡ Performance Optimizations

- ✅ Image optimization (Next.js Image)
- ✅ Code splitting
- ✅ Static generation with revalidation
- ✅ Database query optimization
- ✅ Lazy loading components
- ✅ Emotion CSS-in-JS caching
- ✅ Minimal re-renders with Context

---

## 🧪 Testing Credentials

**Admin Account:**
- Email: `admin@store.com`
- Password: `Admin@123`
- Role: ADMIN

---

## 📚 Technology Stack

| Technology | Version | Purpose |
|---|---|---|
| Next.js | 14.2.5 | React framework |
| React | 18.3 | UI library |
| Material UI | 5.14 | Component library |
| Prisma | 5.14 | ORM |
| MongoDB | - | Database |
| NextAuth | 4.24 | Authentication |
| Framer Motion | 11 | Animations |
| bcrypt | 5.1 | Password hashing |

---

## 🤝 Contributing

This project follows a professional development roadmap:

1. Setup ✅
2. Database Design ✅
3. Authentication ✅
4. Backend Logic ✅
5. Global State ✅
6. Layout & Components ✅
7. Pages ✅
8. UI-API Connection ✅
9. Authorization ✅
10. Performance ✅

---

## 📖 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Material UI Documentation](https://mui.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

Generated: April 11, 2026
Full Stack E-commerce Application
