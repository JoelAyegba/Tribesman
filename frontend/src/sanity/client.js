import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
    // Use VITE_ prefix so environment variables are exposed to the client
    projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'mock-project-id',
    dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
    useCdn: true,
    apiVersion: '2023-05-03',
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
    if (!source) return '';
    return builder.image(source);
}
