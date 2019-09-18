#!/usr/bin/env bash

# publish
cd ./dist
tar -czvf tour.tar.gz .

mkdir -p /work/fe/tour
rm -rf /work/fe/tour/*
cp tour.tar.gz /work/fe/tour
cd /work/fe/tour && tar -xvf tour.tar.gz