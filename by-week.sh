#! /usr/bin/env bash
function addWeek() {
	echo "week" > output/week.csv
	csvcut -c "created_utc" output/query--all.csv \
	| while read -r a; do echo $(date -r 1508285853 -u +"%Y-%V"); done \
	>> output/week.csv

	csvjoin output/query--all.csv output/week.csv \
	> output/query--all-week.csv
}

	
function createWeek() {
	local WEEK="$1"
	csvgrep -c "week" -m $WEEK output/query--all-week.csv \
	| head -n 11 \
	> output/week/$WEEK.csv
}

function uniqueWeeks() {
	cat output/week.csv | tail -n +2 | sort | uniq \
	| while read -r a; do createWeek $a; done
}

addWeek
uniqueWeeks