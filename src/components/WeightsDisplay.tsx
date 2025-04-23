
import React, { useEffect, useState } from 'react';
import { setupSync, getWeightsDoc } from '../services/db';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Weight } from 'lucide-react';

interface WeightsDoc {
  _id: string;
  balanca01: number;
  balanca02: number;
  balanca03: number;
  balanca04: number;
  balanca05: number;
  balanca06: number;
  datahora: string;
  _rev?: string;
}

const WeightsDisplay = () => {
  const [weights, setWeights] = useState<WeightsDoc | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initSync = async () => {
      try {
        setupSync();
        
        // Initial fetch
        const doc = await getWeightsDoc();
        if (doc) {
          setWeights(doc as WeightsDoc);
        }

        // Setup periodic refresh
        const interval = setInterval(async () => {
          const updatedDoc = await getWeightsDoc();
          if (updatedDoc) {
            setWeights(updatedDoc as WeightsDoc);
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
      <Card className="p-6 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-600">Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Weight className="h-6 w-6" />
          Scale Weights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Scale</TableHead>
              <TableHead>Weight</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {weights ? (
              <>
                {Object.entries(weights)
                  .filter(([key]) => key.startsWith('balanca'))
                  .map(([key, value]) => (
                    <TableRow key={key}>
                      <TableCell className="font-medium">Scale {key.split('-')[1]}</TableCell>
                      <TableCell>{value} kg</TableCell>
                    </TableRow>
                  ))}
                <TableRow>
                  <TableCell colSpan={2} className="text-sm text-gray-500">
                    Last Update: {weights.datahora}
                  </TableCell>
                </TableRow>
              </>
            ) : (
              <TableRow>
                <TableCell colSpan={2}>Loading weights...</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default WeightsDisplay;
