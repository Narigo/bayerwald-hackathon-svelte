<script lang="ts">
	import type { Participant as ParticipantT } from '$lib/types';
	import Participant from './Participant.svelte';

	interface Props {
		participants: Array<ParticipantT>;
	}
	let { participants }: Props = $props();
</script>

{#each participants as participant}
	<Participant {...participant} />
{/each}
