import React from "react";
import ChatItem from "../../../../components/Chat-Item";
import PropTypes from "prop-types";

export default function UserList({ users }) {
  return (
    <div className="bg-blue-500 w-1/4">
      {Array.isArray(users) &&
        users.map((item) => {
          return <ChatItem key={item} name={item} />;
        })}
    </div>
  );
}

UserList.propTypes = {
  users: PropTypes.any,
};
