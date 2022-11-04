import axios from "axios";
import { useEffect, useState } from "react";
import { apiUrl } from "../../enviroments";
import { TagInterface } from "../../models/tag.interface";

const access_token = localStorage.getItem("token");
export default function TagBlog() {
  const [tags, setTags] = useState({
    total: 0,
    data: [],
  });
  useEffect(() => {
    searchTags();
  }, []);
  const searchTags = () => {
    axios({
      method: "GET",
      url: `${apiUrl}/Tags`,
      params: {
        access_token: access_token,
      },
    })
      .then((result) => {
        setTags(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <ol className="popular-tags flex-wrap">
        {tags.data.map((tag: TagInterface, index: number) => {
          return <TagItem tag={tag} key={index} />;
        })}
      </ol>
    </>
  );
}

function TagItem(props: any) {
  const { tag } = props;
  return (
    <li>
      <div className="cursor-pointer">
        <a>{tag.title}</a>
      </div>
    </li>
  );
}
