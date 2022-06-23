import React from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import image from "../images/JobTracker-logos.jpeg";
import { useSelector } from "react-redux";
import Spinner from "../Components/Spinner";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { data } = useSelector((state) => state.user);
  const navigate = useNavigate();
  if (data == null) {
    navigate("/");
    return <Spinner />;
  }
  return (
    <div className="profile">
      <Card style={{ width: "50rem" }}>
        <Card.Img
          style={{
            borderRadius: "50%",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "15px",
            width: "40%",
          }}
          variant="top"
          src={image}
        />
        <Card.Body>
          <Card.Title>Public Information</Card.Title>
          <Card.Subtitle style={{ marginTop: "15px" }}>About me:</Card.Subtitle>
          <Card.Text></Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>Email: {data.email}</ListGroupItem>
          <ListGroupItem>Phone number: {data.phone}</ListGroupItem>
          <ListGroupItem>City: {data.selectedCity}</ListGroupItem>
          <ListGroupItem>Zip code: {data.zip}</ListGroupItem>
          <ListGroupItem>Account type: {data.role}</ListGroupItem>
        </ListGroup>
        <Card.Body>
          <Card.Link>Edit Profile</Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Profile;
