import HealthDiaryRouter from "component/Router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "fbase";
function App() {
  const [userObj, setUserObj] = useState(null);
  const [isLogin, setIsLogin] = useState(auth.currentUser);
  const [firebaseInitalized, setFirebaseInitalized] = useState(false);
  console.log(auth.currentUser);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogin(true);
        setUserObj({
          displayName: user.displayName,
          photoURL: user.photoURL,
          uid: user.uid,
        });
      } else {
        setIsLogin(false);
        setUserObj(null);
      }
      setFirebaseInitalized(true);
    });
  }, []);
  return (
    <div>
      {firebaseInitalized ? (
        <HealthDiaryRouter isLogin={isLogin} userObj={userObj} />
      ) : (
        "Initailized"
      )}
    </div>
  );
}

export default App;
