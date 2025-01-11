import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const client = createClient({
  projectId: '2xky28h6', // find this in sanity.json
  dataset: 'production', // find this in sanity.json
  useCdn: false, // `false` if you want to ensure fresh data
  apiVersion: `${new Date().toISOString().split('T')[0]}`, // use current UTC date - see "specifying API version"!
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

export default client;
