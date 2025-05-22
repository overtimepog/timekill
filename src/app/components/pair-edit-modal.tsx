'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';

type PairField = 'term' | 'definition' | 'question' | 'answer';

interface PairEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  pairId: string;
  initialValues: {
    term: string;
    definition: string;
    question: string;
    answer: string;
  };
  fieldToEdit?: PairField;
  onSave: (updatedPair: {
    term: string;
    definition: string;
    question: string;
    answer: string;
  }) => Promise<void>;
}

export default function PairEditModal({
  isOpen,
  onClose,
  pairId,
  initialValues,
  fieldToEdit,
  onSave,
}: PairEditModalProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [values, setValues] = useState({
    term: initialValues.term,
    definition: initialValues.definition,
    question: initialValues.question,
    answer: initialValues.answer,
  });
  
  const modalRef = useRef<HTMLDivElement>(null);
  const initialFieldRef = useRef<HTMLTextAreaElement>(null);
  
  // Handle outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);
  
  // Focus the initial field when opened
  useEffect(() => {
    if (isOpen && initialFieldRef.current) {
      // Short delay to ensure the modal is fully rendered
      setTimeout(() => {
        initialFieldRef.current?.focus();
      }, 100);
    }
  }, [isOpen, fieldToEdit]);
  
  // Handle escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    } else {
      document.removeEventListener('keydown', handleEscape);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);
  
  const handleChange = (field: PairField, value: string) => {
    setValues(prev => ({
      ...prev,
      [field]: value,
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      await onSave(values);
      onClose();
    } catch (error) {
      console.error('Error saving pair:', error);
      // TODO: Show error message
    } finally {
      setIsSaving(false);
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div 
        ref={modalRef}
        className="bg-gray-100 dark:bg-gray-800 border border-border rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 bg-secondary">
          <h2 className="text-xl font-bold mb-4">Edit Card</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-1">
                  TERM
                </label>
                <textarea
                  value={values.term}
                  onChange={(e) => handleChange('term', e.target.value)}
                  className="w-full p-3 bg-input-bg border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent resize-none min-h-[100px]"
                  ref={fieldToEdit === 'term' ? initialFieldRef : undefined}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-1">
                  DEFINITION
                </label>
                <textarea
                  value={values.definition}
                  onChange={(e) => handleChange('definition', e.target.value)}
                  className="w-full p-3 bg-input-bg border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent resize-none min-h-[100px]"
                  ref={fieldToEdit === 'definition' ? initialFieldRef : undefined}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-1">
                  QUESTION
                </label>
                <textarea
                  value={values.question}
                  onChange={(e) => handleChange('question', e.target.value)}
                  className="w-full p-3 bg-input-bg border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent resize-none min-h-[100px]"
                  ref={fieldToEdit === 'question' ? initialFieldRef : undefined}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-1">
                  ANSWER
                </label>
                <textarea
                  value={values.answer}
                  onChange={(e) => handleChange('answer', e.target.value)}
                  className="w-full p-3 bg-input-bg border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent resize-none min-h-[100px]"
                  ref={fieldToEdit === 'answer' ? initialFieldRef : undefined}
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-3">
              <Button 
                type="button" 
                variant="secondary" 
                onClick={onClose}
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="primary"
                isLoading={isSaving}
                disabled={isSaving}
              >
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}