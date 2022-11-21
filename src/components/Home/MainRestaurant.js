import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { listBookings } from "../../Redux/Actions/BookingAction";

const MainRestaurant = (props) => {
  const dispatch = useDispatch();
  const { restaurant } = props;

  useEffect(() => {
    dispatch(listBookings(restaurant._id));
  }, [dispatch, restaurant]);
  return (
    <>
      <div className="container single-restaurant">
        <div className="row">
          <div className="col-md-6">
            <div className="single-image">
              <img src={restaurant.image} alt={restaurant.name} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="restaurant-dtl">
              <div className="restaurant-info">
                <div className="restaurant-name">{restaurant.name}</div>
              </div>
              <p>{restaurant.description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MainRestaurant;
