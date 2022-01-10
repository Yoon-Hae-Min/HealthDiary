import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { auth, db, storage } from "fbase";
import { updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Button, Col, Image, Modal, Row } from "react-bootstrap";

const EditProfile = ({ editMode, toggleEditMode, userObj }) => {
  const [userName, setUserName] = useState(userObj.displayName);
  const [userGoal, setUserGoal] = useState("");
  const [userImg, setUserImg] = useState(userObj.photoURL);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    getDoc(doc(db, userObj.uid, "goal")).then((result) => {
      setUserGoal(result.data().userGoal);
    });
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
    console.log(files);
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
        displayName: userName, //전부다 업데이트가 안되는데?
      });
    }
    if (userImg !== userObj.photoURL) {
      const fileRef = ref(storage, `profileImg/${userObj.uid}`);
      const result = await uploadString(fileRef, userImg, "data_url");
      const ImgUrl = await getDownloadURL(result.ref);
      await updateProfile(auth.currentUser, { photoURL: ImgUrl });
    }
    if (userGoal !== "") {
      const docRef = doc(db, userObj.uid, "goal");
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
        <Row className="text-center">
          <Col>
            <label htmlFor="Imgfile">
              <Image
                rounded
                src={userImg}
                alt="미리볼수 없음"
                style={{ width: "64px", height: "64px" }}
              />
            </label>
          </Col>
        </Row>
        <Row md>
          <Col className="text-center">
            <form onSubmit={ProfileSubmit}>
              <input
                type="file"
                id="Imgfile"
                onChange={changeImg}
                ref={photoUploadRef}
                style={{ opacity: 0 }}
              />
              <Row className="pb-3">
                <Col>
                  <span>이름: </span>
                  <input
                    type="text"
                    value={userName}
                    onChange={changeName}
                  ></input>
                </Col>
              </Row>
              <Row>
                <Col>
                  <span>목표: </span>
                  <input
                    type="text"
                    value={userGoal}
                    onChange={changeGoal}
                  ></input>
                </Col>
              </Row>
              <Row className="pt-3">
                <Col>
                  <Button type="submit">저장하기</Button>
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={LogOut}>
          Log-Out
        </Button>{" "}
      </Modal.Footer>
    </Modal>
  );
};

export default EditProfile;
