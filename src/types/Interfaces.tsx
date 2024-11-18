import { ReactNode } from 'react';

export interface User {
  id: string;
  profile: string;
  name: string;
  document: string;
  full_address: string;
  email: string;
  password: string;
  status: boolean;
}

export interface AuthContextData {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  getRoleScreen: () => keyof RootStackParamList;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  UserScreen: undefined;
  HomePage: undefined;
  ProductsScreen: undefined;
  Shipments: undefined;
  ShipmentsList: undefined;
  MapView: { origem: LocationType; destino: LocationType };
};

export type Products = {
  product_id: string;
  product_name: string;
  quantity: string;
  image_url: string;
  description: string;
  branch_name: string;
  location: string;
  latitude: string;
  longitute: string;
}

export type Branches = {
  id: string;
  name: string;
  location: string;
  latitude: number;
  longitute: number;
}

export type Movement = {
  id: string;
  quantidade: number;
  produto: {
    nome: string;
    imagem: string;
  };
  status: string;
  origem: {
    nome: string;
    latitude: number;
    longitude: number;
  };
  imagem: string;
  destino: {
    nome: string;
    latitude: number;
    longitude: number;
  };
  dataCriacao: string;
  historico: {
    id: string;
    descricao: string;
    data: string;
    file: string;
  }[];
};

export interface NewMovementModalProps {
  visible: boolean;
  onClose: () => void;
  onAddItem: (item: Movement) => void;
}

export interface ShipmentList {
  originBranchId: string,
  destinationBranchId: string;
  productId: string,
  quantity: string
}

export interface LocationType {
  latitude: number;
  longitude: number;
  route: string;
}
export interface MapView {
  route: string;
}