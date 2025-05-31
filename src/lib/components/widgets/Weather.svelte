<script lang="ts">
	import type { WeatherReport } from '$lib/resources/weather';
	import { formatDateTimeString } from '$lib/resources/temporal';
	import Card from '../layout/Card.svelte';

	interface Props {
		weather: WeatherReport;
	}

	const { weather }: Props = $props();
</script>

<Card>
	<h3 title="Last Updated: {formatDateTimeString(weather.updated)}">Current Weather</h3>
	<p>Temperature: {weather.current.temperature.toFixed(0)} &deg;F</p>
	<p>What it's like outside: {weather.current.weather.description}</p>
</Card>
