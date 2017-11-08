const fs = require("fs");
const d3 = require("d3");

const data = d3.csvParse(
  fs.readFileSync("./output/query--all-week.csv", "utf-8")
);

const blacklist = d3
  .csvParse(fs.readFileSync("./input/blacklist.csv", "utf-8"))
  .map(d => d.id);

const filtered = data.filter(d => !blacklist.includes(d.id));

filtered.forEach(d => {
  d.views = +d.views;
  d.score = +d.score;
  d.num_comments = +d.num_comments;
});

const maxViews = d3.max(filtered, d => d.views);
const maxScore = d3.max(filtered, d => d.score);
const maxComments = d3.max(filtered, d => d.num_comments);

const scaleV = d3.scaleLinear().domain([0, maxViews]);
const scaleS = d3.scaleLinear().domain([0, maxScore]);
const scaleC = d3.scaleLinear().domain([0, maxComments]);

filtered.forEach(d => {
  d.popularity = scaleV(d.views) + scaleS(d.score) + scaleC(d.num_comments);
});

filtered.sort((a, b) => d3.descending(a.popularity, b.popularity));

const top = filtered.slice(0, 50);

const csv = d3.csvFormat(top);
fs.writeFileSync("output/query--all-popularity.csv", csv);
