export default class AppUtils {

    public static getMode(): string {
        return process.env.NODE_ENV as string;
    }

    public static isDev(): boolean {
        return AppUtils.getMode() === "development"
    }

    public static isProd(): boolean {
        return AppUtils.getMode() === "production"
    }

}