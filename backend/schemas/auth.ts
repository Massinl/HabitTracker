export interface RegisterRequest {
    email: string;
    password: string;

    display_name: string;
    phone?: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}