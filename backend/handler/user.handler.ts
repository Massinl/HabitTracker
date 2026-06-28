import { supabase } from "@/lib/supabase";
import ProfileDAO from "../dao/profile.dao";
import { LoginRequest, RegisterRequest } from "../schemas/auth";

class AuthHandler {

    // Register a new user
    async register(user: RegisterRequest){
        const { data, error } = await supabase.auth.signUp({
            email: user.email,
            password: user.password,
        });

        if (error) throw error;

        if (!data.user) {
            throw new Error("User was not created");
        }

        const profile = await ProfileDAO.create({
            id: data.user.id,
            display_name: user.display_name,
            phone: user.phone,
        });
        // this is for errors
        return profile;
    }


    // Login the user
    async login(user: LoginRequest) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: user.email,
            password: user.password,
        });

        if (error) throw error;
        if (!data.user) {
            throw new Error("Login failed");
        }

        return data.user;
    }

    
    // Logout the user
    async logout() {
        const { error } = await supabase.auth.signOut();

        if (error) throw error;

        return {
            message: "User logged out successfully"
        };
    }

}

export default new AuthHandler();
