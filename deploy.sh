#!/bin/bash
set -e  # Exit on any error

echo "=== Starting Deployment $(date) ===" >> /var/log/deploy.log

cd /var/www/tenten

# Fix ownership first
chown -R www-data:www-data /var/www/tenten

# Pull latest changes
echo "Pulling latest changes..." >> /var/log/deploy.log
git pull origin main >> /var/log/deploy.log 2>&1

# Install PHP dependencies
echo "Installing PHP dependencies..." >> /var/log/deploy.log
composer install --no-dev --optimize-autoloader >> /var/log/deploy.log 2>&1

# Clean node_modules caches to prevent corruption
echo "Cleaning node_modules caches..." >> /var/log/deploy.log
rm -rf node_modules/.cache 2>/dev/null || true
rm -rf node_modules/.vite 2>/dev/null || true

# Install Node dependencies with proper permissions
echo "Installing Node dependencies..." >> /var/log/deploy.log
npm install --unsafe-perm=true --allow-root >> /var/log/deploy.log 2>&1

# Build assets - MUST succeed or deployment fails
echo "Building assets..." >> /var/log/deploy.log
npm run build >> /var/log/deploy.log 2>&1

# Run Laravel commands
echo "Running migrations and clearing caches..." >> /var/log/deploy.log
php artisan migrate --force >> /var/log/deploy.log 2>&1
php artisan config:clear >> /var/log/deploy.log 2>&1
php artisan cache:clear >> /var/log/deploy.log 2>&1
php artisan route:clear >> /var/log/deploy.log 2>&1
php artisan view:clear >> /var/log/deploy.log 2>&1

# Fix permissions again after build
echo "Fixing permissions..." >> /var/log/deploy.log
chown -R www-data:www-data /var/www/tenten
chmod -R 755 /var/www/tenten/storage
chmod -R 755 /var/www/tenten/bootstrap/cache

echo "=== Deployment Completed $(date) ===" >> /var/log/deploy.log
