

class ApiResponse {
    statusCode: number;
    message: string;
    data: any;
    constructor(statusCode: number, message: string = "Success", data: any) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}

export  { ApiResponse};
