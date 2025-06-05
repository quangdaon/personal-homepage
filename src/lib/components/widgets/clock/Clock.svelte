<script>
	import { currentTime } from '$lib/resources/temporal';
</script>

<div class="clock">
	<h6>{$currentTime.date}</h6>
	<h1 title={$currentTime.fullTime}>{$currentTime.time}</h1>
</div>

<style>
	.clock {
		text-align: center;
		text-shadow: 0 0 2em #000;
	}

	h1,
	h6 {
		margin: 0;
		line-height: 1;
	}

	h1 {
		font-size: 5em;
		margin-bottom: 0.0125em;
	}

	h6 {
		font-size: 1em;
		margin: 0;
	}
</style>
