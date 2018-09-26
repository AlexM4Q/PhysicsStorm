import {MPP, PPM} from "../constants";

/**
 * Перевод пикселей в метры
 * @param pixels пиксели
 */
export function pixelsToMeters(pixels: number): number {
    return pixels * MPP;
}

/**
 * Перевод метров в пиксели
 * @param meters метры
 */
export function metersToPixels(meters: number): number {
    return meters * PPM;
}