import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Nav from './Nav';
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import LoginForm from './LoginForm';
import CreateAccountForm from './CreateAccountForm';
import Footer from './Footer';

function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");
  return (
    <AuthProvider baseUrl={process.env.REACT_APP_API_HOST}>
      <BrowserRouter basename={basename}>
        <header style={{ position: "sticky", top: "0", zIndex: "999" }}>
          <Nav />
        </header>
        <div style={{ minHeight: "calc(100vh - 60px)" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="accounts">
              <Route path="login" element={<LoginForm />} />
              <Route path="logout" element={<LoginForm />} />
              <Route path="create" element={<CreateAccountForm />} />
            </Route>
          </Routes>
        </div>
        <footer style={{ background: '#1f97f2', bottom: '0', position: 'static' }}>
          <Footer />
        </footer>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
