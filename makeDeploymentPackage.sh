#!/bin/bash

GOOS=linux GOARCH=amd64 go build -o main
zip fun.zip main
