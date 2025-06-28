import type { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ComponentGallery } from './pages/ComponentGallery';
import { ComponentPreview } from './pages/ComponentPreview';
import { AICommunication } from './features/ai-communication';


export const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AICommunication />} />
      <Route path="/components" element={<ComponentGallery />} />
      <Route path="/preview/:id" element={<ComponentPreview />} />
    </Routes>
  );
}
