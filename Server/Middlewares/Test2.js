// standaloneGeneratePin.js

import generatePinMiddleware from './GeneratePin.js';

// Mock objects for request and response
const req = {};
const res = {
  status: (code) => {
    console.log(`Status: ${code}`);
    return res;
  },
  json: (data) => {
    console.log(data);
  },
  app: {
    locals: {},
  },
};

// Call the middleware with mock request and response
generatePinMiddleware(req, res, () => {
  // Middleware has completed, and you can access the generated PIN from req.generatedPin
  console.log('Generated PIN:', req.generatedPin);
});

// This is a simple example to simulate the middleware execution.
// In a real server environment, the middleware would be executed in response to an HTTP request.
