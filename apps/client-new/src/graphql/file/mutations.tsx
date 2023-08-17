import { gql } from "@apollo/client";

export interface UploadFileData {
  uploadFile: string;
}

// export interface UploadFileVars {
//     file: Uploa
// }

export const UPLOAD_FILE = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file)
  }
`;
