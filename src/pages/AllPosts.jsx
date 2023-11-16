import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config.service";

function AllPosts() {
  const [posts, setPost] = useState([]);
  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPost(posts.documents);
      }
    });
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap w-full">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/2">
              <PostCard
                featuredImage={post?.featuredImage}
                $id={post.$id}
                title={post.title}
                content={post.content}
              />
            </div>
          ))}
          <div className="w-full h-full"></div>
          {/* to fill the remaining space */}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
