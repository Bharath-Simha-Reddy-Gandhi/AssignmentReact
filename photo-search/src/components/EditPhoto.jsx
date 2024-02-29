import { useState } from "react";
import {updatePhotoDetails} from '../components/ApiCalls'
import "../styles/editPhoto.css";

export const EditPhoto = (props) => {
  const [editedPhotoDetails, setEditedPhotoDetails] = useState({
    id:props.photoID,
    description: props.photoDetailsData.alt_description,
  });

  const editedPhotoData = JSON.stringify(editedPhotoDetails)
  console.log(editedPhotoDetails);
  const handleChange = (e) => {
    setEditedPhotoDetails({
        ...editedPhotoDetails,
        [e.target.name]: e.target.value,
      });
  };
  const handleSubmitEditPhoto = async(photoID,editedPhotoData) => {
   const response = await updatePhotoDetails(photoID,editedPhotoData)
   console.log(response)
  };
  const cancelEditPhoto = () => {
    props.setEditPhoto(false);
  };
  return (
    <>
      <form action="submit" className="editphotoform" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="photoname">Photo Name</label>
          <textarea
            rows={4}
            type="text"
            value={editedPhotoDetails.description}
            id="photoname"
            name="description"
            onChange={handleChange}
          />
        </div>
        {/* <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            value={editedPhotoDetails.city}
            id="city"
            name="city"
            onChange={handleChange}

          />
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            value={editedPhotoDetails.country}
            id="country"
            name="country"
            onChange={handleChange}

          />
        </div> */}
        <button onClick={()=>handleSubmitEditPhoto(props.photoID,editedPhotoData)}>Submit</button>
        <button onClick={cancelEditPhoto}>Cancle</button>
      </form>
    </>
  );
};
