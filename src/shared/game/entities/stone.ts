import Vector2 from "../data/vector2";
import RigidBody from "../physics/rigid-body";
import {STONE} from "../physics/material/materials";
import Polygon from "../geometry/shapes/polygon";
import EntityFactory from "../entity-factory";
import TYPES from "../../inversify.types";
import Importable from "../base/importable";
import Exportable from "../base/exportable";

export default class Stone extends RigidBody implements Importable<Stone>, Exportable<Stone> {

    public constructor(id: string, position: Vector2, vertices: Vector2[]) {
        super(
            id || EntityFactory.newGuidTyped(TYPES.Stone),
            new Polygon(position, vertices),
            STONE,
            false,
            true
        );

        this.color = "#555";
    }

    public static createNew(position: Vector2, vertices: Vector2[]): Stone {
        return new Stone(undefined, position, vertices);
    }

    public static createFrom(stone: any): Stone {
        return new Stone(
            stone._id,
            Vector2.parse(stone._shape.position),
            stone._shape._vertices.map(Vector2.parse)
        );
    }

}