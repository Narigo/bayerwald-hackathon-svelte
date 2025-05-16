use bwh_participants;

INSERT INTO participants (
    name,
    token,
    email,
    show_on_page,
    team,
    bio,
    extras
) VALUES
('Julian Scheuchenzuber', 'abc', 'hallo@bayerwald-hackathon.de', 1, 'Level51', 'Der Julian', '{"tags":["PHP","VueJS"], "links":[{"label":"GitHub","href":"https://github.com/JZubero"}]}'),
('Jörn Bernhardt', 'def', 'hello@compose.us', 1, 'compose.us', 'Der Jörn', '{"tags":["SvelteKit","TailwindCSS","TypeScript"], "links":[{"label":"GitHub","href":"https://github.com/Narigo"},{"label":"LinkedIn","href":"https://www.linkedin.com/in/joern-bernhardt/"}]}'),
('Jörn Bernhardt 2', 'ghi', 'jb@compose.us', 0, 'compose.us', 'Anti-Jörn', '{"tags":["SvelteKit","TailwindCSS","TypeScript"], "links":[{"label":"GitHub","href":"https://github.com/Narigo"},{"label":"LinkedIn","href":"https://www.linkedin.com/in/joern-bernhardt/"}]}')
;
