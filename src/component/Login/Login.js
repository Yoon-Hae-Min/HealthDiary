import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";
import { auth } from "fbase";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";

const Login = () => {
  const [createAccount, setCreateAccount] = useState(false);
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
  return (
    <Container style={{ height: "100vh" }}>
      <Row className="h-100 align-items-center">
        <Col>
          <Row>
            <Col className="text-center">Health Note</Col>
          </Row>
          <Form onSubmit={AccountSubmit}>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>이메일</Form.Label>
                  <Form.Control
                    type="text"
                    value={id}
                    onChange={IdChange}
                    placeholder="이메일을 입력하세요"
                  ></Form.Control>
                  <Form.Label>비밀번호</Form.Label>
                  <Form.Control
                    value={password}
                    onChange={PasswordChange}
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                  ></Form.Control>
                  <Button
                    type="submit"
                    className="mt-3"
                    style={{ float: "right" }}
                  >
                    {createAccount ? "계정생성" : "로그인"}
                  </Button>
                </Form.Group>
              </Col>
            </Row>
            <span>{errorMessage}</span>
            <Row>
              <Col>
                <Button
                  variant="light"
                  onClick={toggleAccount}
                  className="w-100 mt-3"
                >
                  {createAccount ? "로그인" : "회원가입"}
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button
                  variant="light"
                  onClick={googleLogin}
                  className="w-100 mt-3"
                >
                  <Image
                    width={30}
                    height={30}
                    roundedCircle
                    src="data:image/png;base64,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"
                  ></Image>
                  구글 로그인
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button
                  variant="light"
                  onClick={facebookLogin}
                  className="w-100 mt-3"
                >
                  <Image
                    width={30}
                    height={30}
                    roundedCircle
                    src="https://blog.kakaocdn.net/dn/lhU48/btqRoQfJhbZ/9E6G4WxknrC7MPv2gV1DSk/img.jpg"
                  ></Image>
                  페이스북 로그인
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
