'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaTrash } from 'react-icons/fa';
import { Button } from '../../components/ui/button';

interface DeleteSetButtonProps {
  setId: string;
}

export default function DeleteSetButton({ setId }: DeleteSetButtonProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await fetch(`/api/sets/${setId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete set');
      }

      router.push('/dashboard');
      router.refresh();
    } catch (error) {
      console.error('Error deleting set:', error);
    } finally {
      setIsDeleting(false);
      closeModal();
    }
  };

  return (
    <>
      <button
        onClick={openModal}
        className="p-2 text-foreground/70 hover:text-status-error hover:bg-secondary rounded-full transition-all duration-200 hover:shadow-sm hover:scale-105"
        aria-label="Delete set"
      >
        <FaTrash className="w-5 h-5" />
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-100 dark:bg-gray-800 border border-border rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Delete Set</h3>
            <p className="mb-6">
              Are you sure you want to delete this set? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <Button
                variant="secondary"
                onClick={closeModal}
                disabled={isDeleting}
                size="sm"
              >
                Cancel
              </Button>
              <Button
                variant="outline"
                onClick={handleDelete}
                isLoading={isDeleting}
                disabled={isDeleting}
                size="sm"
                className="bg-status-error-bg border-status-error text-status-error hover:bg-status-error hover:text-white"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
