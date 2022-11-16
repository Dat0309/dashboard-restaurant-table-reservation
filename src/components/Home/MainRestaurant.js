import React from "react";

const MainRestaurant = (props) => {
  const { restaurant } = props;
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
