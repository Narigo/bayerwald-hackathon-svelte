<script lang="ts">
	import { base } from '$app/paths';
	import { type Participant as ParticipantT } from '$lib/types';
	let { email, extras, name, show_on_page, token, bio, team }: ParticipantT = $props();
</script>

<div
	class="bg-main-white rounded-3xl p-4 pt-0 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.2),0_10px_15px_-3px_rgba(0,0,0,0.2)] transition-shadow duration-200 hover:shadow-[0_-12px_18px_-3px_rgba(0,0,0,0.25),0_12px_18px_-3px_rgba(0,0,0,0.25)] focus:shadow-[0_-12px_18px_-3px_rgba(0,0,0,0.25),0_12px_18px_-3px_rgba(0,0,0,0.25)]"
>
	<div class="flex h-full flex-col items-center justify-between">
		<div class="flex h-full flex-col items-center">
			<div class="relative -mt-8 h-16 w-16">
				<img src="{base}/avatar.svg" alt="Avatar of {name}" />
			</div>
			<p class="text-primary text-2xl font-bold">{name}</p>
			<p class="text-primary">{team}</p>
			<p class="mx-3 my-6 text-center text-sm text-gray-500">{bio}</p>
			<ul class="flex flex-wrap justify-center gap-2">
				{#each extras.tags as tag}
					<li class="bg-primary flex items-center justify-center rounded-full px-2 py-1 text-white">
						{tag}
					</li>
				{/each}
			</ul>
			<ul class="mt-3 mb-1 flex items-center justify-center gap-2">
				{#each extras.links as { href, label }}
					<li class="not-last:before:content-[' | ']">
						<a
							{href}
							target="_blank"
							class="text-primary focus:ring-primary text-xs underline focus:ring-2 focus:outline-none"
							>{label}</a
						>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>
