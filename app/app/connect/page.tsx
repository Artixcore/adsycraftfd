import { MetaConnectCard } from '@/components/features/connect-meta/MetaConnectCard';

export default function ConnectPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Connect Meta Account</h1>
        <p className="text-muted-foreground">
          Connect your Facebook Pages and Instagram Business accounts to get started.
        </p>
      </div>

      <MetaConnectCard />
    </div>
  );
}
