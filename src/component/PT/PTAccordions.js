import { db } from "fbase";
import {
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";

const {
  Accordion,
  Row,
  Col,
  Table,
  ListGroup,
  ListGroupItem,
} = require("react-bootstrap");
const PTAccordions = ({ userObj }) => {
  const [PTLog, setPTLog] = useState([]);
  useEffect(() => {
    const a = async () => {
      const q = query(
        collection(db, userObj.uid, "PTschedule", "info"),
        orderBy("PTDate", "asc")
      );
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot);
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          setPTLog((pre) => [...pre, { date: doc.id, log: doc.data() }]);
          console.log(doc);
        });
      }
    };
    a();
  }, []);
  return (
    <Accordion defaultActiveKey={["0"]} alwaysOpen>
      {PTLog.map((data, index) => (
        <Accordion.Item eventKey={index}>
          <Accordion.Header>{data.date}</Accordion.Header>
          <Accordion.Body className="text-center">
            <Row className="border-bottom">
              <Col>
                <h3>주요 운동부위</h3>
                <h5>{data.log.PTArea}</h5>
              </Col>
            </Row>
            {data.log.workoutList.map((list) => (
              <>
                <ListGroup className="mt-3">
                  <ListGroupItem>
                    <Row className="m-3">
                      <Col>
                        <h5>{list.value}</h5>
                      </Col>
                    </Row>

                    <Table striped bordered hover>
                      <thead>
                        <th>set</th>
                        <th>반복횟수</th>
                        <th>무게</th>
                      </thead>
                      <tbody>
                        {list.set.map((set, index) => (
                          <tr>
                            <td>{index + 1}set</td>
                            <td>{set.number}회</td>
                            <td>{set.weight}kg</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </ListGroupItem>
                </ListGroup>
              </>
            ))}
            <ListGroup className="mt-3">
              <ListGroupItem>
                <Row>
                  <Col>메모</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem variant="dark">
                <Row style={{ whiteSpace: "pre-wrap" }}>
                  <Col>{data.log.PTMemo}</Col>
                </Row>
              </ListGroupItem>
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default PTAccordions;
