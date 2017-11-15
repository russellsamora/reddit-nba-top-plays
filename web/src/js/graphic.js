// D3 is included by globally by default
import Scrollama from 'scrollama';
import promiseWaterfall from 'promise.waterfall';

const scroller = Scrollama();

let rawData = null;
const $wall = d3.select('#wall');
const $video = $wall.select('.wall__video');
const $plays = $wall.select('.wall__plays');
const $intro = d3.select('.intro');

const BP = 800;
const INTRO_HEIGHT = 200;
let mobile = false;

function loadVideo(url) {
	return new Promise((resolve, reject) => {
		const req = new XMLHttpRequest();
		req.open('GET', url, true);
		req.responseType = 'blob';

		req.onload = function() {
			if (this.status === 200) {
				// const videoBlob = this.response;
				// const vid = URL.createObjectURL(videoBlob);
				resolve();
			}
		};

		req.onerror = function() {
			reject(this);
		};

		req.send();
	});
}

function preload() {
	const urls = rawData.map(d => `assets/resize/${d.media}.mp4`);
	const funcs = urls.map(loadVideo);
	promiseWaterfall(funcs)
		.then(() => console.log('done loading videos'))
		.catch(console.error);
}

function resize() {
	const height = window.innerHeight;
	const width = d3.select('body').node().offsetWidth;
	mobile = width < BP;
	if (!mobile) {
		$video.st({ height });
		const introHeight = Math.floor(window.innerHeight * 0.89);
		$intro.st({ height: introHeight });
	}
	scroller.resize();
}

function cleanData(d) {
	return {
		...d,
		score: +d.score,
		views: +d.views,
		week: +d.week,
		popularity: +d.popularity,
		num_comments: +d.num_comments,
		media: d.url.split('/').pop(),
	};
}

function handleStepEnter({ element, direction, index }) {
	$plays.selectAll('.play').classed('is-active', (d, i) => i === index);
	const datum = rawData[index];
	const src = `assets/resize/${datum.media}.mp4`;
	$video.select('video').at({ src });
}

function handleStepExit() {}

function setup() {
	const prop = mobile ? 'muted' : '';
	const videoHTML = `<video autoplay loop ${prop}></video>`;
	$video.select('.video__container').html(videoHTML);

	const $play = $plays.selectAll('.play').data(rawData);

	const $playEnter = $play.enter().append('div.play');

	const $p = $playEnter.append('p').text(d => d.title);
	$p.append('span').text(d => {
		const views = `${d3.format(',')(d.views)} views`;
		const score = `${d3.format(',')(d.score)} votes`;
		const comments = `${d3.format(',')(d.num_comments)} comments`;
		return `${views} | ${score} | ${comments}`;
	});

	// .at('src', d => `assets/thumbnail/${d.media}.jpg`);

	// setup the instance, pass callback functions
	const offset = mobile ? INTRO_HEIGHT / window.innerHeight : 0.9;
	scroller
		.setup({
			step: '.play',
			offset,
			debug: false,
		})
		.onStepEnter(handleStepEnter)
		.onStepExit(handleStepExit);
}

function init() {
	resize();
	d3.csv('assets/data/popular.csv', cleanData, (err, res) => {
		rawData = res;
		preload();
		setup();
		resize();
	});
}

export default { init, resize };
