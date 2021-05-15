import { createContext } from 'react';
import { IUserContext } from '../interface/auth';

export const UserContext = createContext<IUserContext | null>(null);
