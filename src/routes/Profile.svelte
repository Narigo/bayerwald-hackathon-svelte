<script lang="ts">
	import { base } from '$app/paths';
	import type { Participant } from '$lib/types';
	interface Props {
		user: Participant;
	}
	let { user }: Props = $props();

	let isFormOpen = $state(false);
</script>

<div>
	<button
		class="focus:outline-primary focus:bg-light-grey ml-auto flex cursor-pointer items-center focus:outline-[2px]"
		type="button"
		onclick={() => (isFormOpen = true)}>{user.name}</button
	>
	<section
		class:hidden={!isFormOpen}
		class="bg-secondary absolute top-0 right-0 bottom-0 z-10 h-screen w-full overflow-y-auto lg:w-[50vw]"
	>
		<form
			class="relative m-4 mt-16 block rounded-4xl bg-white p-4 pt-16 lg:p-8 lg:pt-24"
			method="POST"
			action="?/update"
		>
			<input type="hidden" name="email" value={user.email} />
			<input type="hidden" name="token" value={user.token} />
			<div
				class="absolute -top-8 left-1/2 h-16 w-16 translate-x-[-50%] overflow-hidden rounded-full border-[4px] border-white shadow-xl lg:h-32 lg:w-32"
			>
				<img class="w-full" src="{base}/avatar.svg" alt="user avatar" />"
			</div>
			<label class="mb-4 flex flex-col lg:mb-8">
				<div class="text-sm">Name</div>
				<input type="text" name="name" value={user.name} />
			</label>
			<label class="mb-4 flex flex-col lg:mb-8">
				<div class="text-sm">Team</div>
				<input type="text" name="team" value={user.team} />
			</label>
			<label class="mb-4 flex flex-col lg:mb-8">
				<div class="text-sm">Auf der Webseite für alle sichtbar?</div>
				<input type="checkbox" name="show_on_page" value="1" />
			</label>
			<label class="mb-4 flex flex-col lg:mb-8">
				<div class="text-sm">Stelle dich vor:</div>
				<textarea name="bio">{user.bio}</textarea>
			</label>
			<label class="mb-4 flex flex-col lg:mb-8">
				<div class="text-sm">Skills</div>
				<input type="text" name="tags" value={user.extras.tags.join(', ')} />
			</label>
			<label class="mb-4 flex flex-col lg:mb-8">
				<div class="text-sm">Social Links</div>
				<input type="text" name="links" value={user.extras.links.map((l) => l.href).join(', ')} />
			</label>
			<div class="flex flex-row items-center justify-between">
				<button
					type="button"
					class="hover:bg-primary-dark-hover hover:border-primary-darker-hover bg-primary-dark border-b-primary-darker cursor-pointer rounded border-b-[4px] border-solid px-8 py-2 text-white"
					onclick={(e) => {
						e.preventDefault();
						isFormOpen = false;
					}}>Abbrechen</button
				>
				<button
					type="submit"
					class="hover:bg-primary-hover hover:border-primary-dark-hover bg-primary border-b-primary-dark cursor-pointer rounded border-b-[4px] border-solid px-8 py-2 text-white disabled:cursor-not-allowed"
					onclick={() => (isFormOpen = false)}>Speichern</button
				>
			</div>
		</form>
	</section>
</div>
