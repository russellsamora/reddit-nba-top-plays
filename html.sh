#! /usr/bin/env bash

function downloadHTML() {
	csvcut -c "url" output/query--all.csv \
	| tail -n +2 \
	| wget -q -P "output/html" -i - \
	> /dev/null
}

function downloadVideo() {
	local SITE="$1"
	# get download links
	csvcut -c "url" output/query--all.csv \
	| tail -n +2 \
	| grep "$SITE" \
	| while read -r URL; do
		local FILE="${URL/https\:\/\/$SITE.com\//}"
		local FILEPATH="output/html/$FILE"
		local VIDEO=0
		local IMAGE=0
		if (( $SITE == "streamable" ))
    	then
				VIDEO=$(cat $FILEPATH | pup '#download attr{href}')
			else
				VIDEO=$(cat $FILEPATH | pup '#mp4Source attr{href}')
		fi
		wget -nc -O "output/video/raw/$FILE.mp4" "https:$VIDEO"
	done \
	> /dev/null
}

function extractViewsGfycat() {
	local SITE="$1"
	echo "url,views" > .tmp/views-$SITE.csv
	csvcut -c "url" output/query--all.csv \
	| tail -n +2 \
	| grep "$SITE" \
	| while read -r URL; do
		local FILE="${URL/https\:\/\/$SITE.com\//}"
		local FILEPATH="output/html/$FILE"
		local VISITS=0
		local VIEWS=0
		local VIEWS_NUM=0
		if (( $SITE == "gfycat" ))
			then
				VISITS=$(cat $FILEPATH | pup '.total-views text{}' | sed -n 2p | sed -e 's/^[ \t]*//')
				VIEWS="${VISITS/ Total Views/}"
				VIEWS_NUM="${VIEWS//\,/}"
		fi
		echo "$URL,$VIEWS_NUM" >> .tmp/views-$SITE.csv
	done \
	> /dev/null
}

function extractViewsStreamable() {
	local SITE="$1"
	echo "url,views" > .tmp/views-$SITE.csv
	csvcut -c "url" output/query--all.csv \
	| tail -n +2 \
	| grep "$SITE" \
	| while read -r URL; do
		local FILE="${URL/https\:\/\/$SITE.com\//}"
		local FILEPATH="output/html/$FILE"
		local VISITS=$(cat $FILEPATH | pup '#visits text{}' | sed -e 's/^[ \t]*//')
		local VIEWS="${VISITS/ views/}"
		local VIEWS_NUM="${VIEWS//\,/}"
		echo "$URL,$VIEWS_NUM" >> .tmp/views-$SITE.csv
	done \
	> /dev/null
}

function joinViews() {
	csvstack .tmp/views-*.csv > .tmp/views.csv
	csvjoin -c "url" output/query--all.csv .tmp/views.csv > output/query--all-views.csv
}

# downloadHTML
# downloadVideo "streamable"
# downloadVideo "gfycat"
# extractViewsGfycat "gfycat"
# extractViewsStreamable "streamable"
joinViews

	