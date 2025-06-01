<script lang="ts">
	import { formatDateString } from '$lib/resources/temporal';
	import type { DateFormat, DateLike } from '$lib/resources/temporal/date';

	interface Props {
		date: DateLike;
		format?: DateFormat;
	}

	const { date, format = 'date' }: Props = $props();
</script>

<time>{formatDateString(date, format)}</time>
