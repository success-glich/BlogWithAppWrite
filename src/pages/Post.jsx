import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config.service";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { Button } from "../components";

function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState({});
  const [image, setImage] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.usedId === userData.userId : false;
  const deletePost = () => {
    service.deletePost(post.$id).then((status) => {
      if (status) {
        service.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };
  useEffect(() => {
    setLoader(true);
    service
      .getPost(slug)
      .then((res) => {
        setPost(res);
        if (res.featuredImage) {
          const files = service.getFilePreview(res.featuredImage);
          setImage(files.href);
        }
        setLoader(false);
      })
      .catch((err) => {
        console.log("blog detail page Error:", err);
        setLoader(false);
      });
  }, [slug]);
  return !loader ? (
    <div className=" p-4">
      <div className="  flex  relative justify-center">
        <img src={image && image} alt={post.title} className="w-[75%]" />
        {isAuthor && (
          <div className="absolute right-6 top-6">
            <Link to={`/edit-post/${post.$id}`}>
              <Button> Edit</Button>
            </Link>
            <Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                {" "}
                delete
              </Button>
            </Link>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col justify-center-center ml-28">
        <h2 className="font-bold text-2xl">{post.title}</h2>
        {parse(post.content)}
        <p></p>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default Post;
