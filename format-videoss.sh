#! /usr/bin/env bash

function resize() {
	ls output/video/raw \
	| while read -r FILE; do
		local INPUT="output/video/format/$FILE"
		local OUTPUT="output/video/resize/$FILE"
		if [ ! -f $OUTPUT ]; then
			< /dev/null ffmpeg -loglevel quiet -i $INPUT -vf scale=640:-2 $OUTPUT
		fi
	done > /dev/null
}

resize