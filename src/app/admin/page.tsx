'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  MessageSquare,
  CheckCircle,
  XCircle,
  AlertCircle,
  Filter,
  Search,
  LogOut,
  Shield
} from 'lucide-react';

interface Appointment {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  department: string;
  reason: string;
  urgency: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
}

// Mock data - in a real app, this would come from an API
const mockAppointments: Appointment[] = [
  {
    id: 'APPT-1704067200000',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+234 801 234 5678',
    date: '2024-01-15',
    time: '10:00 AM',
    department: 'General Medicine',
    reason: 'Annual health check-up and blood pressure monitoring',
    urgency: 'routine',
    status: 'pending',
    createdAt: '2024-01-10T10:00:00Z',
  },
  {
    id: 'APPT-1704153600000',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@example.com',
    phone: '+234 802 345 6789',
    date: '2024-01-16',
    time: '02:00 PM',
    department: 'Cardiology',
    reason: 'Chest pain and shortness of breath',
    urgency: 'urgent',
    status: 'confirmed',
    createdAt: '2024-01-11T14:30:00Z',
  },
  {
    id: 'APPT-1704240000000',
    firstName: 'Michael',
    lastName: 'Adebayo',
    email: 'michael.adebayo@example.com',
    phone: '+234 803 456 7890',
    date: '2024-01-17',
    time: '09:00 AM',
    department: 'Pediatrics',
    reason: 'Child vaccination and growth monitoring',
    urgency: 'routine',
    status: 'completed',
    createdAt: '2024-01-12T09:15:00Z',
  },
];

const statusOptions = [
  { value: 'all', label: 'All Appointments' },
  { value: 'pending', label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'completed', label: 'Completed' },
];

const departmentOptions = [
  { value: 'all', label: 'All Departments' },
  { value: 'general', label: 'General Medicine' },
  { value: 'cardiology', label: 'Cardiology' },
  { value: 'pediatrics', label: 'Pediatrics' },
  { value: 'emergency', label: 'Emergency Care' },
];

export default function AdminDashboard() {
  const { authState, logout } = useAdminAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch appointments when authenticated
  useEffect(() => {
    if (authState.isAuthenticated) {
      fetchAppointments();
    }
  }, [authState.isAuthenticated]);

  const fetchAppointments = async () => {
    try {
      setIsLoading(true);
      console.log('Fetching appointments...');
      const response = await fetch('/api/appointments');
      console.log('Fetch response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched appointments data:', data);
        setAppointments(data.appointments || []);
      } else {
        console.error('Failed to fetch appointments, status:', response.status);
        // Fallback to mock data if API fails
        setAppointments(mockAppointments);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
      // Fallback to mock data if API fails
      setAppointments(mockAppointments);
    } finally {
      setIsLoading(false);
      setLastUpdated(new Date().toLocaleString());
    }
  };

  // Show access denied if not authenticated
  if (!authState.isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <Shield className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Access Denied
            </h2>
            <p className="text-gray-600 mb-6">
              You need to be logged in as an admin to access this page.
            </p>
            <Button
              onClick={() => window.location.href = '/'}
              className="w-full"
            >
              Go to Homepage
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const filteredAppointments = appointments.filter(appointment => {
    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
    const matchesDepartment = departmentFilter === 'all' || 
      appointment.department.toLowerCase().includes(departmentFilter.toLowerCase());
    const matchesSearch = searchTerm === '' || 
      appointment.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesDepartment && matchesSearch;
  });

  const updateAppointmentStatus = async (id: string, newStatus: Appointment['status']) => {
    try {
      // Update in local state immediately for better UX
      setAppointments(prev => 
        prev.map(apt => 
          apt.id === id ? { ...apt, status: newStatus } : apt
        )
      );
      
      // Call server to persist and trigger email
      await fetch('/api/appointments/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });
      console.log(`Updated appointment ${id} status to ${newStatus}`);
    } catch (error) {
      console.error('Error updating appointment status:', error);
      // Revert the change if update failed
      fetchAppointments();
    }
  };

  const getStatusIcon = (status: Appointment['status']) => {
    switch (status) {
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'confirmed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-brand-700" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-brand-100 text-brand-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = {
    total: appointments.length,
    pending: appointments.filter(a => a.status === 'pending').length,
    confirmed: appointments.filter(a => a.status === 'confirmed').length,
    completed: appointments.filter(a => a.status === 'completed').length,
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Appointment Dashboard</h1>
              <p className="text-gray-600">Manage and track patient appointments</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                Last updated: {lastUpdated || 'Loading...'}
              </div>
              <Button
                onClick={fetchAppointments}
                variant="outline"
                className="flex items-center space-x-2 text-gray-600 hover:text-brand-700 hover:border-brand-100"
                disabled={isLoading}
              >
                <div className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`}>
                  <Search className="h-4 w-4" />
                </div>
                <span>{isLoading ? 'Refreshing...' : 'Refresh'}</span>
              </Button>
              <Button
                onClick={logout}
                variant="outline"
                className="flex items-center space-x-2 text-gray-600 hover:text-red-600 hover:border-red-300"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Appointments</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <Calendar className="h-8 w-8 text-brand-700" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Confirmed</p>
                  <p className="text-2xl font-bold text-green-600">{stats.confirmed}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-brand-700">{stats.completed}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-brand-700" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search appointments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-700"
                />
              </div>
              
              <Select
                options={statusOptions}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              />
              
              <Select
                options={departmentOptions}
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
              />
              
              <Button variant="outline" onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setDepartmentFilter('all');
              }}>
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Appointments List */}
        <Card>
          <CardHeader>
            <CardTitle>Appointments ({filteredAppointments.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-700 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading appointments...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAppointments.map((appointment) => (
                <div key={appointment.id} className="border rounded-lg p-6 hover:bg-gray-50 transition-colors">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Patient Info */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="font-semibold text-gray-900">
                          {appointment.firstName} {appointment.lastName}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{appointment.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{appointment.phone}</span>
                      </div>
                    </div>

                    {/* Appointment Details */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{appointment.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{appointment.time}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-900">{appointment.department}</span>
                      </div>
                      <div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </span>
                      </div>
                    </div>

                    {/* Reason */}
                    <div className="space-y-2">
                      <div className="flex items-start space-x-2">
                        <MessageSquare className="h-4 w-4 text-gray-500 mt-0.5" />
                        <span className="text-sm text-gray-600 line-clamp-3">{appointment.reason}</span>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">
                          Urgency: {appointment.urgency.charAt(0).toUpperCase() + appointment.urgency.slice(1)}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col space-y-2">
                      {appointment.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Confirm
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                            className="border-red-300 text-red-600 hover:bg-red-50"
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Cancel
                          </Button>
                        </>
                      )}
                      
                      {appointment.status === 'confirmed' && (
                        <Button
                          size="sm"
                          onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                          className="bg-brand-700 hover:bg-brand-800"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Mark Complete
                        </Button>
                      )}
                      
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              
                {filteredAppointments.length === 0 && (
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No appointments found matching your criteria.</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-8 flex justify-end">
          <a href="/admin/blogs" className="bg-brand-700 hover:bg-brand-800 text-white px-4 py-2 rounded-lg">Manage Blogs</a>
        </div>
      </div>
    </div>
  );
}
