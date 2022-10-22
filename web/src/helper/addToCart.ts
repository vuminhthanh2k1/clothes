import axios from "axios"
import { apiUrl } from "../enviroments"

interface ParamsAddToCart {
  productId: number,
  price: number
}

const access_token = localStorage.getItem('token')
export const addToCart = async (props: any) => {
  const { productId, price, userId } = props;

  if (userId) {
    return axios({
      method: 'POST',
      url: `${apiUrl}/Orders/add-to-cart`,
      params: {
        access_token,
        product: {
          productId: productId,
          price: price,
          userId
        }
      }
    }).then(result => {
      return result.data;
    }).catch(err => {
      console.log(err)
      return 'Bạn cần đăng nhập!'
    })
  } else {
    return 'Bạn cần đăng nhập!'
  }

} 