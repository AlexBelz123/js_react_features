import axios from 'axios';

export default axios.create({
  baseUR: 'https://...',
  headers: {
    'Content-Type': 'application/json',
  },
  // ... here define your default sruff
});
