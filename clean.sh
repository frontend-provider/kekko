#!/bin/bash
rm -rf backtest*
#Remove all "*.js~" extension file from folder and subfolder before start
find . -name "*.js~" -type f -delete
#Remove all "*.toml~" extension file from folder and subfolder before start
find . -name "*.toml~" -type f -delete
find . -name "*.json.swp" -type f -delete
find . -name ".*.json.swp" -type f -delete
find . -name "*.swp" -type f -delete
echo "*. ~  .swp Removed"

