import React, { Component } from 'react';
import './App.css';

import axios from 'axios';


// COMPONENTS
import Button from './component/button';
import Description from './component/description';
import DevicePrice from './component/device-price';
import PhoneDetails from './component/phone-details';


// npm run API to get response for axios promise
const API_PHONE_URL = "//localhost:3005/phones"


// create "state" Component

class App extends Component {
  state = {
    groupName: 'loading...',
    deviceList: [],
    stars: '2.5',
    deviceColour: [],
    capacityList: [],
    selectedCapacity: '',
    selectedColour: '',
    selectedColourName: '',
    displayDescription: '',
    displayImage: '',
    priceList: {
      monthlyPrice: 0,
      upfrontPrice: 0
    }
  }
  
  componentDidMount() {
  // Using this library to make GET, POST, PULL, DELETE requests to an API
    axios
      .get(API_PHONE_URL)

      // PROMISE
      .then(
        
        // SUCCESS
        // destructuring data out of the response
        ({data}) => {
          console.log(data.reduce(a=>a))

          const {deviceSummary}=data.reduce(b=>b);
          this.getCapacity(deviceSummary);
          this.getColourList(deviceSummary);

          this.setState(state => {
            // destructuring
            // I want to print the name, summary and rating on the screen 
            // and I want the rating to have a graphical interface using golden stars

            const {groupName, deviceSummary, rating}=data.reduce(c=>c)
            state.stars = rating;
            state.groupName = groupName;
            state.deviceList = deviceSummary;
            this.showDescription();
            return state;
          })
        },

        // ERROR
        myError => console.error(myError)
      )
  }
  
  getCapacity = arr => {
    const capacityList = [...new Set(arr.map(c => c.memory))];
    console.log(capacityList);
    this.setState(state => {
      if (!state.selectedCapacity.length) {
        state.selectedCapacity = capacityList.reduce(d => d)
      }
      return state.capacityList = capacityList
    })
  }

  showDescription = () => {
    this.setState(state => {
      // console.log(this.state.selectedCapacity, this.state.selectedColour)

      const filtered = this.state.deviceList
        .filter(q => q.colourHex === this.state.selectedColour && q.memory === this.state.selectedCapacity)
        // console.log(filtered, this.state.deviceList)
      
      if (filtered.length) {
        state.displayDescription = filtered
          .map(r => r.displayDescription)
          .reduce(r => r);
        state.displayImage = filtered
          .map(r => r.merchandisingMedia[0].value)
          .reduce(r => r);
      
        // update prices for upfront and monthly
        state.priceList.monthlyPrice = filtered
          .map(r => r.priceInfo.bundlePrice.monthlyPrice.gross)
          .reduce(p => p)
        state.priceList.upfrontPrice = filtered
          .map(r => r.priceInfo.hardwarePrice.oneOffPrice.gross)
          .reduce(p=>p)
      }

      return state
    })
  }

  // arr = deviceList
  getColourList = arr => {
    const colourList = arr.map(a => ({
      colourName: a.colourName,
      colourHex: a.colourHex,
      memory: a.memory
      }
    )
  ).filter(f => {
      // console.log(f.memory, this.state.selectedCapacity)
      return f.memory === this.state.selectedCapacity
    })

    this.setState(state=>state.deviceColour=colourList)

    if(!this.state.selectedColour.length) {
      this.setState(state=>state.selectedColour=colourList.map(m => m.colourHex).reduce(n => n))
    }
  }

  // Using deviceColour to generate 3 button with different bg color
  renderColourList = () => {
    return this.state.deviceColour
      .map(
        (b, k) => {
          const selected = this.state.selectedColour === b.colourHex;
          return (<Button  
                    label=""
                    selected={selected}
                    value={b.colourHex}
                    clickHandler={this.selectColour}
                    key={k}/>)
        }
      )
  }

  selectCapacity = capacityValue => {
    // console.log(capacityValue)
    this.setState(state => state.selectedCapacity=capacityValue)
    this.showDescription()
  }

  selectColour = colourHexValue => {
    this.setState(state => {
      const selectedColourName = this.state.deviceColour
        .filter(g => g.colourHex === colourHexValue)
        .map(h => h.colourName)
        .reduce(m => m);
      state.selectedColour = colourHexValue
      state.selectedColourName = selectedColourName;
      return state
    })
    this.showDescription()
  }

  // device capacity list
  renderCapacityList = () => {
    return this.state.capacityList.map(
      (m, c) => {
        const selected = this.state.selectedCapacity === m ;
        return (
          <Button
            label={parseFloat(m)}
            selected={selected}
            value={m}
            clickHandler={this.selectCapacity}
            key={c} />
        )
      }
    )
  }

  render() {
    const {groupName, stars, selectedCapacity, selectedColourName, displayDescription, displayImage, priceList:{monthlyPrice, upfrontPrice}} = this.state;
    return (
      <div className="App">
        
        {/* phone-img */}

        <div className="img">
          <img className="img" src={displayImage} alt="iphone"/>
        </div>

        {/* phone-details */}
        <div className="description">

          <PhoneDetails title={groupName} description='' stars={stars} />
          
          <Description description={displayDescription} />

          <div className="colour-capacity">

            {/* select device colour */}
            <div className="device-colour">
              <span>
                Colour: <strong>{selectedColourName}</strong>
              </span>
              <span>
                {this.renderColourList()}
              </span>
            </div>

            {/* select device capacity */}
            <div className="device-capacity">
              <span>
                Capacity: <strong>{selectedCapacity}</strong>
              </span>
              <span>
                {this.renderCapacityList()}
              </span>
            </div>

          </div>

          <DevicePrice upfrontPrice={upfrontPrice} monthlyPrice={monthlyPrice}/>

        </div>

      </div>
    );
  }
}

export default App;