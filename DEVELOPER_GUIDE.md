# Developer Guide

## Quick Start

### 1. Clone & Setup

```bash
# Navigate to project
cd '/home/hamza/My Folder/Programming/My projects/E-commerce Wth Ai chat'

# Install dependencies
npm install --legacy-peer-deps

# Setup environment
cp .env.example .env.local
# Edit .env.local with your credentials
```

### 2. Database Setup

```bash
# Initialize Prisma
npm run db:push

# Seed with sample data
npm run db:seed
```

### 3. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## Project Tour

### Understanding the Folder Structure

#### `/app` - Next.js App Router

**Routes Structure:**

```
app/
├── page.js                    # Home page (/)
├── products/page.js           # All products (/products)
├── product/[productId]/page.js # Product details (/product/:id)
├── cart/page.js               # Shopping cart (/cart)
├── checkout/page.js           # Checkout (/checkout)
├── auth/
│   ├── login/page.js          # Login (/auth/login)
│   └── register/page.js       # Register (/auth/register)
├── categories/
│   ├── mobiles/page.js        # Mobiles category
│   ├── covers/page.js         # Covers category
│   └── chargers/page.js       # Chargers category
├── dashboard/
│   ├── user/page.js           # User dashboard
│   └── admin/page.js          # Admin dashboard
├── api/                       # Route handlers
│   ├── auth/[...nextauth]/   # NextAuth handlers
│   ├── products/             # Product API
│   ├── cart/                 # Cart API
│   ├── orders/               # Orders API
│   └── users/                # Users API
└── layout.js                  # Root layout
```

#### `/components` - Reusable Components

```
components/
├── layout/
│   ├── Navbar.js             # Navigation bar
│   ├── Footer.js             # Footer
│   ├── ThemeRegistry.js      # Theme provider wrapper
│   └── ContainerLayout.js    # Container wrapper
├── admin/
│   ├── ProductManager.js     # Manage products
│   ├── OrderManager.js       # Manage orders
│   └── UserManager.js        # Manage users
├── ProductCard.js            # Product display card
└── ProductDetailsClient.js   # Product details (client)
```

#### `/context` - State Management

```
context/
├── ThemeContext.js           # Theme & language state
└── CartContext.js            # Shopping cart state
```

#### `/lib` - Utilities & Config

```
lib/
├── prisma.js                 # Prisma client
├── auth.js                   # NextAuth config
├── getServerSession.js       # Session helper
└── createEmotionCache.js     # Emotion SSR cache
```

#### `/prisma` - Database

```
prisma/
├── schema.prisma             # Data models
└── seed.js                   # Seed script
```

---

## Common Development Tasks

### Creating a New Page

**Step 1:** Create directory

```bash
mkdir -p app/newpage
```

**Step 2:** Create page.js

```javascript
import ContainerLayout from "@/components/layout/ContainerLayout";
import Typography from "@mui/material/Typography";

export default function NewPage() {
  return (
    <ContainerLayout>
      <Typography variant="h4">New Page</Typography>
    </ContainerLayout>
  );
}
```

**Step 3:** Add route to Navbar

```javascript
// components/layout/Navbar.js
const navLinks = [
  // ... existing links
  { label: "New Page", href: "/newpage" },
];
```

### Creating an API Endpoint

**Step 1:** Create route file

```bash
touch app/api/newendpoint/route.js
```

**Step 2:** Implement handlers

```javascript
import prisma from "@/lib/prisma";

export async function GET(request) {
  const data = await prisma.yourModel.findMany();
  return new Response(JSON.stringify(data), { status: 200 });
}

export async function POST(request) {
  const body = await request.json();
  const created = await prisma.yourModel.create({ data: body });
  return new Response(JSON.stringify(created), { status: 201 });
}
```

### Adding a New Prisma Model

**Step 1:** Update schema.prisma

```prisma
model YourModel {
  id        String   @id @map("_id") @default(auto()) @db.ObjectId
  name      String
  email     String   @unique
  createdAt DateTime @default(now())
}
```

**Step 2:** Push changes

```bash
npm run db:push
```

**Step 3:** Use in code

```javascript
const items = await prisma.yourModel.findMany();
```

### Creating a Client Component

Ensure it has `"use client"` at top:

```javascript
"use client";

import { useState, useEffect } from "react";
import Button from "@mui/material/Button";

export default function YourComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Client-side effects
  }, []);

  return <Button>Click me</Button>;
}
```

### Protecting Routes

**Server Component Protection:**

```javascript
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

  return <div>Admin only content</div>;
}
```

### Using Cart Context

```javascript
"use client";

import { useContext } from "react";
import { CartContext } from "@/context/CartContext";

export default function AddToCartButton({ product }) {
  const { addToCart } = useContext(CartContext);

  return <Button onClick={() => addToCart(product, 1)}>Add to Cart</Button>;
}
```

### Using Session

```javascript
"use client";

import { useSession } from "next-auth/react";

export default function UserProfile() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;
  if (!session) return <div>Not signed in</div>;

  return <div>Welcome, {session.user.name}</div>;
}
```

