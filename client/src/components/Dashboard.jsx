import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Box, Typography } from "@mui/material";
import loading from "../assets/robload.gif";
import { useEffect, useState } from "react";
import "../css/Dashboard.css";

const Dashboard = ({ locationData = {} }) => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:3000/dashboard")
      .then((res) => {
        if (res.data !== "Login success") {
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const initialFormData = locationData.formData || {
    from: "",
    to: "",
    days: "",
    food: [],
    hobbies: [],
    places: [],
    other: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [showLoading, setShowLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const toggleSelection = (field, value) => {
    setFormData((prevState) => {
      const newValue = prevState[field].includes(value)
        ? prevState[field].filter((item) => item !== value)
        : [...prevState[field], value];
      return {
        ...prevState,
        [field]: newValue,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowLoading(true);
    try {
      const responsePlan = await axios.get(
        `http://localhost:3000/api/trip-plan/${formData.from}/${formData.to}/${formData.days}/${formData.food.join(',')}/${formData.places.join(',')}/${formData.hobbies.join(',')}/`
      );
      console.log("API Response:", responsePlan.data);
      navigate("/result", { state: { tripPlan: responsePlan.data } });
    } catch (error) {
      console.error("Error fetching trip plan:", error);
    } finally {
      setShowLoading(false);
    }
  };

  if (!showLoading) {
    return (
      <>
        <div className="container-form">
          <h1>Plan your Epic Trip</h1>
        </div>
        <div className="container-form">
          <form onSubmit={handleSubmit}>
            <TextField
              label="Where From"
              variant="outlined"
              name="from"
              value={formData.from}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Where To"
              variant="outlined"
              name="to"
              value={formData.to}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Number of days"
              variant="outlined"
              name="days"
              type="number"
              value={formData.days}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <Box mt={2}>
              <Typography
                sx={{ fontFamily: '"Poppins", sans-serif', marginBottom: "5px" }}
              >
                Food:
              </Typography>
              {[
                "Japanese",
                "Chinese",
                "American",
                "Italian",
                "Mediterranean",
              ].map((food) => (
                <Button
                  variant={
                    formData.food.includes(food) ? "contained" : "outlined"
                  }
                  color="primary"
                  onClick={() => toggleSelection("food", food)}
                  key={food}
                  sx={{
                    borderRadius: "14px",
                    color: formData.food.includes(food) ? "white" : "#281e41",
                    backgroundColor: formData.food.includes(food)
                      ? "#281e41"
                      : "white",
                    padding: "10px 20px",
                    textDecoration: "none",
                    border: formData.food.includes(food) ? "none" : "solid",
                    fontSize: "1rem",
                    fontWeight: "lighter",
                    fontFamily: '"Poppins", sans-serif',
                    marginRight: "10px",
                    "&:last-child": {
                      marginRight: "0",
                    },
                  }}
                >
                  {food}
                </Button>
              ))}
            </Box>
            <Box mt={2}>
              <Typography
                sx={{ fontFamily: '"Poppins", sans-serif', marginBottom: "5px" }}
              >
                Hobbies:
              </Typography>
              {["Sight-seeing", "Hiking", "Reading", "Sport"].map((hobby) => (
                <Button
                  variant={
                    formData.hobbies.includes(hobby) ? "contained" : "outlined"
                  }
                  color="primary"
                  onClick={() => toggleSelection("hobbies", hobby)}
                  key={hobby}
                  sx={{
                    borderRadius: "14px",
                    color: formData.hobbies.includes(hobby) ? "white" : "#281e41",
                    backgroundColor: formData.hobbies.includes(hobby)
                      ? "#281e41"
                      : "white",
                    padding: "10px 20px",
                    textDecoration: "none",
                    border: formData.hobbies.includes(hobby) ? "none" : "solid",
                    fontSize: "1rem",
                    fontWeight: "lighter",
                    fontFamily: '"Poppins", sans-serif',
                    marginRight: "10px",
                    "&:last-child": {
                      marginRight: "0",
                    },
                  }}
                >
                  {hobby}
                </Button>
              ))}
            </Box>
            <Box mt={2}>
              <Typography
                sx={{ fontFamily: '"Poppins", sans-serif', marginBottom: "5px" }}
              >
                Places:
              </Typography>
              {[
                "Museums",
                "Theatre",
                "Beach",
                "Hidden Gems",
                "Must-see Attractions",
              ].map((place) => (
                <Button
                  variant={
                    formData.places.includes(place) ? "contained" : "outlined"
                  }
                  color="primary"
                  onClick={() => toggleSelection("places", place)}
                  key={place}
                  sx={{
                    borderRadius: "14px",
                    color: formData.places.includes(place) ? "white" : "#281e41",
                    backgroundColor: formData.places.includes(place)
                      ? "#281e41"
                      : "white",
                    padding: "10px 20px",
                    textDecoration: "none",
                    border: formData.places.includes(place) ? "none" : "solid",
                    fontSize: "1rem",
                    fontWeight: "lighter",
                    fontFamily: '"Poppins", sans-serif',
                    marginRight: "10px",
                    "&:last-child": {
                      marginRight: "0",
                    },
                  }}
                >
                  {place}
                </Button>
              ))}
            </Box>
            <Box mt={2}>
              <TextField
                label="What else would you want us to take into consideration? (Optional)"
                variant="outlined"
                name="other"
                value={formData.other}
                onChange={handleInputChange}
                fullWidth
              />
            </Box>
            <Box mt={2}>
              <Button
                className="btn"
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  borderRadius: "14px",
                  color: "white",
                  backgroundColor: "#281e41",
                  padding: "10px 20px",
                  textDecoration: "none",
                  border: "none",
                  fontSize: "1rem",
                  fontWeight: "lighter",
                  fontFamily: '"Poppins", sans-serif',
                  marginRight: "10px",
                  marginBottom: "30px",
                  "&:last-child": {
                    marginRight: "0",
                  },
                  marginTop: "20px",
                }}
              >
                Let the magic begin
              </Button>
            </Box>
          </form>
        </div>
      </>
    );
  } else {
    return (
      <>
        <img src={loading} style={{ width: "100%" }} alt="Loading..." />
      </>
    );
  }
};

export default Dashboard;
