# Qtezy

Qtezy is a modern, full-stack quotes platform built with Next.js that allows users to discover, share, and manage inspirational quotes. The application features user authentication, admin moderation, AI-powered quote generation, and real-time interactions.

## Tech Stack

### Frontend
- **Next.js 15.3.5** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS 4.1.11** - Utility-first CSS framework
- **Shadcn/UI** - Modern component library with Radix UI primitives
- **Framer Motion 12.23.0** - Smooth animations and interactions
- **Lucide React** - Comprehensive icon library

### Backend & Database
- **Next.js API Routes** - Serverless API endpoints
- **Neon Database** - Serverless PostgreSQL database
- **Upstash Redis** - Redis for caching and rate limiting
- **SQL** - Raw SQL queries for optimal performance

### Authentication & Authorization
- **Clerk** - Complete authentication solution with role-based access
- **Role-based permissions** - Admin and member user roles
- **Protected routes** - Middleware-based route protection

### State Management & Data Fetching
- **TanStack Query (React Query) v4** - Powerful data fetching and caching
- **React Hook Form** - Performant form handling
- **Zod** - Schema validation

### UI/UX Libraries
- **Shadcn UI** - Accessible component foundation
- **Class Variance Authority** - Type-safe component variants
- **Sonner** - Toast notifications


### Rate Limiting & Security
- **Upstash Rate Limit** - API rate limiting protection
- **Middleware** - Route protection and rate limiting
- **IP-based limiting** - Request throttling by IP address

### Styling & Animation
- **CSS Variables** - Dynamic theming support
- **Dark/Light Mode** - Complete theme switching
- **Glass morphism effects** - Modern UI aesthetics
- **Responsive design** - Mobile-first approach

## Key Features

### User Management
- **User Registration & Login** - Secure authentication via Clerk
- **Role-based Access Control** - Admin and member permissions
- **User Profiles** - Personal dashboards and quote management
- **Protected Routes** - Authentication-required areas

### Quote Management
- **Quote Creation** - Submit original or attributed quotes
- **AI Quote Generation** - Generate quotes based on topics/themes
- **Category System** - Organized quote categorization
- **Quote Moderation** - Admin approval workflow
- **Status Tracking** - Pending, approved, rejected states

### Social Features
- **Like System** - Heart-based quote appreciation
- **Social Sharing** - Twitter integration for quote sharing
- **Community Contributions** - User-generated content
- **Quote Collections** - Browse and discover quotes

### Search & Discovery
- **Advanced Search** - Text-based quote searching
- **Category Filtering** - Filter by quote categories
- **Masonry Layout** - Pinterest-style quote display
- **Infinite Scrolling** - Load more quotes on demand
- **Quote Modals** - Detailed quote view with interactions

### Admin Dashboard
- **Quote Moderation** - Approve, reject, or delete quotes
- **User Management** - Monitor user activities
- **Statistics Dashboard** - View platform analytics
- **Bulk Operations** - Manage multiple quotes efficiently
- **Data Tables** - Advanced filtering and sorting

### Performance & Security
- **Rate Limiting** - Prevent API abuse
- **Caching Strategy** - Redis-based performance optimization
- **Error Handling** - Comprehensive error management
- **Type Safety** - Full TypeScript implementation
- **SEO Optimization** - Metadata and performance optimization

### User Experience
- **Responsive Design** - Works on all device sizes
- **Dark/Light Themes** - User preference support
- **Loading States** - Smooth user feedback
- **Toast Notifications** - Real-time user feedback
- **Accessibility** - WCAG compliant components
- **Progressive Enhancement** - Works without JavaScript

### API Architecture
- **RESTful Endpoints** - Clean API design
- **Serverless Functions** - Scalable backend architecture
- **Database Optimization** - Efficient SQL queries
- **Real-time Updates** - Instant UI synchronization
- **Error Recovery** - Automatic retry mechanisms

The application combines modern web development practices with a focus on user experience, performance, and scalability. Built with production-ready technologies and following industry best practices for authentication, data management, and user interface design.