import { query } from '$app/server';
import { submissionSchema } from '$lib/models';
import { error } from '@sveltejs/kit';
import { parseModsAndVips } from '$lib/utils';

const log_url = "https://logs.ivr.fi/channel/{0}/{1}/{2}/{3}";

export const generate = query(submissionSchema, async ({ channelName, targetLength, includeAts, excludeMods, excludeVips, usersName, localTime }) => {
    // first, get mods and vips (if needed)
    if (excludeMods || excludeVips) {
        let modsAndVips;
        try {
            const rawExcludeResult = await fetch(`https://betterbanned.com/en/tools/twitch-channel-chat-mods-vips`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ "s": channelName })
            });

            if (!rawExcludeResult.ok) error(500, 'Failed to fetch mods and vips');

            modsAndVips = parseModsAndVips(await rawExcludeResult.text());
        }
        catch (e) {
            error(500, 'An unexpected error occurred while fetching mods and vips');
        }
    }
    
    try {
        const response = await fetch(log_url.replace("{0}", encodeURIComponent(channelName))
            .replace("{1}", localTime.slice(0, 4))
            .replace("{2}", localTime.slice(5, 7))
            .replace("{3}", localTime.slice(8, 10)), {
            method: 'GET'
        });

        if (!response.ok) error(500, 'Failed to fetch logs');

        return response.text();
    }
    catch (e) {
        error(500, 'An unexpected error occurred while fetching logs');
    }
});