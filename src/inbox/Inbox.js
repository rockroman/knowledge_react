import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { axiosReq } from "../api/axiosDefault";
import { useCurrentUser } from "../context/CurrentUserContext";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useCurrentUserProfile } from "../context/CurrentUserProfileContext";
import Asset from "../components/Asset";

const Inbox = () => {
  const [conversations, setConversations] = useState({ results: [] });
  const [appUsers, setAppUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  const currentUser = useCurrentUser();
  const currentUserProfile = useCurrentUserProfile();

  const fetchData = async () => {
    try {
      const { data: conversationsData } = await axiosReq("/inbox/");
      const { data } = await axiosReq(`/inbox/users_search`);
      setIsLoading(false);
      console.log(data);
      console.log("users:", data.results);

      setConversations({ results: conversationsData.results });
      setAppUsers(data.results);
      setTimeout(() => {
        console.log("fetched conversations: ", conversationsData.results);
      }, 500);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error("Error fetching data");
    }
  };

  useEffect(() => {
    console.log("Inbox component mounted");
    console.log(
      "role selected in inbox useefect: ",
      currentUserProfile?.role_selected
    );

    if (currentUser && currentUserProfile) {
      if (currentUserProfile?.role_selected) {
        fetchData();
      } else {
        history.push(`/profile/${currentUser?.profile_id}`);
        toast.warning("You need to set role on your profile");
      }
    }
  }, [currentUser, currentUserProfile]);

  const addConversation = async (val) => {
    const requestData = {
      participants: [
        {
          username: val,
        },
      ],
    };

    try {
      const { data } = await axiosReq.post("/inbox/", requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.message) {
        toast.success(`${data.message}`);
      }
    } catch (error) {
      console.log(error);
    }

    await fetchData();
  };
  console.log(conversations);

  let usersInConv = conversations?.results?.map((conv) =>
    conv.participants
      .filter((participant) => participant.username !== currentUser?.username)
      .map((user) => user?.username)
  );

  // flatten the array so that it can be iterated on
  usersInConv = usersInConv ? usersInConv.flat() : [];
  console.log(usersInConv);

  return (
    <Container fluid>
      <h3>Inbox</h3>
      {!isLoading ? (
        <Row className="container-fluid">
          <Col md={6} xl={4}>
            <h5 className=" my-3  mx-auto">Start conversation with</h5>
            {appUsers ? (
              appUsers
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
                })
            ) : (
              <p> No users</p>
            )}
          </Col>
          <Col md={6} xl={8} className="right">
            <h5 className="my-3 mx-auto text-uppercase"> Your Conversations</h5>
            <div className=" nav-tabs ml-auto" role="tablist">
              {conversations?.results?.map((conv) => (
                <a
                  key={conv.id}
                  className="nav-item nav-link"
                  id={`tab-${conv.id}`}
                  data-toggle="tab"
                  href={`#panel-${conv.id}`}
                  role="tab"
                  aria-controls={`panel-${conv.id}`}
                  aria-selected="false"
                >
                  <Card className="">
                    {/* <p>ID: {conv.id}</p> */}
                    <p className="mb-1">
                      Latest Message: {conv.latest_message}
                    </p>
                    <ul>
                      {conv.participants
                        .filter(
                          (participant) =>
                            participant.username !== currentUser?.username
                        )
                        .map((otherParticipant) => (
                          <li className="py-0" key={otherParticipant.id}>
                            With: {otherParticipant.username}
                          </li>
                        ))}
                    </ul>
                  </Card>
                </a>
              ))}
            </div>
          </Col>
        </Row>
      ) : (
        <Container>
          <Asset spinner />
        </Container>
      )}
    </Container>
  );
};

export default Inbox;
