#!/bin/bash
cd /home/ubuntu/main
git pull origin main
npm install
rm -rf dist 
npm run build
sudo systemctl stop nginx
sudo systemctl start nginx
