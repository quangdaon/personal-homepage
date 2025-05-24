<script lang="ts">
	import type { WeatherReport } from '$lib/resources/weather';
	import Card from '../layout/Card.svelte';
	import FormattedDateTime from '../utils/FormattedDateTime.svelte';

	interface Props {
		weather: WeatherReport;
	}

	const { weather }: Props = $props();
</script>

<Card>
  <h3>Current Weather</h3>
  <p><i>Last Updated: <FormattedDateTime date={weather.updated} /></i></p>
  <p>Temperature: {weather.current.temperature.toFixed(0)} &deg;F</p>
  <p>What it's like outside: {weather.current.weather.description}</p>
</Card>