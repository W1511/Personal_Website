export function youtubeVideoId(url: string) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/);
  return match?.[1] ?? null;
}

export function youtubeEmbedSrc(url: string) {
  const id = youtubeVideoId(url);
  if (!id) return null;
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "0",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    enablejsapi: "1",
    start: "0",
  });
  if (typeof window !== "undefined") {
    params.set("origin", window.location.origin);
  }
  return `https://www.youtube.com/embed/${id}?${params.toString()}`;
}

export const YOUTUBE_THUMB_QUALITIES = ["maxresdefault", "sddefault", "hqdefault", "mqdefault"] as const;

export type YoutubeThumbQuality = (typeof YOUTUBE_THUMB_QUALITIES)[number];

export function youtubeCoverSrc(url: string, quality: YoutubeThumbQuality = "maxresdefault") {
  const id = youtubeVideoId(url);
  if (!id) return null;
  return `https://i.ytimg.com/vi/${id}/${quality}.jpg`;
}

export function nextYoutubeThumbQuality(quality: YoutubeThumbQuality) {
  const index = YOUTUBE_THUMB_QUALITIES.indexOf(quality);
  return index >= 0 ? YOUTUBE_THUMB_QUALITIES[index + 1] ?? null : null;
}
