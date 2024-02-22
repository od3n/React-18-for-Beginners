import { MouseEvent } from "react";
import { useState } from "react";
// import styles from "./ListGroup.module.css";
import "./ListGroup.css";
import styled from "styled-components";

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

interface ListItemProps {
  active: boolean;
}

const ListItem = styled.li<ListItemProps>`
  padding: 5px 0;
  background: ${(props) => (props.active ? "blue" : "none")};
`;

interface Props {
  items: string[];
  heading: string;
  onSelectItem: (item: string) => void;
}

function ListGroup({ items, heading, onSelectItem }: Props) {
  // items = [];

  // const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const message = items.length === 0 ? <p>No item found</p> : null;
  const getMessage = () => {
    return items.length === 0 ? <p>No item found</p> : null;
  };

  const handleClick = (event: MouseEvent) => console.log(event);

  return (
    <>
      <h1>{heading}</h1>
      {message}
      {getMessage()}
      {items.length === 0 && <p>No item found</p>}
      {/* <ul className={[styles.listGroup, styles.container].join(" ")}> */}
      <ul className="list-group" style={{ backgroundColor: "yellow" }}>
        {/* <List> */}
        {items.map((item, index) => (
          // <li
          //   className={
          //     selectedIndex === index
          //       ? "list-group-item active"
          //       : "list-group-item"
          //   }
          //   key={item}
          //   onClick={() => {
          //     setSelectedIndex(index);
          //     onSelectItem(item);
          //   }}
          // >
          <ListItem
            active={index === selectedIndex}
            key={item}
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(item);
            }}
          >
            {item}
          </ListItem>
        ))}
      </ul>
      {/* </List> */}
    </>
  );
}

export default ListGroup;
