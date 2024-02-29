export const Login = () =>{
    const authorizationCode = new URLSearchParams(window.location.search).get(
        "code"
      );
      const unsplashClientId = "jyAqgeaK-M_YUnheYzviHKyBrs4RsdVXgpgM0XkQr4Q";
  const unsplashRedirectUri = "http://localhost:3000/";
    async function exchangeAuthorizationCode() {
        try {
          // Make a POST request to exchange the authorization code for an access token
          const response = await fetch("https://unsplash.com/oauth/token", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              client_id: unsplashClientId,
              client_secret: "Lk_yrNjp5oFbG-foh7iUfIRLpIeHl2pUgNOiS1QbsDk",
              redirect_uri: unsplashRedirectUri,
              code:authorizationCode,
              grant_type: "authorization_code",
            }),
          });
    
          if (response.ok) {
            // If the response is successful, parse the JSON data
            const data = await response.json();
            const accessToken = data.access_token;
            localStorage.setItem("accessToken", accessToken);
    
            // Now you can use the access token to make authorized requests to the Unsplash API
            // For example, fetch the current user's profile
        //     const userProfileResponse = await fetch("https://api.unsplash.com/me", {
        //       headers: {
        //         Authorization: `Bearer ${accessToken}`,
        //       },
        //     });
    
        //     if (userProfileResponse.ok) {
        //       const userProfile = await userProfileResponse.json();
        //       setUserData(userProfile);
        //       console.log(userProfile);
        //     } else {
        //       console.error(
        //         "Error fetching user profile:",
        //         userProfileResponse.statusText
        //       );
        //     }
          } 
        else {
            console.error(
              "Error exchanging authorization code for access token:",
              response.statusText
            );
          }
        } 
        catch (error) {
          console.error("Unexpected error:", error);
        }
      }
      exchangeAuthorizationCode();
    return(
        <></>
    )
}