const { parse } = require('node-html-parser');

function parseTelegramProfile(html) {
  const root = parse(html);

  const og = (name) =>
    root.querySelector(`meta[property="og:${name}"]`)?.getAttribute('content') ||
    root.querySelector(`meta[name="twitter:${name}"]`)?.getAttribute('content');

  const tgUrl =
    root.querySelector(`meta[property="al:ios:url"]`)?.getAttribute('content') ||
    root.querySelector(`meta[property="al:android:url"]`)?.getAttribute('content');

  const displayName = og('title');
  const bio = og('description');
  const image = og('image');

  const notFound = image?.includes('telegram.org/img/t_logo_2x.png') || false;

  return {
    exists: !notFound,
    displayName,
    bio,
    image,
    tgUrl,
  };
}

module.exports = parseTelegramProfile;
