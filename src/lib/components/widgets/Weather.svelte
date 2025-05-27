<script lang="ts">
	import type { WeatherReport } from '$lib/resources/weather';
	import Card from '../layout/Card.svelte';
	import { formatDateTimeString } from '../../utils/date';

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
