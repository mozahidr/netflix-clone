import React, { useEffect } from 'react';
import { HomeScreen } from './HomeScreen/HomeScreen';
import { LoginScreen } from './Login/LoginScreen';
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { auth } from './firebase';
import { logout, login, selectUser } from "./features/userSlice";
import { useDispatch, useSelector } from 'react-redux';
import { ProfileScreen } from './Profile/ProfileScreen';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  //const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if(userAuth) {
        // Logged in
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        // Logged out 
        dispatch(logout());
        //auth().onAuthStateChanged(user => selectUser(null));
      }
    });
    return unsubscribe;
  }, [dispatch]);

  return (
      <div className="app">
      <Router>
        <Routes>
          {!user ? (
            <Route path='/' element={<LoginScreen />} exact /> 
          ) : (
            <>
            <Route exact path='/' element={<HomeScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
            </>
          )}
            
        </Routes>
      </Router>
    </div>
  );
}

export default App;

// return (
//   <div className="App">
//   <UserContext.Provider value={{user}}>
//   {user ? <Home /> : <Signin />}
//   </UserContext.Provider>
//   </div>
//   );
