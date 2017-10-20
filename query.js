const snoowrap = require("snoowrap");
const fs = require("fs");
const d3 = require("d3");

const config = require("./config");

const reddit = new snoowrap(config);

// start of season videos (oct 18, 2017)
const MIN_TIMESTAMP = 1508299200;
// start of season weeks (oct, 16, 2017)
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

function query(source) {
  return new Promise((resolve, reject) => {
    reddit
      .getSubreddit("nba")
      .search({
        query: source,
        time: "week",
        sort: "new",
        limit: 100
      })
      .then(response => {
        if (response) {
          fs.writeFileSync(
            `output/test-${source}.json`,
            JSON.stringify(response, null, 2)
          );
          const filtered = response
            .filter(d => d.url.includes(`${source}.com`))
            .filter(d => d.score > MIN_SCORE)
            .filter(d => d.created_utc > MIN_SCORE);

          const scrubbed = filtered.map(scrubPost);
          console.log(`${source}: ${scrubbed.length} posts`);
          resolve(scrubbed);
        }
      })
      .catch(reject);
  });
}

const sources = ["streamable", "gfycat"];
const queries = sources.map(query);

Promise.all(queries)
  .then(results => {
    const joined = [].concat(...results);
    const formatted = d3.csvFormat(joined);
    fs.writeFileSync(`output/${DATE}.csv`, formatted);
  })
  .catch(console.error);
