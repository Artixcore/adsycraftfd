import { Suspense } from 'react';
import CallbackClient from './CallbackClient';

export default function MetaCallbackPage() {
  return (
    <Suspense fallback={null}>
      <CallbackClient />
    </Suspense>
  );
}
