
export class MyToken {
    id: number;
    exp: number;
    sub: string;
    first_name: string;
    last_name: string;
    roles: string[];

    constructor(id: number, exp: number, sub: string, first_name: string, last_name: string, roles: string[]) {
        this.id = id;
        this.exp = exp;
        this.sub = sub;
        this.first_name = first_name;
        this.last_name = last_name;
        this.roles = roles;
    }
}
