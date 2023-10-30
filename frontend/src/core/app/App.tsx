import React from 'react';

import MainLayout from 'src/components/MainLayout';
import UserSession from 'src/components/UserSession';

const App = (): React.JSX.Element => {
  return (
    <MainLayout>
      <UserSession />
    </MainLayout>
  );
};

export default App;
