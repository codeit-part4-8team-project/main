#!/bin/bash
cd /home/ubuntu/main
git pull origin main
npm install
npm run build
pm2 restart keepy-uppy
