import React from "react";
import { Col } from "react-bootstrap";

const AppUsers = ({ appUsers, currentUser, usersInConv }) => {
  return (
    <Col md={6} xl={4}>
      {appUsers
        .filter(
          (activeUser) =>
            activeUser.username !== currentUser?.username &&
            !usersInConv.includes(activeUser.username)
        )
        .map((user) => {
          return (
            <div className="p-3 mb-3 rounded border" key={user.id}>
              <Button
                onClick={() => addConversation(user.username)}
                className="btn-dark w-50"
              >
                {user.username}
              </Button>
            </div>
          );
        })}
    </Col>
  );
};

export default AppUsers;
