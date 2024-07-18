import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Typography, IconButton, Skeleton, Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import { useMutation, useQueryClient } from "react-query";
import { ENDPOINTS } from "../utils/endpoints";
import { APIResponse } from "../@types";

const FileUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [classificationLabel, setClassificationLabel] = useState<
    "OK" | "NOK" | null
  >(null);
  const [isDragActive, setIsDragActive] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    setLoading(true);
    setFile(acceptedFiles[0]);
    setTimeout(() => setLoading(false), 1000); // simulate loading
  }, []);

  const { getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      accept: {
        "image/png": [".png"],
        "image/jpeg": [".jpg", ".jpeg"],
      },
      onDragEnter: () => {
        setIsDragActive(true);
      },
      onDragLeave: () => {
        setIsDragActive(false);
      },
    });

  const handleRemoveFile = () => {
    setFile(null);
    setClassificationLabel(null);
    setError(null);
    queryClient.removeQueries("classification");
  };

  const { mutate: uploadFile } = useMutation((file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    return fetch(ENDPOINTS.classification_endpoint, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const result: APIResponse = data as APIResponse;
        setClassificationLabel(result.data.classification);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        setFile(null);
      });
  });

  const handleUpload = async () => {
    if (classificationLabel) {
      return;
    }
    if (file) {
      await uploadFile(file);
    } else {
      setError("No file selected");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        borderRadius: "8px",
        fontSize: "24px",
      }}
    >
      {!file ? (
        <Box
          {...getRootProps()}
          sx={{
            border: isDragActive
              ? "2px dotted green"
              : isDragReject
              ? "2px dashed red"
              : "1px dotted",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            height: "400px",
            justifyContent: "center",
            alignItems: "center",
            width: "50%",
            cursor: "pointer",
          }}
        >
          <input {...getInputProps()} />
          {isDragAccept ? (
            <CheckCircleIcon sx={{ fontSize: "80px", color: "green" }} />
          ) : (
            <CloudUploadIcon sx={{ fontSize: "80px" }} />
          )}
          <Typography variant="h6">
            {isDragActive
              ? "Drop file here"
              : "Drag and drop a file here, or click to select a file"}
          </Typography>
          {error && (
            <Typography variant="body1" color="error">
              {error}
            </Typography>
          )}
        </Box>
      ) : (
        <Box
          sx={{
            position: "relative",
            width: "50%",
            height: "400px",
            display: "flex",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            alignItems: "center",
          }}
        >
          {loading ? (
            <Skeleton variant="rectangular" width="100%" height="100%" />
          ) : (
            <img
              src={URL.createObjectURL(file)}
              alt="Uploaded file"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                borderRadius: "10px",
              }}
            />
          )}
          <IconButton
            onClick={handleRemoveFile}
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
              backgroundColor: "white",
              "&:hover": {
                backgroundColor: "white",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <Button
          onClick={handleUpload}
          variant="contained"
          color={
            classificationLabel === "OK"
              ? "success"
              : classificationLabel === "NOK"
              ? "error"
              : "primary"
          }
          disabled={!file ?? loading}
        >
          {classificationLabel === "OK"
            ? "OK"
            : classificationLabel === "NOK"
            ? "NOK"
            : "Upload"}
        </Button>
      </Box>
    </Box>
  );
};

export default FileUploader;
