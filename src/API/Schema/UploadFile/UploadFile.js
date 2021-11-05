import {  gql } from '@apollo/client';


 export const UploadFile = gql`
	mutation uploadFile($file: Upload!) {
		uploadFile(file: $file) {
			url
		}
	}
`;

export const SingleUpload = gql`
  mutation SingleUpload($file: Upload!) {
    singleUpload(file: $file) {
      url
      filename
      mimtype
      encoding

    }
  }
`;

export const UPLOAD_FILE_STREAM = gql`
  mutation SingleUploadStream($file: Upload!) {
    singleUploadStream(file: $file) {
      filename
      mimetype
      encoding
    }
  }
`;