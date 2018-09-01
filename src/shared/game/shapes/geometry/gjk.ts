import Vector2 from "../../../data/vector2";
import Shape from "../shape";
import Edge from "./edge";
import {AngularDirection} from "./angular-direction";
import {EvolveResult} from "./evolve-result";

export default class GJK {

    private static readonly MAX_ITERATIONS: number = 20;

    private vertices: Vector2[];
    private direction: Vector2;
    private shapeA: Shape;
    private shapeB: Shape;

    private support(direction: Vector2): Vector2 {
        return this.shapeA.support(direction).subtract(this.shapeB.support(direction.factor(-1)));
    }

    private addSupport(direction: Vector2): boolean {
        const support: Vector2 = this.support(direction);
        this.vertices.push(support);
        return support.dotProduct(direction) >= 0;
    }

    private static tripleProduct(a: Vector2, b: Vector2, c: Vector2): Vector2 {
        const crossZ: number = a.x * b.y - a.y * b.x;
        return new Vector2(-crossZ * c.y, crossZ * c.x);
    }

    private evolveSimplex(): EvolveResult {
        switch (this.vertices.length) {
            case 0:
                this.direction = this.shapeB.position.subtract(this.shapeA.position);
                break;
            case 1:
                this.direction = this.direction.factor(-1);
                break;
            case 2:
                const cb: Vector2 = this.vertices[1].subtract(this.vertices[0]);
                const c0: Vector2 = this.vertices[0].factor(-1);
                this.direction = GJK.tripleProduct(cb, c0, cb);
                break;
            case 3:
                const a: Vector2 = this.vertices[2];
                const b: Vector2 = this.vertices[1];
                const c: Vector2 = this.vertices[0];

                const a0: Vector2 = a.factor(-1);
                const ab: Vector2 = b.subtract(a);
                const ac: Vector2 = c.subtract(a);

                const abPerpendicular: Vector2 = GJK.tripleProduct(ac, ab, ab);
                const acPerpendicular: Vector2 = GJK.tripleProduct(ab, ac, ac);

                if (abPerpendicular.dotProduct(a0) > 0) {
                    this.vertices.splice(0, 1);
                    this.direction = abPerpendicular;
                } else if (acPerpendicular.dotProduct(a0) > 0) {
                    this.vertices.splice(1, 1);
                    this.direction = acPerpendicular;
                } else {
                    return EvolveResult.FoundIntersection;
                }

                break;
        }

        return this.addSupport(this.direction) ? EvolveResult.StillEvolving : EvolveResult.NoIntersection;
    }

    public test(shapeA: Shape, shapeB: Shape): boolean {
        this.vertices = [];
        this.shapeA = shapeA;
        this.shapeB = shapeB;

        let iterations: number = GJK.MAX_ITERATIONS;
        let result: EvolveResult = EvolveResult.StillEvolving;
        while (iterations-- > 0 && result === EvolveResult.StillEvolving) {
            result = this.evolveSimplex();
        }

        return result === EvolveResult.FoundIntersection;
    }

    private findClosestEdge(winding: AngularDirection): Edge {
        let closestDistance: number = Number.MAX_VALUE;
        let closestNormal: Vector2 = new Vector2();
        let closestIndex: number = 0;
        for (let i: number = 0; i < this.vertices.length; i++) {
            let nextIndex: number = i + 1;
            if (nextIndex === this.vertices.length) {
                nextIndex = 0;
            }

            const line: Vector2 = this.vertices[nextIndex].subtract(this.vertices[i]).normalized;
            const norm: Vector2 = winding === AngularDirection.Clockwise
                ? new Vector2(line.y, -line.x)
                : new Vector2(-line.y, line.x);

            const dist: number = norm.dotProduct(this.vertices[i]);
            if (closestDistance > dist) {
                closestDistance = dist;
                closestNormal = norm;
                closestIndex = nextIndex;
            }
        }

        return new Edge(closestDistance, closestNormal, closestIndex);
    }

    public intersect(shapeA: Shape, shapeB: Shape): Vector2 {
        if (!this.test(shapeA, shapeB)) {
            return null;
        }

        const e0: number = (this.vertices[1].x - this.vertices[0].x) * (this.vertices[1].y + this.vertices[0].y);
        const e1: number = (this.vertices[2].x - this.vertices[1].x) * (this.vertices[2].y + this.vertices[1].y);
        const e2: number = (this.vertices[0].x - this.vertices[2].x) * (this.vertices[0].y + this.vertices[2].y);
        const winding: AngularDirection = e0 + e1 + e2 >= 0 ? AngularDirection.Clockwise : AngularDirection.CounterClockwise;

        let intersection: Vector2;
        for (let i: number = 0; i < 32; i++) {
            const edge: Edge = this.findClosestEdge(winding);
            const support: Vector2 = this.support(edge.normal);
            const distance: number = support.dotProduct(edge.normal);

            intersection = edge.normal.factor(distance);

            if (Math.abs(distance - edge.distance) <= 0.000001) {
                return intersection;
            } else {
                this.vertices.splice(edge.index, 0, support);
            }
        }

        return intersection;
    }

}