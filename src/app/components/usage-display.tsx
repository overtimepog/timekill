import Link from 'next/link';

interface UsageDisplayProps {
  planType: 'FREE' | 'PRO' | 'POWER';
  currentUsage: {
    documentConversions: number;
    humanizerCreditsUsed: number;
  };
  limits: {
    documentConversions: number;
    humanizerCredits: number;
  };
}

export default function UsageDisplay({ planType, currentUsage, limits }: UsageDisplayProps) {
  const formatNumber = (num: number) => {
    if (num === Infinity) return 'Unlimited';
    return num.toLocaleString();
  };

  const getProgress = (used: number, limit: number) => {
    if (limit === Infinity) return 0;
    return Math.min((used / limit) * 100, 100);
  };

  return (
    <div className="bg-secondary p-6 rounded-lg shadow-sm border border-border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium">Usage This Month</h2>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          planType === 'FREE' ? 'bg-gray-100 text-gray-800' :
          planType === 'PRO' ? 'bg-blue-100 text-blue-800' :
          'bg-purple-100 text-purple-800'
        }`}>
          {planType} Plan
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Document Conversions</span>
            <span className="text-sm text-foreground/70">
              {currentUsage.documentConversions} / {formatNumber(limits.documentConversions)}
            </span>
          </div>
          <div className="w-full bg-background rounded-full h-2">
            <div 
              className="h-2 rounded-full bg-blue-500"
              style={{ width: `${getProgress(currentUsage.documentConversions, limits.documentConversions)}%` }}
            ></div>
          </div>
        </div>        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Humanizer Credits</span>
            <span className="text-sm text-foreground/70">
              {currentUsage.humanizerCreditsUsed} / {formatNumber(limits.humanizerCredits)}
            </span>
          </div>
          <div className="w-full bg-background rounded-full h-2">
            <div 
              className="h-2 rounded-full bg-green-500"
              style={{ width: `${getProgress(currentUsage.humanizerCreditsUsed, limits.humanizerCredits)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {planType === 'FREE' && (
        <div className="mt-4 pt-4 border-t border-border">
          <Link
            href="/pricing"
            className="text-xs text-blue-600 hover:text-blue-700 font-medium"
          >
            Upgrade to Pro for unlimited conversions →
          </Link>
        </div>
      )}
    </div>
  );
}