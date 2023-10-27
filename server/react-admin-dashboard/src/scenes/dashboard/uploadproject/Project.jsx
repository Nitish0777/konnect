import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import style from "./Project.module.css";

export default function Project() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isDropZoneActive, setIsDropZoneActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [formData, setFormData] = useState({
    projectName: "",
    projectDescription: "",
    technologyUsed: "",
    ongoing: false,
    folder: null,
  });
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDropZoneActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDropZoneActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    setSelectedFiles(files);
    setIsDropZoneActive(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFiles([file]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(selectedFiles);
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{
          backgroundColor: colors.blueAccent[700],
          color: colors.grey[100],
          fontSize: "14px",
          fontWeight: "bold",
          padding: "10px 20px",
        }}
        className="btn-modal"
        onClick={toggleModal}
      >
        Upload Projects
      </Button>
      {modal && (
        <div className={style.form_container}>
          <form onSubmit={handleSubmit}>
            <div className={style.form_group}>
              <div onClick={toggleModal} className={style.overlay}></div>
              <label htmlFor="projectName">Name of Project:</label>
              <input
                type="text"
                id="projectName"
                name="projectName"
                placeholder="Project name"
                value={formData.projectName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={style.form_group}>
              <label htmlFor="projectDescription">Project Description:</label>
              <textarea
                id="projectDescription"
                name="projectDescription"
                placeholder="Project description"
                value={formData.projectDescription}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>

            <div className={style.form_group}>
              <label htmlFor="technologyUsed">Technology Used:</label>
              <input
                type="text"
                id="technologyUsed"
                name="technologyUsed"
                placeholder="HTML,CSS,JS,REACT"
                value={formData.technologyUsed}
                onChange={handleInputChange}
                required
              />
            </div>
            <label>
              <input
                type="checkbox"
                name="ongoing"
                checked={formData.ongoing}
                onChange={handleCheckboxChange}
              />
              Ongoing
            </label>
            <label>Upload Folder</label>
            <div
              className={`drop_zone ${isDropZoneActive ? "active" : ""}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <label htmlFor="folder" className={style.upload_label}>
                <div className={style.upload_icon}>
                  <FontAwesomeIcon icon={faFileUpload} />
                </div>
                <div>Drag & Drop files here or click to browse</div>
              </label>
              <input
                type="file"
                id="folder"
                name="folder"
                accept=".zip,.rar,.7zip"
                onChange={handleFileChange}
              />
            </div>

            <div className={style.buttons}>
              <button type="submit">Upload Project</button>
              <button type="button">Cancel</button>
            </div>
          </form>
          <button className={style.close_modal} onClick={toggleModal}>
            CLOSE
          </button>
        </div>
      )}
    </>
  );
}
