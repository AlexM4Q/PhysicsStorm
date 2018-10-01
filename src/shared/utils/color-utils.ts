export default class Color {

    public static newColor(): string {
        return "#" + ((1 << 24) * Math.random() | 0).toString(16);
    }

}