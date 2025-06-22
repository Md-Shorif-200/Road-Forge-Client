import React from "react";

import { Link } from "react-router-dom";

import RoadmapItemActions from "../../Utilites/RoadmapItemActions";
import Loading from "../../Components/Loading";


const RoadMapCard = ({ road_map_item , isLoading}) => {
  const { _id, title, description, status, comments, upvotes, name, address } =
    road_map_item;
    


 

  // handle Loading state
  if(isLoading){
     return <Loading></Loading>
  }
 

  return (
    <div className="rodmap_item_card bg-white text-black  py-3 rounded-md shadow-sm hover:bg-gray-100  transition-all">
      {/* status &  title  */}
      <div className="status_badge px-4  w-[30%] text-center">
        <p
          className={`text-sm font-semibold py-1.5 text-white rounded-lg ${
            status == "Planned"
              ? "bg-orange-400"
              : status == "In Progress"
              ? "bg-indigo-500"
              : "bg-emerald-500"
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
      <p className="text-base w-full h-[80px] px-4 lowercase text-gray-600 py-3">
        {" "}
        {description.slice(0, 140)}...{" "}
      </p>

      {/* roadmap action section */}

      <div className=" roadmap_actions  px-4  my-3 flex justify-between items-center">
                          {/* manage upvote and comment function */}
                    <RoadmapItemActions road_map_item={road_map_item}></RoadmapItemActions>
            {/* card details button */}
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
