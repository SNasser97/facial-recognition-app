import React, { Component } from 'react';
// Components
import Navigation from "../components/Navigation/Navigation";
import Logo from "../components/Logo/Logo";
import ImageLinkForm from "../components/ImageLinkForm/ImageLinkForm";
import Rank from "../components/Rank/Rank";
import FaceRecognition from "../components/FaceRecognition/FaceRecognition";
import SignIn from "../components/SignIn/SignIn";
import Register from "../components/Register/Register";
import Valid from "../components/Valid/Valid";
// Vendors
import Particles from 'react-particles-js';
import { particlesOption } from "../assets/vendors/particlesOptions";
import { SERVER }  from "../assets/vendors/heroku"; // fetch


const initialState = { // set initial state for the user when signing out
      input: "",
      imageURL: "",
      box: [],
      route: "signin", // show signin page
      isSignedin: false,
      user: {
          id:"",
          name:"",
          email:"",
          entries:0,
          joined: ""
      },
      isValidURL:""
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageURL: "",
      box: [],
      route: "signin", // show signin page
      isSignedin: false,
      user: {
          id:"",
          name:"",
          email:"",
          entries:0,
          joined: ""
        },
      isValidURL:""
      }
      
  }
  loadUser = (data) => { // pass db details and set state
      this.setState(
        {user: 
          {
            id:data.id,
            name:data.name,
            email:data.email,
            entries:data.entries,
            joined:data.joined
          }
      })
  }
  // calculate box position of face/faces
  calculateFaceLocation = ({data}) => {
    const faceBoxMulti = data.outputs[0].data.regions.map(region => {
      return {
        left:region.region_info.bounding_box.left_col * 100,
        top: region.region_info.bounding_box.top_row * 100,
        right: 100 - (region.region_info.bounding_box.right_col * 100),
        bottom: 100 - (region.region_info.bounding_box.bottom_row * 100)
      }
    })
    return faceBoxMulti;
  }

  onInputChange = (event) => {
      this.setState({input:event.target.value});
  }

  onRouteChange = (route) => {
      // check if user logged in as well as change route based on user
      if(route === "signout") {
        this.setState(initialState);
      } else if(route === "home") {
        this.setState({isSignedin: true});
      }
      this.setState({route: route});
  }

  // display image when invoked
  displayImage = () => {
      const displayImage = document.querySelector(".recognition__img");
      return displayImage.style.display= "flex";
  }

  // display box when invoked 
  // and set state of box with array of pos values
  displayFaceBox = (box, img) => {
      this.setState({box: box});
  }

  validateInput = (url) => {
    const imageurl = url.toLowerCase();
    const regJPG = new RegExp(/jpe?g/).test(imageurl);
    const regPNG = new RegExp(/png/).test(imageurl);
    const regSVG = new RegExp(/svg/).test(imageurl);
    // basic reg check to see if url contains img type, though a more precise RegExp can be used
    return ((url !== "" || url !== undefined ) && (regJPG || regPNG || regSVG)) ? `${url} ${this.setState({isValidURL:true})}` : this.setState({isValidURL:false});
  }
  
  // event listener onclick call api and set state
  onImageSubmit = () => {
      // this.setState({mystate: this.state.ourValue}, ourCallback e.g. () => {...})
      const { input } = this.state;
      const { validateInput } = this;
      
      if(validateInput(input)) {
        this.setState({imageURL:input}, () => {
           const { imageURL, user } = this.state;
           fetch(SERVER.IMAGE_URL, {
            method:"post",
            mode: "cors",
            headers:{
              "Content-Type": "application/json",
                  'Access-Control-Allow-Origin': '*'
            },
            body:JSON.stringify({input:imageURL})
           }) 
          .then(resp => resp.json())
          .then(resp => {
            if(resp) {
              fetch(SERVER.IMAGE,{
                method:"put",
                headers:{
                  "Content-Type":"application/json",
                },
                body:JSON.stringify({id:user.id})
              })
              .then(resp=>resp.json())
              .then(count=>this.setState(Object.assign(user, {entries:count})))
              .catch(err=>console.log(err));
            }
            this.displayFaceBox(this.calculateFaceLocation(resp), this.displayImage());
          })
          .catch(err => console.log(err));
        })
    }
  }
  render() {
     const { imageURL, box, route, isSignedin, user, isValidURL} = this.state; // state of our app
     const { loadUser, onInputChange, onImageSubmit, onRouteChange } = this; // functions declared in App
     // components, where facerecog has prop box
     // Line 91 - IF route state = signin show form else show components
     return (
        <div className="App">
          <Particles className="particles" params={ particlesOption }/>
          <Navigation isSignedIn={ isSignedin } onRouteChange= { onRouteChange }/>
          
          { route === "home" ? 

            <React.Fragment>
              <Logo />
              <Rank 
                loadUser= { loadUser } 
                name={ user.name } 
                entries={ user.entries }
              />
              <ImageLinkForm 
                onInputChange= { onInputChange } 
                onImageSubmit={ onImageSubmit } 
              />
              { (isValidURL === "") ? null : <Valid isValidURL={ isValidURL } /> }
              { /*!isValidURL ? <Valid /> : null*/ }
              <FaceRecognition box={ box } imageURL={ imageURL }/>
            </React.Fragment> 
          : (route === "signin" || route === "signout" ?
            <React.Fragment>
              <Logo />
              <SignIn loadUser={ loadUser } onRouteChange={ onRouteChange }/>
            </React.Fragment>
          : <React.Fragment>
              <Logo />
              <Register loadUser={ loadUser } onRouteChange={ onRouteChange }/>
            </React.Fragment>
          )
        }
        </div>
      );
    
  }
}

export default App;


 


