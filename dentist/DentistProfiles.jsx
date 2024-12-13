import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Card, CardContent, CardHeader, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, makeStyles } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import { createDentist, listDentists, updateDentist, removeDentist } from "./api-dentist.js";
import auth from "../lib/auth-helper.js";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 800,
    margin: "auto",
    marginTop: theme.spacing(5),
    padding: theme.spacing(3),
  },
  title: {
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
  table: {
    minWidth: 650,
    marginTop: theme.spacing(5),
  },
}));

const DentistProfiles = () => {
  const classes = useStyles();
  const [dentists, setDentists] = useState([]);
  const [dentist, setDentist] = useState({
    dentistID: "",
    firstName: "",
    lastName: "",
    specialization: "",
    phone: "",
    email: "",
    workingHours: "",
  });
  const jwt = auth.isAuthenticated();

  useEffect(() => {
    fetchDentists();
  }, []);

  const fetchDentists = async () => {
    try {
      const response = await listDentists();
      setDentists(response);
    } catch (error) {
      console.error("Error fetching dentists:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDentist({
      ...dentist,
      [name]: value,
    });
  };

  const handleAddDentist = async (e) => {
    e.preventDefault();
    try {
      const response = await createDentist(dentist);
      if (response) {
        fetchDentists();
        setDentist({
          dentistID: "",
          firstName: "",
          lastName: "",
          specialization: "",
          phone: "",
          email: "",
          workingHours: "",
        });
      } else {
        console.error("Error adding dentist");
      }
    } catch (error) {
      console.error("Error adding dentist:", error);
    }
  };
  const handleUpdateDentist = async (e) => {
    e.preventDefault();
    console.log("Updating dentist:", dentist);
    try {
      const response = await updateDentist({ id: dentist.id }, jwt.token, dentist);
      if (response && !response.error) {
        fetchDentists();
        setDentist({
          dentistID: "",
          firstName: "",
          lastName: "",
          specialization: "",
          phone: "",
          email: "",
          workingHours: "",
        });
        setButtonState("Add Dentist");
      } else {
        console.error("Error updating dentist:", response.error);
      }
    } catch (error) {
      console.error("Error updating dentist:", error);
    }
  };
  const handleDeleteDentist = async (id) => {
    try {
      console.log({ jwt: jwt.token });
      const response = await fetch(`/api/dentists/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt.token}`, // Use the token here
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete dentist: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Dentist successfully deleted:", result.message || result);
      fetchDentists(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting dentist:", error.message || error);
    }
  };

  const handleEditDentist = (dentist) => {
    setButtonState("Update Dentist");
    setDentist({
      dentistID: dentist.dentistID,
      firstName: dentist.firstName,
      lastName: dentist.lastName,
      specialization: dentist.specialization,
      phone: dentist.phone,
      email: dentist.email,
      workingHours: dentist.workingHours,
      id: dentist._id,
    });
  };

  const [buttonState, setButtonState] = useState("Add Dentist");
  return (
    <div>
      <Card className={classes.card}>
        <CardHeader className={classes.title} title="Dentist Profiles" />
        <CardContent>
          <form onSubmit={buttonState === "Add Dentist" ? handleAddDentist : handleUpdateDentist} className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Dentist ID" name="dentistID" value={dentist.dentistID} onChange={handleChange} required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="First Name" name="firstName" value={dentist.firstName} onChange={handleChange} required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Last Name" name="lastName" value={dentist.lastName} onChange={handleChange} required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Specialization" name="specialization" value={dentist.specialization} onChange={handleChange} required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Phone" name="phone" value={dentist.phone} onChange={handleChange} required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Email" name="email" type="email" value={dentist.email} onChange={handleChange} required />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Working Hours" name="workingHours" value={dentist.workingHours} onChange={handleChange} required />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  {buttonState}
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
      <TableContainer component={Paper} className={classes.table}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Dentist ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Specialization</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Working Hours</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dentists.map((dentist) => (
              <TableRow key={dentist._id}>
                <TableCell>{dentist.dentistID}</TableCell>
                <TableCell>{dentist.firstName}</TableCell>
                <TableCell>{dentist.lastName}</TableCell>
                <TableCell>{dentist.specialization}</TableCell>
                <TableCell>{dentist.phone}</TableCell>
                <TableCell>{dentist.email}</TableCell>
                <TableCell>{dentist.workingHours}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEditDentist(dentist)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteDentist(dentist._id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DentistProfiles;
