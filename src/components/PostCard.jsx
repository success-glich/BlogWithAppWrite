import React from "react";
import appwriteService from "../appwrite/config.service";
import { Link } from "react-router-dom";
function PostCard({ $id, title, featuredImage }) {
  return (
    <div className="w-full bg-gray-100 rounded-xl p-4">
      <Link to={`/post/${$id}`}>
        <div className="w-full justify-center">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl w-200  "
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </Link>
    </div>
  );
}

export default PostCard;
