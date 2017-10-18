const snoowrap = require("snoowrap");
const fs = require("fs");
const d3 = require("d3");

const config = require("./config");

const reddit = new snoowrap(config);

// start of season (oct 18, 2017)
const MIN_TIMESTAMP = 1508299200;
const MIN_SCORE = 100;
const DATE = d3.timeFormat("%m-%d-%Y")(new Date());

function scrubPost(d) {
  const media = d.media;
  const media_title = media ? d.media.oembed.title : null;
  const media_thumbnail_width = media ? d.media.oembed.thumbnail_width : null;
  const media_thumbnail_height = media ? d.media.oembed.thumbnail_height : null;
  const media_thumbnail_url = media ? d.media.oembed.thumbnail_url : null;
  const media_width = media ? d.media.oembed.width : null;
  const media_height = media ? d.media.oembed.height : null;

  return {
    id: d.id,
    title: d.title,
    score: d.score,
    url: d.url,
    created_utc: d.created_utc,
    num_comments: d.num_comments,
    media_title,
    media_thumbnail_width,
    media_thumbnail_height,
    media_thumbnail_url,
    media_width,
    media_height
  };
}

function query() {
  reddit
    .getSubreddit("nba")
    .search({
      query: "streamable",
      time: "week",
      sort: "new",
      limit: 100
    })
    .then(response => {
      if (response) {
        // fs.writeFileSync(`output/test.json`, JSON.stringify(response, null, 2));
        const filtered = response
          .filter(d => d.url.includes("streamable.com"))
          .filter(d => d.score > MIN_SCORE)
          .filter(d => d.created_utc > MIN_SCORE);

        const scrubbed = filtered.map(scrubPost);
        const formatted = d3.csvFormat(scrubbed);
        fs.writeFileSync(`output/${DATE}.csv`, formatted);
        console.log(`${formatted.length} posts`);
        process.exit();
      }
    })
    .catch(err => {
      console.log(err);
      setTimeout(query, 2000);
    });
}

query();
