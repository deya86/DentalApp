import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Card, CardContent, CardHeader, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, makeStyles } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import { deleteTreatmentplans } from "./api-treatmentplan";
import auth from "../lib/auth-helper";

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

const TreatmentPlanManagement = () => {
  const classes = useStyles();
  const jwt = auth.isAuthenticated();
  const [treatmentPlans, setTreatmentPlans] = useState([]);
  const [treatmentPlan, setTreatmentPlan] = useState({
    treatmentPlanID: "",
    patientID: "",
    firstName: "",
    lastName: "",
    followups: "",
    dateCreated: "",
    treatmentDetails1: "",
  });

  useEffect(() => {
    fetchTreatmentPlans();
  }, []);

  const fetchTreatmentPlans = async () => {
    try {
      const response = await fetch("/api/treatmentplans");
      const data = await response.json();
      setTreatmentPlans(data);
    } catch (error) {
      console.error("Error fetching treatment plans:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTreatmentPlan({
      ...treatmentPlan,
      [name]: value,
    });
  };

  const handleAddTreatmentPlan = async (e) => {
    e.preventDefault();
    const formattedTreatmentPlan = {
      treatmentPlanID: treatmentPlan.treatmentPlanID,
      patientID: treatmentPlan.patientID,
      firstName: treatmentPlan.firstName,
      lastName: treatmentPlan.lastName,
      followups: treatmentPlan.followups,
      dateCreated: new Date(treatmentPlan.dateCreated).toISOString(),
      treatmentDetails1: treatmentPlan.treatmentDetails1,
    };

    console.log("Submitting:", formattedTreatmentPlan); // Log the payload to check its structure

    try {
      const response = await fetch("/api/treatmentplans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedTreatmentPlan),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      fetchTreatmentPlans();
      setTreatmentPlan({
        treatmentPlanID: "",
        patientID: "",
        firstName: "",
        lastName: "",
        followups: "",
        dateCreated: "",
        treatmentDetails1: "",
      });
    } catch (error) {
      console.error("Error adding or updating treatment plan:", error);
    }
  };

  const handleDeleteTreatmentPlan = async (id) => {
    try {
      const response = deleteTreatmentplans({ id }, jwt.token);

      if (response.ok) {
        setTreatmentPlans((prevPlans) => prevPlans.filter((plan) => plan._id !== id)); // Update the UI optimistically
      } else {
        console.error("Error deleting treatment plan");
      }
    } catch (error) {
      console.error("Error deleting treatment plan:", error);
    }
  };

  const handleEditTreatmentPlan = (plan) => {
    setTreatmentPlan({
      treatmentPlanID: plan.treatmentPlanID,
      patientID: plan.patientID,
      firstName: plan.firstName,
      lastName: plan.lastName,
      followups: plan.followups,
      dateCreated: plan.dateCreated.substring(0, 10), // Ensure date is in 'YYYY-MM-DD' format
      treatmentDetails1: plan.treatmentDetails1,
      id: plan._id,
    });
  };

  return (
    <div>
      <Card className={classes.card}>
        <CardHeader className={classes.title} title="Treatment Plan Management" />
        <CardContent>
          <form onSubmit={handleAddTreatmentPlan} className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Treatment Plan ID" name="treatmentPlanID" value={treatmentPlan.treatmentPlanID} onChange={handleChange} required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Patient ID" name="patientID" value={treatmentPlan.patientID} onChange={handleChange} required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="First Name" name="firstName" value={treatmentPlan.firstName} onChange={handleChange} required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Last Name" name="lastName" value={treatmentPlan.lastName} onChange={handleChange} required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Follow-ups" name="followups" value={treatmentPlan.followups} onChange={handleChange} required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Date Created"
                  name="dateCreated"
                  type="date"
                  value={treatmentPlan.dateCreated}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Treatment Details" name="treatmentDetails1" value={treatmentPlan.treatmentDetails1} onChange={handleChange} required />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  {treatmentPlan._id ? "Update Treatment Plan" : "Add Treatment Plan"}
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
              <TableCell>Treatment Plan ID</TableCell>
              <TableCell>Patient ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Follow-ups</TableCell>
              <TableCell>Treatment Details</TableCell>
              <TableCell>Date Created</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {treatmentPlans.map((plan) => (
              <TableRow key={plan._id}>
                <TableCell>{plan.treatmentPlanID}</TableCell>
                <TableCell>{plan.patientID}</TableCell>
                <TableCell>{plan.firstName}</TableCell>
                <TableCell>{plan.lastName}</TableCell>
                <TableCell>{plan.followups}</TableCell>
                <TableCell>{plan.treatmentDetails1}</TableCell>
                <TableCell>{plan.dateCreated.substring(0, 10)}</TableCell> {/* Ensure date is in 'YYYY-MM-DD' format */}
                <TableCell align="right">
                  <IconButton onClick={() => handleEditTreatmentPlan(plan)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteTreatmentPlan(plan._id)}>
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

export default TreatmentPlanManagement;
