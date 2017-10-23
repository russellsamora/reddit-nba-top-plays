#! /usr/bin/env bash

function concatResults() {
	echo "concatenating all query result files..."

	csvstack output/query/*.csv \
	| csvgrep -c "url" -r "streamable|gfycat" \
	| csvsort -c score -r \
	> .tmp/query.csv

	awk -F"," '!seen[$1]++' .tmp/query.csv \
	> output/query--all.csv
}

concatResults