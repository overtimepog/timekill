import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Sign in to TimeKill</h1>
          <p className="mt-2 text-text-dimmed">
            Your modern study platform
          </p>
        </div>
        
        <div className="bg-card-bg rounded-lg shadow-card border border-card-border p-6">
          <SignIn
            appearance={{
              elements: {
                card: "bg-transparent shadow-none",
                formButtonPrimary: "bg-amber-400 hover:bg-amber-500 text-black",
                formFieldInput: "border border-input-border bg-input-bg text-input-text",
                footerActionLink: "text-accent hover:text-accent/80",
                formFieldLabel: "text-foreground",
                headerTitle: "text-foreground",
                headerSubtitle: "text-text-dimmed",
                socialButtonsBlockButton: "border-border text-foreground",
                dividerLine: "bg-border",
                dividerText: "text-text-muted",
                identityPreviewText: "text-foreground",
                identityPreviewEditButtonIcon: "text-accent",
              },
            }}
            routing="path"
            path="/sign-in"
            signUpUrl="/sign-up"
            redirectUrl="/dashboard"
          />
        </div>
      </div>
    </div>
  );
}