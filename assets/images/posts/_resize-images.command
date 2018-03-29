#!/bin/sh
# resizedir="USER INPUT"
read -p "Enter directory: " resizedir

# Get to correct directory
mydir="$(dirname "$BASH_SOURCE")"
cd "$mydir"
cd "$resizedir"

mkdir square
mkdir medium
mkdir large

rm square/*
rm medium/*
rm large/*

for file in *.png; do
	 convert "$file" -strip -resize "150x150^^" -gravity center -crop 100x100+0+0 -quality 80 "square/$file"
     convert "$file" -strip -resize "640x480^^" -gravity center -crop 640x480+0+0 -quality 80 "medium/$file"
     convert "$file" -strip -resize "1600x900" -quality 90 "large/$file"
done

exec bash "$0" "$@"