#! /usr/bin/env bash

function thumbnail() {
	ls output/video/resize \
	| while read -r FILE; do
		local INPUT="output/video/resize/$FILE"
		local OUTFILE="${FILE/.mp4/.jpg}"
		local OUTPUT="output/img/$OUTFILE"
		if [ ! -f $OUTPUT ]; then
			< /dev/null ffmpeg \
			-i $INPUT \
			-vf 'select=eq(n\,0)' \
			-vf 'scale=320:-2' \
			-q:v 3 \
			$OUTPUT
		fi
	done > /dev/null
}

thumbnail


