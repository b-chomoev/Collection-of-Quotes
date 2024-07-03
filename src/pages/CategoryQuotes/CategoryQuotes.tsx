import {useCallback, useEffect, useState} from "react";
import axiosApi from "../../axiosApi";
import {ApiQuotes, Quote, categories} from "../../types";
import {Box, Button, Card, CardActions, CardContent, CircularProgress, Grid, Typography} from "@mui/material";
import {Link, useParams} from "react-router-dom";

const CategoryQuotes = () => {
  const {category} = useParams();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchQuotes = useCallback(async () => {
    setIsLoading(true);
    const response = await axiosApi.get<ApiQuotes | null>(`/quotes.json?orderBy="category"&equalTo="${category}"`);

    const quotesResponse = response.data;

    if (quotesResponse !== null) {
      const quotes: Quote[] = Object.keys(quotesResponse).map((id: string) => {
        return {
          ...quotesResponse[id],
          id
        };
      });

      setQuotes(quotes);
    } else {
      setQuotes([]);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    void fetchQuotes();
  }, [fetchQuotes]);

  const deleteQuote = async (quoteId: string) => {
    try {
      await axiosApi.delete(`/quotes/${quoteId}.json`);
      setQuotes((prevQuotes) => prevQuotes.filter((quote) => quote.id !== quoteId));
    } catch (error) {
      console.error("Error deleting quote:", error);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        {!isLoading && quotes.length > 0 && (
          <Box>
            <li style={{ marginTop: '20px' }}>
              <a href="/" style={{ color: "skyblue", textDecoration: "none" }}>All</a>
            </li>
            {categories.map(category => (
              <li key={category.id}>
                <a href={`/quotes/${category.id}`} style={{ color: "skyblue", textDecoration: "none" }}>
                  {category.title}
                </a>
              </li>
            ))}
          </Box>
        )}
      </Grid>
      <Grid item xs={9}>
        {isLoading && (
          <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100px', width: '100%'}}>
            <CircularProgress />
          </Box>
        )}
        {quotes.length === 0 && !isLoading && (
          <Typography variant='h2'>Sorry, there are no quotes right now! Go to create new quote :)</Typography>
        )}
        {quotes.map(quote => (
          <Box mb={2}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {quote.text}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Category: {quote.category}
                </Typography>
                <Typography variant='caption'>
                  {quote.author}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => deleteQuote(quote.id)}>Delete</Button>
                <Button size="small" component={Link} to={`/quotes/${quote.id}/edit`}>Edit</Button>
              </CardActions>
            </Card>
          </Box>
        ))}
      </Grid>
    </Grid>
  );
};

export default CategoryQuotes;