import { Routes } from 'nest-router';
import { AuthModule } from './auth/auth.module';
import { UserHttpModule } from './user/user-http.module';

export const routes: Routes = [
  {
    path: '/auth',
    module: AuthModule
  },
  {
    path: '/user',
    module: UserHttpModule
  }
];