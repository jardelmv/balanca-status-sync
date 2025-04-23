
import React, { useEffect, useState } from 'react';
import { setupSync, getStatusDoc } from '../services/db';
import { Card } from '@/components/ui/card';

interface StatusDoc {
  _id: string;
  read: boolean;
  _rev?: string;
}

const StatusDisplay = () => {
  const [status, setStatus] = useState<StatusDoc | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initSync = async () => {
      try {
        // Setup sync
        setupSync();
        
        // Initial fetch
        const doc = await getStatusDoc();
        if (doc) {
          setStatus(doc as StatusDoc);
        }

        // Setup periodic refresh
        const interval = setInterval(async () => {
          const updatedDoc = await getStatusDoc();
          if (updatedDoc) {
            setStatus(updatedDoc as StatusDoc);
          }
        }, 1000); // Check every second

        return () => clearInterval(interval);
      } catch (err) {
        setError('Error connecting to database');
        console.error(err);
      }
    };

    initSync();
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="p-6 bg-red-50">
          <h2 className="text-lg font-semibold text-red-600">Error</h2>
          <p className="text-red-500">{error}</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Status Document</h2>
        {status ? (
          <div className="space-y-2">
            <p className="text-gray-600">Document ID: {status._id}</p>
            <p className="text-gray-600">Read Status: {status.read ? 'True' : 'False'}</p>
            <p className="text-sm text-gray-400">Revision: {status._rev}</p>
          </div>
        ) : (
          <p className="text-gray-500">Loading status...</p>
        )}
      </Card>
    </div>
  );
};

export default StatusDisplay;
