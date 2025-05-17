import type { Participant } from '$lib/types';

export function tagsToString(tags: Participant['extras']['tags']): string {
	return tags.join(', ');
}

export function linksToString(links: Participant['extras']['links']): string {
	return links.map((link) => link.href).join(', ');
}

export function stringToTags(tagsAsString: string): Participant['extras']['tags'] {
	return tagsAsString.split(/,\s*/).filter(Boolean);
}

export function stringToLinks(linksAsString: string): Participant['extras']['links'] {
	return linksAsString.split(/,\s*/).filter(Boolean).map(getLabelAndHref);
}

function getLabelAndHref(potentialLink: string): { label: string; href: string } {
	try {
		const parsedUrl = new URL(potentialLink);
		const hostname = parsedUrl.hostname.replace(/^www\./, '');
		const domainParts = hostname.split('.');
		const label = domainParts[0].charAt(0).toUpperCase() + domainParts[0].slice(1);
		return { label, href: potentialLink };
	} catch (error) {
		console.error('Ungültige URL:', potentialLink);
		throw error;
	}
}
