#! /usr/bin/env bash

function getRedditToken() {
	local PASSWORD=$(< password)

	echo "getting reddit token..."

	curl \
	-X POST \
	-A "Terminal/0.1 by codenberg" \
	-d "grant_type=password&username=codenberg&password=$PASSWORD" \
	--user 'ak97h9vHuptjZw:ymq7XDpVzOT4ytMzNSejASAeEq8' \
	https://www.reddit.com/api/v1/access_token \
	| jq '.access_token' \
	| awk '{ gsub(/"/, "") } 1' \
	> $PWD/token
}

function queryRedditAPI() {
	local TOKEN=$(< token)
	local TERM="$1"
	local DATE=$(date -u +"%Y-%m-%d-%H")

	echo "querying reddit for $TERM..."

	curl \
	-s \
	-H "Authorization: bearer $TOKEN" \
	-A "Terminal/0.1 by codenberg" \
	"https://oauth.reddit.com/r/nba/search?q=$TERM&limit=100&t=week&sort=new&restrict_sr=true" \
	| jq '[.data.children[]
		| .data
		| { id, title, score, url, created_utc, num_comments }
		| select(.score >= 1000 )
		| select(.created_utc >= 1508280000 )
		]' \
	| in2csv -f json > output/query/$DATE--$TERM.csv
}

function concatResults() {
	echo "concatenating all query result files..."

	csvstack output/query/*.csv \
	| csvgrep -c "url" -r "streamable|gfycat" \
	| csvsort -c score -r \
	> .tmp/query.csv

	awk -F"," '!seen[$1]++' .tmp/query.csv \
	> output/query--all.csv
}

# mute stderr for prettiness
exec 2>/dev/null

getRedditToken
queryRedditAPI "streamable"
queryRedditAPI "gfycat"
concatResults

# function unique() {
	# csvcut -c "id" .tmp/query.csv \
	# | sed 1d \
	# | uniq \
	# | awk 'NR==1{$0="id\n"$0}1' \
	# > .tmp/unique.csv
# }