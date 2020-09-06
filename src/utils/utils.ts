export type ImageFormat = "jpg" | "png" | "gif" | "webp";
export type ImageSize = 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096;
export function imageURLFormatter(
  endpoint: string,
  {
    format,
    size,
  }: {
    format?: ImageFormat;
    size?: ImageSize;
  } = {},
) {
  return `${URLs.CDN}${endpoint}.${format ??
    (endpoint.includes("_a") ? "gif" : "jpg")}${size ? `?size=${size}` : ""}`;
}

export const URLs = {
  CDN: "https://cdn.discordapp.com/",
  REST: "https://discord.com/api/v7/",
  Gateway: "wss://gateway.discord.gg/?v=6&encoding=json",
};
