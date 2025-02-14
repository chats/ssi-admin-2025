import { AuthProvider } from 'oidc-react';
import { notification } from 'antd';
import { AuthConfig } from './config/env.config';
import AppRouter from './routes/AppRouter';
//import LoginForm from './components/auth/LoginForm';

function App() {
  const [noti, contextHolder] = notification.useNotification();

  const onBeforeSignIn = () => {
    console.log('Starting sign-in process');
  };

  const onSignIn = () => {
    console.log('User signed in successfully');
    noti.success({
      message: 'Signed In',
      description: 'You have successfully signed in.',
      duration: 3,
    });
  };

  /*
  const onSignOut = () => {
    console.log('User signed out');
    noti.info({
      message: 'Signed Out',
      description: 'You have been signed out.',
      duration: 3,
    });
  };
  */

  const onSignInError = (error: Error) => {
    console.error('Auth error:', error);
    noti.error({
      message: 'Authentication Error',
      description: error.message || 'An error occurred during authentication.',
      duration: 0,
    });
  };

  return (
    <>
    {contextHolder}
    <AuthProvider 
      {...AuthConfig}
      onBeforeSignIn={onBeforeSignIn}
      onSignIn={onSignIn}
      //onSignOut={onSignOut}
      onSignInError={onSignInError}
      >
      <AppRouter />
    </AuthProvider>
    </>   
  );
}

export default App;