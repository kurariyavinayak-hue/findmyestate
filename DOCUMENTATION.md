# Real Estate Platform - Technical Documentation

## Project Overview

A full-stack real estate platform built with React, TypeScript, and Lovable Cloud (Supabase backend) that allows users to browse properties, sellers to list properties, and admins to manage the platform.

---

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Lovable Cloud (Supabase)
- **Authentication**: Supabase Auth
- **Database**: PostgreSQL (via Supabase)
- **Storage**: Supabase Storage
- **State Management**: React Query (@tanstack/react-query)
- **Routing**: React Router DOM
- **Theme**: next-themes (light/dark mode)

---

## File Structure

```
├── public/
│   ├── robots.txt
│   ├── favicon.ico
│   └── placeholder.svg
├── src/
│   ├── assets/              # Static images
│   │   ├── amit-shivhare.jpg
│   │   ├── aniket-agrawal.jpg
│   │   └── paras-paterya.jpg
│   ├── components/
│   │   ├── layout/          # Layout components
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── property/        # Property-specific components
│   │   │   ├── PropertyCard.tsx
│   │   │   └── PropertyFilters.tsx
│   │   ├── search/          # Search components
│   │   │   └── SearchBar.tsx
│   │   └── ui/              # shadcn/ui components (40+ components)
│   ├── context/             # React context providers
│   │   └── AuthContext.tsx
│   ├── data/                # Static/mock data
│   │   └── properties.ts
│   ├── hooks/               # Custom React hooks
│   │   ├── useProperties.ts
│   │   ├── useSearchSuggestions.ts
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── integrations/        # Third-party integrations
│   │   └── supabase/
│   │       ├── client.ts    # Supabase client (auto-generated)
│   │       └── types.ts     # Database types (auto-generated)
│   ├── lib/                 # Utility libraries
│   │   └── utils.ts
│   ├── pages/               # Application pages/routes
│   │   ├── Index.tsx
│   │   ├── Auth.tsx
│   │   ├── Properties.tsx
│   │   ├── PropertyDetails.tsx
│   │   ├── Dashboard.tsx
│   │   ├── AddProperty.tsx
│   │   ├── AdminDashboard.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   └── NotFound.tsx
│   ├── App.tsx              # Main app component with routing
│   ├── main.tsx             # Application entry point
│   ├── index.css            # Global styles & design tokens
│   └── vite-env.d.ts
├── supabase/
│   ├── config.toml          # Supabase configuration (auto-generated)
│   └── migrations/          # Database migrations
├── .env                     # Environment variables (auto-generated)
├── tailwind.config.ts       # Tailwind configuration
├── vite.config.ts           # Vite configuration
└── package.json
```

---

## Frontend Architecture

### Pages (Routes)

| Page | Route | Description |
|------|-------|-------------|
| **Index** | `/` | Landing page with hero, featured properties, testimonials |
| **Auth** | `/auth` | Login, signup, password reset |
| **Properties** | `/properties` | Property listing with filters |
| **PropertyDetails** | `/properties/:id` | Individual property details |
| **Dashboard** | `/dashboard` | User dashboard to manage own properties |
| **AddProperty** | `/add-property` | Form to list new properties |
| **AdminDashboard** | `/admin` | Admin panel to manage all properties & users |
| **About** | `/about` | Company information |
| **Contact** | `/contact` | Contact form |
| **NotFound** | `*` | 404 error page |

### Core Components

#### Layout Components
- **Header**: Navigation bar with authentication state, theme toggle
- **Footer**: Site footer with links

#### Property Components
- **PropertyCard**: Display property summary with image, price, details
- **PropertyFilters**: Filter properties by type, price, location

#### Search Components
- **SearchBar**: Search properties with suggestions

#### UI Components (shadcn/ui)
40+ reusable components including:
- Button, Card, Input, Select, Dialog, Sheet
- Table, Tabs, Accordion, Alert
- Form components with validation
- Navigation, Dropdown, Popover
- Toast notifications, Skeleton loaders

### Context & State Management

#### AuthContext
- Manages user authentication state
- Provides login, signup, logout functions
- Tracks user profile and session

### Custom Hooks

- **useProperties**: Fetch all available properties
- **useProperty**: Fetch single property by ID
- **useUserProperties**: Fetch properties for specific user
- **useSearchSuggestions**: Provide search autocomplete
- **use-mobile**: Responsive design helper
- **use-toast**: Toast notification management

---

## Backend Architecture (Lovable Cloud)

### Authentication
- Email/password authentication
- Auto-confirm email signups (configured)
- Session management with localStorage persistence
- Role-based access control (admin, user)

