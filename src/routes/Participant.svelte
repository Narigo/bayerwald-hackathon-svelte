<script lang="ts">
	import { type Participant as ParticipantT } from '$lib/types';
	let { email, extras, name, show_on_page, token, bio, team }: ParticipantT = $props();
</script>

<div class="min-w-60">
	<div>{name}</div>
	<div>{team}</div>
	<p>{bio}</p>
	<ul>
		{#each extras.tags as tag}
			<li>{tag}</li>
		{/each}
	</ul>
	<ul>
		{#each extras.links as { href, label }}
			<li><a {href}>{label}</a></li>
		{/each}
	</ul>
</div>
