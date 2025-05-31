<script lang="ts">
	import { formatDateString } from '$lib/resources/temporal';

	interface Props {
		date: string;
	}

	const { date }: Props = $props();
</script>

<time>{formatDateString(date)}</time>
