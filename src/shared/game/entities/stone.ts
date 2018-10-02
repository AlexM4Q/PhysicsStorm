import Vector2 from "../../data/vector2";
import RigidBody from "../physics/rigid-body";
import {STONE} from "../physics/material/materials";
import Polygon from "../geometry/shapes/polygon";
import {decorate, injectable} from "inversify";
import EntityFactory from "./entity-factory";
import TYPES from "../../inversify.types";
import Updatable from "../base/updatable";

export default class Stone extends RigidBody implements Updatable<Stone> {

    public constructor(position: Vector2, vertices: Vector2[]) {
        super(new Polygon(position, vertices), STONE, false, true);

        this.id = EntityFactory.newGuidTyped(TYPES.Stone);
        this.color = "#555555";
    }

    public static createFrom(stone: any): Stone {
        return new Stone(
            Vector2.parse(stone._shape.position),
            stone._shape._vertices.map(Vector2.parse)
        );
    }

}

decorate(injectable(), Stone);
