export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({ message: 'Validation Error', errors });
  }

  if (err.code === 11000) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  res.status(500).json({ message: 'Something went wrong!' });
};