#!/bin/bash
cd /home/ubuntu/main
git pull origin main
sudo npm install
rm -rf dist 
sudo npm run build
sudo systemctl stop nginx
sudo systemctl start nginx
