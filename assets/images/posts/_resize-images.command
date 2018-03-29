#!/bin/sh
# Get to correct directory
mydir="$(dirname "$BASH_SOURCE")"
cd "$mydir"

PS3='Select an option: '
options=("Regenerate all" "Regenerate one post" "Quit")
select opt in "${options[@]}"
do
    case $opt in
        "Regenerate all")
            
			for folder in */ ; do

				cd "$folder"
				printf "$folder..."

				for i in square medium large; do
					if [ -d "$i" ]; then rm -Rf $i; fi
					mkdir $i
				done

				for file in *.{jpg,png}; do
					[ -f "$file" ] || break
					convert "$file" -strip -resize "150x150^^" -gravity center -crop 150x150+0+0 -quality 60 "square/$file"
					convert "$file" -strip -resize "640x480^^" -gravity center -crop 640x480+0+0 -quality 80 "medium/$file"
					convert "$file" -strip -resize 1920x1080\> -quality 80 "large/$file"
				done

				echo "done."

				cd ..

			done

            ;;
        "Regenerate one post")

			printf "Select post:\n"
			select d in */; do test -n "$d" && break; echo ">>> Invalid Selection"; done
			cd "$d"
			printf "$d..."

			for i in square medium large; do
				if [ -d "$i" ]; then rm -Rf $i; fi
				mkdir $i
			done

			shopt -s nullglob
			for file in *.jpg *.jpeg *.png; do
				[ -f "$file" ] || break
				convert "$file" -strip -resize "150x150^^" -gravity center -crop 150x150+0+0 -quality 60 "square/$file"
				convert "$file" -strip -resize "640x480^^" -gravity center -crop 640x480+0+0 -quality 80 "medium/$file"
				convert "$file" -strip -resize 1920x1080\> -quality 80 "large/$file"
			done

			echo "done."

			cd ..

            ;;
        "Quit")
            break
            ;;
        *) echo invalid option;;
    esac
done




#exec bash "$0" "$@"