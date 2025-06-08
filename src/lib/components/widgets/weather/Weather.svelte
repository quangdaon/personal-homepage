<script lang="ts">
	import type { WeatherReport } from '$lib/resources/weather';
	import { formatDateString } from '$lib/resources/temporal';
	import Card from '../../layout/Card.svelte';
	import IconButton from '$lib/components/utils/IconButton.svelte';

	interface Props {
		weather: WeatherReport;
	}

	let { weather }: Props = $props();
	let loading = $state(false);

	const refreshWeather = async () => {
		loading = true;
		const resp = await fetch('/api/weather?bustCache=true');
		weather = await resp.json();
		loading = false;
	};
</script>

<Card>
	{#snippet title()}
		<span title="Last Updated: {formatDateString(weather.updated, 'time')}">Current Weather</span>
	{/snippet}

	{#snippet controls()}
		<IconButton {loading} label="Refresh" icon="mdi:refresh" onclick={refreshWeather} />
	{/snippet}

	<p>Temperature: {weather.current.temperature.toFixed(0)} &deg;F</p>
	<p>What it's like outside: {weather.current.weather.description}</p>
</Card>
