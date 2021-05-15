import { Box } from '@chakra-ui/layout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Header } from './component/header';
import { Home } from './component/home';
import { PasswordChange } from './component/user/Change';
import { SignIn } from './component/user/Login';
import { UserInfo } from './component/user/Info';
import { Register } from './component/user/Register';
import { PasswordReset } from './component/user/Reset';
import { VerifyEmail } from './component/user/Verify';
import { UserContext } from './context/user';
import { IUser, IUserResponse } from './interface/auth';
import { DeleteUser } from './component/user/Delete';

const App = () => {
  const [user, setUser] = useState<IUser | null>(null);
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const none = localStorage.getItem('none');
    (async () => {
      try {
        const resp = await axios.post('http://localhost:5000/user/auth', null, {
          headers: {
            Authorization: 'Bearer ' + accessToken,
            none,
          },
        });
        const { user: newUser, accessToken: token }: IUserResponse = resp.data;
        setUser(newUser);
        localStorage.setItem('accessToken', token);
      } catch (err) {
        console.log(err);
        return;
      }
    })();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Header />
        <Box paddingX="4" marginX="4">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup/verify" component={VerifyEmail} />
            <Route exact path="/signup/register" component={Register} />
            <Route exact path="/password/change" component={PasswordChange} />
            <Route exact path="/password/verify" component={VerifyEmail} />
            <Route exact path="/password/reset" component={PasswordReset} />
            <Route exact path="/user/info" component={UserInfo} />
            <Route exact path="/user/delete" component={DeleteUser} />
          </Switch>
        </Box>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
