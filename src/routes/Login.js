import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";
import { auth } from "fbase";

const Login = () => {
  const [createAccount, setCreateAccount] = useState(true);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const toggleAccount = () => {
    setCreateAccount((pre) => !pre);
  };
  const IdChange = (event) => {
    setId(event.target.value);
  };
  const PasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const AccountSubmit = async (event) => {
    event.preventDefault();
    try {
      if (createAccount) {
        await createUserWithEmailAndPassword(auth, id, password);
        //계정생성
      } else {
        await signInWithEmailAndPassword(auth, id, password);
        //로그인
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    }
  };
  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };
  const facebookLogin = async () => {
    const provider = new FacebookAuthProvider();
    await signInWithPopup(auth, provider);
  };
  console.log(password);
  return (
    <div>
      <form onSubmit={AccountSubmit}>
        <input
          value={id}
          onChange={IdChange}
          type="text"
          placeholder="이메일을 입력하세요"
        ></input>
        <input
          value={password}
          onChange={PasswordChange}
          type="password"
          placeholder="비밀번호를 입력하세요"
        ></input>
        <input
          type="submit"
          value={createAccount ? "계정생성" : "로그인"}
        ></input>
      </form>
      <span onClick={toggleAccount}>
        {createAccount ? "로그인" : "회원가입"}
      </span>
      <span>{errorMessage}</span>
      <button onClick={googleLogin}>구글 로그인</button>
      <button onClick={facebookLogin}>페이스북 로그인</button>
    </div>
  );
};

export default Login;
