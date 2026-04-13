# Architecture & Design Documentation

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      Frontend (Next.js + React)                 │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Material UI Components Layer                │  │
│  │   Navbar, Footer, Cards, Forms, Dialogs, etc.          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              △                                  │
│                              │                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │          State Management (Context API + Zustand)       │  │
│  │     - CartContext (local & server sync)                 │  │
│  │     - ThemeContext (light/dark mode, language)         │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              △                                  │
│                              │                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                  NextAuth Session                        │  │
│  │        Manages auth state & user context                │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              △                                  │
└──────────────────────────────┼──────────────────────────────────┘
                               │
                    ┌──────────────────┬────────────────┐
                    │                  │                │
                    ▼                  ▼                ▼
┌─────────────────────────────────────────────────────────────────┐
│              Backend (Next.js API Routes)                        │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  /api/products    /api/cart      /api/orders            │  │
│  │  /api/users       /api/auth      (CRUD & Operations)    │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Prisma ORM Layer                            │  │
│  │   - Query optimization                                   │  │
│  │   - Relationship management                             │  │
│  │   - Type safety                                         │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              NextAuth Services                           │  │
│  │   - Credentials provider                                 │  │
│  │   - OAuth providers                                      │  │
│  │   - JWT session management                              │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                               △
                               │
┌──────────────────────────────┴──────────────────────────────────┐
│              Database Layer (MongoDB + Prisma)                   │
│                                                                   │
│  Collections:                                                    │
│  - users        (with roles: USER, ADMIN)                       │
│  - products     (with categories & ratings)                      │
│  - categories   (Mobiles, Covers, Chargers)                      │
│  - carts        (per-user cart data)                             │
│  - orders       (with status tracking)                           │
│  - reviews      (product reviews & ratings)                      │
│  - accounts     (OAuth provider links)                           │
│  - sessions     (JWT session tokens)                             │
└──────────────────────────────────────────────────────────────────┘
```

---

## Data Flow Diagram

### Product Browsing Flow

```
User → Home Page
         ↓
    [Fetch Products] → API: GET /api/products
         ↓
    Prisma Query → MongoDB
         ↓
    [Display Products] → ProductCard Component
         ↓
    Click Product → Product Details Page
         ↓
    [Fetch Single] → API: GET /api/products/[id]
         ↓
    [Show Details] + [Add to Cart]
```

### Cart & Checkout Flow

```
Add to Cart → CartContext.addToCart()
     ↓
[Update Local State] + [localStorage Sync]
     ↓
Update Navbar Cart Count
     ↓
Navigate to Cart Page
     ↓
Review & Modify Items
     ↓
Click Checkout → Checkout Page
     ↓
[Enter Address & Confirm]
     ↓
API: POST /api/orders
     ↓
Prisma.order.create()
     ↓
MongoDB Insert
     ↓
Clear Cart → CartContext.clearCart()
     ↓
Redirect → User Dashboard
```

### Authentication Flow

```
Register → /auth/register page
    ↓
Submit Form → API: POST /api/users
    ↓
Hash Password with bcrypt
    ↓
Prisma.user.create()
    ↓
Redirect to Login
    ↓
Login → /auth/login page
    ↓
Submit credentials → signIn('credentials')
    ↓
NextAuth validates (bcrypt.compare)
    ↓
Generate JWT token
    ↓
Set session cookie
    ↓
Redirect → Home
    ↓
Session available in useSession()
```

---

## State Management Strategy

### Context API Usage

1. **ThemeModeContext**
   - mode: 'light' | 'dark'
   - language: 'EN' | 'AR'
   - toggleTheme()
   - toggleLanguage()
   - Persisted in localStorage

2. **CartContext**
   - cart: Product[]
   - total: number
   - addToCart(product, quantity)
   - removeFromCart(productId)
   - updateQuantity(productId, quantity)
   - clearCart()
   - Synced with localStorage

### Session Management

- NextAuth JWT strategy
- Session stored in httpOnly cookie
- useSession() hook for client access
- getServerSession() for server components
- Auto-refresh on 30-day expiration

---

## API Design Patterns

### RESTful Conventions

```
Resources: products, orders, cart, users

GET /api/products              → List all
POST /api/products             → Create
GET /api/products/[id]         → Get one
PATCH /api/products/[id]       → Update (admin)
DELETE /api/products/[id]      → Delete (admin)

