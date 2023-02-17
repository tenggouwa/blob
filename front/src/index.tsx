import React from 'react';
import ReactDOM from 'react-dom/client';

import AppRouter from '@/router';
import './index.scss';

const renderWithHotReload = () => {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<AppRouter />);
}

/*热更新*/
renderWithHotReload();

if (module.hot) {
  module.hot.accept("@/router", () => {
    renderWithHotReload();
  });
}
