import {expect} from 'chai';
import 'mocha';
import CollisionDetector from "../../../../src/shared/game/geometry/collision-detector";
import Vector2 from "../../../../src/shared/data/vector2";
import Box from "../../../../src/shared/game/geometry/shapes/box";
import Circle from "../../../../src/shared/game/geometry/shapes/circle";

const FLOAT_TOLERANCE: number = 10E-6;

describe('CollisionDetector', () => {
    describe('collideBoxCircle', () => {
        it('should return (-1;0)', () => {
            const box: Box = new Box(new Vector2(0, 0), new Vector2(10, 10));
            const circle: Circle = new Circle(new Vector2(19, 0), 10);
            const penetration: Vector2 = CollisionDetector.collideBoxCircle(box, circle);
            expect(penetration.x).to.closeTo(-1, FLOAT_TOLERANCE);
            expect(penetration.y).to.closeTo(0, FLOAT_TOLERANCE);
        });
        it('should return (1;0)', () => {
            const box: Box = new Box(new Vector2(0, 0), new Vector2(10, 10));
            const circle: Circle = new Circle(new Vector2(-19, 0), 10);
            const penetration: Vector2 = CollisionDetector.collideBoxCircle(box, circle);
            expect(penetration.x).to.closeTo(1, FLOAT_TOLERANCE);
            expect(penetration.y).to.closeTo(0, FLOAT_TOLERANCE);
        });
        it('should return (0;-1)', () => {
            const box: Box = new Box(new Vector2(0, 0), new Vector2(10, 10));
            const circle: Circle = new Circle(new Vector2(0, 19), 10);
            const penetration: Vector2 = CollisionDetector.collideBoxCircle(box, circle);
            expect(penetration.x).to.closeTo(0, FLOAT_TOLERANCE);
            expect(penetration.y).to.closeTo(-1, FLOAT_TOLERANCE);
        });
        it('should return (0;1)', () => {
            const box: Box = new Box(new Vector2(0, 0), new Vector2(10, 10));
            const circle: Circle = new Circle(new Vector2(0, -19), 10);
            const penetration: Vector2 = CollisionDetector.collideBoxCircle(box, circle);
            expect(penetration.x).to.closeTo(0, FLOAT_TOLERANCE);
            expect(penetration.y).to.closeTo(1, FLOAT_TOLERANCE);
        });
    });
});