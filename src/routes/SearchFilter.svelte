<script lang="ts">
	interface Props {
		searchValue: string;
	}

	let { searchValue = $bindable() }: Props = $props();
</script>

<section class="flex gap-4">
	<label for="search-participants" class="hidden">Suche nach Name oder nach Skill</label>
	<input
		id="search-participants"
		bind:value={searchValue}
		class="grow"
		type="text"
		name="search"
		placeholder="Svelte, Docker, MariaDB"
	/>
	<button
		aria-label="Suche starten"
		class="bg-btn hover:bg-btn-hover border-b-btn-border hover:border-b-btn-border-hover rounded border-b-4 p-2"
	>
		<svg
			class="h-6 w-6"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M8.66667 0C10.9652 0 13.1696 0.913092 14.7949 2.53841C16.4202 4.16372 17.3333 6.36812 17.3333 8.66667C17.3333 10.8133 16.5467 12.7867 15.2533 14.3067L15.6133 14.6667H16.6667L23.3333 21.3333L21.3333 23.3333L14.6667 16.6667V15.6133L14.3067 15.2533C12.7338 16.5953 10.7342 17.3327 8.66667 17.3333C6.36812 17.3333 4.16372 16.4202 2.53841 14.7949C0.913092 13.1696 0 10.9652 0 8.66667C0 6.36812 0.913092 4.16372 2.53841 2.53841C4.16372 0.913092 6.36812 0 8.66667 0ZM8.66667 2.66667C5.33333 2.66667 2.66667 5.33333 2.66667 8.66667C2.66667 12 5.33333 14.6667 8.66667 14.6667C12 14.6667 14.6667 12 14.6667 8.66667C14.6667 5.33333 12 2.66667 8.66667 2.66667Z"
				fill="white"
			/>
		</svg>
	</button>
</section>
