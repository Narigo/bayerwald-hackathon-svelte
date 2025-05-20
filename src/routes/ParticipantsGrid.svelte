<script lang="ts">
	import type { Participant as ParticipantT } from '$lib/types';
	import Participant from './Participant.svelte';

	interface Props {
		participants: Array<ParticipantT>;
	}
	let { participants }: Props = $props();
</script>

<section class="grid grid-cols-1 gap-x-4 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
	{#each participants as participant}
		<Participant {...participant} />
	{/each}
</section>
