# 🛍️ E-commerce – Full-Stack Online Store

**E-commerce** is a modern, full-stack web application designed to deliver a fast, secure, and responsive online shopping experience. It combines a robust backend, a sleek frontend, and a well-structured database to offer a complete solution for browsing, filtering, and purchasing products.

---

## Overview

This application supports essential e-commerce features including user authentication, product management, shopping cart functionality, and a mock checkout process. It is built with a focus on maintainability, scalability, and usability, using modern tools and best practices.

---

## Technologies

### Frontend
- **React 18** with **TypeScript**  
- **Vite** for fast development and optimized builds  
- **Tailwind CSS** with **shadcn/ui** and **Radix UI** components  
- **Wouter** for client-side routing  
- **TanStack Query** for efficient data fetching and caching  
- **React Hook Form** with **Zod** for form management and validation  

### Backend
- **Node.js** with **Express.js** framework  
- **TypeScript** for type safety  
- **Drizzle ORM** for type-safe database queries  
- **bcrypt** for secure password hashing  
- **express-session** with PostgreSQL session storage  

### Database
- **PostgreSQL** hosted on **Neon serverless platform**  
- **Drizzle Kit** for managing database schema and migrations  

---

## Technology Overview

- **React 18 + TypeScript**: Builds a fast, scalable, and type-safe user interface for the frontend.  
- **Vite**: Provides a fast development server and optimized production builds.  
- **Tailwind CSS**: A utility-first CSS framework for rapidly creating custom and responsive designs.  
- **shadcn/ui + Radix UI**: Prebuilt, accessible UI components for consistent and polished interfaces.  
- **Wouter**: Lightweight routing library for client-side navigation in React.  
- **TanStack Query**: Handles asynchronous data fetching, caching, and state synchronization with the server.  
- **React Hook Form + Zod**: Manages form state efficiently with built-in validation schemas.  

- **Node.js + Express.js**: Backend runtime and web framework for handling HTTP requests and building APIs.  
- **TypeScript**: Adds static typing for better code quality and maintainability on both frontend and backend.  
- **Drizzle ORM**: Type-safe ORM for building SQL queries and managing the database schema.  
- **bcrypt**: Securely hashes user passwords to protect authentication data.  
- **express-session**: Middleware to manage user sessions and keep users logged in securely.  

- **PostgreSQL (Neon serverless)**: Reliable and scalable relational database for storing users, sessions, and application data.  
- **Drizzle Kit**: Tool for running database migrations and version controlling schema changes.

---

## Features

- **User Authentication:** Secure signup/login with session-based authentication  
- **Product Catalog:** Browse, search, filter, sort, and paginate products  
- **Shopping Cart:** Persistent cart stored in localStorage with real-time updates  
- **Checkout Simulation:** Mock checkout flow with order summary and success notifications  
- **Responsive UI:** Mobile-first design with dark/light theme support  
- **Accessibility:** Proper ARIA labels and keyboard navigation support  

---

## Architecture & Data Flow

### Client Side
- User interactions trigger React components and forms with validation  
- API requests managed by TanStack Query with caching and error handling  
- Cart state synchronized with localStorage for persistence  
- UI updates dynamically with loading and error states  

### Server Side
- Express handles routing, middleware, and authentication  
- Drizzle ORM generates safe SQL queries against PostgreSQL  
- Session data persisted in PostgreSQL for durability and security  

---

## Getting Started

### Prerequisites
- Node.js 20+  
- PostgreSQL database (Neon recommended)  
- pnpm package manager (or npm/yarn)

### Installation

```bash
git clone https://github.com/yourusername/ecommerce
cd ecommerce
pnpm install
pnpm dev
