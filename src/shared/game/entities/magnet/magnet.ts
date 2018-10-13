import RigidBody from "../../physics/rigid-body";
import Importable from "../../base/importable";
import Color from "../../../utils/color-utils";
import {RUBBER} from "../../physics/material/materials";
import Exportable from "../../base/exportable";
import Shape from "../../geometry/shapes/shape";

export default abstract class Magnet extends RigidBody implements Importable<Magnet>, Exportable<Magnet> {

    protected constructor(id: string, shape: Shape) {
        super(id, shape, RUBBER);

        this.color = Color.newColor();
    }

}