import { supabase } from "@/lib/supabase";
import ProfileDAO from "../dao/profile.dao";
import { LoginRequest, RegisterRequest } from "../schemas/profiles";

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

        try {
            const profile = await ProfileDAO.create({
                id: data.user.id,
                display_name: user.display_name,
                phone: user.phone,
            });
            return profile;
        } catch (profileError) {
            await supabase.auth.admin.deleteUser(data.user.id).catch(() => {});
            throw profileError;
        }
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

        const profile = await ProfileDAO.getById(data.user.id);

        return { user: data.user, profile };
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
