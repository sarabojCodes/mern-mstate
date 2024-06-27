import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from "../firebase";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef();
  const [file, setFile] = useState(undefined);
  const [filePer,setFilePer] = useState(0)
  const [fileUploadError,setFileUploadError] = useState(false)
  const [formdata,setFormData] = useState({})
  

  const handleFileupload = (file) => {
    const storage =  getStorage(app);
    const fileName =  new Date().getTime()+file.name;
    const storageRef = ref(storage,fileName)
    const uploadTask = uploadBytesResumable(storageRef,file);
    
    uploadTask.on("state_changed",
      (snapshot)=>{
         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
         setFilePer(Math.round(progress))
      },
      (error)=>{
        console.log(error)
        setFileUploadError(true)
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
          setFormData({...formdata,avatar:downloadUrl})
        })
      }
    );
      
  };
  useEffect(() => {
    if (file) {
      handleFileupload(file);
    }
  }, [file]);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4 ">
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
           {
            fileUploadError ?(
              <span className="text-red-500">Error Image Upload</span>
            ):filePer > 0 && filePer < 100 ? <span>
               {`Uploading ${filePer}`}
            </span>:filePer === 100?<span className="text-center text-green-600">Successfully upload</span>:""
           }
        </p>
        <input
          type="text"
          id="username"
          placeholder="username"
          className="border p-3 rounded-lg"
        />
        <input
          type="text"
          id="email"
          placeholder="email"
          className="border p-3 rounded-lg"
        />
        <input
          type="text"
          id="password"
          placeholder="password"
          className="border p-3 rounded-lg"
        />

        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
};

export default Profile;
