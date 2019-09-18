#!/usr/bin/env bash

# publish
tar -czvf tour.tar.gz .

mkdir -p /work/api/tour
rm -rf /work/api/tour/*
cp tour.tar.gz /work/api/tour
cd /work/api/tour && tar -xvf tour.tar.gz && npm --registry=https://registry.npm.taobao.org install && pm2 stop pm2.json && pm2 start pm2.json
