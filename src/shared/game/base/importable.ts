export default interface Importable<T> {

    /**
     * Импортирует состояние объекта из входных данных
     * @param t входные данные
     */
    import(t: T): void;

}