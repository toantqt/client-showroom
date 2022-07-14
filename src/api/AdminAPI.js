import axios from "axios";
import { getRole } from "../auth/auth";
import { getAccessToken } from "../auth/auth";
import moment from "moment";

export const covertDate = (date) => {
  return moment(date).format("DD/MM/YYYY");
};

// const url = "https://xuan-nong.herokuapp.com/api";
// const url = "http://45.15.24.162:6698/api";
const url = "http://localhost:6698/api";

const headers = async () => {
  return { Authorization: `${await getAccessToken()}` };
};
export const login = async (data) => {
  return await axios
    .post(`${url}/v1/admin/login`, data)
    .then(async (res) => {
      const token = {
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
      };
      await localStorage.setItem("userToken", JSON.stringify(token));
      let role;
      await getRole().then((user) => {
        role = user;
      });
      return role;
    })
    .catch((error) => {
      return error.response;
    });
};

export const getAllBanner = async () => {
  return await axios
    .get(`${url}/get-all-banner`, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const getDetailsBanner = async (bannerID) => {
  return await axios
    .get(`${url}/get-details-banner/${bannerID}`, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const deleteBanner = async (data) => {
  console.log(data);
  return await axios
    .post(`${url}/delete-banner`, data, {
      headers: await headers(),
    })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      return error.response;
    });
};

export const getAllCategory = async () => {
  return await axios
    .get(`${url}/get-all-category`, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const updateBanner = async (data) => {
  const formData = new FormData();
  if (data.image.file) {
    formData.append("image", data.image.file);
  } else {
    formData.append("image", data.image.url);
  }
  formData.append("index", data.index);
  formData.append("bannerID", data.bannerID);
  formData.append("url", data.url);

  return await axios
    .post(`${url}/update-banner`, formData, {
      headers: await headers(),
    })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      return error.response;
    });
};

export const getDetailsCategory = async (categoryID) => {
  return await axios
    .get(`${url}/get-details-category/${categoryID}`, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const updateCategory = async (data) => {
  return await axios
    .post(`${url}/update-category`, data, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const addSubCategory = async (data) => {
  return await axios
    .post(`${url}/add-sub-category`, data, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const deleteSubCategory = async (data) => {
  return await axios
    .post(`${url}/delete-sub-category`, data, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const updateSubCategory = async (data) => {
  return await axios
    .post(`${url}/update-sub-category`, data, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const addCategory = async (data) => {
  return await axios
    .post(`${url}/add-category`, data, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const deleteCategory = async (data) => {
  return await axios
    .post(`${url}/delete-category`, data, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const updateImage = async (data) => {
  const formData = new FormData();
  if (data.image.file) {
    formData.append("image", data.image.file);
  } else {
    formData.append("image", data.image.url);
  }
  formData.append("title", data.title);
  formData.append("imageID", data.imageID);

  return await axios
    .post(`${url}/update-image`, formData, {
      headers: await headers(),
    })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      return error.response;
    });
};

export const deleteImage = async (data) => {
  return await axios
    .post(`${url}/delete-image`, data, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const addImage = async (data) => {
  const formData = new FormData();
  formData.append("image", data.image.file);

  formData.append("title", data.title);

  return await axios
    .post(`${url}/add-image`, formData, {
      headers: await headers(),
    })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      return error.response;
    });
};

export const addVideo = async (data) => {
  const formData = new FormData();
  if (data.video.file) {
    formData.append("video", data.video.file);
  } else {
    formData.append("video", data.video.url);
  }
  formData.append("title", data.title);

  return await axios
    .post(`${url}/add-video`, formData, {
      headers: await headers(),
    })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      return error.response;
    });
};

export const deleteVideo = async (data) => {
  return await axios
    .post(`${url}/delete-video`, data, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const updateVideo = async (data) => {
  const formData = new FormData();
  if (data.video.file) {
    formData.append("video", data.video.file);
  } else {
    formData.append("video", data.video.url);
  }
  formData.append("title", data.title);
  formData.append("videoID", data.videoID);

  return await axios
    .post(`${url}/update-video`, formData, {
      headers: await headers(),
    })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      return error.response;
    });
};

export const getCategoryNews = async (slug) => {
  return await axios
    .get(`${url}/get-category-news/${slug}`, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const getNewsCategory = async (slug) => {
  return await axios
    .get(`${url}/get-news-category/${slug}`, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const deleteNews = async (data) => {
  return await axios
    .post(`${url}/delete-news`, data, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const updateIntroduce = async (data) => {
  const formData = new FormData();
  let i = 0;
  for (let item of data.history.image) {
    console.log(item);
    let title = "lists1Img" + i;
    if (item.file) {
      formData.append(title, item.file);
    } else {
      formData.append(title, JSON.stringify(item));
    }
    i++;
  }

  let y = 0;
  for (let item of data.structure.image) {
    let title = "lists2Img" + y;
    if (item.file) {
      formData.append(title, item.file);
    } else {
      formData.append(title, JSON.stringify(item));
    }
    y++;
  }

  formData.append("historyTitle", data.history.title);
  formData.append("historyTotal", data.history.total);

  formData.append("historyContent", data.history.content);
  formData.append("structureTitle", data.structure.title);
  formData.append("structureContent", data.structure.content);
  formData.append("structureTotal", data.structure.total);

  return await axios
    .post(`${url}/update-introduce`, formData, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const productManager = async () => {
  return await axios
    .get(`${url}/v1/productSlider/slide`, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const orderManager = async (type) => {
  return await axios
    .get(`${url}/v1/productSlider/order/${type}`, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const getDetailsOrder = async (id) => {
  return await axios
    .get(`${url}/v1/productSlider/details-order/${id}`, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const removeProductOrder = async (data) => {
  return await axios
    .patch(`${url}/v1/productSlider/product-order`, data, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const confirmOrder = async (data) => {
  return await axios
    .patch(`${url}/v1/productSlider/confirm-order`, data, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const deleteOrder = async (orderID) => {
  return await axios
    .delete(`${url}/v1/productSlider/order/${orderID}`, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};
export const deleteProduct = async (data) => {
  return await axios
    .post(`${url}/delete-product`, data, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const updateProduct = async (data) => {
  const formData = new FormData();
  for (let i = 0; i < data.totalContent; i++) {
    let title = "listsImage" + i;
    const arrImg = data.listImage.filter((e) => {
      return e.list === i + 1;
    });
    for (let img of arrImg) {
      console.log(img);
      if (img.image.url) {
        formData.append(title, JSON.stringify(img.image));
      } else {
        formData.append(title, img.image);
      }
    }
  }

  for (let item of data.image) {
    if (item.image) {
      formData.append("image", item.image);
    } else {
      formData.append("image", JSON.stringify(item));
    }
  }
  formData.append("totalImageProduct", data.image.length);
  formData.append("totalContent", data.totalContent);
  formData.append("listsContent", JSON.stringify(data.listsContent));

  formData.append("productID", data.productID);
  formData.append("subCategoryID", data.subCategoryID);
  formData.append("name", data.name);
  formData.append("code", data.code);
  formData.append("price", data.price);
  formData.append("description", data.description);
  formData.append("highlight", data.highlight);

  return await axios
    .post(`${url}/update-product`, formData, {
      headers: await headers(),
    })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      return error.response;
    });
};

export const updateNews = async (data) => {
  const formData = new FormData();

  for (let i = 0; i < data.totalContent; i++) {
    let title = "listsImage" + i;
    const arrImg = data.listImage.filter((e) => {
      return e.list === i + 1;
    });
    for (let img of arrImg) {
      console.log(img);
      if (img.image.url) {
        formData.append(title, JSON.stringify(img.image));
      } else {
        formData.append(title, img.image);
      }
    }
  }
  if (data.thumbnail.file) {
    formData.append("thumbnail", data.thumbnail.file);
  } else {
    formData.append("thumbnail", JSON.stringify(data.thumbnail));
  }

  formData.append("newsID", data.newsID);
  formData.append("subCategoryID", data.subCategoryID);
  formData.append("title", data.title);
  formData.append("listsContent", JSON.stringify(data.listsContent));
  formData.append("author", data.author);
  formData.append("totalContent", data.totalContent);

  return await axios
    .post(`${url}/update-news`, formData, {
      headers: await headers(),
    })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      return error.response;
    });
};

export const addProduct = async (data) => {
  console.log(data);
  const formData = new FormData();
  for (let i = 0; i < data.totalContent; i++) {
    let title = "listsImage" + i;
    const arrImg = data.listImage.filter((e) => {
      return e.list === i + 1;
    });
    for (let img of arrImg) {
      formData.append(title, img.image);
    }
  }
  for (let item of data.image) {
    formData.append("image", item.image);
  }

  formData.append("categoryID", data.categoryID);
  formData.append("subCategoryID", data.subCategoryID);
  formData.append("name", data.name);
  formData.append("price", data.price);
  formData.append("code", data.code);
  formData.append("listsContent", JSON.stringify(data.listsContent));
  formData.append("description", data.description);
  formData.append("highlight", data.highlight);
  formData.append("totalContent", data.totalContent);

  return await axios
    .post(`${url}/add-product`, formData, {
      headers: await headers(),
    })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      return error.response;
    });
};

export const addNews = async (data) => {
  console.log(data);
  const formData = new FormData();

  for (let i = 0; i < data.totalContent; i++) {
    let title = "listsImage" + i;
    const arrImg = data.listImage.filter((e) => {
      return e.list === i + 1;
    });
    for (let img of arrImg) {
      formData.append(title, img.image);
    }
  }

  formData.append("thumbnail", data.thumbnail.file);

  formData.append("categoryID", data.categoryID);
  formData.append("subCategoryID", data.subCategoryID);
  formData.append("title", data.mainTitle);
  formData.append("listsContent", JSON.stringify(data.listsContent));
  formData.append("author", data.author);
  formData.append("totalContent", data.totalContent);

  return await axios
    .post(`${url}/add-news`, formData, {
      headers: await headers(),
    })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      return error.response;
    });
};

export const getNewsEdit = async (id) => {
  return await axios
    .get(`${url}/get-news-edit/${id}`, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const addBanner = async (data) => {
  const formData = new FormData();
  formData.append("banner", data.banner.file);
  formData.append("index", data.index);
  formData.append("url", data.url);

  return await axios
    .post(`${url}/add-banner`, formData, {
      headers: await headers(),
    })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      return error.response;
    });
};

export const addContact = async (data) => {
  const formData = new FormData();

  if (data.image.file) {
    formData.append("image", data.image.file);
  }
  formData.append("name", data.name);
  formData.append("address", data.address);
  formData.append("phoneNumber", data.phoneNumber);
  formData.append("email", data.email);
  formData.append("type", data.type);

  return await axios
    .post(`${url}/add-contact`, formData, {
      headers: await headers(),
    })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      return error.response;
    });
};

export const deleteContact = async (data) => {
  return await axios
    .post(`${url}/delete-contact`, data, {
      headers: await headers(),
    })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      return error.response;
    });
};

export const getDealer = async () => {
  return await axios
    .get(`${url}/v1/productSlider/company`, {
      headers: await headers(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      return error.response;
    });
};

export const addDealer = async (data) => {
  return await axios
    .post(`${url}/register-dealer`, data, {
      headers: await headers(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      return error.response;
    });
};

export const deleteDealer = async (data) => {
  return await axios
    .post(`${url}/delete-dealer`, data, {
      headers: await headers(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      return error.response;
    });
};

export const getDetailsDealer = async (id) => {
  return await axios
    .get(`${url}/get-details-dealer/${id}`, {
      headers: await headers(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      return error.response;
    });
};

export const updateDealer = async (data) => {
  return await axios
    .post(`${url}/update-dealer`, data, {
      headers: await headers(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      return error.response;
    });
};

export const getContactCustomer = async () => {
  return await axios
    .get(`${url}/get-contact-customer`, {
      headers: await headers(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      return error.response;
    });
};

export const deleteContactCustomer = async (data) => {
  return await axios
    .post(`${url}/delete-contact-customer`, data, {
      headers: await headers(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      return error.response;
    });
};
