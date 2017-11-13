#! /usr/bin/env bash

function downloadHTML() {
	# rm output/html/*
	csvcut -c "url" output/query--all.csv \
	| tail -n +2 \
	| wget -q -P "output/html" -i - \
	> /dev/null
}

function extractViews() {
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
		if [ $SITE == "streamable" ]
			then
				VISITS=$(cat $FILEPATH | pup '#visits text{}' | sed -e 's/^[ \t]*//')
				VIEWS="${VISITS/ views/}"
			else
				VISITS=$(cat $FILEPATH | pup '.total-views text{}' | sed -n 2p | sed -e 's/^[ \t]*//')
				VIEWS="${VISITS/ Total Views/}"
		fi
		local VIEWS_NUM="${VIEWS//\,/}"
		
		if [ -z $VIEWS_NUM ]; then VIEWS_NUM=0; fi

		echo "$URL,$VIEWS_NUM" >> .tmp/views-$SITE.csv
	done \
	> /dev/null
}

function joinViews() {
	csvstack .tmp/views-*.csv \
	| csvjoin -c "url" output/query--all.csv - \
	> output/query--all-views.csv
}

downloadHTML
extractViews "gfycat"
extractViews "streamable"
joinViews
