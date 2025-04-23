
import React, { useEffect, useState } from 'react';
import { setupSync, getStatusDoc } from '../services/db';
import { Card } from '@/components/ui/card';

interface StatusDoc {
  _id: string;
  read: boolean;
  _rev?: string;
}

const Semaphore = ({ status }: { status: boolean }) => {
  return (
    <div className="flex items-center space-x-4">
      <div 
        className={`w-12 h-12 rounded-full ${status ? 'bg-green-500' : 'bg-gray-300'}`}
        title="Green Light (True)"
      />
      <div 
        className={`w-12 h-12 rounded-full ${!status ? 'bg-red-500' : 'bg-gray-300'}`}
        title="Red Light (False)"
      />
    </div>
  );
};

const StatusDisplay = () => {
  const [status, setStatus] = useState<StatusDoc | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initSync = async () => {
      try {
        setupSync();
        
        const doc = await getStatusDoc();
        if (doc) {
          setStatus(doc as StatusDoc);
        }

        const interval = setInterval(async () => {
          const updatedDoc = await getStatusDoc();
          if (updatedDoc) {
            setStatus(updatedDoc as StatusDoc);
          }
        }, 1000);

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
      <Card className="p-6 bg-red-50">
        <h2 className="text-lg font-semibold text-red-600">Error</h2>
        <p className="text-red-500">{error}</p>
      </Card>
    );
  }

  return (
    <Card className="p-6 w-full">
      <h2 className="text-2xl font-bold mb-4">Status Semaphore</h2>
      {status ? (
        <div className="space-y-4">
          <Semaphore status={status.read} />
          <div className="space-y-2">
            <p className="text-gray-600">Document ID: {status._id}</p>
            <p className="text-gray-600">Read Status: {status.read ? 'True' : 'False'}</p>
            <p className="text-sm text-gray-400">Revision: {status._rev}</p>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Loading status...</p>
      )}
    </Card>
  );
};

export default StatusDisplay;
