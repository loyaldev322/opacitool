// Netlify Serverless Function
// Accessible at /.netlify/functions/test or /api/test (via redirect)
export const handler = async () => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: 'API test successful!',
      timestamp: new Date().toISOString(),
    }),
  };
};

