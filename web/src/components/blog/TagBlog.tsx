import axios from "axios";
import { useEffect, useState } from "react";
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
      {/* <ol className="popular-tags d-flex flex-wrap">
        {tags.data.map((tag: TagInterface, index: number) => {
          return (
            <TagItem tag={tag} tagId={tagId} setTagId={setTagId} key={index} />
          )
        })}
      </ol> */}
      <ol className="popular-tags d-flex flex-wrap">
        <li className="item-tag"><div>PLANTS</div></li>
        <li className="item-tag"><div>NEW PRODUCTS</div></li>
        <li className="item-tag"><div>CACTUS</div></li>
        <li className="item-tag"><div>DESIGN</div></li>
        <li className="item-tag"><div>NEWS</div></li>
        <li className="item-tag"><div>TRENDING</div></li>
        <li className="item-tag"><div>VIDEO</div></li>
        <li className="item-tag"><div>GARDEN DESIGN</div></li>
      </ol>
    </>
  )
}

// function TagItem(props: any) {
//   const { tag, tagId, setTagId } = props;
//   return (
    
//   )
// }