// D3 is included by globally by default
import Scrollama from 'scrollama';

const scroller = Scrollama();

let rawData = null;
const $wall = d3.select('#wall');
const $video = $wall.select('.wall__video');
const $plays = $wall.select('.wall__plays');

function resize() {
	const height = window.innerHeight;
	$video.st({ height });
	const introHeight = Math.floor(window.innerHeight * 0.89);
	d3.select('.intro').st({ height: introHeight });
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
	scroller
		.setup({
			step: '.play',
			offset: 0.9,
			debug: true,
		})
		.onStepEnter(handleStepEnter)
		.onStepExit(handleStepExit);
}

function init() {
	resize();
	d3.csv('assets/data/popular.csv', cleanData, (err, res) => {
		rawData = res;
		console.log(rawData);
		setup();
		resize();
	});
}

export default { init, resize };
