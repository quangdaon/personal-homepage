<script lang="ts">
	import type { WeatherReport } from '$lib/resources/weather';
	import { formatDateString } from '$lib/resources/temporal';
	import Card from '../layout/Card.svelte';

	interface Props {
		weather: WeatherReport;
	}

	const { weather }: Props = $props();
</script>

<Card>
	<h3 title="Last Updated: {formatDateString(weather.updated, 'full')}">Current Weather</h3>
	<p>Temperature: {weather.current.temperature.toFixed(0)} &deg;F</p>
	<p>What it's like outside: {weather.current.weather.description}</p>
</Card>
