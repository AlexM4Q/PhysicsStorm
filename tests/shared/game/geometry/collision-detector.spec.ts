import 'mocha';
import {expect} from 'chai';
import {FLOAT_TOLERANCE} from "../../../constants";
import Vector2 from "../../../../src/shared/data/vector2";
import CollisionDetector from "../../../../src/shared/game/geometry/collision-detector";
import Box from "../../../../src/shared/game/geometry/shapes/box";
import Circle from "../../../../src/shared/game/geometry/shapes/circle";

describe('CollisionDetector', () => {
    describe('collideBoxBox', () => {
        const centerBox: Box = new Box(Vector2.ZERO, new Vector2(10, 10));

        it('should return (-1;0) when box center outside right', () => {
            const box: Box = new Box(new Vector2(24, 0), new Vector2(15, 15));
            const penetration: Vector2 = CollisionDetector.collideBoxBox(box, centerBox);
            expect(penetration.x).to.closeTo(-1, FLOAT_TOLERANCE);
            expect(penetration.y).to.closeTo(0, FLOAT_TOLERANCE);
        });
        it('should return (1;0) when box center outside left', () => {
            const box: Box = new Box(new Vector2(-24, 0), new Vector2(15, 15));
            const penetration: Vector2 = CollisionDetector.collideBoxBox(box, centerBox);
            expect(penetration.x).to.closeTo(1, FLOAT_TOLERANCE);
            expect(penetration.y).to.closeTo(0, FLOAT_TOLERANCE);
        });
        it('should return (0;-1) when box center outside top', () => {
            const box: Box = new Box(new Vector2(0, 24), new Vector2(15, 15));
            const penetration: Vector2 = CollisionDetector.collideBoxBox(box, centerBox);
            expect(penetration.x).to.closeTo(0, FLOAT_TOLERANCE);
            expect(penetration.y).to.closeTo(-1, FLOAT_TOLERANCE);
        });
        it('should return (0;1) when box center outside bottom', () => {
            const box: Box = new Box(new Vector2(0, -24), new Vector2(15, 15));
            const penetration: Vector2 = CollisionDetector.collideBoxBox(box, centerBox);
            expect(penetration.x).to.closeTo(0, FLOAT_TOLERANCE);
            expect(penetration.y).to.closeTo(1, FLOAT_TOLERANCE);
        });
        it('should return (-11;0) when box center inside right', () => {
            const box: Box = new Box(new Vector2(14, 0), new Vector2(15, 15));
            const penetration: Vector2 = CollisionDetector.collideBoxBox(box, centerBox);
            expect(penetration.x).to.closeTo(-11, FLOAT_TOLERANCE);
            expect(penetration.y).to.closeTo(0, FLOAT_TOLERANCE);
        });
        it('should return (11;0) when box center inside left', () => {
            const box: Box = new Box(new Vector2(-14, 0), new Vector2(15, 15));
            const penetration: Vector2 = CollisionDetector.collideBoxBox(box, centerBox);
            expect(penetration.x).to.closeTo(11, FLOAT_TOLERANCE);
            expect(penetration.y).to.closeTo(0, FLOAT_TOLERANCE);
        });
        it('should return (0;-11) when box center inside top', () => {
            const box: Box = new Box(new Vector2(0, 14), new Vector2(15, 15));
            const penetration: Vector2 = CollisionDetector.collideBoxBox(box, centerBox);
            expect(penetration.x).to.closeTo(0, FLOAT_TOLERANCE);
            expect(penetration.y).to.closeTo(-11, FLOAT_TOLERANCE);
        });
        it('should return (0;11) when box center inside bottom', () => {
            const box: Box = new Box(new Vector2(0, -14), new Vector2(15, 15));
            const penetration: Vector2 = CollisionDetector.collideBoxBox(box, centerBox);
            expect(penetration.x).to.closeTo(0, FLOAT_TOLERANCE);
            expect(penetration.y).to.closeTo(11, FLOAT_TOLERANCE);
        });
        it('should return (-9;0) when box center outside right right top', () => {
            const box: Box = new Box(new Vector2(14, 5), new Vector2(13, 13));
            const penetration: Vector2 = CollisionDetector.collideBoxBox(box, centerBox);
            expect(penetration.x).to.closeTo(-9, FLOAT_TOLERANCE);
            expect(penetration.y).to.closeTo(0, FLOAT_TOLERANCE);
        });
        it('should return (0;-9) when box center outside left top top', () => {
            const box: Box = new Box(new Vector2(-5, 14), new Vector2(13, 13));
            const penetration: Vector2 = CollisionDetector.collideBoxBox(box, centerBox);
            expect(penetration.x).to.closeTo(0, FLOAT_TOLERANCE);
            expect(penetration.y).to.closeTo(-9, FLOAT_TOLERANCE);
        });
        it('should return (9;0) when box center outside left left bottom', () => {
            const box: Box = new Box(new Vector2(-14, 5), new Vector2(13, 13));
            const penetration: Vector2 = CollisionDetector.collideBoxBox(box, centerBox);
            expect(penetration.x).to.closeTo(9, FLOAT_TOLERANCE);
            expect(penetration.y).to.closeTo(0, FLOAT_TOLERANCE);
        });
        it('should return (0;9) when box center outside right bottom bottom', () => {
            const box: Box = new Box(new Vector2(5, -14), new Vector2(13, 13));
            const penetration: Vector2 = CollisionDetector.collideBoxBox(box, centerBox);
            expect(penetration.x).to.closeTo(0, FLOAT_TOLERANCE);
            expect(penetration.y).to.closeTo(9, FLOAT_TOLERANCE);
        });
    });
    describe('collideBoxCircle', () => {
        const centerBox: Box = new Box(Vector2.ZERO, new Vector2(10, 10));

        it('should return (1;0) when circle center outside right', () => {
            const circle: Circle = new Circle(new Vector2(24, 0), 15);
            const penetration: Vector2 = CollisionDetector.collideBoxCircle(centerBox, circle);
            expect(penetration.x).to.closeTo(1, FLOAT_TOLERANCE);
            expect(penetration.y).to.closeTo(0, FLOAT_TOLERANCE);
        });
        it('should return (-1;0) when circle center outside left', () => {
            const circle: Circle = new Circle(new Vector2(-24, 0), 15);
            const penetration: Vector2 = CollisionDetector.collideBoxCircle(centerBox, circle);
            expect(penetration.x).to.closeTo(-1, FLOAT_TOLERANCE);
            expect(penetration.y).to.closeTo(0, FLOAT_TOLERANCE);
        });
        it('should return (0;1) when circle center outside top', () => {
            const circle: Circle = new Circle(new Vector2(0, 24), 15);
            const penetration: Vector2 = CollisionDetector.collideBoxCircle(centerBox, circle);
            expect(penetration.x).to.closeTo(0, FLOAT_TOLERANCE);
            expect(penetration.y).to.closeTo(1, FLOAT_TOLERANCE);
        });
        it('should return (0;-1) when circle center outside bottom', () => {
            const circle: Circle = new Circle(new Vector2(0, -24), 15);
            const penetration: Vector2 = CollisionDetector.collideBoxCircle(centerBox, circle);
            expect(penetration.x).to.closeTo(0, FLOAT_TOLERANCE);
            expect(penetration.y).to.closeTo(-1, FLOAT_TOLERANCE);
        });
        it('should return (11;0) when circle center inside right', () => {
            const circle: Circle = new Circle(new Vector2(14, 0), 15);
            const penetration: Vector2 = CollisionDetector.collideBoxCircle(centerBox, circle);
            expect(penetration.x).to.closeTo(11, FLOAT_TOLERANCE);
            expect(penetration.y).to.closeTo(0, FLOAT_TOLERANCE);
        });
        it('should return (-11;0) when circle center inside left', () => {
            const circle: Circle = new Circle(new Vector2(-14, 0), 15);
            const penetration: Vector2 = CollisionDetector.collideBoxCircle(centerBox, circle);
            expect(penetration.x).to.closeTo(-11, FLOAT_TOLERANCE);
            expect(penetration.y).to.closeTo(0, FLOAT_TOLERANCE);
        });
        it('should return (0;11) when circle center inside top', () => {
            const circle: Circle = new Circle(new Vector2(0, 14), 15);
            const penetration: Vector2 = CollisionDetector.collideBoxCircle(centerBox, circle);
            expect(penetration.x).to.closeTo(0, FLOAT_TOLERANCE);
            expect(penetration.y).to.closeTo(11, FLOAT_TOLERANCE);
        });
        it('should return (0;-11) when circle center inside bottom', () => {
            const circle: Circle = new Circle(new Vector2(0, -14), 15);
            const penetration: Vector2 = CollisionDetector.collideBoxCircle(centerBox, circle);
            expect(penetration.x).to.closeTo(0, FLOAT_TOLERANCE);
            expect(penetration.y).to.closeTo(-11, FLOAT_TOLERANCE);
        });
        it('should return (9;0) when circle center outside right right top', () => {
            const circle: Circle = new Circle(new Vector2(14, 5), 13);
            const penetration: Vector2 = CollisionDetector.collideBoxCircle(centerBox, circle);
            expect(penetration.x).to.closeTo(9, FLOAT_TOLERANCE);
            expect(penetration.y).to.closeTo(0, FLOAT_TOLERANCE);
        });
        it('should return (0;9) when circle center outside left top top', () => {
            const circle: Circle = new Circle(new Vector2(-5, 14), 13);
            const penetration: Vector2 = CollisionDetector.collideBoxCircle(centerBox, circle);
            expect(penetration.x).to.closeTo(0, FLOAT_TOLERANCE);
            expect(penetration.y).to.closeTo(9, FLOAT_TOLERANCE);
        });
        it('should return (-9;0) when circle center outside left left bottom', () => {
            const circle: Circle = new Circle(new Vector2(-14, 5), 13);
            const penetration: Vector2 = CollisionDetector.collideBoxCircle(centerBox, circle);
            expect(penetration.x).to.closeTo(-9, FLOAT_TOLERANCE);
            expect(penetration.y).to.closeTo(0, FLOAT_TOLERANCE);
        });
        it('should return (0;-9) when circle center outside right bottom bottom', () => {
            const circle: Circle = new Circle(new Vector2(5, -14), 13);
            const penetration: Vector2 = CollisionDetector.collideBoxCircle(centerBox, circle);
            expect(penetration.x).to.closeTo(0, FLOAT_TOLERANCE);
            expect(penetration.y).to.closeTo(-9, FLOAT_TOLERANCE);
        });
    });
    describe('collideCircleCircle', () => {
        const centerCircle: Circle = new Circle(Vector2.ZERO, 10);

        it('should return (-1;0) when circle center outside right', () => {
            const circle: Circle = new Circle(new Vector2(24, 0), 15);
            const penetration: Vector2 = CollisionDetector.collideCircleCircle(circle, centerCircle);
            expect(penetration.x).to.closeTo(-1, FLOAT_TOLERANCE);
            expect(penetration.y).to.closeTo(0, FLOAT_TOLERANCE);
        });
        it('should return (1;0) when circle center outside left', () => {
            const circle: Circle = new Circle(new Vector2(-24, 0), 15);
            const penetration: Vector2 = CollisionDetector.collideCircleCircle(circle, centerCircle);
            expect(penetration.x).to.closeTo(1, FLOAT_TOLERANCE);
            expect(penetration.y).to.closeTo(0, FLOAT_TOLERANCE);
        });
        it('should return (0;-1) when circle center outside top', () => {
            const circle: Circle = new Circle(new Vector2(0, 24), 15);
            const penetration: Vector2 = CollisionDetector.collideCircleCircle(circle, centerCircle);
            expect(penetration.x).to.closeTo(0, FLOAT_TOLERANCE);
            expect(penetration.y).to.closeTo(-1, FLOAT_TOLERANCE);
        });
        it('should return (0;1) when circle center outside bottom', () => {
            const circle: Circle = new Circle(new Vector2(0, -24), 15);
            const penetration: Vector2 = CollisionDetector.collideCircleCircle(circle, centerCircle);
            expect(penetration.x).to.closeTo(0, FLOAT_TOLERANCE);
            expect(penetration.y).to.closeTo(1, FLOAT_TOLERANCE);
        });
        it('should return (-11;0) when circle center inside right', () => {
            const circle: Circle = new Circle(new Vector2(14, 0), 15);
            const penetration: Vector2 = CollisionDetector.collideCircleCircle(circle, centerCircle);
            expect(penetration.x).to.closeTo(-11, FLOAT_TOLERANCE);
            expect(penetration.y).to.closeTo(0, FLOAT_TOLERANCE);
        });
        it('should return (11;0) when circle center inside left', () => {
            const circle: Circle = new Circle(new Vector2(-14, 0), 15);
            const penetration: Vector2 = CollisionDetector.collideCircleCircle(circle, centerCircle);
            expect(penetration.x).to.closeTo(11, FLOAT_TOLERANCE);
            expect(penetration.y).to.closeTo(0, FLOAT_TOLERANCE);
        });
        it('should return (0;-11) when circle center inside top', () => {
            const circle: Circle = new Circle(new Vector2(0, 14), 15);
            const penetration: Vector2 = CollisionDetector.collideCircleCircle(circle, centerCircle);
            expect(penetration.x).to.closeTo(0, FLOAT_TOLERANCE);
            expect(penetration.y).to.closeTo(-11, FLOAT_TOLERANCE);
        });
        it('should return (0;11) when circle center inside bottom', () => {
            const circle: Circle = new Circle(new Vector2(0, -14), 15);
            const penetration: Vector2 = CollisionDetector.collideCircleCircle(circle, centerCircle);
            expect(penetration.x).to.closeTo(0, FLOAT_TOLERANCE);
            expect(penetration.y).to.closeTo(11, FLOAT_TOLERANCE);
        });
        it('should return (-12;-9) when circle center inside right right top', () => {
            const circle: Circle = new Circle(new Vector2(4, 3), 10);
            const penetration: Vector2 = CollisionDetector.collideCircleCircle(circle, centerCircle);
            expect(penetration.x).to.closeTo(-12, FLOAT_TOLERANCE);
            expect(penetration.y).to.closeTo(-9, FLOAT_TOLERANCE);
        });
        it('should return (9;-12) when circle center inside left top top', () => {
            const circle: Circle = new Circle(new Vector2(-3, 4), 10);
            const penetration: Vector2 = CollisionDetector.collideCircleCircle(circle, centerCircle);
            expect(penetration.x).to.closeTo(9, FLOAT_TOLERANCE);
            expect(penetration.y).to.closeTo(-12, FLOAT_TOLERANCE);
        });
        it('should return (12;-9) when circle center inside left left bottom', () => {
            const circle: Circle = new Circle(new Vector2(-4, 3), 10);
            const penetration: Vector2 = CollisionDetector.collideCircleCircle(circle, centerCircle);
            expect(penetration.x).to.closeTo(12, FLOAT_TOLERANCE);
            expect(penetration.y).to.closeTo(-9, FLOAT_TOLERANCE);
        });
        it('should return (-9;12) when circle center inside right bottom bottom', () => {
            const circle: Circle = new Circle(new Vector2(3, -4), 10);
            const penetration: Vector2 = CollisionDetector.collideCircleCircle(circle, centerCircle);
            expect(penetration.x).to.closeTo(-9, FLOAT_TOLERANCE);
            expect(penetration.y).to.closeTo(12, FLOAT_TOLERANCE);
        });
    });
});