export interface ApiResponse {
    results: Array<{
      id: number;
      name: string;
      status: string;
      species: string;
      type: string;
      gender: string;
      origin: Array<{
        name: string;
        url: string;
      }>;
      created: string;
      episode: string[];
      image: string;
      location: Array<{
        name: string;
        url: string;
      }>;
      url: string;
    }>;
    info: {
      pages: number;
      next: string | null;
      prev: string | null;
      count: number;
    }
    error?: string;
  }