import { UpdatePayload } from '../../types/payloads';

export interface ProfileProps {
  onSubmit: (payload: UpdatePayload) => void;
  onLogout: () => void;
}
