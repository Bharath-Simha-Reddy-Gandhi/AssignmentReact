import { useCallback, useEffect, useState } from "react";
import "../styles/profileDetails.css";
import { EditProfile } from "./EditProfile";
import { Constants } from "./Constants";
import { likeUnlikePhotos,getProfileDetail,userSelectedInput } from "./ApiCalls";
import { Link } from "react-router-dom";


export const ProfileDeatils = () => {
  const [userData, setUserData] = useState();
  const [userDataLoading, setUserDataLoading] = useState(false);
  const [userSelected, setUserSelected] = useState("photos");
  const [userSelectedInfo, setUserSelectedInfo] = useState();
  const [userSelectedInfoLoading, setUserSelectedInfoLoading] = useState(false);
  const [editState, setEditState] = useState(false);

  const getProfileDetails = async () => {
    const userProfileResponse = await getProfileDetail();
    if (userProfileResponse.ok) {
      const userProfile = await userProfileResponse.json();
      setUserData(userProfile);
      setUserDataLoading(true);
      userSelectedInformation(userProfile, userSelected);
      console.log(userProfile);
    }
  };

  const userSelectedInformation = useCallback(
    async (userData, userSelected) => {
      setUserSelectedInfoLoading(false);
      const userSelectedInfoResponse = await userSelectedInput(userData,userSelected);
      console.log(userSelectedInfoResponse);
      if (userSelectedInfoResponse.ok) {
        const userSelectedInfoData = await userSelectedInfoResponse.json();
        setUserSelectedInfo(userSelectedInfoData);
        setUserSelectedInfoLoading(true);
        console.log(userSelectedInfoData);
      } else {
        console.error(
          "Error fetching user profile:",
          userSelectedInfoResponse.statusText
        );
      }
    },
    [userData]
  );

  const handleUserSelected = (items) => {
    setUserSelected(items);
    setUserSelectedInfoLoading(false);
    userSelectedInformation(userData, Constants.userPhoColSta[items]);
  };

  const handleLikes = async (photoId, photoLikeStatus) => {
    setUserSelectedInfoLoading(false);
    try {
      const response = await likeUnlikePhotos(photoId, photoLikeStatus);
      console.log(response);
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        alert("Unliked the image");
        await userSelectedInformation(userData, userSelected);
      }
    } catch (error) {
      alert("Error:", error.message);
    }
  };

  useEffect(() => {
    getProfileDetails();
    console.log(userData);
  }, []);

  console.log(userSelectedInfoLoading);

  return (
    <>
      {userDataLoading ? (
        <div>
          <div className="user-avatar-name-edit">
            <div className="user-avatar-name">
              <img src={userData.profile_image.large} rounded />
              <div className="user-fullname">
                <h1>
                  {userData.first_name} {userData.last_name}
                </h1>
              </div>
            </div>
            <button
              className="edit-profile-button"
              onClick={() => {
                setEditState(true);
              }}
            >
              Edit Profile
            </button>
          </div>
          {editState ? (
            <EditProfile
              userData={userData}
              setEditState={setEditState}
              getProfileDetails={getProfileDetails}
            />
          ) : (
            ""
          )}

          <div className="user-select-options">
            <span
              onClick={() => handleUserSelected("photos")}
              className={userSelected === "photos" ? "selected" : ""}
            >
              Photos
            </span>
            <span
              onClick={() => handleUserSelected("likes")}
              className={userSelected === "likes" ? "selected" : ""}
            >
              Likes
            </span>
            <span
              onClick={() => handleUserSelected("collections")}
              className={userSelected === "collections" ? "selected" : ""}
            >
              Collections
            </span>
            <span
              onClick={() => handleUserSelected("statistics")}
              className={userSelected === "statistics" ? "selected" : ""}
            >
              Stats
            </span>
          </div>
          <div className="user-selected-info">
            {userSelectedInfoLoading ? (
              userSelected === "photos" ? (
                userSelectedInfo && userSelectedInfo.length > 0 ? (
                  userSelectedInfo.map((item) => {
                    return (
                      <div className="user-photos" key={item.id}>
                        <img
                          src={item.urls.regular}
                          alt={item.alt_description}
                        />
                      <p>{item.description}</p>
                      <p>{item.location}</p>
                      </div>
                    );
                  })
                ) : (
                  <p>No Photos</p>
                )
              ) : userSelected === "likes" ? (
                userSelectedInfo && userSelectedInfo.length > 0 ? (
                  userSelectedInfo.map((item) => {
                    return (
                      <div className="user-photos" key={item.id}>
                        <img
                          src={item.urls.regular}
                          alt={item.alt_description}
                        />
                        <button
                          onClick={() =>
                            handleLikes(item.id, item.liked_by_user)
                          }
                        >
                          Dislike
                        </button>
                      </div>
                    );
                  })
                ) : (
                  <p>No Liked Photos</p>
                )
              ) : userSelected === "collections" ? (
                userSelectedInfo && userSelectedInfo.length > 0 ? (
                  userSelectedInfo.map((item) => {
                    return (
                      <div>
                        <p>collections</p>
                      </div>
                    );
                  })
                ) : (
                  <p>No Collections</p>
                )
              ) : userSelected === "statistics" ? (
                userSelectedInfo ? (
                  <>
                    <table className="stats-table">
                      <tr className="stats-table-row">
                        <th>Name</th>
                        <th>Total</th>
                        <th>Total in last 30 days</th>
                        <th>Avg in last 30 days</th>
                      </tr>
                      {["downloads", "views"].map((item) => {
                        return (
                          <tr className="stats-table-row" key={item}>
                            <td>
                              {item.charAt(0).toUpperCase() + item.slice(1)}
                            </td>
                            <td>{userSelectedInfo[item].total}</td>
                            <td>{userSelectedInfo[item].historical.change}</td>
                            <td>{userSelectedInfo[item].historical.average}</td>
                          </tr>
                        );
                      })}
                    </table>
                  </>
                ) : (
                  <p>No Statistics</p>
                )
              ) : (
                <p>""</p>
              )
            ) : (
              <p>Loading</p>
            )}
          </div>
        </div>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
};
