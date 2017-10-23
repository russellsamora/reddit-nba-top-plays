#! /usr/bin/env bash
function addWeek() {
	echo "week" > .tmp/week.csv
	csvcut -c "created_utc" output/query--all-views.csv \
	| tail -n +2 \
	| while read -r a; do echo $(date -r $a +"%Y-%V"); done \
	>> .tmp/week.csv

	csvjoin output/query--all-views.csv .tmp/week.csv \
	> output/query--all-week.csv
}

	
function createWeek() {
	local WEEK="$1"
	csvgrep -c "week" -m $WEEK output/query--all-week.csv \
	| csvsort -r -c "views" \
	| head -n 31 \
	> output/week/$WEEK.csv
}

function uniqueWeeks() {
	cat .tmp/week.csv | tail -n +2 | sort | uniq \
	| while read -r a; do createWeek $a; done
}

addWeek
uniqueWeeks