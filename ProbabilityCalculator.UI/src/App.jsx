import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProbabilityCalculator from './pages/probabilityCalculator';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProbabilityCalculator />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
