import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserFailed,
  updateUserStart,
  updateUserSuccess,
  deleteUserFailer,
  deleteUserStart,
  deleteUserSuccess,
  signOutStart,
  signOutFailed,
  signOutSuccess
} from "../redux/user/userSlice";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser,loading,error } = useSelector((state) => state.user);
  const fileRef = useRef();
  const [file, setFile] = useState(undefined);
  const [filePer, setFilePer] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formdata, setFormData] = useState({});
  const  [updateSuccess,setUpdateSuccess] = useState(false)

  const handleFileupload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePer(Math.round(progress));
      },
      (error) => {
        console.log(error);
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setFormData({ ...formdata, avatar: downloadUrl });
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      console.log(data,formdata);
      if (data.success) {
        dispatch(updateUserSuccess(data.rest));
        setFormData({})
        setUpdateSuccess(true)
      } else {
        dispatch(updateUserFailed(data.message));
      }
    } catch (error) {
      dispatch(updateUserFailed(error.message));
    }
  };

  const handleDeleteUser =  async ()=>{
     try{
        dispatch(deleteUserStart())
        const res = await fetch(`/api/user/delete/${currentUser._id}`,{
          method:"DELETE"
        })
        const data = await res.json();
        console.log(data)
        if(data.success){
           dispatch(deleteUserSuccess())
        }else{
          dispatch(deleteUserFailer(data.message))
        }
     }catch(error){

     }
  }
  const handleSingOut = async ()=>{
       dispatch(signOutStart)
       const res = await fetch(`/api/auth/signout`)
       const data = await res.json()
       if(data.success){
        dispatch(signOutSuccess())
       }else{
          dispatch(signOutFailed(data.message))
       }
  }
  useEffect(() => {
    if (file) {
      handleFileupload(file);
    }
  }, [file]);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          hidden
          type="file"
          ref={fileRef}
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formdata.avatar || currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-500">Error Image Upload</span>
          ) : filePer > 0 && filePer < 100 ? (
            <span>{`Uploading ${filePer}`}</span>
          ) : filePer === 100 ? (
            <span className="text-center text-green-600">
              Successfully upload
            </span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          id="username"
          defaultValue={currentUser.username}
          placeholder="username"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="text"
          id="email"
          defaultValue={currentUser.email}
          placeholder="email"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />

        <button
         disabled={loading}
        className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
           {loading?"Loading":'Update'}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer">Delete account</span>
        <span onClick={handleSingOut} className="text-red-700 cursor-pointer">Sign out</span>
      </div>
      <p className="text-center text-red-600">
        {error?error:''}
      </p>
      <p className="text-center text-green-600">
        {updateSuccess?"Success":""}
      </p>
    </div>
  );
};

export default Profile;
