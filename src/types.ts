export interface ApiQuote {
  author: string;
  category: string;
  text: string;
}

export interface ApiQuotes {
  [id: string]: ApiQuote;
}

export interface Quote extends ApiQuote{
  id: string;
}

export interface QuoteMutation {
  author: string;
  category: string;
  text: string;
}

export const categories = [
  {title: 'Star Wars', id: 'star-wars'},
  {title: 'Famous people', id: 'famous-people'},
  {title: 'Saying', id: 'saying'},
  {title: 'Humour', id: 'humour'},
  {title: 'Motivational', id: 'motivational'},
]
