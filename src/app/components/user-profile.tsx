'use client';

import { UserButton, useUser } from '@clerk/nextjs';

export function UserProfile() {
  const { isLoaded, isSignedIn, user } = useUser();
  
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  
  if (!isSignedIn) {
    return <div>Not signed in</div>;
  }
  
  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-col">
        <span className="text-sm font-medium">{user.fullName}</span>
        <span className="text-xs text-gray-500">{user.primaryEmailAddress?.emailAddress}</span>
      </div>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}