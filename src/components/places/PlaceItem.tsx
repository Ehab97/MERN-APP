import React from 'react'
import Card from '../shared/UIElements/Card';
import { Place } from './placesInterFace';
import Button from '../shared/UIElements/Button';
import Modal from '../shared/UIElements/Modal';
import { Map } from '../shared/map/Map';
import '../../styles/places.scss'

const PlaceItem:React.FC<Place> = ({
    id,
    imageUrl,
    title,
    description,
    address,
    creatorId,
    coordinates
}) => {
    const [showMap,setShowMap] = React.useState(false);
    const [showConfirm,setShowConfirm] = React.useState(false);
    const openMapHandler = () => setShowMap(true);
    const closeMapHandler = () => setShowMap(false);
    const openConfirmHandler = () => setShowConfirm(true);
    const closeConfirmHandler = () => setShowConfirm(false);
    const confirmDeleteHandler = () => {
        console.log('Deleting...');
        closeConfirmHandler();
    }
    const dataMapProps:any={
        show:showMap,
        onCancel:closeMapHandler,
        header:address,
        contentClass:'place-item__modal-content',
        footerClass:'place-item__modal-actions',
        footer:<Button onClick={closeMapHandler}>CLOSE</Button>,
    }
    const dataDeleteProps:any={
        show:showConfirm,
        onCancel:closeConfirmHandler,
        header:'Are you sure',
        contentClass:'place-item__modal-content',
        footerClass:'place-item__modal-actions',
        footer:<>
            <Button onClick={closeConfirmHandler} inverse>CANCEL</Button>
            <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
        </>
    }
  return (
  <>
    <Modal {...dataMapProps}>
        <div className="map-container">
            <Map coordinates={coordinates} />
        </div>               
    </Modal>
    <Modal {...dataDeleteProps}>
          <p>
            do you want to delete this place? 
            </p>           
    </Modal>
    <li className='place-item'>
        <Card className='place-item__content'>
        <div className='place-item__image'>
            <img src={imageUrl} alt={title} />
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
           
            <Button to={`/places/${id}`}> edit </Button>
            <Button danger={true} onClick={openConfirmHandler}> delete </Button>
        </div>
        </Card>
    </li>
  </>
  )
}

export default PlaceItem