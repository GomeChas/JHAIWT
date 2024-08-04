import { useNavigate } from "react-router-dom";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Chip,
  Autocomplete,
  Box,
  IconButton,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import "./InputForm.css";
import {
  NumberOfSearchResultsOptions,
  JobCategoryInterface,
} from "./InputFormHelper";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../../shared/contexts";
import { baseBackendUrl } from "../../../shared/urls";

const validationSchema = yup.object({
  industryCategory: yup.string().required("Industry Category is required"),
  yearsOfExperience: yup
    .number()
    .integer("Please enter a number")
    .required("Years of experience is required"),
  city: yup.string().required("City is required"),
  relevantSkills: yup
    .array()
    .of(yup.string())
    .min(1, "Relevant skills are required")
    .required("Relevant skills are required"),
  academicCredentials: yup
    .string()
    .required("Academic credentials are required"),
  numberOfSearchResults: yup
    .number()
    .required("Number of Search Results is required"),
});

const InputForm = () => {
  const navigate = useNavigate();
  const { setSearchValues } = useContext(SearchContext);
  const [jobs, setJobs] = useState<JobCategoryInterface[]>([
    { id: 0, name: "API Unavailable" },
  ]);
  const [skills, setSkills] = useState<string[]>([]);
  const [open, setOpen] = useState(false); // Added open state

  const formik = useFormik({
    initialValues: {
      industryCategory: "",
      yearsOfExperience: "",
      city: "",
      relevantSkills: [] as string[],
      academicCredentials: "",
      numberOfSearchResults: NumberOfSearchResultsOptions.Option1,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setSearchValues({
        industryCategory: values.industryCategory,
        yearsOfExperience: values.yearsOfExperience,
        city: values.city,
        relevantSkills: values.relevantSkills.join(", "),
        academicCredentials: values.academicCredentials,
        numberOfSearchResults: `${values.numberOfSearchResults.toString()}`,
      });
  
      try {
        await axios.post(`${baseBackendUrl}/api/job/results`, values);
        navigate("/results");
      } catch (error) {
        console.error("Error submitting form data", error);
      }
    },
  });

  const fetchData = async () => {
    await axios({
      method: "GET",
      url: `/api/category`,
      baseURL: baseBackendUrl,
    })
      .then((response) => {
        const res = response.data;
        setJobs(res);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };

  const fetchTags = async () => {
    await axios({
      method: "GET",
      url: `/api/tag`,
      baseURL: baseBackendUrl,
    })
      .then((response) => {
        const res = response.data.map((tag: { name: string }) => tag.name);
        setSkills(res);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const handleRelevantSkillsChange = (event: any, value: string[]) => {
    formik.setFieldValue("relevantSkills", value);
  };

  const handleDropdownIconClick = (event: any) => {
    event.stopPropagation();
    setOpen(!open);
  };

  return (
    <div className="input-form-container">
      <form onSubmit={formik.handleSubmit}>
        <FormControl className="input-form">
          <TextField
            id="academicCredentials"
            name="academicCredentials"
            label="Academic Credentials"
            value={formik.values.academicCredentials}
            onChange={formik.handleChange}
            error={
              formik.touched.academicCredentials &&
              Boolean(formik.errors.academicCredentials)
            }
            helperText={
              formik.touched.academicCredentials &&
              formik.errors.academicCredentials
            }
          />
        </FormControl>

        <FormControl component="fieldset" className="input-form">
          <FormLabel component="legend">Number of Search Results</FormLabel>
          <RadioGroup
            row
            id="numberOfSearchResults"
            name="numberOfSearchResults"
            sx={{ justifyContent: "center" }}
            onChange={formik.handleChange}
            value={formik.values.numberOfSearchResults}
          >
            <FormControlLabel
              value={NumberOfSearchResultsOptions.Option1}
              control={<Radio />}
              label="5"
            />
            <FormControlLabel
              value={NumberOfSearchResultsOptions.Option2}
              control={<Radio />}
              label="10"
            />
            <FormControlLabel
              value={NumberOfSearchResultsOptions.Option3}
              control={<Radio />}
              label="15"
            />
          </RadioGroup>
        </FormControl>

        <Button
          color="primary"
          disabled={!formik.dirty}
          variant="contained"
          type="submit"
          sx={{ display: "flex", marginLeft: "auto", marginRight: "auto" }}
        >
          Search
        </Button>
      </form>
    </div>
  );
};

export default InputForm;