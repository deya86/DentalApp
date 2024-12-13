const createAppointment = async (appointment) => { 
  try {
      let response = await fetch('/api/appointments/', { 
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json' 
          },
          body: JSON.stringify(appointment) 
      });
      return await response.json(); 
  } catch(err) {
      console.log(err); 
  }
};

const listAppointments = async (signal) => { 
  try {
      let response = await fetch('/api/appointments/', { 
          method: 'GET',
          signal: signal, 
      });
      return await response.json(); 
  } catch(err) {
      console.log(err); 
  }
};

const readAppointment = async (params, credentials, signal) => { 
  try {
      let response = await fetch('/api/appointments/' + params.appointmentId, { 
          method: 'GET',
          signal: signal, 
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + credentials.t 
          }
      });
      return await response.json(); 
  } catch(err) {
      console.log(err); 
  }
};

const updateAppointment = async (params, credentials, appointment) => { 
  try {
      let response = await fetch('/api/appointments/' + params.appointmentId, { 
          method: 'PUT',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + credentials.token 
          },
          body: JSON.stringify(appointment) 
      });
      return await response.json(); 
  } catch(err) {
      console.log(err); 
  }
};

const removeAppointment = async (params, credentials) => { 
    try {
      const response = await fetch(`/api/appointments/${params.appointmentId}`, { 
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${credentials?.token || ''}`
        }
      });
  
      // Ensure a proper response check
      if (!response.ok) {
        throw new Error(`Failed to delete appointment: ${response.statusText}`);
      }
  
      return await response.json(); 
    } catch (err) {
      console.error('Error in removeAppointment:', err.message);
      return { error: err.message };
    }
  };

export { createAppointment, listAppointments, readAppointment, updateAppointment, removeAppointment };
