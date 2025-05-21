import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-100">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Sign in to TimeKill</h1>
          <p className="mt-2 text-gray-600">
            Your modern study platform
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <SignIn
            appearance={{
              elements: {
                card: "bg-transparent shadow-none",
                formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
                formFieldInput: "border border-gray-300 rounded-md",
                footerActionLink: "text-blue-600 hover:text-blue-800",
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