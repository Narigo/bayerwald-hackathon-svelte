<script lang="ts">
	import { base } from '$app/paths';
	import type { PageProps } from './$types';
	import Header from './Header.svelte';
	import ParticipantsGrid from './ParticipantsGrid.svelte';
	import SearchFilter from './SearchFilter.svelte';

	let testing = $state('');

	let { data, form }: PageProps = $props();
	const { user, participants } = data;
	console.log({ user, participants });
</script>

<div class="flex min-h-screen flex-col gap-8 p-8" style="background:url('{base}/bg.svg') no-repeat;">
	<Header {user} />
	<SearchFilter bind:searchValue={testing} />
	<ParticipantsGrid {participants} />
</div>
