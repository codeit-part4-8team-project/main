#!/bin/bash
cd /home/ubuntu/main
git pull origin main
sudo npm install
sudo npm run build
pm2 restart 8team-project
