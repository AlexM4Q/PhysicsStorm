import Exportable from "./exportable";
import Importable from "./importable";
import Comparable from "./comparable";

export default interface Transferable<T> extends Exportable<T>, Comparable<T>, Importable<T> {
}