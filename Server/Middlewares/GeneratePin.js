// Middleware function to generate a PIN based on the specified logic
const generatePinMiddleware = (req, res, next) => {
  try {
    const currentDate = new Date();
    
    // Extract year and month from the current date
    const year = currentDate.getFullYear().toString().slice(2);
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);

    // Check if the month has changed
    if (req.app.locals.currentMonth !== month) {
      // If the month has changed, reset the counter to 1
      req.app.locals.pinCounter = 1;
      req.app.locals.currentMonth = month;
    }

    // Create a counter to keep track of the PIN
    let counter = req.app.locals.pinCounter || 1;

    // Format the counter with leading zeros
    const formattedCounter = ('0000' + counter).slice(-4);

    // Construct the PIN with the specified format
    const pin = `${year}${month}-${formattedCounter}`;

    // Update the counter for the next PIN
    req.app.locals.pinCounter = counter + 1;

    // Attach the generated PIN to the request object
    req.body.generatedPin = pin;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Error generating PIN:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default generatePinMiddleware;
