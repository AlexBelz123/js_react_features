import React from 'react';

// lets say Child component have a lot of rerenders and cause bad UX for some reason
// so we want to prevent this bad UX and make less rerenders, right? How we can achieve it?
// of cause we can rewrite our code logics, but in our case we will use React.memo with react.useCallback

const App = () => {
  const [formData, setFormData] = React.useState();

  const handleSubmit = React.useCallback((data) => {
    // some logic
    // setFormData etc.
  }, []);

  return (
    <div>
      App
      <Child formData={formData} handleSubmit={handleSubmit} />
    </div>
  );
};

// Form component (Child)
let Child = ({ formData, handleSubmit }) => {
  // some effects

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" />
      <button type="submit"></button>
    </form>
  );
};
// if props are the same - the component will not be rerendered (React.memo)
// so why we are using useCallback on line 10 ? Because handleSubmit is a function, whicn means
// that on each render it will create new reference for this function, so every time our
// <Child /> component will take new reference (new prop) and make a rerender. UseCallback memoizes
// this reference and prevent child component from unnecessary rerenders
// (the reference can be changed if we will provide some dependencies to empty array (line 13))
Child = React.memo(Child);

export default App;
