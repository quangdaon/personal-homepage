<script lang="ts">
	import { formatDateTimeString } from '$lib/resources/temporal';

	interface Props {
		date: string;
	}

	const { date }: Props = $props();
</script>

<time>{formatDateTimeString(date)}</time>
