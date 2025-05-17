<script lang="ts">
	import type { Participant as ParticipantT } from '$lib/types';
	import Participant from './Participant.svelte';

	interface Props {
		participants: Array<ParticipantT>;
	}
	let { participants }: Props = $props();
</script>

<section class="grid grid-cols-[repeat(auto-fit,minmax(min-content,16rem))]">
	{#each participants as participant}
		<Participant {...participant} />
	{/each}
</section>
