// Define only the properties your UI needs to reduce bundle size
interface CloudinaryClientSuccess {
  secure_url: string;
}

interface CloudinaryClientError {
  error: {
    message: string;
  };
}

export type CloudinaryClientResponse = CloudinaryClientSuccess | CloudinaryClientError;
