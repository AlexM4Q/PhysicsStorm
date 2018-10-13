export const mode: string = process.env.NODE_ENV;
export const isDev: boolean = mode === "development";
export const isProd: boolean = mode === "production";

export const isMobile: boolean = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);