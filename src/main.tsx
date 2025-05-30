import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './App.tsx';
import ErrorBoundary from './components/errorBoundary.tsx';
import { TooltipProvider } from './components/ui/tooltip.tsx';
import { store } from './store/store';

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
              <App />
            </TooltipProvider>
          </QueryClientProvider>
        </Provider>
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>
);
