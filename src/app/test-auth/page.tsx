'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AuthTest() {
  const [authStatus, setAuthStatus] = useState<string>('Checking...');
  const [testResult, setTestResult] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const status = localStorage.getItem('adminAuth');
      setAuthStatus(status === 'true' ? 'Authenticated' : 'Not authenticated');
    }
  }, []);

  const testAuth = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('adminAuth', 'true');
      setAuthStatus('Authenticated');
      setTestResult('Authentication set successfully');
    }
  };

  const clearAuth = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('adminAuth');
      setAuthStatus('Not authenticated');
      setTestResult('Authentication cleared');
    }
  };

  const testAppointments = async () => {
    try {
      const response = await fetch('/api/test-appointments');
      const data = await response.json();
      setTestResult(`Test appointments: ${JSON.stringify(data, null, 2)}`);
    } catch (error) {
      setTestResult(`Test failed: ${error}`);
    }
  };

  const createTestAppointment = async () => {
    try {
      const response = await fetch('/api/test-appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ test: true }),
      });
      const data = await response.json();
      setTestResult(`Created test appointment: ${JSON.stringify(data, null, 2)}`);
    } catch (error) {
      setTestResult(`Create test failed: ${error}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Authentication & Appointments Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Authentication Status</h3>
              <p className="text-gray-600">Status: {authStatus}</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Test Actions</h3>
              <div className="flex flex-wrap gap-4">
                <Button onClick={testAuth}>Set Authentication</Button>
                <Button onClick={clearAuth} variant="outline">Clear Authentication</Button>
                <Button onClick={testAppointments} variant="outline">Test Get Appointments</Button>
                <Button onClick={createTestAppointment} variant="outline">Create Test Appointment</Button>
              </div>
            </div>

            {testResult && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Test Result</h3>
                <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-auto">
                  {testResult}
                </pre>
              </div>
            )}

            <div className="pt-4 border-t">
              <p className="text-sm text-gray-600">
                This test page helps debug authentication and appointment storage issues.
                Check the browser console for additional debugging information.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
