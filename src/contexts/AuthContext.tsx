import { createContext, useState, useContext } from "react";
import { User, AuthContextData, AuthProviderProps } from '../types/Interfaces';
import axios from 'axios';
import { Alert } from 'react-native';
import { RootStackParamList } from "../types/Interfaces";

export const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {

    const [user, setUser] = useState<User | null>(null);

    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post('http://10.0.0.113:3000/login', { email, password, });
            const validUser: User = response.data;

            if (validUser) {
                setUser(validUser); // Autentica o usuário
            } else {
                Alert.alert('Usuário ou senha incorretos');
            }
        } catch (err) {
            Alert.alert('Erro ao conectar ao servidor');
            console.error(err);
        }
    };

    const logout = () => {
        setUser(null);
    };

    const getRoleScreen = (): keyof RootStackParamList => {
        switch (user?.profile) {
            case "admin":
                return "HomePage";
            case "filial":
                return "Shipments";
            case "motorista":
                return "ShipmentsList";
            default:
                return "Login";
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, getRoleScreen }}>
            {children}
        </AuthContext.Provider>
    );
};


// Hook personalizado para usar o contexto
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}