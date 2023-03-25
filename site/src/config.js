const env = process.env
const reactEnv = env.REACT_APP_ENVIRONMENT ? env.REACT_APP_ENVIRONMENT : "dev"
export default {
  cognito: {
    REGION: env.REACT_APP_REGION ? env.REACT_APP_REGION : "eu-west-1",
    USER_POOL_ID: env.REACT_APP_USER_POOL_ID ? env.REACT_APP_USER_POOL_ID : "false",
    APP_CLIENT_ID: env.REACT_APP_APP_CLIENT_ID ? env.REACT_APP_APP_CLIENT_ID : "false",
    IDENTITY_POOL_ID: env.REACT_APP_IDENTITY_POOL_ID ? env.REACT_APP_IDENTITY_POOL_ID : "false"
  },
  routes: [
      {
        viewName: "Artifactory",
        viewDescription: "Try to Recorvery help",
        routes: [{
          path: "/upload",
          description: "Upload Artifactory"
        },
        {
          path: "/artifacts-history",
          description: "Display information about files history"
        }
        ]
      },
      {
        viewName: "Jobs",
        viewDescription: "Jobs managment",
        routes: [{
          path: "/create-job",
          description: "Create job"
        },
        {
          path: "/jobs-history",
          description: "Your jobs history"
        }
        ]
      },
      {
        viewName: "Users",
        viewDescription: "Users managment",
        routes: [
        {
          path: "/users-all",
          description: "All users"
        },
        {
          path: "/users-me",
          description: "Show me"
        }
        ]
      }
      // ,
      // {
      //   viewName: "Catalog Service",
      //   viewDescription: "Update Glue catalog metadata",
      //   routes: [{
      //     path: "/catalog-update",
      //     description: "Update catalog"
      //   },
      //   {
      //     path: "/catalog-update-history",
      //     description: "Update catalog history"
      //   },
      //   {
      //     path: "/catalog-table-ddl",
      //     description: "Create or update table DDL"
      //   },
      //   {
      //     path: "/catalog-table-info",
      //     description: "Display information about tables"
      //   }
      //   ]
      // }
  ],

  uploadStatus: {
    error: 'error',
    warning: 'warning',
    success: 'success'
  },

  constants: {
    ENVIRONMENT: reactEnv,
    BASE_URL: env.REACT_APP_BASE_URL ? env.REACT_APP_BASE_URL : "",
    UPLOAD_S3_BUCKET: env.REACT_APP_UPLOAD_S3_BUCKET ? env.REACT_APP_UPLOAD_S3_BUCKET : "",
    BACKEND_BASE_URL: env.REACT_APP_BACKEND_BASE_URL ? env.REACT_APP_BACKEND_BASE_URL : "",
    

    PREPARED_DB: env.REACT_APP_PREPARED_DB ? env.REACT_APP_PREPARED_DB : "projectddb" + reactEnv,
    DEFAULT_SOURCE_NAME: env.REACT_APP_DEFAULT_SOURCE_NAME ? env.REACT_APP_DEFAULT_SOURCE_NAME : "recorvery-frontend"
  },


  dynamoDb: {
    FILE_STATUS_TABLE: env.REACT_APP_FILE_STATUS_TABLE ? env.REACT_APP_FILE_STATUS_TABLE : "project-status-" + reactEnv,
    FILE_ALERT_TABLE: "project-alerts-" + reactEnv,
    FILE_NAME_TABLE: "project-file-name-" + reactEnv,
    CATALOG_UPDATE_STATUS_TABLE: env.CATALOG_UPDATE_STATUS_TABLE ? env.CATALOG_UPDATE_STATUS_TABLE : "project-catalog-update-status-" + reactEnv,
    CATALOG_UPDATE_ORIGINAL_NAME_TABLE: env.CATALOG_UPDATE_ORIGINAL_NAME_TABLE ? env.CATALOG_UPDATE_ORIGINAL_NAME_TABLE : "project-catalog-update-original-file-name-" + reactEnv,
  },


  fileUploadTypeMapping: {
    uploadFileNameEnum: Object.freeze({standardFile: 1, anotherTypeFile: 2})
  },

  dataTypesMapping: {
    zip1: {
        name: 'Zip',
        desc: 'Recorvery passwork from zip',
        ext: ['zip']
    }
  }
}