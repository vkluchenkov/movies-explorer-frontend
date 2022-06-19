import { LoginPayload } from '../../../types/payloads';

export interface LoginProps {
  onLogin: (payload: LoginPayload) => void;
}
