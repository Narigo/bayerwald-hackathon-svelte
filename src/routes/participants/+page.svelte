<script>
	import { base } from '$app/paths';
	import Header from './Header.svelte';
	import ParticipantsGrid from './ParticipantsGrid.svelte';
	import SearchFilter from './SearchFilter.svelte';

	let testing = $state('');
</script>

<div class="flex min-h-screen flex-col" style="background:url('{base}/bg.svg') no-repeat;">
	<Header />
	<SearchFilter bind:searchValue={testing} />
	<ParticipantsGrid participants={[]} />
</div>
