import React, { useContext } from "react";
import Card from "../shared/UIElements/Card";
import { Place } from "./placesInterFace";
import Button from "../shared/UIElements/Button";
import Modal from "../shared/UIElements/Modal";
import { Map } from "../shared/map/Map";
import "../../styles/places.scss";
import { useHttpClient } from "../../app/hooks/useHttpClient";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../shared/context/auth.context";
import ErrorModal from "../shared/UIElements/ErrorModal";
import LoadingSpinner from "../shared/UIElements/LoadingSpinner";

interface PlaceItemProps extends Place {
  onDelete: (deletedID?: string) => void;
}

const PlaceItem: React.FC<PlaceItemProps> = ({
  id,
  image,
  title,
  description,
  address,
  creator,
  coordinates,
  onDelete,
}) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [showMap, setShowMap] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);
  const openConfirmHandler = () => setShowConfirm(true);
  const closeConfirmHandler = () => setShowConfirm(false);
  const confirmDeleteHandler = async () => {
    console.log("Deleting...");
    await deletePlace();
    closeConfirmHandler();
  };
  const dataMapProps: any = {
    show: showMap,
    onCancel: closeMapHandler,
    header: address,
    contentClass: "place-item__modal-content",
    footerClass: "place-item__modal-actions",
    footer: <Button onClick={closeMapHandler}>CLOSE</Button>,
  };
  const dataDeleteProps: any = {
    show: showConfirm,
    onCancel: closeConfirmHandler,
    header: "Are you sure",
    contentClass: "place-item__modal-content",
    footerClass: "place-item__modal-actions",
    footer: (
      <>
        <Button onClick={closeConfirmHandler} inverse>
          CANCEL
        </Button>
        <Button danger onClick={confirmDeleteHandler}>
          DELETE
        </Button>
      </>
    ),
  };
  const deletePlace = async () => {
    try {
      let res: any = await sendRequest(
        `http://localhost:5000/api/places/${id}`,
        "DELETE",
        null,
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      console.log(res);
      onDelete(id);
    } catch (e) {
      console.log(e);
    }
  };
  const modalProps: any = {
    error,
    onClear: clearError,
  };
  console.log(auth.userId, id, creator);
  return (
    <>
      <ErrorModal {...modalProps} />
      <Modal {...dataMapProps}>
        <div className="map-container">
          <Map coordinates={coordinates} />
        </div>
      </Modal>
      <Modal {...dataDeleteProps}>
        <p>do you want to delete this place?</p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          {isLoading && <LoadingSpinner asOverlay={true} />}
          <div className="place-item__image">
            <img src={`http://localhost:5000/${image}`} alt={title} />
          </div>
          <div className="place-item__info">
            <h2>{title}</h2>
            <h3>{address}</h3>
            <p>{description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse={true} onClick={openMapHandler}>
              view on map
            </Button>
            {auth.userId === creator && (
              <Button to={`/places/${id}`}> EDIT </Button>
            )}
            {auth.userId === creator && (
              <Button danger={true} onClick={openConfirmHandler}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
