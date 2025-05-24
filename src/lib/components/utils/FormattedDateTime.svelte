<script lang="ts">
	import { formatDateTimeString } from '$lib/utils/date';

	interface Props {
		date: string;
	}

	const { date }: Props = $props();
</script>

<time>{formatDateTimeString(date)}</time>
