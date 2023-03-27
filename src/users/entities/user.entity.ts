import { UserType } from "../users.type";

export class User {
    uid: string;
    name: string;
    email: string;
    type: UserType;

    constructor({uid, name, email, type}) {
        this.uid = uid;
        this.name = name;
        this.email = email;
        this.type = type;
    };
}
