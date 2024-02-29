import { useCallback, useEffect, useState } from "react";
import { Constants } from "./Constants";
import { Link } from "react-router-dom";
import { getPhotoList, likeUnlikePhotos } from "./ApiCalls";
import "../styles/randomImages.css";

export const RandomImages = () => {
  const [randomImages, setRandomImages] = useState();
  const [randomImagesLoading, setRandomImagesLoading] = useState(false);
  const auth = sessionStorage.getItem("accessToken");

  const getRandomImages = async () => {
    const response = await getPhotoList()
    if (response.status === 200) {
      const movies = await response.json();
      setRandomImages(movies);
      setRandomImagesLoading(true);
    }
  };

  useEffect(() => {
    getRandomImages();
  }, [auth]);
  const handleLikes = async (photoId, photoLikeStatus) => {
    try {
      const response = await likeUnlikePhotos(photoId, photoLikeStatus);
      if (response.ok) {
        const responseData = await response.json();
        alert(photoLikeStatus ? "Unliked the image" : "Liked the image");
        getRandomImages();
      }
    } catch (error) {
      alert("Error:", error.message);
    }
  };

  return (
    <>
      <div className="ran-img-containers">
        {randomImagesLoading ? (
          randomImages.map((photo) => {
            return (
              <div className="ran-img-container" key={photo.id}>
                <Link to={`/photos/${photo.id}`} key={photo.id}>
                <img src={photo.urls.small} alt={photo.urls.small} />
                </Link>
                {auth !== null && (
                  <div className="like-dislike-buttons">
                    {photo.liked_by_user ? (
                      <button
                        onClick={() =>
                          handleLikes(photo.id, photo.liked_by_user)
                        }
                      >
                        Dislike
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          handleLikes(photo.id, photo.liked_by_user)
                        }
                      >
                        Like
                      </button>
                    )}
                  </div>
                )}
                <div>
                  <p>Likes: {photo.likes}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p>Loading</p>
        )}
      </div>
    </>
  );
};
