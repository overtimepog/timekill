import { Navbar } from '../components/navbar';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import NoteSubmissionForm from './note-submission-form';

export default async function CreatePage() {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Create Study Materials</h1>
          <p className="text-gray-600 mb-8">
            Paste your notes, lecture slides, or study materials below. Our AI will extract key terms and create flashcards and quiz questions.
          </p>
          
          <NoteSubmissionForm userId={user.id} />
          
          <div className="mt-12 bg-blue-50 p-6 rounded-lg border border-blue-100">
            <h2 className="text-xl font-medium text-blue-800 mb-4">Tips for Best Results</h2>
            <ul className="list-disc pl-6 space-y-2 text-blue-700">
              <li>Include context around key terms to generate better definitions.</li>
              <li>Use structured formats like bullet points or numbered lists for clearer extraction.</li>
              <li>For complex topics, break your notes into smaller, focused submissions.</li>
              <li>Specify the correct language for non-English content.</li>
              <li>Check and edit the generated pairs before saving for best study results.</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}