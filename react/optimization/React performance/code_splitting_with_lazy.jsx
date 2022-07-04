import React, { Suspense } from 'react';

// https://reactjs.org/docs/code-splitting.html#reactlazy

const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
