import {NextFunction, Request, Response, Router} from 'express';
import {User} from "../schemas/user";

export class UsersApi {

    readonly router: Router;

    constructor() {
        this.router = Router();
        this.router.post('/', this.post);
        this.router.get('/', this.getAll);
        this.router.get('/:id', this.getOne);
    }

    public post(req: Request, res: Response) {
        const user = new User(req.body);

        user.save((err, contact) => {
            if (err) {
                res.send(err);
            }

            res.json(contact);
        });
    }

    public getAll(req: Request, res: Response, next: NextFunction) {
        res.send(User);
    }

    public getOne(req: Request, res: Response, next: NextFunction) {
        const id = parseInt(req.params.id);
        const user = User.find(user => user.id === id);
        if (user) {
            res.status(200)
                .send({
                    message: 'Success',
                    status: res.status,
                    user
                });
        }
        else {
            res.status(404)
                .send({
                    message: 'No user found with the given id',
                    status: res.status
                });
        }
    }

}

const userApi = new UsersApi();
export default userApi.router;