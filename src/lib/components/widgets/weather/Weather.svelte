<script lang="ts">
	import type { WeatherReport } from '$lib/resources/weather';
	import { formatDateString } from '$lib/resources/temporal';
	import Card from '../../layout/Card.svelte';

	interface Props {
		weather: WeatherReport;
	}

	const { weather }: Props = $props();
</script>

<Card>
	{#snippet title()}
		<span title="Last Updated: {formatDateString(weather.updated, 'time')}">Current Weather</span>
	{/snippet}
	<p>Temperature: {weather.current.temperature.toFixed(0)} &deg;F</p>
	<p>What it's like outside: {weather.current.weather.description}</p>
</Card>
