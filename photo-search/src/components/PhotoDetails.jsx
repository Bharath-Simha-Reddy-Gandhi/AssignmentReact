import { useState } from "react";
import "../styles/photoDetails.css";
import { EditPhoto } from "./EditPhoto";

export const PhotoDetails = (props) => {
  const [editPhoto, setEditPhoto] = useState(false);
  const auth = sessionStorage.getItem("accessToken") || null;
  console.log(auth);
  const handleEditPhoto = () => {
    setEditPhoto(true);
  };
  return (
    <div>
      {props.photoDetailsLoading ? (
        <div className="single-photodetails">
          <img src={props.photoDetails.urls.small} />
          {editPhoto ? (
            
              <EditPhoto
                setEditPhoto={setEditPhoto}
                photoDetailsData={props.photoDetails}
                photoID={props.photoID}
              />
            
          ) : (
            <>
              <div>
                <div className="photodetails-text">
                  <div>
                    <div>
                      <span className="photodetails-text-title">
                        Photo Name:{" "}
                      </span>
                      <span className="photodetails-text-field">
                        {props.photoDetails.alt_description}
                      </span>
                    </div>
                    <div>
                      <span className="photodetails-text-title">City:</span>
                      <span className="photodetails-text-field">
                        {props.photoDetails.location.city}
                      </span>
                    </div>
                    <div>
                      {" "}
                      <span className="photodetails-text-title">Country:</span>
                      <span className="photodetails-text-field">
                        {props.photoDetails.location.country}
                      </span>
                    </div>
                  </div>
                  {auth !=null && <button onClick={handleEditPhoto}>Edit</button>}
                  
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <p>Nothing...</p>
      )}
    </div>
  );
};
