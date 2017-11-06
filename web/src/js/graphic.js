// D3 is included by globally by default
import Scrollama from 'scrollama';

const scroller = Scrollama();

let rawData = null;
const $wall = d3.select('#wall');
const $video = $wall.select('.wall__video');
const $plays = $wall.select('.wall__plays');

function resize() {
	const height = window.innerHeight;
	console.log(height);
	$video.st({ height });
}

function cleanData(d) {
	return {
		...d,
		score: +d.score,
		views: +d.views,
		num_comments: +d.num_comments,
		media: d.url.split('/').pop(),
	};
}

function handleStepEnter({ element, direction, index }) {
	$plays.selectAll('.play').classed('is-active', (d, i) => i === index);
	const datum = rawData[index];
	const src = `assets/video/${datum.media}.mp4`;
	$video.select('video').at({ src });
}

function handleStepExit() {}

function setup() {
	const $play = $plays.selectAll('.play').data(rawData);

	const $playEnter = $play.enter().append('div.play');

	const $p = $playEnter.append('p').text(d => d.title);
	$p.append('span').text(d => `${d3.format(',')(d.views)} views`);

	// .at('src', d => `assets/thumbnail/${d.media}.jpg`);

	// setup the instance, pass callback functions
	scroller
		.setup({
			step: '.play',
			offset: 0,
			debug: true,
		})
		.onStepEnter(handleStepEnter)
		.onStepExit(handleStepExit);

	scroller.resize();
}

function init() {
	d3.csv('assets/data/all-weeks.csv', cleanData, (err, res) => {
		rawData = res;
		console.log(rawData);
		setup();
		resize();
	});
}

export default { init, resize };