---

## Testing Guide

### Manual Testing Checklist

#### User Features

- [ ] Browse home page
- [ ] View all products
- [ ] Filter by category
- [ ] View product details
- [ ] Add item to cart
- [ ] Update cart quantities
- [ ] Remove from cart
- [ ] Proceed to checkout
- [ ] Register new account
- [ ] Login with credentials
- [ ] View user dashboard
- [ ] Toggle dark/light mode
- [ ] Change language (EN/AR)
- [ ] Logout

#### Admin Features

- [ ] Login as admin
- [ ] View admin dashboard
- [ ] See stats (orders, revenue, users, products)
- [ ] Add new product
- [ ] List all products
- [ ] View product details
- [ ] Update product
- [ ] Delete product
- [ ] View all orders
- [ ] Update order status
- [ ] View all users

### Test Data

**Admin Credentials:**

```
Email: admin@store.com
Password: Admin@123
```

**Sample Products:**

1. Nova Smart Phone - $629.99
2. Protective Case - $24.95
3. Fast Charge Adapter - $34.50

---

## Troubleshooting

### Common Issues

#### 1. "Cannot find module '@/components'"

**Solution:** Check jsconfig.json has correct paths

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

#### 2. "Database connection refused"

**Solution:**

- Check DATABASE_URL in .env.local
- Verify MongoDB server running
- Confirm IP whitelist in MongoDB Atlas

```bash
# Test connection
npm run db:push
```

#### 3. "NextAuth session undefined"

**Solution:**

- Ensure SessionProvider wraps app
- Check NEXTAUTH_SECRET is set
- Verify nextauth config exports correctly

```javascript
// app/layout.js
<ThemeRegistry>
  <CartProvider>{children}</CartProvider>
</ThemeRegistry>
```

#### 4. "Port 3000 already in use"

**Solution:**

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

#### 5. "Images not loading"

**Solution:**

- Check image URLs are valid
- Verify next.config.js remotePatterns
- Use Next.js Image component

```javascript
import Image from "next/image";

<Image src={url} alt="text" width={300} height={300} />;
```

#### 6. "Prisma relation errors"

**Solution:** Regenerate Prisma client

```bash
npx prisma generate
npm run db:push
```

#### 7. "CSS styles not applying"

**Solution:**

- Verifi Emotion cache setup
- Check MUI theme provider wraps components
- Check CSS imports in layout

```javascript
import "./globals.css";
```

---

## Debugging

### Enable Console Logging

```javascript
// API routes
console.log("Request body:", body);
console.log("Query params:", request.url);

// Components
console.log("State change:", newState);
```

### Use React DevTools

1. Install React DevTools browser extension
2. Inspect component props and state
3. Check re-render reasons

### Use NextAuth Debug

```env
NEXTAUTH_DEBUG=true
```

### Use Prisma Studio

```bash
npx prisma studio
```

Opens visual database browser at http://localhost:5555

---

## Performance Tips

### Optimize Images

```javascript
import Image from "next/image";

export default function ProductImage({ src, alt }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={400}
      height={400}
      priority={false}
      quality={80}
    />
  );
}
```

### Use Revalidation

```javascript
// ISG with revalidation
export const revalidate = 10; // 10 seconds

export default async function Page() {
  const data = await fetch(...);
  return <div>{data}</div>;
}
```

### Memoize Components

```javascript
import { memo } from "react";

const ProductCard = memo(({ product }) => {
  return <Card>{product.name}</Card>;
});

export default ProductCard;
```

### Code Splitting

```javascript
import dynamic from "next/dynamic";

const HeavyComponent = dynamic(() => import("@/components/Heavy"), {
  loading: () => <Skeleton />,
});
```

---

## Deployment

### Deploy to Vercel

```bash
# Push to GitHub
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/repo.git
git push -u origin main

# Connect on Vercel
# 1. Go to vercel.com
# 2. Import GitHub repo
# 3. Set environment variables
# 4. Deploy
```

### Docker Deployment

**Create Dockerfile:**

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

**Build and run:**

```bash
docker build -t ecommerce-app .
docker run -p 3000:3000 ecommerce-app
```

---

## Environment Variables Reference

```env
# Database
DATABASE_URL=mongodb+srv://user:pass@cluster.mongodb.net/db

# NextAuth
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3000

# OAuth
GOOGLE_CLIENT_ID=your-id
GOOGLE_CLIENT_SECRET=your-secret
FACEBOOK_CLIENT_ID=your-id
FACEBOOK_CLIENT_SECRET=your-secret

# Node
NODE_ENV=development
```

---

## Additional Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Material UI Docs](https://mui.com)
- [Prisma Docs](https://www.prisma.io/docs)
- [NextAuth Docs](https://next-auth.js.org)
- [MongoDB Docs](https://docs.mongodb.com)

---

## Getting Help

1. Check error logs in terminal
2. Review troubleshooting section
3. Check API_REFERENCE.md
4. Check ARCHITECTURE.md
5. Review component examples
6. Enable debug mode for more info

---

Generated: April 11, 2026
Mobile E-Commerce Development Guide
