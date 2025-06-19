import React from "react";
import { FaCommentAlt, FaThumbsUp } from "react-icons/fa";
import { FaComment } from "react-icons/fa6";
import { Link } from "react-router-dom";

const RoadMapCard = ({ road_map_item }) => {
  const { _id, title, description, status, comments, upvotes, name, address } =
    road_map_item;

  return (
    <div className="rodmap_item_card bg-white text-black  py-3 rounded-md shadow-sm hover:bg-gray-100  transition-all">
      {/* status &  title  */}
      <div className="status_badge px-4  w-[30%] text-center">
        <p
          className={`text-sm font-semibold py-1.5 text-white rounded-lg ${
            status == "Planned"
              ? "bg-orange-400"
              : status == "In Progress"
              ? "bg-blue-400"
              : "bg-green-400"
          }`}
        >
          {" "}
          {status}{" "}
        </p>
      </div>
      <h1 className="text-lg  px-4 font-semibold  capitalize mt-2">
        {" "}
        {title}{" "}
      </h1>
      <p className="text-base  px-4 lowercase text-gray-600 py-3">
        {" "}
        {description.slice(0, 140)}...{" "}
      </p>

      {/* roadmap action section */}

      <div className=" roadmap_actions  px-4  my-3 flex justify-between items-center">
        <div className="flex gap-x-5 items-center">

            {/* upvote */}
          <div className="upvote text-2xl flex gap-x-2 items-center primary_text_color cursor-pointer group transition-all">
            <FaThumbsUp className="transform transition-all duration-300 group-hover:scale-150"></FaThumbsUp>{" "}
            {upvotes}
          </div>
                {/* comment */}
          <div className="comment text-2xl flex gap-x-2 items-center primary_text_color cursor-pointer group transition-all">
            <FaComment className="transform transition-all duration-300 group-hover:scale-150"></FaComment>{" "}
            {comments.length}
          </div>
        </div>
            {/* card details */}
        <div className="details_buttn">
          <Link to={`roadmap-details/${_id}`} className="secondary_btn">
            details
          </Link>
        </div>
      </div>
      <hr className="my-2  text-gray-300" />
      {/*  */}
                {/* author details */}
      <div className="px-4">
        <h1 className="text-lg capitalize font-semibold"> {name} </h1>
        <p className="text-lg capitalize text-gray-400"> {address} </p>
      </div>
    </div>
  );
};

export default RoadMapCard;
