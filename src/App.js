import axios from "axios";
import React from "react";
import { Spinner, Input } from "reactstrap";
import { BsFillHandThumbsUpFill } from "react-icons/bs";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      photos: [],
      searchQuery: "",
    };
  }

  fetchPhoto = (url) => {
    axios.get(url).then((response) => {
      console.log(response, "<<");
      this.setState({ photos: response.data }); //axios returns all the tames object
    });
  };

  componentDidMount() {
    const url =
      "https://api.unsplash.com/photos/?client_id=67dzJ6HsOJ0oE9moFGN9_AGJ-de6jwkL-CAULtu3QWg&page=77";
    setTimeout(() => {
      this.fetchPhoto(url);
    }, 1000);
  }

  handleSearch = (e) => {
    this.setState({ searchQuery: e.target.value }); //this.setState({ searchQuery: e.target.value.toLowerCase() }) if we put to lowercase here that means that in our input even if we write in uppercase it will convert to lowercase
  };

  render() {
    const { photos, searchQuery } = this.state;
    //console.log(searchQuery)
    const filtered = photos.filter((photo) =>
      photo.alt_description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    console.log(filtered);
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 m-5">
            <Input onChange={this.handleSearch} value={searchQuery} />
          </div>
          {photos.length ? (
            filtered.map((photo) => {
              return (
                <div className="col-sm-3 m-2">
                  <img
                    style={{ width: "100%", height: "250px" }}
                    width={120}
                    src={photo.urls.small}
                    alt=""
                  />
                  <div>
                    {photo.likes} <BsFillHandThumbsUpFill />
                  </div>
                  <div>Created by: {photo.user.username}</div>
                </div>
              );
            })
          ) : (
            <Spinner>Loading...</Spinner>
          )}
        </div>
      </div>
    );
  }
}

export default App;

//axios = allows http we requests, makes asynch requests in react app, to fetch data from api servers, backend, cloud enviroment

// const arr = [
//   {
//     name: "grayson",
//     age: 20,
//     positions:[]
//   },
//    {
//     name: "ovi",
//     age: 30,
//     positions:[]
//   },
//    {
//     name: "mesi",
//     age: 50,
//     positions:[]
//   },
//    {
//     name: "jose",
//     age: 10,
//     positions:[]
//   }
// ]

// //search objects that includes letter i

// const filtered = arr.filter(item=> item.name.includes("i"))
// console.log(filtered)
