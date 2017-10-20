.PHONY: default clean reproduce

default:

clean:
	rm -r output
	mkdir output

reproduce: clean

fetch:
	mkdir -p output output/query
	./fetch-data.sh

week:
	mkdir -p output output/week
	./by-week.sh