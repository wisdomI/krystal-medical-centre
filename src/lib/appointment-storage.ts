// Hybrid storage for appointments - works on both client and server
// In a real application, this would be replaced with a database

interface Appointment {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  department: string;
  doctor?: string;
  reason: string;
  urgency: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
}

// Server-side storage (in-memory)
let serverAppointments: Appointment[] = [];

// Client-side storage key
const STORAGE_KEY = 'krystal_appointments';

class AppointmentStorage {
  addAppointment(appointment: Omit<Appointment, 'id' | 'status' | 'createdAt'>): Appointment {
    const newAppointment: Appointment = {
      ...appointment,
      id: `APPT-${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    
    // Add to server storage
    serverAppointments.push(newAppointment);
    
    // Also save to client storage if available
    if (typeof window !== 'undefined') {
      try {
        const existing = this.getAllAppointments();
        existing.push(newAppointment);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    }
    
    return newAppointment;
  }

  getAllAppointments(): Appointment[] {
    // If on client side, try to get from localStorage first
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const clientAppointments = JSON.parse(stored);
          // Merge with server appointments to avoid duplicates
          const allAppointments = [...serverAppointments];
          clientAppointments.forEach((clientApp: Appointment) => {
            if (!allAppointments.find(app => app.id === clientApp.id)) {
              allAppointments.push(clientApp);
            }
          });
          return allAppointments;
        }
      } catch (error) {
        console.error('Error loading from localStorage:', error);
      }
    }
    
    // Fallback to server storage
    return [...serverAppointments];
  }

  updateAppointmentStatus(id: string, status: Appointment['status']): boolean {
    // Update server storage
    const serverAppointment = serverAppointments.find(apt => apt.id === id);
    if (serverAppointment) {
      serverAppointment.status = status;
    }
    
    // Update client storage
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const appointments = JSON.parse(stored);
          const appointment = appointments.find((apt: Appointment) => apt.id === id);
          if (appointment) {
            appointment.status = status;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
          }
        }
      } catch (error) {
        console.error('Error updating localStorage:', error);
      }
    }
    
    return serverAppointment !== undefined;
  }

  deleteAppointment(id: string): boolean {
    // Remove from server storage
    const serverIndex = serverAppointments.findIndex(apt => apt.id === id);
    if (serverIndex !== -1) {
      serverAppointments.splice(serverIndex, 1);
    }
    
    // Remove from client storage
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const appointments = JSON.parse(stored);
          const filtered = appointments.filter((apt: Appointment) => apt.id !== id);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
        }
      } catch (error) {
        console.error('Error deleting from localStorage:', error);
      }
    }
    
    return serverIndex !== -1;
  }

  // Method to sync client storage with server
  syncWithServer(serverAppointments: Appointment[]) {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(serverAppointments));
      } catch (error) {
        console.error('Error syncing with server:', error);
      }
    }
  }
}

// Create a singleton instance
export const appointmentStorage = new AppointmentStorage();