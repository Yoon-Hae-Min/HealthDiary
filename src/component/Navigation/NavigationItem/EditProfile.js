import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { auth, db, storage } from "fbase";
import { updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Button, Col, Form, Image, Modal, Row } from "react-bootstrap";

const EditProfile = ({ editMode, toggleEditMode, userObj }) => {
  const [userName, setUserName] = useState(userObj.displayName);
  const [userGoal, setUserGoal] = useState("");
  const [userImg, setUserImg] = useState(userObj.photoURL);

  useEffect(() => {
    getDoc(doc(db, userObj.uid, "userInformation"))
      .then((result) => {
        setUserGoal(result.data().userGoal);
      })
      .catch((e) => console.log(e));
  }, []);

  const changeName = (event) => {
    setUserName(event.target.value);
  };
  const changeGoal = (event) => {
    setUserGoal(event.target.value);
  };
  const changeImg = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finished) => {
      const {
        currentTarget: { result },
      } = finished;
      setUserImg(result);
    };
    reader.readAsDataURL(theFile);
  };
  const LogOut = () => {
    auth.signOut();
    toggleEditMode();
  };
  const ProfileSubmit = async (event) => {
    event.preventDefault();
    if (userName !== userObj.userName) {
      await updateProfile(auth.currentUser, {
        displayName: userName,
      });
    }
    if (userImg !== userObj.photoURL) {
      const fileRef = ref(storage, `profileImg/${userObj.uid}`);
      const result = await uploadString(fileRef, userImg, "data_url");
      const ImgUrl = await getDownloadURL(result.ref);
      await updateProfile(auth.currentUser, { photoURL: ImgUrl });
    }
    if (userGoal !== "") {
      const docRef = doc(db, userObj.uid, "userInformation");
      setDoc(docRef, { userGoal: userGoal });
    }
    photoUploadRef.current.value = null;
    alert("저장되었습니다.");
  };
  const photoUploadRef = useRef();
  return (
    <Modal show={editMode} onHide={toggleEditMode}>
      <Modal.Header closeButton>
        <Modal.Title>프로필 수정하기</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={ProfileSubmit} className="text-center">
          <Form.Group>
            <Form.Label htmlFor="Imgfile">
              <Image
                rounded
                src={userImg}
                alt="미리볼수 없음"
                style={{ width: "64px", height: "64px" }}
              />
            </Form.Label>
            <Form.Control
              type="file"
              id="Imgfile"
              onChange={changeImg}
              ref={photoUploadRef}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>이름</Form.Label>
            <Form.Control type="text" value={userName} onChange={changeName} />
          </Form.Group>
          <Form.Group>
            <Form.Label>목표</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={userGoal}
              onChange={changeGoal}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>유저 ID:</Form.Label>{" "}
            <Form.Label>{userObj.uid}</Form.Label>
          </Form.Group>
          <Button type="submit" className="mt-3">
            저장하기
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={LogOut}>
          Log-Out
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProfile;
