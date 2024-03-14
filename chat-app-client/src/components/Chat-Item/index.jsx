import React from "react";
import PropTypes from "prop-types";

export default function ChatItem({ name }) {
  return (
    <div className="px-2 py-2 flex w-full bg-purple-500 hover:rounded-md">
      <img
        src="https://i1.sndcdn.com/artworks-dAzGelwWudrmWGac-eF30jA-t500x500.jpg"
        alt=""
        className="rounded-full w-10 h-10 object-cover"
      />
      <span className="self-center ml-5 font-medium">{name}</span>
    </div>
  );
}

ChatItem.propTypes = {
  name: PropTypes.string.isRequired,
};
