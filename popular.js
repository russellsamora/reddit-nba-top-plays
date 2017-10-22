const fs = require("fs");
const d3 = require("d3");

const data = d3.csvParse(
  fs.readFileSync("./output/query--all-views.csv", "utf-8")
);

data.forEach(d => {
  d.views = +d.views;
  d.score = +d.score;
  d.num_comments = +d.num_comments;
});

const maxViews = d3.max(data, d => d.views);
const maxScore = d3.max(data, d => d.score);
const maxComments = d3.max(data, d => d.num_comments);

const scaleV = d3.scaleLinear().domain([0, maxViews]);
const scaleS = d3.scaleLinear().domain([0, maxScore]);
const scaleC = d3.scaleLinear().domain([0, maxComments]);

data.forEach(d => {
  d.popularity = scaleV(d.views) + scaleS(d.score) + scaleC(d.num_comments);
});

data.sort((a, b) => d3.descending(a.popularity, b.popularity));

const csv = d3.csvFormat(data);
fs.writeFileSync("output/query--all-popularity.csv", csv);
