export default function (url, config) {
  if (!url) {
    return '';
  }

  if (typeof url !== 'string') {
    url = url.url || '';
  }

  return url
    .replace('h_%height%,w_%width%,%wam_img_params%', config)
    .replace('%format%', 'png')
    .replace('http:', '');
}
