import {AppGuard} from './app/app.guard';
import {AuthGuard} from './auth/auth.guard';

export {
  AppGuard,
  AuthGuard,
};

export const GUARDS = [
  AppGuard,
  AuthGuard,
];
