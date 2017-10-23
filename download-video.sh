#! /usr/bin/env bash

function downloadVideo() {
	local SITE="$1"
	
	csvstack output/week/*.csv \
	| csvcut -c "url" \
	| tail -n +2 \
	| grep "$SITE" \
	| while read -r URL; do
		local FILE="${URL/https\:\/\/$SITE.com\//}"
		local FILEPATH="output/html/$FILE"
		local VIDEO=0
		local IMAGE=0
		if [ $SITE == "streamable" ]
    	then
				VIDEO=$(cat $FILEPATH | pup '#download attr{href}')
				wget -q -nc -O "output/video/raw/$FILE.mp4" "https:$VIDEO"
			else
				VIDEO=$(cat $FILEPATH | pup '#mp4Source attr{src}')
				curl --silent -o "output/video/raw/$FILE.mp4" "$VIDEO"
		fi
		# resize
		if [ ! -f "output/video/resize/$FILE.mp4" ]; then
			ffmpeg -loglevel panic -i "output/video/raw/$FILE.mp4" -vf scale=640:-1 "output/video/resize/$FILE.mp4"
		fi
	done \
	> /dev/null
}

downloadVideo "streamable"
downloadVideo "gfycat"