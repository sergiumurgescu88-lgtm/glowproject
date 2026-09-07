import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ModelDetail from './pages/ModelDetail';
import Overview from './pages/Overview';
import CrossModel from './pages/CrossModel';

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Se încarcă...</div>;
  }
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/model/:id" element={<PrivateRoute><ModelDetail /></PrivateRoute>} />
          <Route path="/cross-model" element={<PrivateRoute><CrossModel /></PrivateRoute>} />
          <Route path="/overview" element={<PrivateRoute><Overview /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
