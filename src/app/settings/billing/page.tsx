import { Navbar } from '../../components/navbar';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { prisma } from '../../../../packages/core/lib/prisma';
import BillingPortalButton from './billing-portal-button';
import Link from 'next/link';

export default async function BillingPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; canceled?: string; session_id?: string }>;
}) {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }
  
  // Wait for searchParams to resolve
  const resolvedSearchParams = await searchParams;
  
  // Get the user's subscription
  const subscription = await prisma.subscription.findUnique({
    where: {
      userId: user.id,
    },
  });
  
  // Format the subscription status
  const formatStatus = (status: string | null) => {
    if (!status) return 'None';
    
    switch (status) {
      case 'active':
        return 'Active';
      case 'canceled':
        return 'Canceled';
      case 'past_due':
        return 'Past Due';
      case 'incomplete':
        return 'Incomplete';
      case 'incomplete_expired':
        return 'Expired';
      case 'trialing':
        return 'Trial';
      case 'unpaid':
        return 'Unpaid';
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };
  
  // Format the plan name
  const formatPlan = (plan: string | null) => {
    if (!plan) return 'Free';
    
    return plan.charAt(0).toUpperCase() + plan.slice(1);
  };
  
  // Format the current period end date
  const formatDate = (date: Date | null) => {
    if (!date) return 'N/A';
    
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  // Get usage statistics
  const noteSubmissionsCount = await prisma.noteSubmission.count({
    where: {
      userId: user.id,
    },
  });
  
  const pairsCount = await prisma.pair.count({
    where: {
      userId: user.id,
    },
  });
  
  const humanizerRunsCount = await prisma.humanizerRun.count({
    where: {
      userId: user.id,
    },
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Billing Settings</h1>
          
          {resolvedSearchParams.success === 'true' && (
            <div className="mb-8 p-4 bg-green-50 text-green-800 rounded-lg border border-green-200">
              <p className="font-medium">
                Your subscription has been updated successfully! You now have access to all Pro features.
              </p>
            </div>
          )}
          
          {resolvedSearchParams.canceled === 'true' && (
            <div className="mb-8 p-4 bg-yellow-50 text-yellow-800 rounded-lg border border-yellow-200">
              <p className="font-medium">
                Your checkout was canceled. You have not been charged.
              </p>
            </div>
          )}
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-xl font-medium mb-4">Subscription Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500 text-sm mb-1">Plan</p>
                <p className="font-medium">{formatPlan(subscription?.plan)}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">Status</p>
                <p className="font-medium">{formatStatus(subscription?.status)}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">Current Period Ends</p>
                <p className="font-medium">{formatDate(subscription?.currentPeriodEnd)}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">Customer ID</p>
                <p className="font-medium truncate">
                  {subscription?.stripeCustomerId || 'Not available'}
                </p>
              </div>
            </div>
            
            <div className="mt-6">
              <BillingPortalButton />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-xl font-medium mb-4">Usage Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-500 text-sm mb-1">Notes Submissions</p>
                <p className="text-2xl font-bold">{noteSubmissionsCount}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {subscription?.plan === 'pro' ? 'Unlimited' : `50 / month limit`}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-500 text-sm mb-1">Term-Definition Pairs</p>
                <p className="text-2xl font-bold">{pairsCount}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {subscription?.plan === 'pro' ? 'Up to 50 per conversion' : 'Up to 20 per conversion'}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-500 text-sm mb-1">Humanizer Runs</p>
                <p className="text-2xl font-bold">{humanizerRunsCount}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {subscription?.plan === 'pro' ? 'Unlimited' : '10 / month limit'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <Link
              href="/pricing"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              View Plans
            </Link>
            <Link
              href="/settings"
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Back to Settings
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}