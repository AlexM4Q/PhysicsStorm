/**
 * Порт и хост для вебсокетов
 */
export const WS_PORT: number = 8081;
export const WS_HOST: string = `ws://localhost:${WS_PORT}`;

/**
 * Ширина и высота мира в пикселях
 */
export const WORLD_WIDTH: number = 1500;
export const WORLD_HEIGHT: number = 800;

/**
 * Количество пикселей в одном метре и количество метров в одном пикселе
 */
export const PPM: number = 50;
export const MPP: number = 1 / PPM;

/**
 * Интервал обновления физики
 */
export const PHYSICS_INTERVAL: number = 15;

/**
 * Ускорение свободного падения
 */
export const g: number = -9.8 * 7.5;