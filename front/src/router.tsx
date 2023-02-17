import React from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { ConfigProvider } from '@arco-design/web-react';
import { useTranslation } from 'react-i18next';
import { lanFileForArco } from '@/i18n/i18nUtils';
import './i18n/config';
import "@arco-design/web-react/dist/css/arco.css";

import RouterProgress from '@/components/routerProgress';

const Home = React.lazy(() => import("@/pages/home"));
const Login = React.lazy(() => import("@/pages/login"));
const AllPromise = React.lazy(() => import("@/pages/AllPromise"));
const SelfContext = React.lazy(() => import("@/pages/context"));

const AppRouter = () => {
  const { i18n } = useTranslation();
  return (
    <div>
      <ConfigProvider locale={lanFileForArco(i18n.resolvedLanguage)}>
        <Router>
          <React.Suspense fallback={<RouterProgress />}>
            <Routes>
              {/* <Route path="/" element={<Layout />}> */}
              <Route path="/" element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="promise" element={<AllPromise />} />
              <Route path="context" element={<SelfContext />} />
              
              {/* <Route path="product" element={<Product />}>
                <Route path=":id" element={<ProductDetail />} />
              </Route>
              <Route
                path="user"
                element={
                  <RequiredAuth>
                    <User />
                  </RequiredAuth>
                }
              /> */}
              <Route path="*" element={<NoMatch />} />
              {/* </Route> */}
            </Routes>
          </React.Suspense>
        </Router>
      </ConfigProvider>
    </div>
    
  )
}


export default AppRouter;

function NoMatch() {
  return (
    <div>
      <h1>404</h1>
    </div>
  );
}