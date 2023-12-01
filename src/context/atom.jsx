import { atom, useAtom } from 'jotai';
import axios from 'axios';
import Cookies from 'js-cookie';

// Átomos
export const loggedInAtom = atom(false);
export const isAdminAtom = atom(false);

// Função de autenticação como um átomo
export const authAtom = atom((get) => ({
  loggedIn: get(loggedInAtom),
  isAdmin: get(isAdminAtom),
  login: async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3001/login', {
        email: email,
        password: password,
      });

      if (response.data.user.role === 'administrador') {
        get(loggedInAtom)[1](true);
        get(isAdminAtom)[1](true);
      } else if (response.data.user.role === 'funcionario') {
        get(loggedInAtom)[1](true);
        get(isAdminAtom)[1](false);
      } else {
        alert('Credenciais inválidas');
      }

      Cookies.set('token', response.data.user.token);
      Cookies.set('role', response.data.user.role);
    } catch (error) {
      console.error('Erro na solicitação de login', error);
    }
  },
  logout: () => {
    Cookies.remove('token');
    Cookies.remove('role');
    get(loggedInAtom)[1](false);
    get(isAdminAtom)[1](false);
  },
}));

// Provedor de átomos
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useAtom(authAtom);

  return <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>;
};

// Gancho de átomos
export const useAuth = () => useAtom(authAtom)[0];
