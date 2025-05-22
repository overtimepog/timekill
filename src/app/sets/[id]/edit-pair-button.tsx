'use client';

import { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import PairEditModal from '../../components/pair-edit-modal';

type PairField = 'term' | 'definition' | 'question' | 'answer';

interface EditPairButtonProps {
  pairId: string;
  initialValues: {
    term: string;
    definition: string;
    question: string;
    answer: string;
  };
  field?: PairField;
  onPairUpdated: (updatedPair: any) => void;
}

export default function EditPairButton({
  pairId,
  initialValues,
  field,
  onPairUpdated,
}: EditPairButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  const handleSave = async (updatedPair: {
    term: string;
    definition: string;
    question: string;
    answer: string;
  }) => {
    try {
      const response = await fetch(`/api/pairs/${pairId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPair),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update pair');
      }
      
      const savedPair = await response.json();
      onPairUpdated(savedPair);
      
    } catch (error) {
      console.error('Error updating pair:', error);
      throw error;
    }
  };
  
  return (
    <>
      <button
        onClick={openModal}
        className="p-1.5 text-foreground/70 hover:text-accent hover:bg-secondary rounded transition-all duration-200 hover:shadow-sm"
        aria-label={`Edit ${field || 'pair'}`}
      >
        <FaEdit className="w-4 h-4" />
      </button>
      
      <PairEditModal
        isOpen={isModalOpen}
        onClose={closeModal}
        pairId={pairId}
        initialValues={initialValues}
        fieldToEdit={field}
        onSave={handleSave}
      />
    </>
  );
}