import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import {QuoteMutation, categories, ApiQuote} from "../../types";
import {
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography
} from "@mui/material";
import axiosApi from "../../axiosApi";
import {useNavigate, useParams} from "react-router-dom";
import {enqueueSnackbar} from "notistack";
import {LoadingButton} from "@mui/lab";

const initialState = {
  author: "",
  category: "",
  text: "",
};

const MutateQuote = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const [gameMutation, setGameMutation] = useState<QuoteMutation>(initialState);
  const [isMutating, setIsMutating] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const fetchOneGame = useCallback(async (id: string) => {
    setIsFetching(true);
    const response = await axiosApi.get<ApiQuote | null>(`/quotes/${id}.json`);

    if (response.data) {
      setGameMutation({
        ...response.data,
      });
    }

    setIsFetching(false);
  }, []);

  useEffect(() => {
    if (id !== undefined) {
      void fetchOneGame(id);
    } else {
      setGameMutation(initialState);
    }
  }, [id, fetchOneGame]);

  const onFieldChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    setGameMutation((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setIsMutating(true);
      const gameData = {
        ...gameMutation,
      };

      if (id !== undefined) {
        await axiosApi.put(`/quotes/${id}.json`, gameData);
      } else {
        await axiosApi.post("/quotes.json", gameData);
      }

      navigate("/");
    } catch (e) {
      enqueueSnackbar({variant: "error", message: "Something went wrong"});
    } finally {
      setIsMutating(false);
    }
  };

  return isFetching ? (
    <CircularProgress/>
  ) : (
    <>
      <Grid container component="form" direction="column" spacing={2} onSubmit={onSubmit}>
        <Grid item>
          <Typography variant="h5">{id ? "Edit a Game" : "Create a new Game!"}</Typography>
        </Grid>
        <Grid item>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Select category for the Quote</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="category"
              value={gameMutation.category}
              label="quote"
              onChange={onFieldChange} required
            >
              {categories.map(category => <MenuItem key={category.id} value={category.id}>{category.title}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <TextField
            label="Author"
            variant="outlined"
            fullWidth
            name="author"
            value={gameMutation.author}
            onChange={onFieldChange} required
          />
        </Grid>
        <Grid item>
          <TextField
            label="Description"
            multiline
            minRows={3}
            variant="outlined"
            fullWidth
            name="text"
            value={gameMutation.text}
            onChange={onFieldChange}
            required
          />
        </Grid>
        <Grid item>
          <LoadingButton
            loading={isMutating}
            variant="contained"
            type="submit"
          >
            Save
          </LoadingButton>
        </Grid>
      </Grid>
    </>
  );
};

export default MutateQuote;