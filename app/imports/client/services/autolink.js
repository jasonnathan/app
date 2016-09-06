import React from 'react';
import autolinker from 'autolinker';
import openWeb from '/imports/client/services/openWeb';

export default function autolink(source) {
    const text = autolinker.link(source, {
        replaceFn: (autolinker, match) => {
            if (match.getType() === 'url') {
                const url = match.getUrl();
                return `[link:::${url}]`;
            }
        }
    });

    var textParts = [];
    var linkRegex = /\[link:::.*?\]/g;
    text.split(linkRegex)
        .forEach((match, index) => {
            const newIndex = index * 2;
            textParts[newIndex] = <span key={newIndex} dangerouslySetInnerHTML={{__html: match}} />;
        });

    (text.match(linkRegex) || [])
        .forEach((match, index) => {
            const url = match.substr(8, match.length - 9);
            const newIndex = index * 2 + 1;
            textParts[newIndex] = <a key={newIndex} onClick={(event) => {
                event.preventDefault();
                openWeb(url);
            }}>{url}</a>;
        });

    return textParts;
};
