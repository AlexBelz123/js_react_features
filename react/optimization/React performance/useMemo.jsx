import React from 'react';
import { fetchData } from './helpers';

function calculateResult(numbers) {
  // some sync heavy logic wich takes 4 seconds
  return Math.ceil(((3 * 4) / 3) * numbers);
}

const App = () => {
  const [data, setData] = React.useMemo(null);
  //   if we will remove useMemo - it will recalculate result every time, even when data is the same
  const result = react.useMemo(
    () => calculateResult(data.numbers),
    [data.numbers]
  );

  return (
    <>
      <div
        onClick={() => {
          // ... async stuff etc.
          fetchData();
          setData(data);
        }}
      >
        Click for new data
      </div>
      <div>Here is your calculated result - {result}</div>
    </>
  );
};

export default App;
