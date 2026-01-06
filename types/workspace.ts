export interface WorkspaceSettings {
  brandVoice?: string;
  language?: string;
  geo?: string[];
  postingFrequencyLimit?: number;
}

export interface TeamMember {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: 'OWNER' | 'ADMIN' | 'MEMBER' | 'VIEWER';
  status: 'ACTIVE' | 'INVITED' | 'SUSPENDED';
  invitedAt?: string;
  joinedAt?: string;
}
