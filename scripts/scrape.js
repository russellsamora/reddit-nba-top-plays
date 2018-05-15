import fs from 'fs';
import request from 'request';
import mkdirp from 'mkdirp';
import cheerio from 'cheerio';
import { callbackify } from 'util';
import * as d3 from 'd3';

// const BASE = 'https://old.reddit.com/r/nba/new/?';
const BASE =
  'https://old.reddit.com/r/nba/search?q=site%3Astreamable.com&restrict_sr=on&include_over_18=on&sort=top&t=month&';

const OUT_PATH = './output/scrape/';

function download(c, a, cb) {
  const url = `${BASE}count=${c}&after=${a}`;
  request(url, (err, response, body) => {
    console.log(url, response.statusCode);
    if (err) cb(err);
    else if (response.statusCode === 200) cb(null, body);
  });
}

function extractData(html) {
  const $ = cheerio.load(html);
  const output = [];
  $('.contents .search-result').each((index, el) => {
    const $el = $(el);
    const id = $el.attr('data-fullname').replace('t3_', '');
    const title = $el.find('.search-result-header').text();
    const permalink = $el.find('.search-result-header a').attr('href');
    const score = +$el
      .find('.search-score')
      .text()
      .replace(/[^0-9]/g, '');
    const num_comments = +$el
      .find('.search-comments')
      .text()
      .replace(/[^0-9]/g, '');

    const timestamp = $el.find('.search-time time').attr('datetime');
    const created_utc = Math.floor(new Date(timestamp).getTime() / 1000);
    const url = $el.find('.search-result-footer a').attr('href');

    // id, title, score, url, created_utc, num_comments;

    output.push({
      id,
      title,
      score,
      url,
      created_utc,
      num_comments
    });
  });

  const filtered = output.filter(d => d.url.includes('streamable.com'));

  return {
    data: filtered,
    id: output.length ? output[output.length - 1].id : null
  };
}

function init() {
  mkdirp.sync(OUT_PATH, err => console.log(err));

  let count = 0;
  let after = 0;
  let prev = -1;
  let output = [];
  const next = () => {
    download(count, after, (err, html) => {
      if (err) console.log(err);
      const result = extractData(html);
      // console.log(result);
      // console.log(result.id, prev);
      if (result.id) {
        prev = result.id;
        output = output.concat(...result.data);
        after = `t3_${result.id}`;
        count += 25;
        next();
      } else {
        const csv = d3.csvFormat(output);
        const timestamp = Date.now();
        fs.writeFileSync(`./output/recent-streamable-${timestamp}.csv`, csv);
      }
    });
  };

  next();
}

// function other() {
//   const file = fs.readFileSync('./output/test/8g7uft.html');
//   const $ = cheerio.load(file);

//   let last = null;

//   function getID(str) {
//     const postLink = 'https://www.reddit.com/r/nba/comments/';
//     return str.replace(postLink, '').split('/')[0];
//   }

//   $('a').each((i, e) => {
//     const href = $(e).attr('href');
//     const postLink = 'https://www.reddit.com/r/nba/comments/';
//     if (href && href.startsWith('https://streamable.com')) {
//       console.log(i, href);
//       const prev = $(e).siblings();
//       console.log(prev.attr('href'));
//     }
//     if (href && href.startsWith(postLink)) {
//       last = getID(href);
//     }
//   });

//   console.log(last);
// }

init();
// /other();