### Database Functions
- `has_role()`: Check user role (security definer)
- `handle_new_user()`: Create profile on user signup
- `update_updated_at_column()`: Auto-update timestamps

### Storage
- **property-images** bucket (public): Store property images

---

## Database Schema

### Tables

#### profiles
Stores user profile information
- `id` (uuid, primary key)
- `name` (text)
- `email` (text)
- `phone` (text, nullable)
- `created_at`, `updated_at` (timestamps)

**RLS Policies:**
- Users can view all profiles
- Users can insert/update their own profile

#### properties
Stores property listings
- `id` (uuid, primary key)
- `title` (text)
- `description` (text)
- `price` (numeric)
- `bedrooms` (integer)
- `bathrooms` (numeric)
- `area` (numeric)
- `property_type` (text)
- `address`, `city`, `state`, `zip_code` (text)
- `images` (text array)
- `tax_receipt_url` (text, nullable)
- `status` (text: available/pending/sold)
- `featured` (boolean)
- `seller_id` (uuid, references profiles)
- `created_at`, `updated_at` (timestamps)

**RLS Policies:**
- Public can view available properties
- Users can insert/update/delete their own properties

#### user_roles
Stores user role assignments
- `id` (uuid, primary key)
- `user_id` (uuid, references auth.users)
- `role` (enum: admin/moderator/user)
- `created_at` (timestamp)

**RLS Policies:**
- Users can view their own roles
- Admins can manage all roles

---

## Application Workflow

### User Journey

1. **Guest User**
   - Browse landing page → View featured properties
   - Search/filter properties → View property details
   - Sign up or login to list properties

2. **Authenticated User**
   - Login → Access dashboard
   - Add new property → Upload images → Submit for review
   - View/edit/delete own properties
   - View property status (available/pending/sold)
   - Promote properties (feature in development)

3. **Admin User**
   - Login → Access admin dashboard
   - View all properties with seller information
   - Approve/suspend property listings
   - View platform statistics
   - Manage users and properties

### Data Flow

```
User Action → Frontend Component → React Query Hook 
→ Supabase Client → Database/Storage 
→ RLS Policy Check → Response → UI Update
```

### Authentication Flow

```
1. User submits credentials → Auth page
2. Supabase Auth validates → Creates session
3. Trigger creates profile → Assigns 'user' role
4. AuthContext updates → User logged in
5. Protected routes accessible → Dashboard/Add Property
```

### Property Listing Flow

```
1. User navigates to Add Property page
2. Fills form (title, price, location, images, etc.)
3. Images uploaded to Supabase Storage
4. Property data saved to database
5. Status set to 'available'
6. Property appears in listings
```

### Admin Approval Flow

```
1. Admin views all properties in Admin Dashboard
2. Reviews property details and tax receipt
3. Clicks Approve → Status remains 'available'
4. Clicks Suspend → Status changes, property hidden
5. Users see updated status in their dashboard
```

---

## Security

### Row Level Security (RLS)
All tables have RLS enabled with specific policies:
- **Public access**: Only 'available' properties visible
- **User access**: Users manage only their own data
- **Admin access**: Admins have elevated permissions via role check

### Role Management
- Roles stored in separate `user_roles` table
- Server-side validation using `has_role()` function
- No client-side role storage (prevents privilege escalation)

### Authentication
- Secure session management
- Password reset functionality
- Auto-logout on token expiration

---

## Design System

### Theme Configuration
- CSS custom properties in `index.css`
- Light and dark mode support
- HSL color system for consistency
- Semantic tokens (primary, secondary, accent, etc.)

### Component Styling
- Tailwind CSS utility classes
- shadcn/ui component variants
- Responsive design breakpoints
- Consistent spacing and typography

---

## API Integration Points

All backend interactions use Supabase client:
```typescript
import { supabase } from "@/integrations/supabase/client";
```

### Key Operations
- Authentication: `supabase.auth.*`
- Database queries: `supabase.from(table).*`
- File uploads: `supabase.storage.*`
- Real-time subscriptions: `supabase.channel()*`

---

## Development Notes

### Auto-Generated Files (Do Not Edit)
- `src/integrations/supabase/client.ts`
- `src/integrations/supabase/types.ts`
- `supabase/config.toml`
- `.env`

### Environment Variables
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_PROJECT_ID`

---

## Deployment

Frontend and backend changes deploy automatically through Lovable:
- **Frontend**: Click "Update" in publish dialog
- **Backend**: Migrations and functions deploy immediately

---

## Future Enhancements

- Property promotion feature (button added, logic pending)
- Advanced search with map integration
- Property comparison tool
- Real-time chat between buyers and sellers
- Payment integration for premium listings
- Analytics dashboard for sellers
