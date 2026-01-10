# Tenten

[![Laravel](https://img.shields.io/badge/Laravel-11-FF2D20.svg)](https://laravel.com/)
[![PHP](https://img.shields.io/badge/PHP-8.2+-777BB4.svg)](https://www.php.net/)
[![React](https://img.shields.io/badge/React-18-61DAFB.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![Inertia.js](https://img.shields.io/badge/Inertia.js-2.0-9553E9.svg)](https://inertiajs.com/)
[![Filament](https://img.shields.io/badge/Filament-3.x-FDAE4B.svg)](https://filamentphp.com/)
[![Spatie Permissions](https://img.shields.io/badge/Spatie-Permissions-0B4F7F.svg)](https://spatie.be/docs/laravel-permission)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF.svg)](https://vitejs.dev/)
[![License: Custom](https://img.shields.io/badge/License-Custom_MIT-yellow.svg)](LICENSE)

## Table of Contents

- [Tenten](#tenten)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Tech Stack](#tech-stack)
    - [Backend](#backend)
    - [Frontend](#frontend)
  - [Key Features](#key-features)
    - [Multi-Vendor Architecture](#multi-vendor-architecture)
    - [Payment Processing \& Payouts](#payment-processing--payouts)
    - [Role-Based Access Control](#role-based-access-control)
    - [Product Management](#product-management)
    - [Dynamic Content System](#dynamic-content-system)
    - [Category Hierarchy](#category-hierarchy)
    - [E-commerce Features](#e-commerce-features)
  - [Project Architecture](#project-architecture)
    - [Backend Structure](#backend-structure)
    - [Frontend Structure](#frontend-structure)
  - [Documentation](#documentation)
    - [Architecture](#architecture)
    - [Features](#features)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Quick Start](#quick-start)
  - [Development Workflow](#development-workflow)
    - [Code Standards](#code-standards)
  - [Deployment](#deployment)
    - [Production Infrastructure](#production-infrastructure)
    - [Performance Optimizations](#performance-optimizations)
    - [Automated Deployment](#automated-deployment)
  - [Security Features](#security-features)
  - [Important Notice](#important-notice)
  - [License](#license)
  - [Project Goals](#project-goals)
  - [Contact](#contact)

## Overview

Tenten is a comprehensive B2B2C marketplace that enables clothing stores to create vendor accounts, manage their inventory, and sell products through a unified platform. The application showcases advanced Laravel patterns, role-based access control, dynamic content management, and a modern React/TypeScript frontend with server-side rendering capabilities.

**Note:** This project contains sample data for demonstration purposes only and is not licensed for commercial or personal use. See [License](#license) section for details.

## Tech Stack

### Backend
- **Laravel 11.x** - Modern PHP framework with latest features
- **PHP 8.2+** - Typed properties, enums, attributes
- **MySQL 8.0+ / MariaDB 10.5+** - Relational database
- **Filament 3.x** - Admin panel with dynamic form generation
- **Spatie Laravel Permission** - Role-based access control (RBAC)
- **Laravel Sanctum** - API authentication
- **Inertia.js** - Modern monolith architecture
- **Stripe Connect** - Multi-vendor payment processing

### Frontend
- **React 18** - Component-based UI library
- **TypeScript 5.x** - Type-safe JavaScript
- **Inertia.js React Adapter** - SPA-like experience without API
- **Tailwind CSS 3.x** - Utility-first CSS framework
- **DaisyUI** - Component library for Tailwind
- **Vite** - Next-generation build tool
- **Headless UI** - Accessible UI components

## Key Features

### Multi-Vendor Architecture
- Vendor self-registration and onboarding
- Isolated vendor dashboards with scoped data access
- Individual product and order management per vendor
- Vendor-specific analytics and reporting
- Stripe Connect integration for automated payouts

### Payment Processing & Payouts
- **Stripe Connect Integration** - Vendors connect their own Stripe accounts for receiving payments
- **Automated Commission Calculation** - Platform fee (10%) and payment processing fees calculated automatically via webhooks
- **Split Payment Architecture** - Customer payments collected by platform, commissions deducted, remainder transferred to vendors
- **Monthly Automated Payouts** - Scheduled console command (`payout:vendors`) for batch vendor payments
- **Transaction Audit Trail** - Complete payout history stored in database with date ranges and amounts
- **Fair Fee Distribution** - Stripe processing fees split proportionally among vendors based on order value
- **Webhook Security** - Stripe webhook signature verification prevents payment fraud

### Role-Based Access Control
Four-tier permission system:
- **CLIENT** - End-user customers (browsing, purchasing)
- **VENDOR** - Store owners (product management, order fulfillment)
- **ADMIN** - Platform managers (content management, moderation)
- **MASTER_ADMIN** - System administrators (full access, configuration)

See [Role Permissions Documentation](docs/features/role-permissions.md) for detailed permission matrix.

### Product Management
- Advanced product variation system (size, color, material, etc.)
- Dynamic variation combinations with individual pricing
- Per-variation inventory tracking
- URL-based variation persistence for social sharing
- SEO-optimized product pages with meta tags
- Image management with automatic optimization

See [Product Variations Documentation](docs/features/product-variations.md) for implementation details.

### Dynamic Content System
- JSON-based page template definitions
- Filament-powered content editing interface
- Dynamic form generation from template schemas
- Repeater fields for flexible content blocks
- Template versioning and synchronization

See [Page Templates Documentation](docs/architecture/page-templates.md) for architecture details.

### Category Hierarchy
- Three-level taxonomy (Department → Category → Subcategory)
- Nested Set Model for efficient tree traversal
- Self-referential database design
- Optimized queries for category trees
- Dynamic breadcrumb generation

See [Category Structure Documentation](docs/architecture/category-structure.md) for implementation.

### E-commerce Features
- Shopping cart with session persistence
- Guest and authenticated checkout flows
- Order management system with status tracking
- Email notifications for order events
- Invoice generation

## Project Architecture

### Backend Structure
```
app/
├── Enums/              # Type-safe enumerations (Roles, OrderStatus, etc.)
├── Filament/           # Admin panel resources and pages
├── Http/
│   ├── Controllers/    # Request handlers
│   ├── Middleware/     # Request filtering and auth
│   └── Requests/       # Form validation
├── Models/             # Eloquent ORM models
├── Policies/           # Authorization policies
├── Services/           # Business logic layer
└── Providers/          # Service providers
```

### Frontend Structure
```
resources/js/
├── Components/
│   ├── App/           # Application-specific components
│   └── Core/          # Reusable UI components
├── Layouts/           # Page layouts
├── Pages/             # Inertia pages (route-based)
├── types/             # TypeScript type definitions
└── helpers.ts         # Utility functions
```

## Documentation

Comprehensive documentation is available in the `/docs` directory:

### Architecture
- [Product Category Structure](docs/architecture/category-structure.md) - Hierarchical taxonomy implementation
- [Page Template System](docs/architecture/page-templates.md) - Dynamic content management

### Features
- [Role-Based Access Control](docs/features/role-permissions.md) - Permission system and role hierarchy
- [Product Variations System](docs/features/product-variations.md) - Multi-attribute product variations

## Installation

### Prerequisites
- PHP 8.2 or higher
- Composer 2.x
- Node.js 18+ and npm/pnpm
- MySQL 8.0+ or MariaDB 10.5+

### Quick Start

1. Clone the repository
```bash
git clone <repository-url>
cd tenten
```

2. Install dependencies
```bash
composer install
npm install
```

3. Configure environment
```bash
cp .env.example .env
php artisan key:generate
```

4. Configure database in `.env` file
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=tenten
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

5. Run migrations and seeders
```bash
php artisan migrate
php artisan db:seed
```

6. Sync page templates
```bash
php artisan pages:sync-templates
```

7. Build frontend assets
```bash
npm run build
# or for development with hot reload
npm run dev
```

8. Start the development server
```bash
php artisan serve
```

## Development Workflow

### Code Standards
- **PSR-12** coding standard for PHP (enforced by Laravel Pint)
- **ESLint + Prettier** for TypeScript/React code
- Type safety required for all TypeScript code

## Deployment

This project is deployed to production at **[ten-ten.live](https://ten-ten.live)** on a DigitalOcean droplet.

### Production Infrastructure
- **Platform:** DigitalOcean (Frankfurt datacenter - fra1)
- **Server:** 1vCPU, 1GB RAM, 25GB SSD
- **OS:** Ubuntu 22.04.5 LTS
- **Web Server:** Nginx 1.18.0
- **PHP:** 8.4.12 with Zend OPcache enabled
- **Database:** MySQL 8.0.44
- **Process Manager:** PHP-FPM

### Performance Optimizations
- **OPcache Enabled:** PHP bytecode caching for improved response times
- **MySQL 8.0:** Advanced query optimization and indexing
- **Asset Compilation:** Vite production build with minification and tree-shaking
- **Nginx Configuration:** Optimized for Laravel with proper rewrites and caching headers

### Automated Deployment
- **GitHub Webhook Integration:** Automatic deployment triggered on push to main branch
- **Zero-Downtime Deployment:** Deployment scripts ensure continuous availability during updates
- **Environment Management:** Production-specific `.env` configuration with optimized settings
- **Migration Automation:** Database migrations run automatically during deployment

## Security Features

- CSRF protection on all state-changing requests
- SQL injection prevention via Eloquent ORM
- XSS protection through React's automatic escaping
- Role-based authorization on all sensitive routes
- Rate limiting on authentication endpoints
- Secure password hashing with bcrypt
- API authentication via Laravel Sanctum

## Important Notice

**This project is for demonstration and portfolio purposes only.**

- All user data, products, and transactions are fictitious
- Sample images are used for demonstration purposes
- Not intended for production deployment without significant modifications
- Not licensed for commercial or personal use
- Stripe integration uses test mode keys

## License

This project is licensed under a **modified MIT License** with additional restrictions.

While the code is open source for viewing and learning purposes, it is **NOT licensed for**:
- Commercial use
- Personal use in production environments
- Redistribution for commercial purposes
- Use of sample data in any capacity

The code may be used for:
- Educational purposes
- Portfolio demonstration
- Code review and learning
- Interview discussions

See the [LICENSE](LICENSE) file for the full license text.

## Project Goals

This project was created to demonstrate:
- Enterprise-level Laravel application architecture
- Modern React/TypeScript frontend patterns
- Advanced database design and optimization
- Security best practices
- Role-based access control implementation
- Multi-vendor marketplace architecture
- Production-ready code quality and documentation

## Contact

For questions about this project's architecture, implementation details, or collaboration opportunities, feel free to reach out.

Built by [Youssef Al Mostafa](https://linkedin.com/in/youssef-al-mostafa) | [youssefalmostafa2@gmail.com](mailto:youssefalmostafa2@gmail.com)
