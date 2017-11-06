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
		local URL=""
		local VIDEO=""
		local OUTPUT="output/video/raw/$FILE.mp4"

		if [ ! -f $OUTPUT ]; then
			if [ $SITE == "streamable" ];
				then
					VIDEO=$(cat $FILEPATH | pup '#download attr{href}')
					wget -q -nc -O $OUTPUT "https:$VIDEO"
				else
					VIDEO=$(cat $FILEPATH | pup '#mp4Source attr{src}')
					curl --silent -o $OUTPUT "$VIDEO"
			fi
		fi
	done > /dev/null
}

downloadVideo "streamable"
downloadVideo "gfycat"