GET /api/orders?userId=xxx     → Filter by user
POST /api/orders               → Create order
PATCH /api/orders/[id]         → Update status
```

### Error Handling

```javascript
// Standard error response
{
  message: "Error description",
  status: 400,
  code: "ERROR_CODE"
}

// Validation errors
{
  message: "Validation failed",
  fields: {
    email: "Invalid email format",
    password: "Must be 8+ characters"
  }
}
```

---

## Security Implementation

### Password Security

```javascript
// Registration
const hashedPassword = await bcrypt.hash(password, 10);
// Login
const match = await bcrypt.compare(password, hashedPassword);
```

### Route Protection

```javascript
// Protected server component
const session = await getServerSession(authOptions);
if (!session) redirect("/auth/login");
if (session.user.role !== "ADMIN") redirect("/");
```

### CSRF Protection

- NextAuth includes CSRF tokens
- All POST/PATCH/DELETE requests validated
- Same-site cookie policy enforced

---

## Performance Optimizations

### Frontend

1. **Image Optimization**
   - Next.js Image component
   - Responsive srcsets
   - WebP format where supported
   - Lazy loading by default

2. **Code Splitting**
   - Dynamic imports for components
   - Route-based code splitting
   - Bundle analysis with size tracking

3. **Caching**
   - Emotion CSS caching
   - localStorage for theme & cart
   - SWR/React Query ready

4. **Rendering Strategy**
   - Static generation (ISG) for products
   - 10-second revalidation
   - On-demand ISG for new products
   - SSR for auth-dependent pages

### Backend

1. **Database Queries**
   - Selective field projection
   - Relationship eager loading
   - Index optimization

2. **API Response Caching**
   - HTTP caching headers
   - Revalidation strategies
   - ETag support ready

3. **Resource Optimization**
   - Minimal payload responses
   - Pagination support ready
   - Compression middleware

---

## Scalability Considerations

### Horizontal Scaling

- Stateless API design
- JWT-based sessions (no server state)
- MongoDB cloud clustering
- Vercel serverless functions

### Database Scaling

- MongoDB Atlas auto-scaling
- Proper indexing on frequently queried fields
- Connection pooling via Prisma
- Sharding ready for large datasets

### Content Delivery

- CDN for static assets
- Image optimization
- Vercel edge caching
- API route caching

---

## Development Best Practices

### File Organization

- Feature-based directory structure
- Separation of concerns
- Reusable components
- Utility functions in lib/

### Code Quality

- ESLint configuration ready
- Prettier formatting
- TypeScript support (can be added)
- Component composition patterns

### Testing Strategy

- Unit tests for utilities
- Integration tests for APIs
- E2E tests for user flows
- Manual testing checklist

---

## Environment Configuration

### Development (.env.local)

```env
NODE_ENV=development
DATABASE_URL=mongodb_dev_url
NEXTAUTH_SECRET=dev_secret
NEXTAUTH_URL=http://localhost:3000
```

### Production (.env.production)

```env
NODE_ENV=production
DATABASE_URL=mongodb_prod_url
NEXTAUTH_SECRET=prod_secret_very_secure
NEXTAUTH_URL=https://yourdomain.com
```

---

## Deployment Checklist

- [ ] Environment variables set
- [ ] Database migrations run
- [ ] Images optimized
- [ ] Build succeeds without errors
- [ ] All routes functional
- [ ] Auth providers configured
- [ ] CORS policies set
- [ ] Security headers in place
- [ ] Monitoring configured

---

## Future Enhancements

1. **Payment Integration**
   - Stripe integration
   - Payment gateway abstraction

2. **Search & Filtering**
   - Full-text search
   - Advanced filtering
   - Faceted search

3. **Analytics**
   - User behavior tracking
   - Sales analytics
   - Inventory forecasting

4. **Email Services**
   - Order confirmation emails
   - Password reset emails
   - Newsletter system

5. **Notifications**
   - Real-time order updates
   - Push notifications
   - SMS alerts

6. **Reviews & Ratings**
   - Review moderation
   - Rating aggregation
   - Helpful votes

7. **Discounts & Coupons**
   - Coupon management
   - Seasonal discounts
   - Early bird offers
