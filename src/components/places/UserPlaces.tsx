import React, { useContext } from "react";
import PlaceList from "./PlaceList";
import { Place } from "./placesInterFace";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../app/hooks/useHttpClient";
import "../../styles/places.scss";
import LoadingSpinner from "../shared/UIElements/LoadingSpinner";
import ErrorModal from "../shared/UIElements/ErrorModal";
import { AuthContext } from "../shared/context/auth.context";
// interface Places{
//     places:Place[];
// }

const UserPlaces: React.FC = () => {
  let { userId } = useParams();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [places, setPlaces] = React.useState<Place[]>([]);
  const auth = useContext(AuthContext);
  React.useEffect(() => {
    (async () => {
      try {
        let res: any = await sendRequest(
          `http://localhost:5000/api/places/user/${userId}`
        );
        setPlaces(res.data.places);
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [sendRequest, userId]);
  const onDeletePlaceHandler = (deletedID?: string) => {
    setPlaces((prevPlace) =>
      prevPlace.filter((place) => place._id !== deletedID)
    );
  };
  const modalProps: any = {
    error,
    onClear: clearError,
  };
  return (
    <>
      <ErrorModal {...modalProps} />
      {isLoading && <LoadingSpinner asOverlay={true} />}
      {places && (
        <PlaceList places={places} onDeletePlace={onDeletePlaceHandler} />
      )}
    </>
  );
};

export default UserPlaces;
