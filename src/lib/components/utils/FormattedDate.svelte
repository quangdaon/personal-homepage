<script lang="ts">
	import { formatDateString } from '$lib/utils/date';

	interface Props {
		date: string;
	}

	const { date }: Props = $props();
</script>

<time>{formatDateString(date)}</time>
