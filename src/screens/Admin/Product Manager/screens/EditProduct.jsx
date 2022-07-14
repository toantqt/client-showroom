import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import queryString from "query-string";
import { useHistory } from "react-router-dom";
import { getCategoryNews, updateProduct } from "../../../../api/AdminAPI";
import { getDetailsProduct } from "../../../../api/API";
import SelectCategory from "../../../../components/Category Select/CategorySelect.component";
import TextField from "@material-ui/core/TextField";
import ImagePreviewComponent from "../../Create News/components/Image Previews/ImagePreviews.component";
import VideoPreviewComponent from "../../Create News/components/Video Previews/VideoPreviews.component";
import {
  convertFromHTML,
  ContentState,
  EditorState,
  convertToRaw,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "draft-js/dist/Draft.css";
import draftToHtml from "draftjs-to-html";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
export default function EditProduct(props) {
  const history = useHistory();
  const search = queryString.parse(props.location.search);
  const productID = search.id;
  const [categoryID, setCategoryID] = useState("");
  const [subCategory, setSubCategory] = useState([]);
  const [name, setName] = useState("");
  const [product, setProduct] = useState();
  const [defaultSelect, setDefaultSelect] = useState();
  const [imagePreview, setImagePreview] = useState();
  const [highlight, setHighlight] = useState(false);
  const [subCategorySelect, setSubCategorySelect] = useState("");
  const [slug, setSlug] = useState("");
  const [imageProduct, setImageProduct] = useState([]);
  const [image, setImage] = useState([]);
  const [content, setContent] = useState([]);
  const [contentOld, setContentOld] = useState([]);
  const [price, setPrice] = useState("");
  const [code, setCode] = useState("");
  const [editorState1, setEditorState1] = useState(EditorState.createEmpty());
  const [description, setDescription] = useState("");

  useEffect(async () => {
    props.handleLoading(true);
    await getDetailsProduct(productID).then((res) => {
      console.log(res.data);
      setProduct(res.data.product);
      setSlug(res.data.category.slug);
      setCategoryID(res.data.category._id);
      setSubCategory(res.data.category.subCategory);
      setSubCategorySelect(res.data.product.subCategoryID);
      setName(res.data.product.name);
      setHighlight(res.data.product.highlight);
      for (let item of res.data.category.subCategory) {
        if (item._id === res.data.product.subCategoryID) {
          setDefaultSelect({
            categoryName: item.name,
            _id: item._id,
          });
        }
      }
      setImageProduct(res.data.product.image);
      setCode(res.data.product.code);
      setPrice(res.data.product.price);

      let i = 0;
      for (let item of res.data.category.subCategory) {
        if (item._id === res.data.product.subCategoryID) {
          setDefaultSelect({ categoryName: item.name, _id: item._id });
        }
      }

      for (let item of res.data.product.details) {
        for (let img of item.library) {
          setImage((image) => [...image, { image: img, list: i + 1 }]);
        }
        i++;

        setContent((content) => [...content, item.content]);
        setContentOld((content) => [...content, item.content]);
      }

      const blocksFromHTML = convertFromHTML(res.data.product.description);
      const content = ContentState.createFromBlockArray(blocksFromHTML);
      setEditorState1(EditorState.createWithContent(content));
    });
    props.handleLoading(false);
  }, [productID]);

  const onEditorStateChange = (editorState, status) => {
    const converHtml = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    );
    if (status === 1) {
      setEditorState1(editorState);
      setDescription(converHtml);
    }
  };

  const handleChangeCategory = (value) => {
    if (value !== "") {
      setSubCategorySelect(value._id);
    } else {
      setSubCategorySelect("");
    }
  };

  const handleChangeTitle = (event) => {
    setName(event.target.value);
  };

  const handleChangeCode = (event) => {
    setCode(event.target.value);
  };

  const handleChangePrice = (event) => {
    setPrice(event.target.value);
  };

  const handleChangeImage = (data) => {
    setImage((image) => [...image, data]);
  };

  const handleSubmit = async () => {
    const data = {
      productID: productID,
      subCategoryID: subCategorySelect,
      name: name,
      code: code,
      price: price,
      description: description,
      highlight: highlight,
      image: imageProduct,
      listsContent: content,
      listImage: image,
      totalContent: content.length,
    };

    console.log(data);
    if (
      (subCategory.length !== 0 && data.subCategoryID === "") ||
      data.name === "" ||
      data.price === "" ||
      data.image.length === 0
    ) {
      alert("Xin vui lòng điền đầy đủ thông tin!");
    } else {
      await updateProduct(data).then((res) => {
        history.push({
          pathname: "/admin/product-manager",
          search: `?q=${slug}`,
        });
      });
    }
  };

  const handleClickHighlight = () => {
    setHighlight(!highlight);
  };
  const handlePastedText = (text, html, callback) => {
    const modifiedHtml = html.replace(
      /<p class=MsoListParagraph[\s\S]*?>·([\s\S]*?)<\/p>/g,
      "<li>$1</li>"
    );
  };
  const addImage = (event) => {
    if (event.target.type === "file") {
      let files = Array.from(event.target.files);
      files.forEach((file) => {
        let reader = new FileReader();
        reader.onloadend = () => {
          setImageProduct((imageProduct) => [
            ...imageProduct,
            { url: reader.result, image: file, type: file.type },
          ]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const deleteImage = (url) => {
    const newImagePreview = imageProduct.filter((e) => {
      return e.url != url.url;
    });
    setImageProduct(newImagePreview);
  };

  const listImagePreview = imageProduct.map((e, index) => {
    console.log(e);
    if (e.type !== "video/mp4") {
      return (
        <ImagePreviewComponent url={e} key={index} deleteImage={deleteImage} />
      );
    } else {
      return (
        <VideoPreviewComponent url={e} key={index} deleteImage={deleteImage} />
      );
    }
  });

  const handleDeleteImage = (url) => {
    const newArrImage = image.filter((e) => {
      return e != url;
    });
    setImage(newArrImage);
  };

  const handleChangeContent = (data, index) => {
    let items = [...content];
    let item = { ...content[index + 1] };
    item = data;
    items[index] = item;
    setContent(items);
  };

  const handleDeleteImageOld = (url) => {
    const newArrImage = image.filter((e) => {
      return e != url;
    });
    setImage(newArrImage);
  };

  return (
    <Grid>
      <div className="header-title mb-3">
        <span>Cập nhật sản phẩm </span>
      </div>
      <div>
        <Grid container spacing={2}>
          {subCategory.length != 0 ? (
            <Grid item lg={4}>
              {defaultSelect ? (
                <SelectCategory
                  data={subCategory}
                  value={defaultSelect}
                  handleChange={handleChangeCategory}
                />
              ) : (
                <></>
              )}
            </Grid>
          ) : (
            <></>
          )}

          <Grid item lg={subCategory.length != 0 ? 8 : 12}>
            <TextField
              id="outlined-basic"
              label="Tên sản phẩm"
              variant="outlined"
              style={{ width: "100%" }}
              key={product?.name}
              defaultValue={product?.name}
              onChange={handleChangeTitle}
            />
          </Grid>
          <Grid item lg={4}>
            <TextField
              id="outlined-basic"
              label="Mã sản phẩm"
              name="code"
              variant="outlined"
              style={{ width: "100%" }}
              key={product?.code}
              defaultValue={product?.code}
              onChange={handleChangeCode}
            />
          </Grid>
          <Grid item lg={4}>
            <TextField
              id="outlined-basic"
              label="Giá sản phẩm"
              name="price"
              variant="outlined"
              style={{ width: "100%" }}
              key={product?.price}
              defaultValue={product?.price}
              onChange={handleChangePrice}
              type="number"
            />
          </Grid>

          <Grid item lg={12}>
            <div className="news-editor mt-3">
              <div className="news-editor mt-3">
                <p>Hình ảnh:</p>

                <div className="wrap-pick-image">
                  <div className="wrapper">
                    {listImagePreview}
                    <UploadButtonComponent addImage={addImage} />
                  </div>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item lg={12}>
            <div className="news-editor mt-3">
              <p>Mô tả ngắn: </p>

              <Editor
                editorState={editorState1}
                onEditorStateChange={(e) => {
                  onEditorStateChange(e, 1);
                }}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
                handlePastedText={handlePastedText}
              />
            </div>
          </Grid>
          {/* <Grid item lg={12}>
            {contentOld.map((e, i) => (
              <EditEditorComponent
                key={i}
                content={i + 1}
                data={e}
                handleChangeImage={handleChangeImage}
                handleDeleteImage={handleDeleteImage}
                handleChangeContent={handleChangeContent}
                handleDeleteImageOld={handleDeleteImageOld}
                image={image}
              />
            ))}
          </Grid> */}
        </Grid>
        <div className="news-editor mt-3">
          <p>Trạng thái</p>

          <FormControlLabel
            value="url"
            control={<Radio color="primary" />}
            label="Nổi bật"
            checked={highlight}
            onClick={handleClickHighlight}
          />
        </div>
      </div>
      <div style={{ marginTop: "70px" }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<SaveIcon />}
          style={{ float: "right" }}
          onClick={handleSubmit}
        >
          Xác nhận
        </Button>
      </div>
    </Grid>
  );
}
