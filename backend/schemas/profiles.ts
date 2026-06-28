export interface Profile {
    id: string;
    display_name: string;
    phone?: string;
    timezone: string;
    created_at: string;
}

export interface CreateProfile {
    id: string;
    display_name: string;
    phone?: string;
}

export interface UpdateProfile {
    display_name?: string;
    phone?: string;
    timezone?: string;
}