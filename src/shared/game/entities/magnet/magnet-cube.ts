import Vector2 from "../../data/vector2";
import Importable from "../../base/importable";
import Box from "../../geometry/shapes/box";
import Color from "../../../utils/color-utils";
import EntityFactory from "../../entity-factory";
import TYPES from "../../../inversify.types";
import Exportable from "../../base/exportable";
import Magnet from "./magnet";

export default class MagnetCube extends Magnet implements Importable<MagnetCube>, Exportable<MagnetCube> {

    protected constructor(id: string, position: Vector2, halfSize: Vector2) {
        super(
            id || EntityFactory.newGuidTyped(TYPES.MagnetCube),
            new Box(position, halfSize)
        );

        this.color = Color.newColor();
    }

    public static createNew(position: Vector2, halfSize: Vector2): MagnetCube {
        return new MagnetCube(undefined, position, halfSize);
    }

    public static createFrom(magnetCube: any): MagnetCube {
        return new MagnetCube(
            magnetCube._id,
            Vector2.parse(magnetCube._shape.position),
            Vector2.parse(magnetCube._shape._halfSize)
        );
    }

}
