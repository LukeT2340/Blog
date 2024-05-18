import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext();

    const logout = () => {
        // Remove admin from storage
        localStorage.removeItem('admin');

        // Dispatch logout action
        dispatch({type: 'LOGOUT'});
    }

    return { logout };
}