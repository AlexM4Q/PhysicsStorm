/**
 * Порт и хост для вебсокетов
 */
export const WS_PORT: number = 8080;
export const WS_HOST: string = `ws://physics-storm-physics-storm.1d35.starter-us-east-1.openshiftapps.com:${WS_PORT}`;
// export const WS_HOST: string = `ws://localhost:${WS_PORT}`;

/**
 * Коды событий при общении вебсокетов
 */
export const WS_EVENT_CONNECT: string = "connect";
export const WS_EVENT_DISCONNECT: string = "disconnect";
export const WS_EVENT_MESSAGE: string = "m";
export const WS_EVENT_REGISTER_REQUEST: string = "rq";
export const WS_EVENT_REGISTER_RESPONSE: string = "ra";

/**
 * Ключи для разбора данных в пакетах вебсокетов
 */
export const WS_KEY_ID: string = "id";
export const WS_KEY_TIME: string = "s";
export const WS_KEY_DATA: string = "d";
export const WS_KEY_TYPE: string = "t";
export const WS_KEY_TYPE_STATE: string = "ts";
export const WS_KEY_TYPE_REMOVE: string = "tr";
export const WS_KEY_INPUT: string = "i";
export const WS_KEY_INPUT_LEFT: string = "il";
export const WS_KEY_INPUT_RIGHT: string = "ir";
export const WS_KEY_INPUT_STOP: string = "is";
export const WS_KEY_INPUT_JUMP: string = "ij";
export const WS_KEY_INPUT_CLICK: string = "ic";