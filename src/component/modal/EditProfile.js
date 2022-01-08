import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import { useRef, useState } from "react";
import { auth, db, storage } from "fbase";
import { updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

const EditProfile = ({ editMode, toggleEditMode, userObj, refreshUser }) => {
  const [userName, setUserName] = useState(userObj.displayName);
  const [userGoal, setUserGoal] = useState("");
  const [userImg, setUserImg] = useState(userObj.photoURL);
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
    if (userImg) {
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
    setUserImg(null);
    refreshUser();
  };
  const photoUploadRef = useRef();
  return (
    <Modal isOpen={editMode} onRequestClose={toggleEditMode}>
      <img src={userImg} alt="미리볼수 없음" />
      <FontAwesomeIcon icon={faImages} />
      <form onSubmit={ProfileSubmit}>
        <input type="file" onChange={changeImg} ref={photoUploadRef} />
        <span>이름: </span>
        <input type="text" value={userName} onChange={changeName}></input>
        <span>목표: </span>
        <input type="text" value={userGoal} onChange={changeGoal}></input>
        <input type="submit" value="저장하기"></input>
      </form>
      <button onClick={LogOut}>Log-Out</button>
      <button onClick={toggleEditMode}>Close</button>
    </Modal>
  );
};

export default EditProfile;
