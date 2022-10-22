import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { apiUrl } from "../../enviroments";
import { TagInterface } from "../../models/tag.interface";

const access_token = localStorage.getItem("token")
export default function TagBlog(props: any) {


  const { tagId, setTagId } = props;
  const [tags, setTags] = useState({
    total: 0,
    data: []
  });
  useEffect(() => {
    searchTags();
  }, [])
  const searchTags = () => {
    axios({
      method: 'GET',
      url: `${apiUrl}/Tags`,
      params: {
        access_token: access_token,
      }
    }).then((result) => {
      setTags(result.data);
      setTagId(result.data.data[0].id)
    }).catch(err => {
      console.log(err)
    })
  }
  return (
    <>
      <ol className="popular-tags flex-wrap">
        {tags.data.map((tag: TagInterface, index: number) => {
          return (
            <TagItem tag={tag} tagId={tagId} setTagId={setTagId} key={index} />
          )
        })}
      </ol>
    </>
  )
}

function TagItem(props: any) {
  const { tag, tagId, setTagId } = props;
  return (
    <li onClick={() => {
      setTagId(tag.id)
    }} >
      <div className="cursor-pointer"  ><a href={'/blog?tag=' + tag.id}>{tag.title}</a></div>
    </li>
  )
}