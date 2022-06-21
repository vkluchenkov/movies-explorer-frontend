import { UpdateMePayload } from '../../types/payloads';

export interface ProfileProps {
  onSubmit: (payload: UpdateMePayload) => void;
  onLogout: () => void;
}
