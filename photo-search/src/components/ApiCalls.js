import { Constants } from "./Constants";
const auth = sessionStorage.getItem("accessToken");


const exchangeAuthCode = async (authorizationCode) =>{
  return(
    await fetch("https://unsplash.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: Constants.unsplashClientId,
        client_secret: process.env.REACT_APP_API_KEY,
        redirect_uri: Constants.unsplashRedirectUri,
        code: authorizationCode,
        grant_type: "authorization_code",
      }),
    })
  )
}


  const getPhotoList = async() => {
    let headerAuth = (auth !== null? `Bearer ${sessionStorage.getItem("accessToken")}`: `Client-ID ${process.env.REACT_APP_CLIENT_ID}`)
    return( await fetch(
        `${process.env.REACT_APP_API_URL}/photos`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: headerAuth,
          },
        }
      )
    )
  }

  const getProfileDetail = async () =>{
    return (
      await fetch(`${Constants.api_url}/me`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      })
    )
  }

  const userSelectedInput = async (userData,userSelected) =>{
    return(
      await fetch(
        `${Constants.api_url}/users/${userData.username}/${userSelected}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      )
    )
  }


  const likeUnlikePhotos = async (photoId,photoLikeStatus) =>{
    const method = photoLikeStatus ? "DELETE" : "POST";
      return( await fetch(
        `${process.env.REACT_APP_API_URL}/photos/${photoId}/like`,
        {
          method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      )
      )
  }

  const handleEditProfile = async(userDetails) =>{
    return(
      await fetch(`${process.env.REACT_APP_API_URL}/me`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
        },
        body: JSON.stringify(userDetails),
      })
    )
  }

  const getPhotoDetails = async(auth,id) =>{
    let headerAuth = (auth !== null? `Bearer ${sessionStorage.getItem("accessToken")}`: `Client-ID ${process.env.REACT_APP_CLIENT_ID}`)
   return( await fetch(`${process.env.REACT_APP_API_URL}/photos/${id}`, {
      headers: {
        Authorization: headerAuth,
      },
    })
   )
  }
  const updatePhotoDetails = async(id,data) =>{
   return( await fetch(`${process.env.REACT_APP_API_URL}/photos/${id}`,{
    method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
      body: data,

    })
   )
  }
  export {exchangeAuthCode,getPhotoList,getProfileDetail,userSelectedInput,likeUnlikePhotos,getPhotoDetails,updatePhotoDetails,handleEditProfile}
