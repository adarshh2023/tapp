import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LoginForm from './components/LoginForm';
import PhoneLogin from './components/PhoneLogin';
import OtpVerification from './components/OtpVerification';
import ProjectList from './components/ProjectList';
import CreateProject from './components/CreateProject';
import TaskList from './components/TaskList/TaskList';
import ChatScreen from './components/ChatScreen';
import ChatHistory from './components/ChatHistory';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token');
  return token ? <>{children}</> : <Navigate to="/" />;
};

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/phone-login" element={<PhoneLogin />} />
          <Route path="/verify-otp" element={<OtpVerification />} />
          <Route
            path="/projects"
            element={
              <PrivateRoute>
                <ProjectList />
              </PrivateRoute>
            }
          />
          <Route
            path="/projects/create"
            element={
              <PrivateRoute>
                <CreateProject />
              </PrivateRoute>
            }
          />
          <Route
            path="/projects/:projectId/tasks"
            element={
              <PrivateRoute>
                <TaskList />
              </PrivateRoute>
            }
          />
          <Route
            path="/projects/:projectId/chat"
            element={
              <PrivateRoute>
                <ChatScreen />
              </PrivateRoute>
            }
          />
          <Route
            path="/chat/:chatId"
            element={
              <PrivateRoute>
                <ChatHistory />
              </PrivateRoute>
            }
          />
        </Routes>
        <Toaster position="top-center" />
      </div>
    </BrowserRouter>
  );
}

export default App;