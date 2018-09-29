import 'mocha';
import {expect} from 'chai';
import {FLOAT_TOLERANCE} from "../../../../constants";
import Vector2 from "../../../../../src/shared/data/vector2";
import Polygon from "../../../../../src/shared/game/geometry/shapes/polygon";

describe('Polygon', () => {
    describe('square', () => {
        it('should return 4 when polygon is a box 2x2', () => {
            const polygon: Polygon = new Polygon(Vector2.ZERO, [
                new Vector2(0, 0),
                new Vector2(0, 2),
                new Vector2(2, 2),
                new Vector2(2, 0)
            ]);

            expect(polygon.square()).to.closeTo(4, FLOAT_TOLERANCE);
        });
        it('should return 6 when polygon is a small house', () => {
            const polygon: Polygon = new Polygon(Vector2.ZERO, [
                new Vector2(0, 0),
                new Vector2(0, 2),
                new Vector2(1, 4),
                new Vector2(2, 2),
                new Vector2(2, 0)
            ]);

            expect(polygon.square()).to.closeTo(6, FLOAT_TOLERANCE);
        });
        it('should return 12 when polygon is a 4-star', () => {
            const polygon: Polygon = new Polygon(Vector2.ZERO, [
                new Vector2(0, 0),
                new Vector2(-2, 1),
                new Vector2(0, 2),
                new Vector2(1, 4),
                new Vector2(2, 2),
                new Vector2(4, 1),
                new Vector2(2, 0),
                new Vector2(1, -2)
            ]);

            expect(polygon.square()).to.closeTo(12, FLOAT_TOLERANCE);
        });
    });
    describe('rotate', () => {
        it('should not change box on rotate 0', () => {
            const polygon: Polygon = new Polygon(Vector2.ZERO, [
                new Vector2(1, 1),
                new Vector2(1, -1),
                new Vector2(-1, -1),
                new Vector2(-1, 1)
            ]);

            polygon.rotate(0);

            expect(polygon.vertices[0].x).to.equal(1);
            expect(polygon.vertices[0].y).to.equal(1);
            expect(polygon.vertices[1].x).to.equal(1);
            expect(polygon.vertices[1].y).to.equal(-1);
            expect(polygon.vertices[2].x).to.equal(-1);
            expect(polygon.vertices[2].y).to.equal(-1);
            expect(polygon.vertices[3].x).to.equal(-1);
            expect(polygon.vertices[3].y).to.equal(1);
        });
        it('should not change box on rotate 90 ', () => {
            const polygon: Polygon = new Polygon(Vector2.ZERO, [
                new Vector2(1, 1),
                new Vector2(1, -1),
                new Vector2(-1, -1),
                new Vector2(-1, 1)
            ]);

            polygon.rotate(Math.PI / 2);

            expect(polygon.vertices[0].x).to.be.closeTo(-1, FLOAT_TOLERANCE);
            expect(polygon.vertices[0].y).to.be.closeTo(1, FLOAT_TOLERANCE);
            expect(polygon.vertices[1].x).to.be.closeTo(1, FLOAT_TOLERANCE);
            expect(polygon.vertices[1].y).to.be.closeTo(1, FLOAT_TOLERANCE);
            expect(polygon.vertices[2].x).to.be.closeTo(1, FLOAT_TOLERANCE);
            expect(polygon.vertices[2].y).to.be.closeTo(-1, FLOAT_TOLERANCE);
            expect(polygon.vertices[3].x).to.be.closeTo(-1, FLOAT_TOLERANCE);
            expect(polygon.vertices[3].y).to.be.closeTo(-1, FLOAT_TOLERANCE);
        });
    });
});