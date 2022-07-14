import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import queryString from "query-string";
import { useHistory } from "react-router-dom";
import { addProduct } from "../../../../api/AdminAPI";
import {
  getCategory,
  getDetailsProduct,
  getSubCategory,
} from "../../../../api/API";
import SelectCategory from "../../../../components/Category Select/CategorySelect.component";
import TextField from "@material-ui/core/TextField";
import ImagePreivewsComponent from "../../../../components/Image Previews/ImagePreviews.component";
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
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
// import ImagePreviewComponent from "../../Create News/components/Image Previews/ImagePreviews.component";
import UploadButtonComponent from "../../Create News/components/Upload Button/UploadButton.component";
// import VideoPreviewComponent from "../../Create News/components/Video Previews/VideoPreviews.component";
// import EditorNewsComponent from "../../Create News/components/Editor News/EditorNews.component";
export default function CreateProduct(props) {
  const history = useHistory();
  const search = queryString.parse(props.location.search);
  const categoryID = search.id;
  const [subCategory, setSubCategory] = useState([]);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [price, setPrice] = useState("");
  const [product, setProduct] = useState();
  const [defaultSelect, setDefaultSelect] = useState();
  const [imagePreview, setImagePreview] = useState([]);
  const [highlight, setHighlight] = useState(false);
  const [count, setCount] = useState(1);
  const [image, setImage] = useState([]);
  const [content, setContent] = useState([]);
  const [description, setDescription] = useState("");

  const [editorState1, setEditorState1] = useState(EditorState.createEmpty());

  const [subCategorySelect, setSubCategorySelect] = useState("");

  const [type, setType] = useState("");

  useEffect(async () => {
    props.handleLoading(true);
    await getSubCategory(categoryID).then((res) => {
      console.log(res.data);
      setSubCategory(res.data.subCategory);
      setType(res.data.slug);
      setDefaultSelect({ categoryName: "", _id: "" });
    });
    props.handleLoading(false);
  }, [categoryID]);

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

  const handleChangeInput = (event) => {
    if (event.target.name === "name") {
      setName(event.target.value);
    } else if (event.target.name === "code") {
      setCode(event.target.value);
    } else if (event.target.name === "price") {
      setPrice(event.target.value);
    }
  };

  const handleSubmit = async () => {
    const data = {
      categoryID: categoryID,
      subCategoryID: subCategorySelect,
      code: code,
      name: name,
      price: price,
      image: imagePreview,
      description: description,
      listsContent: content,
      listImage: image,
      totalContent: count,
      highlight: highlight,
    };

    if (
      (subCategory.length !== 0 && data.subCategoryID === "") ||
      data.name === "" ||
      data.price === "" ||
      data.image.length === 0
    ) {
      alert("Xin vui lòng điền đầy đủ thông tin!");
    } else {
      await addProduct(data).then((res) => {
        history.push({
          pathname: "/admin/product-manager",
          search: `?q=${type}`,
        });
        console.log(res);
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
          setImagePreview((imagePreview) => [
            ...imagePreview,
            { url: reader.result, image: file, type: file.type },
          ]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  console.log(imagePreview);

  const deleteImage = (url) => {
    const newImagePreview = imagePreview.filter((e) => {
      return e.url != url.url;
    });
    setImagePreview(newImagePreview);
  };

  const handleChangeImage = (data) => {
    setImage((image) => [...image, data]);
  };
  const handleDeleteImage = (name) => {
    const newArrImage = image.filter((e) => {
      return e.image.name != name;
    });
    setImage(newArrImage);
  };
  const handleChangeContent = (data, index) => {
    let items = [...content];
    let item = { ...content[index] };
    item = data;
    items[index] = item;
    setContent(items);
  };
  const handleClickCount = () => {
    const newCount = count + 1;
    setCount(newCount);
  };

  console.log(image);
  return (
    <Grid>
      <div className="header-title mb-3">
        <span>Thêm sản phẩm: </span>
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
              name="name"
              style={{ width: "100%" }}
              onChange={handleChangeInput}
            />
          </Grid>
          <Grid item lg={4}>
            <TextField
              id="outlined-basic"
              label="Mã sản phẩm"
              name="code"
              variant="outlined"
              style={{ width: "100%" }}
              onChange={handleChangeInput}
            />
          </Grid>
          <Grid item lg={4}>
            <TextField
              id="outlined-basic"
              label="Giá sản phẩm"
              name="price"
              variant="outlined"
              style={{ width: "100%" }}
              onChange={handleChangeInput}
              type="number"
            />
          </Grid>
          <Grid item lg={12}>
            <div className="news-editor mt-3">
              <p>Hình ảnh:</p>

              <div className="wrap-pick-image">
                <div className="wrapper">
                  {listImagePreview}
                  <UploadButtonComponent addImage={addImage} />
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
            <div className="news-editor mt-3">
              {[...Array(count)].map((_, i) => (
                <EditorNewsComponent
                  key={i}
                  content={i + 1}
                  handleChangeImage={handleChangeImage}
                  handleDeleteImage={handleDeleteImage}
                  handleChangeContent={handleChangeContent}
                />
              ))}
              <div className="button-add">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={handleClickCount}
                >
                  Thêm nội dung
                </button>
              </div>
            </div>
          </Grid>
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
