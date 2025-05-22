'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaTrash } from 'react-icons/fa';

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
        className="p-2 text-foreground/70 hover:text-red-500 hover:bg-secondary rounded-full transition-colors"
        aria-label="Delete set"
      >
        <FaTrash className="w-5 h-5" />
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Delete Set</h3>
            <p className="mb-6">
              Are you sure you want to delete this set? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 text-sm font-medium"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm font-medium"
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
