import { UpdateMePayload } from '../../types/payloads';

export interface ProfileProps {
  onSubmit: (payload: UpdateMePayload) => Promise<void>;
  onLogout: () => Promise<void>;
}
