'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { Navbar } from '../../../../components/navbar';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';

// Note: We cannot directly use Prisma on the client. 
// The `maxQuestions` should ideally be fetched server-side and passed to this client component,
// or fetched via an API route.
// For this example, we'll use a prop `maxQuestionsTotal` that would be passed from a server component parent if this page were structured that way.
// Or, it could be fetched via a useEffect hook calling an API endpoint.

interface QuestionTypeOption {
  id: 'multiple-choice' | 'fill-in-blank' | 'true-false';
  label: string;
}

const questionTypeOptions: QuestionTypeOption[] = [
  { id: 'multiple-choice', label: 'Multiple Choice' },
  { id: 'fill-in-blank', label: 'Fill in the Blank' },
  { id: 'true-false', label: 'True/False' },
];

// This page would ideally fetch `maxQuestionsTotal` from a server component or API route
export default function QuizConfigurePage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams(); // To get potential initial max questions if passed
  const setId = params.id as string;

  // Example: Get max questions from a query param if provided (e.g., from a server component link)
  const initialMaxQuestions = searchParams.get('maxQ');
  const maxQuestionsTotal = initialMaxQuestions ? parseInt(initialMaxQuestions, 10) : 50; // Default to 50 if not provided

  const [numQuestions, setNumQuestions] = useState<string>('10');
  const [selectedQuestionTypes, setSelectedQuestionTypes] = useState<string[]>(['multiple-choice', 'fill-in-blank', 'true-false']);
  
  useEffect(() => {
    // If you were fetching maxQuestions dynamically:
    // async function fetchMaxQuestions() {
    //   try {
    //     const response = await fetch(`/api/sets/${setId}/max-questions`); // Example API endpoint
    //     if (!response.ok) throw new Error('Failed to fetch max questions');
    //     const data = await response.json();
    //     setMaxQuestionsTotal(data.maxQuestions);
    //     if (parseInt(numQuestions) > data.maxQuestions) {
    //       setNumQuestions(String(data.maxQuestions));
    //     }
    //   } catch (error) {
    //     console.error('Error fetching max questions:', error);
    //     // Fallback to a default or show an error
    //   }
    // }
    // if (setId) fetchMaxQuestions();

    // Ensure numQuestions does not exceed maxQuestionsTotal initially
    if (parseInt(numQuestions, 10) > maxQuestionsTotal) {
        setNumQuestions(String(maxQuestionsTotal));
    }

  }, [setId, maxQuestionsTotal, numQuestions]);

  const handleQuestionTypeChange = (typeId: string) => {
    setSelectedQuestionTypes(prev =>
      prev.includes(typeId)
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedQuestionTypes.length === 0) {
      alert('Please select at least one question type.');
      return;
    }
    const num = parseInt(numQuestions, 10);
    if (isNaN(num) || num <= 0) {
        alert('Please enter a valid number of questions.');
        return;
    }
    if (num > maxQuestionsTotal) {
        alert(`Number of questions cannot exceed the maximum available (${maxQuestionsTotal}).`);
        return; // Let user correct it
    }

    const queryParams = new URLSearchParams({
      numQuestions: String(num),
      types: selectedQuestionTypes.join(','),
    });
    router.push(`/study/${setId}/quiz?${queryParams.toString()}`);
  };

  if (!setId) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-12 flex items-center justify-center">
          <p>Loading set information...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="bg-secondary py-3 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center text-sm">
            <Link href="/dashboard" className="text-foreground/70 hover:text-foreground">
              Dashboard
            </Link>
            <span className="mx-2 text-foreground/50">/</span>
            <Link href={`/sets/${setId}`} className="text-foreground/70 hover:text-foreground">
              Set <span className="md:hidden">Details</span><span className="hidden md:inline">Details</span>
            </Link>
            <span className="mx-2 text-foreground/50">/</span>
            <span className="text-foreground font-medium">Configure Quiz</span>
          </div>
        </div>
      </div>
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto bg-card p-6 sm:p-8 rounded-lg shadow-xl border border-border">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-foreground">Configure Your Quiz</h1>
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            <div>
              <Label htmlFor="numQuestions" className="text-md sm:text-lg font-medium mb-2 block text-foreground/90">Number of Questions</Label>
              <Input
                id="numQuestions"
                type="number"
                value={numQuestions}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNumQuestions(e.target.value)}
                min="1"
                max={maxQuestionsTotal} 
                placeholder={`e.g., 10 (max: ${maxQuestionsTotal})`}
                className="text-base bg-input border-border focus:ring-primary focus:border-primary"
              />
               <p className="text-sm text-muted-foreground mt-2">Enter the total number of questions for your quiz. Max available for this set: {maxQuestionsTotal}.</p>
            </div>

            <div>
              <Label className="text-md sm:text-lg font-medium mb-3 block text-foreground/90">Question Types</Label>
              <div className="space-y-3">
                {questionTypeOptions.map(type => (
                  <div key={type.id} className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors bg-card shadow-sm">
                    <Checkbox
                      id={type.id}
                      checked={selectedQuestionTypes.includes(type.id)}
                      onCheckedChange={() => handleQuestionTypeChange(type.id)}
                      className="form-checkbox h-5 w-5 text-primary border-primary-focus focus:ring-primary"
                    />
                    <Label htmlFor={type.id} className="font-normal text-base cursor-pointer flex-1 text-foreground/90">
                      {type.label}
                    </Label>
                  </div>
                ))}
              </div>
               {selectedQuestionTypes.length === 0 && (
                <p className="text-sm text-destructive mt-2">Please select at least one question type.</p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                <Button type="button" variant="outline" onClick={() => router.back()} className="w-full sm:w-auto py-2.5 px-5 text-base border-border hover:bg-muted">
                    Cancel
                </Button>
                <Button type="submit" className="w-full sm:w-auto flex-grow bg-primary hover:bg-primary/90 text-primary-foreground py-2.5 px-5 text-base" disabled={selectedQuestionTypes.length === 0 || parseInt(numQuestions) <=0 || parseInt(numQuestions) > maxQuestionsTotal}>
                 Start Quiz
                </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
