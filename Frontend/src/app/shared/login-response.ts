export class loginResponse {
    status: string;
    email: string;
    token: string;
    roles: string[];
    message: string;
    username: string;

    constructor(status: string, email: string, token: string, roles: string[], message: string, username: string) {
        this.status = status;
        this.email = email;
        this.token = token;
        this.roles = roles;
        this.message = message;
        this.username = username;
    }
}
