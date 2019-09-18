#!/usr/bin/env bash

# publish
cd ./dist
tar -czvf tour.tar.gz .

mkdir -p /work/web/tour
rm -rf /work/web/tour/*
cp tour.tar.gz /work/web/tour
cd /work/web/tour && tar -xvf tour.tar.gz