export class loginResponse {
    status: string;
    email: string;
    token: string;
    roles: string[];
    message: string;

    constructor(status: string, email: string, token: string, roles: string[], message: string) {
        this.status = status;
        this.email = email;
        this.token = token;
        this.roles = roles;
        this.message = message;
    }
}
