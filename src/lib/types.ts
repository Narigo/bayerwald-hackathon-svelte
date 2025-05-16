export type SocialLink = {
	href: string;
	label: string;
};

export type Participant = {
	name: string;
	team?: string;
	bio?: string;
	tags: Array<string>;
	links: Array<SocialLink>;
};
