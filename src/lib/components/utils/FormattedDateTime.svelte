<script lang="ts">
	import { formatDateTimeString, type DateLike } from '$lib/resources/temporal';

	interface Props {
		date: DateLike;
	}

	const { date }: Props = $props();
</script>

<time>{formatDateTimeString(date)}</time>
