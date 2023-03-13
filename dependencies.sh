#!/usr/bin/env bash

yarn add cors dotenv express mongoose morgan

yarn add typescript ts-node tslint husky nodemon \
  @types/cors @types/dotenv @types/express @types/mongoose @types/morgan \
  -D

rm -rf dependencies.sh
