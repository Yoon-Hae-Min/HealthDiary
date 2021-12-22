import HealthDiaryRouter from "component/Router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "fbase";
function App() {
  const [isLogin, setIsLogin] = useState(auth.currentUser);
  const [firebaseInitalized, setFirebaseInitalized] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
      setFirebaseInitalized(true);
    });
  }, []);
  return (
    <div>
      {firebaseInitalized ? (
        <HealthDiaryRouter isLogin={isLogin} />
      ) : (
        "Initailized"
      )}
    </div>
  );
}

export default App;
