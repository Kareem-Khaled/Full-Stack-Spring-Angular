export class User {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    status: string;
    message?: string;
    token?: string;

    constructor(id?: number, email?: string, password?: string, firstName?: string, lastName?: string, status?: string, message?: string, token?: string) {
        this.id = id || 0;
        this.email = email || '';
        this.password = password || '';
        this.firstName = firstName || '';
        this.lastName = lastName || '';
        this.status = status || '';
        this.message = message || '';
        this.token = token || '';
    }
}
