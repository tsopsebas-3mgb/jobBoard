import type {User} from "@/server/utils/models/userModel";

export const useAuth = () => {
    const user:Ref<User|null> = useState('user', () => null);
    const login = async (form:any)=>{
        const {data, error} = await useFetch<User>('/api/auth/login', {
            method: 'POST',
            body: form
        });
        if(error.value) throw new Error(error.value.data?.message || 'Login failed');
        user.value=data.value || null;
    }

    const createUser = async (form:any)=>{
        const {data, error} = await useFetch<User>('/api/auth/register', {
            method: 'POST',
            body: form
        });
        if(error.value) throw new Error(error.value.data?.message || 'Registration failed');
        user.value=data.value || null;
    }

    const fetchUser = async ()=>{
        const {data} = await useFetch<User|null>('/api/auth/user');
        if(data.value) user.value=data.value
    }
    return {user, login, createUser, fetchUser};
}