import "../styles/editprofile.css";
import { useState } from "react";
import { Constants } from "./Constants";
import {handleEditProfile} from '../components/ApiCalls'

export const EditProfile = (props) => {
  
    const [userDetails, setUserDetails] = useState({
    first_name: props.userData.first_name,
    last_name: props.userData.last_name,
    email: props.userData.email,
    username: props.userData.username,
    url: props.userData.links.portfolio,
    bio: props.userData.bio,
    location: props.userData.location,
    insta_username: props.userData.instagram_username,
  });

  const handleInputChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmitEditData = async(e,userDetails)=>{
    e.preventDefault();
    const submitEditDataResponse= await handleEditProfile(userDetails)
      if(submitEditDataResponse.ok) {
        props.setEditState(false);
        props.getProfileDetails();
      }
  }

  return (
    <>
      <form className="editprofile-fields">
        <div className="first-last-name">
          <div className="first-name">
            <label htmlFor="firstname">First Name</label>
            <input
              onChange={handleInputChange}
              type="text"
              id="firstname"
              name="first_name"
              value={userDetails.first_name}
            />
          </div>
          <div className="last-name">
            <label htmlFor="lastname">Last Name</label>
            <input
              onChange={handleInputChange}
              type="text"
              id="lastname"
              name="last_name"
              value={userDetails.last_name}
            />
          </div>
        </div>
        <div className="email">
          <label htmlFor="email">Email</label>
          <input
            onChange={handleInputChange}
            type="text"
            id="email"
            name="email"
            value={userDetails.email}
          />
        </div>
        <div className="username">
          <label htmlFor="username">User Name</label>
          <input
            onChange={handleInputChange}
            type="text"
            id="username"
            name="username"
            value={userDetails.username}
          />
        </div>
        <div className="other-edit-fields">
          <label htmlFor="url">Url</label>
          <input
            onChange={handleInputChange}
            type="text"
            id="url"
            name="url"
            value={userDetails.url}
          />
          <label htmlFor="bio">Bio</label>
          <input
            onChange={handleInputChange}
            type="text"
            id="bio"
            name="bio"
            value={userDetails.bio}
          />
          <label htmlFor="location">Location</label>
          <input
            onChange={handleInputChange}
            type="text"
            id="location"
            name="location"
            value={userDetails.location}
          />
          <label htmlFor="instausername">Instagram Username</label>
          <input
            onChange={handleInputChange}
            type="text"
            id="instausername"
            name="instausername"
            value={userDetails.instagram_username}
          />
        </div>
        <div className="submit-cancel-buttons">
          <button className="submit-button" onClick={(e)=>handleSubmitEditData(e,userDetails)}>Submit</button>
          <button
            className="cancel-button"
            onClick={() => {
              props.setEditState(false);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};
