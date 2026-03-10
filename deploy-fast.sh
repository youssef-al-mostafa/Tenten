#!/bin/bash
set -e  # Exit on any error

echo "=== Fast Deployment Started $(date) ===" >> /var/log/deploy-fast.log

cd /var/www/tenten

# Set PATH to include node_modules/.bin
export PATH="/var/www/tenten/node_modules/.bin:$PATH"

# Reset any local changes and force pull from origin
echo "Fetching latest changes..." >> /var/log/deploy-fast.log
git fetch origin >> /var/log/deploy-fast.log 2>&1
git reset --hard origin/main >> /var/log/deploy-fast.log 2>&1

# Clean node_modules if corrupted (prevents ENOTEMPTY errors)
echo "Cleaning node_modules..." >> /var/log/deploy-fast.log
rm -rf node_modules/.cache 2>/dev/null || true
rm -rf node_modules/.vite 2>/dev/null || true

# Install/update node dependencies (in case package.json changed)
echo "Installing dependencies..." >> /var/log/deploy-fast.log
npm install >> /var/log/deploy-fast.log 2>&1

# Rebuild assets - MUST succeed or deployment fails
echo "Building assets..." >> /var/log/deploy-fast.log
npm run build >> /var/log/deploy-fast.log 2>&1

# Clear essential caches
echo "Clearing caches..." >> /var/log/deploy-fast.log
php artisan view:clear >> /var/log/deploy-fast.log 2>&1
php artisan route:clear >> /var/log/deploy-fast.log 2>&1
php artisan config:clear >> /var/log/deploy-fast.log 2>&1

echo "=== Fast Deployment Completed $(date) ===" >> /var/log/deploy-fast.log
