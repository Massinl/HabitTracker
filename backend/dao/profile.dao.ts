import { supabase } from "@/lib/supabase";
import { UpdateProfile, CreateProfile } from "../schemas/profiles";

class ProfileDAO {


    async create(profile: CreateProfile) {

        // Implementation for creating a user
        const { data, error } = await supabase
            .from("profiles")
            .insert(profile)
            .select()
            .single();

        if (error) throw error;

        return data;
    }


    async getById(id: string) {

        // Implementation for retrieving a user by ID
        const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", id)
            .maybeSingle();

        if (error) throw error;
        return data;
    }


    async update(id: string, profile: UpdateProfile) {
        // Implementation for updating a user
        const { data, error } = await supabase
            .from("profiles")
            .update(profile)
            .eq("id", id)
            .select()
            .single();

        if (error) throw error;
        return data;
    }


    async delete(id: string) {
        // Implementation for deleting a user
        const { data, error } = await supabase
            .from("profiles")
            .delete()
            .eq("id", id)
            .select()
            .single();

        if (error) throw error;
        return data;
    }


}

export default new ProfileDAO();