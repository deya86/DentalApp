const createDentist = async (dentist) => { 
    try {
        let response = await fetch('/api/dentists/', { 
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(dentist) 
        });
        return await response.json(); 
    } catch(err) {
        console.log(err); 
    }
  };
  
  const listDentists = async (signal) => { 
    try {
        let response = await fetch('/api/dentists/', { 
            method: 'GET',
            signal: signal, 
        });
        return await response.json(); 
    } catch(err) {
        console.log(err); 
    }
  };
  
  const readDentist = async (params, credentials, signal) => { 
    try {
        let response = await fetch('/api/dentists/' + params.dentistId, { 
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
  
  const updateDentist = async (params, credentials, dentist) => { 
    try {
        let response = await fetch('/api/dentists/' + params.id, { 
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials
            },
            body: JSON.stringify(dentist) 
        });
        return await response.json(); 
    } catch(err) {
        console.log(err); 
    }
  };
  
const removeDentist = async ({ dentistId }, { t }) => {
  try {
    const response = await fetch(`/api/dentists/${dentistId}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${t}`,  // Include JWT token
      },
    });

    // Check if deletion was successful
    if (!response.ok) {
      throw new Error(`Failed to delete dentist: ${response.statusText}`);
    }

    return await response.json();  // Return the API response
  } catch (error) {
    console.error('Error in removeDentist:', error.message || error);
    return { error: error.message || 'Server error' };
  }
};
  
  
  export { createDentist, listDentists, readDentist, updateDentist, removeDentist };
  