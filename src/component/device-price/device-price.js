import React from 'react';
import './device.css';

const DevicePrice = props => {
  const {upfrontPrice=100, monthlyPrice=10.5} = props;
  return(
    <div className="device-price">

      {/* upfrontPrice */}
      <div className="upfront-cost">
        <h1>From <span className="red">£{upfrontPrice}</span> upfront cost</h1>
      </div>

      {/* monthlyPrice */}
      <div className="monthly-cost">
        <h1>When you pay <span className="red">£{monthlyPrice}</span> a month</h1>
      </div>

    </div>
  );
}

export default DevicePrice;