import { SignupPayload } from '../../../types/payloads';

export interface SignupProps {
  onSignup: (payload: SignupPayload) => Promise<void>;
}
