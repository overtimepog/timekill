'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaPencilAlt } from 'react-icons/fa';

interface EditSetButtonProps {
  setId: string;
  currentName: string;
}

export default function EditSetButton({ setId, currentName }: EditSetButtonProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [setName, setSetName] = useState(currentName);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!setName.trim()) {
      setError('Set name cannot be empty');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');
      
      const response = await fetch(`/api/sets/${setId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          metadata: {
            setName: setName.trim()
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update set name');
      }

      router.refresh();
      closeModal();
    } catch (error) {
      console.error('Error updating set name:', error);
      setError('Failed to update set name. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={openModal}
        className="p-1 text-foreground/70 hover:text-primary hover:bg-secondary rounded-full transition-all duration-200 hover:shadow-sm"
        aria-label="Edit set name"
      >
        <FaPencilAlt className="w-4 h-4" />
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-secondary border border-border rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Rename Set</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="setName" className="block text-sm font-medium mb-1">
                  Set Name
                </label>
                <input
                  type="text"
                  id="setName"
                  value={setName}
                  onChange={(e) => setSetName(e.target.value)}
                  className="w-full px-3 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter set name"
                  autoFocus
                />
                {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-control-bg border border-control-border text-foreground rounded-lg hover:bg-control-hover hover:border-primary/30 transition-all duration-200 shadow-sm hover:shadow-md text-sm font-medium"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-[var(--button-text)] rounded-lg hover:bg-primary-hover hover:scale-[1.02] transition-all duration-200 shadow-sm hover:shadow-md text-sm font-medium"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
