#!/usr/bin/env bash
# exit on error
set -o errexit

cd Frontend
npm install --save react-credit-cards --legacy-peer-deps
npm run build
cd ..
cd Backend
pip install -r requirements.txt

