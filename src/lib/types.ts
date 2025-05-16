export type SocialLink = {
	href: string;
	label: string;
};

export type Participant = {
	name: string;
	email: string;
	token: string;
	show_on_page: boolean;
	team?: string;
	bio?: string;
	extras: {
		tags: Array<string>;
		links: Array<SocialLink>;
	};
};
