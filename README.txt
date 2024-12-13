# DentalAPP

DentalAPP is a full-stack web application designed to streamline dental clinic operations. Users can manage patient records, schedule appointments, and track clinic activities through an intuitive interface. Built using the MERN stack (MongoDB, Express.js, React.js, Node.js), it ensures scalability and efficiency.

## Features
- **User Authentication**: Secure login and user management.
- **Patient Management**: Add, update, view, and delete patient records.
- **Appointment Scheduling**: Manage appointments efficiently with an interactive calendar.
- **Responsive Design**: Optimized for desktop and mobile devices.

## Technologies Used

### Frontend:
- **React.js**: For building a dynamic and responsive user interface.
- **Axios**: For handling HTTP requests.
- **React Router**: For seamless navigation.
- **CSS**: For styling and layout.

### Backend:
- **Node.js**: For server-side logic.
- **Express.js**: For building RESTful APIs.
- **MongoDB**: For database management.
- **Mongoose**: For MongoDB object modeling.
- **bcrypt**: For password hashing.
- **dotenv**: For managing environment variables.

## Setup Instructions

### Prerequisites
1. Install [Node.js](https://nodejs.org/).
2. Install [MongoDB](https://www.mongodb.com/try/download/community).
3. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

### Environment Variables

Create a `.env` file in the root directories for both frontend and backend. Include the following variables:

#### Backend `.env`:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

#### Frontend `.env`:
```env
REACT_APP_API_URL=http://localhost:4000
```

## Running the Application

### Step 1: Install Dependencies

Navigate to both the backend and frontend directories and run the following command to install dependencies:
```bash
npm install
```

### Step 2: Start the Backend

Start the server by navigating to the backend directory and running:
```bash
node server.js
```

### Step 3: Start the Frontend

Navigate to the frontend directory and start the development server:
```bash
npm run dev
```

The application will be accessible at `http://localhost:3000`.

## Folder Structure

### Backend
```
server/
├── models/              # Mongoose schemas for MongoDB
│   ├── Patient.js       # Schema for patient records
│   └── Appointment.js   # Schema for appointments
├── routes/              # API routes
│   ├── authRoutes.js    # User authentication routes
│   ├── patientRoutes.js # Patient management routes
│   └── appointmentRoutes.js # Appointment routes
├── .env                 # Backend environment variables
├── index.js             # Entry point for the backend server
└── package.json         # Backend dependencies and scripts
```

### Frontend
```
client/
├── src/
│   ├── components/       # Reusable components
│   │   ├── Navbar.jsx    # Navigation bar
│   │   ├── Footer.jsx    # Footer component
│   │   ├── PatientCard.jsx # Patient record card
│   │   └── AppointmentCard.jsx # Appointment card
│   ├── pages/            # Main pages
│   │   ├── Home.jsx      # Homepage
│   │   ├── Patients.jsx  # Patient management page
│   │   ├── Appointments.jsx # Appointment management page
│   │   └── Profile.jsx   # User profile page
│   ├── App.css           # Global styles
│   ├── App.jsx           # Main application component
│   └── index.js          # Entry point for the React app
├── .env                  # Frontend environment variables
└── package.json          # Frontend dependencies and scripts
```

## API Endpoints

### User Management
- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Login a user.

### Patient Management
- `GET /api/patients`: Retrieve all patients.
- `POST /api/patients`: Add a new patient.
- `PUT /api/patients/:id`: Update patient details.
- `DELETE /api/patients/:id`: Delete a patient.

### Appointment Management
- `GET /api/appointments`: Retrieve all appointments.
- `POST /api/appointments`: Schedule a new appointment.
- `PUT /api/appointments/:id`: Update appointment details.
- `DELETE /api/appointments/:id`: Cancel an appointment.

## Usage Instructions

1. **Register and Login**
   - Register with your email and password.
   - Login to access features like patient and appointment management.

2. **Manage Patients**
   - Add new patients.
   - Update or delete existing patient records.

3. **Schedule Appointments**
   - Create new appointments.
   - View, update, or cancel existing appointments.

4. **Dentist Profiles**
   - Create new dentist profiles
   - View, Update and delete dentist profile

5. **Invoices**
   - Generate invoices for clients
   - Delete and Update Invoices
