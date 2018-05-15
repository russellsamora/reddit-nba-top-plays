.PHONY: default week

default:

week:
	mkdir -p output output/week
	./concat-results.sh
	./get-views.sh
	./by-week.sh

copy-data:
	cp ./output/recent-streamable* ~/Pudding/helpers/top-plays/input/raw