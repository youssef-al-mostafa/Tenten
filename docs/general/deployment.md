# Deployment

This project is deployed to production at **[ten-ten.live](https://ten-ten.live)**.

## Production Infrastructure

- **Platform:** DigitalOcean (Frankfurt datacenter - fra1)
- **Server:** 1vCPU, 1GB RAM, 25GB SSD
- **OS:** Ubuntu 22.04.5 LTS
- **Web Server:** Nginx 1.18.0
- **PHP:** 8.4.12 with Zend OPcache enabled
- **Database:** MySQL 8.0.44
- **Process Manager:** PHP-FPM

## Performance Optimizations

- **OPcache Enabled:** PHP bytecode caching for improved response times
- **MySQL 8.0:** Advanced query optimization and indexing
- **Asset Compilation:** Vite production build with minification and tree-shaking
- **Nginx Configuration:** Optimized for Laravel with proper rewrites and caching headers

## Automated Deployment

- **GitHub Webhook Integration:** Automatic deployment triggered on push to main branch
- **Zero-Downtime Deployment:** Deployment scripts ensure continuous availability during updates
- **Environment Management:** Production-specific `.env` configuration with optimized settings
- **Migration Automation:** Database migrations run automatically during deployment
