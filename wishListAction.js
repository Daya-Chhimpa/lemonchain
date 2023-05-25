import { toast } from "react-toastify";
import axios from "axios";
import Web3 from "web3";
import { BASE_URL } from '../../../utils/common'
import { GET_WISHLIST_ERR, GET_WISHLIST_REQUEST, GET_WISHLIST_SUCCESS, POST_WISHLIST_ERR, POST_WISHLIST_REQUEST, POST_WISHLIST_SUCCESS, REMOVE_WISHLIST_ERR, REMOVE_WISHLIST_REQUEST, REMOVE_WISHLIST_SUCCESS } from "../../types/type";


export const addNftWishlistRequest = (payload) => {
  return {
    type: POST_WISHLIST_REQUEST,
    payload,
  };
};
export const addNftWishlistSuccess = (payload) => {
  // console.log("accounts[0]accounts[0]accounts[0] postConnectWalletSuccess", payload)
  return {
    type: POST_WISHLIST_SUCCESS,
    payload,
  };
};
export const addNftWishlisttErr = (payload) => {
  return {
    type: POST_WISHLIST_ERR,
    payload,
  };
};

export const getNftWishlistRequest = (payload) => {
  return {
    type: GET_WISHLIST_REQUEST,
    payload,
  };
};
export const getNftWishlistSuccess = (payload) => {
  // console.log("accounts[0]accounts[0]accounts[0] postConnectWalletSuccess", payload)
  return {
    type: GET_WISHLIST_SUCCESS,
    payload,
  };
};
export const getNftWishlisttErr = (payload) => {
  return {
    type: GET_WISHLIST_ERR,
    payload,
  };
};

export const removeNftWishlistRequest = (payload) => {
  return {
    type: REMOVE_WISHLIST_REQUEST,
    payload,
  };
};
export const removeftWishlistSuccess = (payload) => {
  return {
    type: REMOVE_WISHLIST_SUCCESS,
    payload,
  };
};
export const removeNftWishlisttErr = (payload) => {
  return {
    type: REMOVE_WISHLIST_ERR,
    payload,
  };
};

export const addWishlistNftHandlerApi = (payload) => {
  const metaAddress = localStorage.getItem("metaAddress");
  console.log("payloadpayload", payload)

  const param = {
    address: metaAddress,
    nft_id: payload.nft_id,
    nft_uri: payload.nft_uri,
    nft_image: payload.nft_image,
    active_inactive: payload.active_inactive,
    name: payload.name,
    description: payload.description,
    nft_value:payload.nft_value,
    nft_sold: payload.nft_sold,
    type:payload.type,
    title:payload.title,
    price:payload.price

  };

  return async (dispatch) => {
    dispatch(addNftWishlistRequest());

    try {

      const response = await axios.post(`${BASE_URL}/addFvrtNft`, param);
      if (response.data.error) {
        dispatch(addNftWishlisttErr);
      } else {

        toast.success('Added in WishList', {
          position: toast.POSITION.TOP_RIGHT,
        });
        dispatch(addNftWishlistSuccess());
        dispatch(getNftWishListHandler());
    
      }
    } catch (error) {
      dispatch(addNftWishlisttErr);
      toast.error("Something went wrong ", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
};

export const getNftWishListHandler = (payload) => {
  const metaAddress = localStorage.getItem("metaAddress");

  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  };

  return async (dispatch) => {
    dispatch(getNftWishlistRequest());

    try {
      const response = await axios.get(`${BASE_URL}/getUserFvrtNft?address=${metaAddress}`, requestOptions);

      if (response.data.error) {
        dispatch(getNftWishlisttErr({ data: {}, error: true, msg: "error" }));
      } else {
        dispatch(getNftWishlistSuccess({
          data: response.data.body,
          error: false,
        })
        );
      }
    } catch (err) {
      dispatch(getNftWishlisttErr({ data: {}, error: true, msg: "error" }));
    }
  };
};


export const removeWishlistNftHandlerApi = (payload) => {
  const metaAddress = localStorage.getItem("metaAddress");

  const param = {
    // address: metaAddress,
    id: payload.id,
  };

  return async (dispatch) => {
    dispatch(removeNftWishlistRequest());

    try {

      const response = await axios.post(`${BASE_URL}/changeFvrtNftStatus`, param);


      if (response.data.error) {
        dispatch(removeNftWishlisttErr);
      } else {

        toast.success('Removed from  WishList', {
          position: toast.POSITION.TOP_RIGHT,
        });
        dispatch(removeftWishlistSuccess());
        dispatch(getNftWishListHandler());


        // router.push("/portfolio");

      }
    } catch (error) {
      console.log('error=>', error);
      dispatch(removeNftWishlisttErr);
      toast.error("Something went wrong ", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
};