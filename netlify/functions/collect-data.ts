import type { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const data = JSON.parse(event.body || '{}');
    
    // Here you receive:
    // - executionResult: Result of executed JavaScript code
    // - executionError: Any errors during execution
    // - systemData: All collected browser/PC environment data
    // - executedCode: The code that was executed
    // - timestamp: When it was executed
    
    console.log('Received data from user PC:', {
      timestamp: data.timestamp,
      executionResult: data.executionResult,
      executionError: data.executionError,
      systemData: data.systemData,
      formData: data.systemData?.formData,
    });

    // Store in database or process as needed
    // await saveToDatabase(data);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        success: true,
        message: 'Data received successfully',
        timestamp: new Date().toISOString(),
      }),
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        success: false,
        error: error.message,
      }),
    };
  }
};

