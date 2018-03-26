#!/bin/sh

PS3='Sup? '
options=("Generate all", "Choose a directory")
select opt in "${options[@]}"
do
    case $opt in
        "Generate all")
        	# resizedir="USER INPUT"
			read -p "Enter directory: " resizedir

			# Get to correct directory
			mydir="$(dirname "$BASH_SOURCE")"
			cd "$mydir"

			mkdir square
			mkdir medium
			mkdir large

			for D in *; do
				for file in *; do
					 convert $file -strip -resize "100x100^^" -gravity center -crop 100x100+0+0 -quality 40 square/$file
				     convert $file -strip -resize "640x480^^" -gravity center -crop 640x480+0+0 -quality 80 medium/$file
				     convert $file -strip -resize "1600x900" -quality 90 large/$file
				done
			done
            ;;
        "Choose a directory")
            # Get to correct directory
			mydir="$(dirname "$BASH_SOURCE")"
			cd "$mydir"
			cd "$resizedir"

			mkdir square
			mkdir medium
			mkdir large

			for file in *; do
				 convert $file -strip -resize "100x100^^" -gravity center -crop 100x100+0+0 -quality 40 square/$file
			     convert $file -strip -resize "640x480^^" -gravity center -crop 640x480+0+0 -quality 80 medium/$file
			     convert $file -strip -resize "1600x900" -quality 90 large/$file
			done
            ;;
        "Quit")
            break
            ;;
        *) echo invalid option;;
    esac
done