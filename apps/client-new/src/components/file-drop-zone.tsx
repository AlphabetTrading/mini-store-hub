import {
  Alert,
  AlertTitle,
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  SvgIcon,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { Dispatch, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import CloseIcon from "@mui/icons-material/Close";
import UploadFileIcon from "@mui/icons-material/UploadFile";

type Props = {
  file: any;
  setFile: Dispatch<any>;
};

const FileDropZone = ({ file, setFile }: Props) => {
  const onDrop = useCallback((acceptedFiles: any) => {
    setFile(acceptedFiles[0]);
  }, []);
  console.log(file)

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
  } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".png"],
    },
    maxFiles: 1,
    maxSize: 5000000,
  });
  return (
    <div>
      {!file ? (
        <Box
          sx={{
            alignItems: "center",
            border: 1,
            borderRadius: 1,
            borderStyle: "dashed",
            borderColor: "divider",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            outline: "none",
            px: 6,
            py: 4,
            ...(isDragActive && {
              backgroundColor: "action.active",
              opacity: 0.5,
            }),
            "&:hover": {
              backgroundColor: "action.hover",
              cursor: "pointer",
              opacity: 0.5,
            },
          }}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <Stack alignItems="center" direction="row" spacing={2}>
            <Avatar
              sx={{
                height: 64,
                width: 64,
              }}
            >
              <SvgIcon>
                <UploadFileIcon />
              </SvgIcon>
            </Avatar>
            <Stack spacing={1}>
              <Typography
                sx={{
                  "& span": {
                    textDecoration: "underline",
                  },
                }}
                variant="h6"
              >
                <span>Click to upload</span> or drag and drop
              </Typography>
              {/* {caption && (
            <Typography
              color="text.secondary"
              variant="body2"
            >
              {caption}
            </Typography>
          )} */}
            </Stack>
          </Stack>
        </Box>
      ) : (
        <Box sx={{ mt: 2}}>
          <List>
            <ListItem
              key={file.path}
              sx={{
                border: 1,
                borderColor: "divider",
                borderRadius: 1,
                "& + &": {
                  mt: 1,
                },
              }}
            >
              <ListItemIcon>
                <img
                  src={
                    typeof file == "string" ? file : URL.createObjectURL(file)
                  }
                  height={50}
                />
                <img src="/assets/icons/file.svg" width={50} />
              </ListItemIcon>
              <ListItemText
                primary={file.name}
                primaryTypographyProps={{ variant: "subtitle2" }}
                // secondary={bytesToSize(file.size)}
              />
              <Tooltip title="Remove">
                <IconButton edge="end" onClick={() => setFile(null)}>
                  <SvgIcon>
                    <CloseIcon />
                  </SvgIcon>
                </IconButton>
              </Tooltip>
            </ListItem>
          </List>
        </Box>
      )}
      {(fileRejections.length > 0 || isDragReject) && (
        <Alert color="error">
          <AlertTitle>Error</AlertTitle>
          {fileRejections[0]?.errors[0]?.message}
          {isDragReject && "Only image files are allowed"}
        </Alert>
      )}
    </div>
  );
};

export default FileDropZone;
