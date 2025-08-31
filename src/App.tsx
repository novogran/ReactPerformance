import { lazy, Suspense } from 'react';
import './App.css';
import { Spinner } from './components/Spinner/Spinner';

const ListOfEmissionsData = lazy(
  () => import('./components/ListOfEmissionsData/ListOfEmissionsData')
);

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <ListOfEmissionsData />
    </Suspense>
  );
}

export default App;
