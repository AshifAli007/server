define({ "api": [
  {
    "type": "post",
    "url": "v1/assetType",
    "title": "Create asset type with asset attributes key",
    "description": "<p>Create asset type with asset attributes key</p>",
    "version": "1.0.0",
    "name": "Create_Asset_type",
    "group": "Asset_Type",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User's access token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "companyId",
            "description": "<p>company Id</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "..100",
            "optional": false,
            "field": "name",
            "description": "<p>Asset full name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "..50",
            "optional": false,
            "field": "uniqueId",
            "description": "<p>Asset unique id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Created 201": [
          {
            "group": "Created 201",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true</p>"
          },
          {
            "group": "Created 201",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>responce message</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Some parameters may contain invalid values</p>"
          }
        ],
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can create the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only admins can create the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/assetType.route.js",
    "groupTitle": "Asset_Type"
  },
  {
    "type": "post",
    "url": "v1/assetType/:assetTypeId/subType",
    "title": "Insert Asset Sub Type",
    "description": "<p>Insert Asset subType detail</p>",
    "version": "1.0.0",
    "name": "Insert_Asset_sub_Type",
    "group": "Asset_Type",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User's access token</p>"
          },
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "companyId",
            "description": "<p>Company Id</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "assetTypeId",
            "description": "<p>id of the asset Type</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "name",
            "description": "<p>name of the asset Sub Type</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array[]",
            "optional": false,
            "field": "data",
            "description": "<p>AssetType detail</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only user with same id or admins can access the data</p>"
          }
        ],
        "Not Found 404": [
          {
            "group": "Not Found 404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>User does not exist</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/assetType.route.js",
    "groupTitle": "Asset_Type"
  },
  {
    "type": "get",
    "url": "v1/assetType",
    "title": "List asset type with asset attributes key",
    "description": "<p>List asset type with asset attributes key</p>",
    "version": "1.0.0",
    "name": "List_Asset_type",
    "group": "Asset_Type",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User's access token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "companyId",
            "description": "<p>company Id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Created 201": [
          {
            "group": "Created 201",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true</p>"
          },
          {
            "group": "Created 201",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>responce message</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Some parameters may contain invalid values</p>"
          }
        ],
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can create the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only admins can create the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/assetType.route.js",
    "groupTitle": "Asset_Type"
  },
  {
    "type": "post",
    "url": "v1/:assetTypeId/subType/:subTypeId",
    "title": "Update Asset Sub Type Detail",
    "description": "<p>Update Asset Sub Type Detail</p>",
    "version": "1.0.0",
    "name": "Update_Asset_Sub_Type",
    "group": "Asset_Type",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User's access token</p>"
          },
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "companyId",
            "description": "<p>Company Id</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "assetTypeId",
            "description": "<p>id of the asset Type</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "name",
            "description": "<p>name of the asset Sub Type</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array[]",
            "optional": false,
            "field": "data",
            "description": "<p>AssetType detail</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only user with same id or admins can access the data</p>"
          }
        ],
        "Not Found 404": [
          {
            "group": "Not Found 404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>User does not exist</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/assetType.route.js",
    "groupTitle": "Asset_Type"
  },
  {
    "type": "put",
    "url": "v1/assetType/:assetTypeId",
    "title": "Update Asset Type",
    "description": "<p>Update Asset Type Information</p>",
    "version": "1.0.0",
    "name": "Update_Asset_Type",
    "group": "Asset_Type",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User's access token</p>"
          },
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "userId",
            "description": "<p>User Id</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "companyId",
            "description": "<p>company Id</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "..100",
            "optional": false,
            "field": "name",
            "description": "<p>Asset full name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "..50",
            "optional": false,
            "field": "uniqueId",
            "description": "<p>Asset unique id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Updated 201": [
          {
            "group": "Updated 201",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true</p>"
          }
        ],
        "Created 201": [
          {
            "group": "Created 201",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>responce message</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only user with same id or admins can access the data</p>"
          }
        ],
        "Not Found 404": [
          {
            "group": "Not Found 404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>User does not exist</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/assetType.route.js",
    "groupTitle": "Asset_Type"
  },
  {
    "type": "get",
    "url": "v1/assetType/:assetTypeId",
    "title": "Get Asset Type detail",
    "description": "<p>Get Asset Type information</p>",
    "version": "1.0.0",
    "name": "View_Asset_Type",
    "group": "Asset_Type",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User's access token</p>"
          },
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "companyId",
            "description": "<p>Company Id</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "assetTypeId",
            "description": "<p>id of the asset Type</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array[]",
            "optional": false,
            "field": "data",
            "description": "<p>AssetType detail</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only user with same id or admins can access the data</p>"
          }
        ],
        "Not Found 404": [
          {
            "group": "Not Found 404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>User does not exist</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/assetType.route.js",
    "groupTitle": "Asset_Type"
  },
  {
    "type": "get",
    "url": "v1/assetType/subType",
    "title": "Get Asset Type detail with subType",
    "description": "<p>Get Asset Type information with subType detail</p>",
    "version": "1.0.0",
    "name": "View_Asset_Type_with_sub_Type",
    "group": "Asset_Type",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User's access token</p>"
          },
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "companyId",
            "description": "<p>Company Id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array[]",
            "optional": false,
            "field": "data",
            "description": "<p>AssetType detail</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only user with same id or admins can access the data</p>"
          }
        ],
        "Not Found 404": [
          {
            "group": "Not Found 404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>User does not exist</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/assetType.route.js",
    "groupTitle": "Asset_Type"
  },
  {
    "type": "get",
    "url": "v1/assetType/:assetTypeId/subType",
    "title": "Get Asset Type detail with subType",
    "description": "<p>Get Asset Type information with subType detail</p>",
    "version": "1.0.0",
    "name": "View_Asset_Type_with_sub_Type",
    "group": "Asset_Type",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User's access token</p>"
          },
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "companyId",
            "description": "<p>Company Id</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "assetTypeId",
            "description": "<p>id of the asset Type</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array[]",
            "optional": false,
            "field": "data",
            "description": "<p>AssetType detail</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only user with same id or admins can access the data</p>"
          }
        ],
        "Not Found 404": [
          {
            "group": "Not Found 404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>User does not exist</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/assetType.route.js",
    "groupTitle": "Asset_Type"
  },
  {
    "type": "post",
    "url": "v1/auth/facebook",
    "title": "Facebook Login",
    "description": "<p>Login with facebook. Creates a new user if it does not exist</p>",
    "version": "1.0.0",
    "name": "FacebookLogin",
    "group": "Auth",
    "permission": [
      {
        "name": "public"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "access_token",
            "description": "<p>Facebook's access_token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tokenType",
            "description": "<p>Access Token's type</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>Authorization Token</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "refreshToken",
            "description": "<p>Token to get a new accessToken after expiration time</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "expiresIn",
            "description": "<p>Access Token's expiration time in miliseconds</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Some parameters may contain invalid values</p>"
          }
        ],
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Incorrect access_token</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/auth.route.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "v1/auth/google",
    "title": "Google Login",
    "description": "<p>Login with google. Creates a new user if it does not exist</p>",
    "version": "1.0.0",
    "name": "GoogleLogin",
    "group": "Auth",
    "permission": [
      {
        "name": "public"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "access_token",
            "description": "<p>Google's access_token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tokenType",
            "description": "<p>Access Token's type</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>Authorization Token</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "refreshToken",
            "description": "<p>Token to get a new accpessToken after expiration time</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "expiresIn",
            "description": "<p>Access Token's expiration time in miliseconds</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Some parameters may contain invalid values</p>"
          }
        ],
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Incorrect access_token</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/auth.route.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "v1/auth/login",
    "title": "Login",
    "description": "<p>Get an accessToken</p>",
    "version": "1.0.0",
    "name": "Login",
    "group": "Auth",
    "permission": [
      {
        "name": "public"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "..128",
            "optional": false,
            "field": "password",
            "description": "<p>User's password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token.accessToken",
            "description": "<p>Authorization Token</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.id",
            "description": "<p>User's id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.name",
            "description": "<p>User's name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.email",
            "description": "<p>User's email</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.role",
            "description": "<p>User's role</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Some parameters may contain invalid values</p>"
          }
        ],
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Incorrect email or password</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/auth.route.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "v1/auth/refresh-token",
    "title": "Refresh Token",
    "description": "<p>Refresh expired accessToken</p>",
    "version": "1.0.0",
    "name": "RefreshToken",
    "group": "Auth",
    "permission": [
      {
        "name": "public"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "refreshToken",
            "description": "<p>Refresh token aquired when user logged in</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tokenType",
            "description": "<p>Access Token's type</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>Authorization Token</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "refreshToken",
            "description": "<p>Token to get a new accessToken after expiration time</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "expiresIn",
            "description": "<p>Access Token's expiration time in miliseconds</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Some parameters may contain invalid values</p>"
          }
        ],
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Incorrect email or refreshToken</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/auth.route.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "v1/auth/register",
    "title": "Register",
    "description": "<p>Register a new user</p>",
    "version": "1.0.0",
    "name": "Register",
    "group": "Auth",
    "permission": [
      {
        "name": "public"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's email</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "userType",
            "description": "<p>We have three type of user type admin(0), company admin(1), employees (2)</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "contactno",
            "description": "<p>User's Contact no.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "6..100",
            "optional": true,
            "field": "address",
            "description": "<p>User's Address</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "6..128",
            "optional": false,
            "field": "password",
            "description": "<p>User's password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "6..100",
            "optional": false,
            "field": "fullname",
            "description": "<p>User's fullname</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Created 201": [
          {
            "group": "Created 201",
            "type": "String",
            "optional": false,
            "field": "token.accessToken",
            "description": "<p>Authorization Token</p>"
          },
          {
            "group": "Created 201",
            "type": "Integer",
            "optional": false,
            "field": "user.status",
            "description": "<p>api status</p>"
          },
          {
            "group": "Created 201",
            "type": "String",
            "optional": false,
            "field": "user.id",
            "description": "<p>User's id</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Some parameters may contain invalid values</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/auth.route.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "v1/bus",
    "title": "Insert Bus Data",
    "description": "<p>Insert a new Bus Data</p>",
    "version": "1.0.0",
    "name": "CreateBus",
    "group": "Bus",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User's access token</p>"
          },
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "companyId",
            "description": "<p>Company Id</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "..50",
            "optional": false,
            "field": "busNo",
            "description": "<p>Bus Number</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Created 201": [
          {
            "group": "Created 201",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true</p>"
          },
          {
            "group": "Created 201",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>response message</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Some parameters may contain invalid values</p>"
          }
        ],
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can create the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only admins can create the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/bus.route.js",
    "groupTitle": "Bus"
  },
  {
    "type": "post",
    "url": "v1/bus/uploadCsv",
    "title": "Bulk insert data by uploading csv",
    "description": "<p>Insert Bus data by uploading csv</p>",
    "version": "1.0.0",
    "name": "Insert_Bus_data_by_uploading_csv_file",
    "group": "Bus",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User's access token</p>"
          },
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "companyId",
            "description": "<p>Company Id</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>multipart/form-data</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "csv",
            "optional": false,
            "field": "file",
            "description": "<p>set key as file</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Created 201": [
          {
            "group": "Created 201",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true</p>"
          },
          {
            "group": "Created 201",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>responce message</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Some parameters may contain invalid values</p>"
          }
        ],
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can create the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only admins can create the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/bus.route.js",
    "groupTitle": "Bus"
  },
  {
    "type": "put",
    "url": "v1/bus/:busId",
    "title": "Update Bus Data",
    "description": "<p>Update Bus Information</p>",
    "version": "1.0.0",
    "name": "UpdateBus",
    "group": "Bus",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User's access token</p>"
          },
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "companyId",
            "description": "<p>Company Id</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "busId",
            "description": "<p>busId</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only user with same id or admins can access the data</p>"
          }
        ],
        "Not Found 404": [
          {
            "group": "Not Found 404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>User does not exist</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/bus.route.js",
    "groupTitle": "Bus"
  },
  {
    "type": "post",
    "url": "v1/bus",
    "title": "Get Bus list",
    "description": "<p>Get Bus list</p>",
    "version": "1.0.0",
    "name": "listBus",
    "group": "Bus",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User's access token</p>"
          },
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "companyId",
            "description": "<p>Company Id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array[]",
            "optional": false,
            "field": "data",
            "description": "<p>Bus List</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Some parameters may contain invalid values</p>"
          }
        ],
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can create the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only admins can create the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/bus.route.js",
    "groupTitle": "Bus"
  },
  {
    "type": "get",
    "url": "v1/bus/:busId",
    "title": "Get Bus detail",
    "description": "<p>Get bus detail</p>",
    "version": "1.0.0",
    "name": "view_bus_detail",
    "group": "Bus",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User's access token</p>"
          },
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "companyId",
            "description": "<p>Company Id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>responce message</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Some parameters may contain invalid values</p>"
          }
        ],
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can create the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only admins can create the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/bus.route.js",
    "groupTitle": "Bus"
  },
  {
    "type": "post",
    "url": "v1/company",
    "title": "Create company",
    "description": "<p>Create company</p>",
    "version": "1.0.0",
    "name": "Company_create",
    "group": "Company",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User's access token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Created 201": [
          {
            "group": "Created 201",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true</p>"
          },
          {
            "group": "Created 201",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>responce message</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Some parameters may contain invalid values</p>"
          }
        ],
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can create the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only admins can create the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/company.route.js",
    "groupTitle": "Company"
  },
  {
    "type": "get",
    "url": "v1/company",
    "title": "List company",
    "description": "<p>Get a list of company</p>",
    "version": "1.0.0",
    "name": "List_Of_companys",
    "group": "Company",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>User's access token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array[]",
            "optional": false,
            "field": "data",
            "description": "<p>Company List</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only admins can access the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/company.route.js",
    "groupTitle": "Company"
  },
  {
    "type": "get",
    "url": "v1/company/:companyId",
    "title": "Get area detail",
    "description": "<p>Get company detail</p>",
    "version": "1.0.0",
    "name": "view_company_detail",
    "group": "Company",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User's access token</p>"
          },
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "userId",
            "description": "<p>User Id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>responce message</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Some parameters may contain invalid values</p>"
          }
        ],
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can create the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only admins can create the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/company.route.js",
    "groupTitle": "Company"
  },
  {
    "type": "get",
    "url": "v1/controlroom",
    "title": "List Zone for control room",
    "description": "<p>Get a list of zones for control room</p>",
    "version": "1.0.0",
    "name": "Controlroom",
    "group": "Controlroom",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array[]",
            "optional": false,
            "field": "users",
            "description": "<p>List of zones for control room.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only admins can access the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/controlroom.route.js",
    "groupTitle": "Controlroom"
  },
  {
    "type": "post",
    "url": "v1/device",
    "title": "Create Device",
    "description": "<p>Create a new Device</p>",
    "version": "1.0.0",
    "name": "CreateDevice",
    "group": "Device",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User's access token</p>"
          },
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "userId",
            "description": "<p>User Id</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "deviceType",
            "description": "<p>We have five type of devices 1 is Beacon, 2 is Revicer, 3 Gateway, 4 is Test device &amp; 5 is Nbiot devices</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "..50",
            "optional": false,
            "field": "name",
            "description": "<p>Device Name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "..50",
            "optional": false,
            "field": "serial",
            "description": "<p>Device serial no.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "isBuzz",
            "description": "<p>isBuzz will have either 0 or 1.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Created 201": [
          {
            "group": "Created 201",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true</p>"
          },
          {
            "group": "Created 201",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>response message</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Some parameters may contain invalid values</p>"
          }
        ],
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can create the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only admins can create the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/device.route.js",
    "groupTitle": "Device"
  },
  {
    "type": "post",
    "url": "v1/device/createAndMapDevice",
    "title": "Create new Device and Map with Asset",
    "description": "<p>Create new Device and Map with Asset</p>",
    "version": "1.0.0",
    "name": "Create_new_Device_and_Map_with_Asset",
    "group": "Device",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User's access token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "companyId",
            "description": "<p>company Id</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "serial",
            "description": "<p>device serial</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "deviceType",
            "description": "<p>device Type</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "assetId",
            "description": "<p>Asset Id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Created 201": [
          {
            "group": "Created 201",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true</p>"
          },
          {
            "group": "Created 201",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>responce message</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Some parameters may contain invalid values</p>"
          }
        ],
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can create the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only admins can create the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/device.route.js",
    "groupTitle": "Device"
  },
  {
    "type": "get",
    "url": "v1/:deviceId/nodeneighbourdetail",
    "title": "Node neighbour detail of gateway",
    "description": "<p>Node neighbour detail of gateway</p>",
    "version": "1.0.0",
    "name": "Gateway_node_neighbour_detail",
    "group": "Device",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User's access token</p>"
          },
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "companyId",
            "description": "<p>Company Id</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "deviceId",
            "description": "<p>deviceId from device_detail table</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array[]",
            "optional": false,
            "field": "gateway",
            "description": "<p>node neighbour detail list.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only user with same id or admins can access the data</p>"
          }
        ],
        "Not Found": [
          {
            "group": "Not Found",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Device or Asset does not exist</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/device.route.js",
    "groupTitle": "Device"
  },
  {
    "type": "get",
    "url": "v1/device/beacon",
    "title": "Beacon device",
    "description": "<p>Get beacon device list</p>",
    "version": "1.0.0",
    "name": "GetBeaconDevices",
    "group": "Device",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User's access token</p>"
          },
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "userId",
            "description": "<p>User Id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array[]",
            "optional": false,
            "field": "data",
            "description": "<p>Beacon Devices List</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated Users can access the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/device.route.js",
    "groupTitle": "Device"
  },
  {
    "type": "get",
    "url": "v1/device/:deviceId",
    "title": "Get Device detail By ID",
    "description": "<p>Get device information</p>",
    "version": "1.0.0",
    "name": "GetDevice",
    "group": "Device",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User's access token</p>"
          },
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "userId",
            "description": "<p>User Id</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "deviceId",
            "description": "<p>deviceId</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only user with same id or admins can access the data</p>"
          }
        ],
        "Not Found 404": [
          {
            "group": "Not Found 404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>User does not exist</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/device.route.js",
    "groupTitle": "Device"
  },
  {
    "type": "get",
    "url": "v1/device/gateway",
    "title": "Zone Gateway device",
    "description": "<p>Get gateway device list</p>",
    "version": "1.0.0",
    "name": "GetGatewayDevices",
    "group": "Device",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User's access token</p>"
          },
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "userId",
            "description": "<p>User Id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array[]",
            "optional": false,
            "field": "data",
            "description": "<p>Gateway Devices List</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated Users can access the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/device.route.js",
    "groupTitle": "Device"
  },
  {
    "type": "get",
    "url": "v1/device/mapAssetAndDevice",
    "title": "Get Mapped asset and device",
    "description": "<p>Get Mapped Asset &amp; Device Data</p>",
    "version": "1.0.0",
    "name": "GetMapAssetDeviceData",
    "group": "Device",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User's access token</p>"
          },
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "userId",
            "description": "<p>User Id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array[]",
            "optional": false,
            "field": "data",
            "description": "<p>Mapped Asset Device Data</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated Users can access the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/device.route.js",
    "groupTitle": "Device"
  },
  {
    "type": "get",
    "url": "v1/device/RfidCards",
    "title": "Get Provisioning Device Gateway",
    "description": "<p>Get Provisioning Device list</p>",
    "version": "1.0.0",
    "name": "GetProvisioningDevice",
    "group": "Device",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User's access token</p>"
          },
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "userId",
            "description": "<p>User Id</p>"
          },
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "companyId",
            "description": "<p>Company Id</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only user with same id or admins can access the data</p>"
          }
        ],
        "Not Found 404": [
          {
            "group": "Not Found 404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>User does not exist</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/device.route.js",
    "groupTitle": "Device"
  },
  {
    "type": "get",
    "url": "v1/device/provisioneddevice",
    "title": "Provisning device",
    "description": "<p>Get Provisning device list</p>",
    "version": "1.0.0",
    "name": "GetProvisningDevices",
    "group": "Device",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User's access token</p>"
          },
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "userId",
            "description": "<p>User Id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array[]",
            "optional": false,
            "field": "data",
            "description": "<p>Provisning Devices List</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated Users can access the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/device.route.js",
    "groupTitle": "Device"
  },
  {
    "type": "get",
    "url": "v1/device/RfidCards",
    "title": "RFID Cards",
    "description": "<p>Get RFID Cards list</p>",
    "version": "1.0.0",
    "name": "GetRFIDDevice",
    "group": "Device",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User's access token</p>"
          },
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "userId",
            "description": "<p>User Id</p>"
          },
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "companyId",
            "description": "<p>Company Id</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only user with same id or admins can access the data</p>"
          }
        ],
        "Not Found 404": [
          {
            "group": "Not Found 404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>User does not exist</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/device.route.js",
    "groupTitle": "Device"
  },
  {
    "type": "get",
    "url": "v1/device/revicer",
    "title": "Reciver device",
    "description": "<p>Get reciver device list</p>",
    "version": "1.0.0",
    "name": "GetRevicerDevices",
    "group": "Device",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User's access token</p>"
          },
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "userId",
            "description": "<p>User Id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array[]",
            "optional": false,
            "field": "data",
            "description": "<p>Reciver Devices List</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated Users can access the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/device.route.js",
    "groupTitle": "Device"
  },
  {
    "type": "get",
    "url": "v1/device/testbeacons",
    "title": "Test Beacon Device List",
    "description": "<p>Get Test Beacon device list</p>",
    "version": "1.0.0",
    "name": "GetTestBeaconDevices",
    "group": "Device",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User's access token</p>"
          },
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "companyId",
            "description": "<p>Company Id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array[]",
            "optional": false,
            "field": "data",
            "description": "<p>Reciver Devices List</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated Users can access the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/device.route.js",
    "groupTitle": "Device"
  },
  {
    "type": "get",
    "url": "v1/device/beacon/batterystatus",
    "title": "Beacon device battery status",
    "description": "<p>Get beacon device list with battery status</p>",
    "version": "1.0.0",
    "name": "Get_Beacon_Device_battery_status",
    "group": "Device",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User's access token</p>"
          },
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "companyId",
            "description": "<p>companyId Id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array[]",
            "optional": false,
            "field": "data",
            "description": "<p>Beacon Devices List</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated Users can access the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/device.route.js",
    "groupTitle": "Device"
  },
  {
    "type": "get",
    "url": "v1/device/getBusGateway",
    "title": "Get Bus Device Gateway",
    "description": "<p>Get Bus Device Gateway list</p>",
    "version": "1.0.0",
    "name": "Get_Bus_Device_Gateway",
    "group": "Device",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User's access token</p>"
          },
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "userId",
            "description": "<p>User Id</p>"
          },
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "companyId",
            "description": "<p>Company Id</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only user with same id or admins can access the data</p>"
          }
        ],
        "Not Found 404": [
          {
            "group": "Not Found 404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>User does not exist</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/device.route.js",
    "groupTitle": "Device"
  },
  {
    "type": "get",
    "url": "v1/device/getFoodCartGateway",
    "title": "Get Food Cart Device Gateway",
    "description": "<p>Get Food Cart Device Gateway list</p>",
    "version": "1.0.0",
    "name": "Get_Food_Cart_Device_Gateway",
    "group": "Device",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User's access token</p>"
          },
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "userId",
            "description": "<p>User Id</p>"
          },
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "companyId",
            "description": "<p>Company Id</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only user with same id or admins can access the data</p>"
          }
        ],
        "Not Found 404": [
          {
            "group": "Not Found 404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>User does not exist</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/device.route.js",
    "groupTitle": "Device"
  },
  {
    "type": "get",
    "url": "v1/device/devicehealth",
    "title": "Get device health",
    "description": "<p>Get device health</p>",
    "version": "1.0.0",
    "name": "Get_device_health",
    "group": "Device",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User's access token</p>"
          },
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "companyId",
            "description": "<p>Company Id</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only user with same id or admins can access the data</p>"
          }
        ],
        "Not Found 404": [
          {
            "group": "Not Found 404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>User does not exist</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/device.route.js",
    "groupTitle": "Device"
  },
  {
    "type": "post",
    "url": "v1/device/uploadCsv",
    "title": "Bulk insert data by uploading csv",
    "description": "<p>Insert device data by uploading csv</p>",
    "version": "1.0.0",
    "name": "Insert_device_data_by_uploading_csv_file",
    "group": "Device",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User's access token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>multipart/form-data</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "csv",
            "optional": false,
            "field": "file",
            "description": "<p>set key as file</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Created 201": [
          {
            "group": "Created 201",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true</p>"
          },
          {
            "group": "Created 201",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>responce message</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Some parameters may contain invalid values</p>"
          }
        ],
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can create the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only admins can create the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/device.route.js",
    "groupTitle": "Device"
  },
  {
    "type": "get",
    "url": "v1/device",
    "title": "List Device",
    "description": "<p>Get a list of devices</p>",
    "version": "1.0.0",
    "name": "ListDevices",
    "group": "Device",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>User's access token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array[]",
            "optional": false,
            "field": "data",
            "description": "<p>Devices List</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only admins can access the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/device.route.js",
    "groupTitle": "Device"
  },
  {
    "type": "get",
    "url": "v1/device/getDevices",
    "title": "Get a list of devices",
    "description": "<p>Get a list of devices</p>",
    "version": "1.0.0",
    "name": "List_Devices",
    "group": "Device",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>User's access token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array[]",
            "optional": false,
            "field": "Devices",
            "description": "<p>List .</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only admins can access the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/device.route.js",
    "groupTitle": "Device"
  },
  {
    "type": "post",
    "url": "v1/:deviceId/mapAssetAndDevice",
    "title": "Map asset with device",
    "description": "<p>Map asset with device</p>",
    "version": "1.0.0",
    "name": "Map_asset_and_device",
    "group": "Device",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User's access token</p>"
          },
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "userId",
            "description": "<p>User Id</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "deviceId",
            "description": "<p>deviceId from device_detail table</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "assetId",
            "description": "<p>assetId from asset_detail table</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Created 201": [
          {
            "group": "Created 201",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true</p>"
          },
          {
            "group": "Created 201",
            "type": "Boolean",
            "optional": false,
            "field": "message",
            "description": "<p>response message</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only user with same id or admins can access the data</p>"
          }
        ],
        "Not Found": [
          {
            "group": "Not Found",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Device or Asset does not exist</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/device.route.js",
    "groupTitle": "Device"
  },
  {
    "type": "post",
    "url": "v1/device/mapAssetAndDeviceByCsv",
    "title": "Bulk mapping of asset and device by uploading csv",
    "description": "<p>Map device and asset data by uploading csv</p>",
    "version": "1.0.0",
    "name": "Map_device_and_asset_data_by_uploading_csv_file",
    "group": "Device",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User's access token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "companyId",
            "description": "<p>company Id</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>multipart/form-data</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "csv",
            "optional": false,
            "field": "file",
            "description": "<p>set key as file</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Created 201": [
          {
            "group": "Created 201",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true</p>"
          },
          {
            "group": "Created 201",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>responce message</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Some parameters may contain invalid values</p>"
          }
        ],
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can create the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only admins can create the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/device.route.js",
    "groupTitle": "Device"
  },
  {
    "type": "put",
    "url": "v1/device/:deviceId",
    "title": "Update Device",
    "description": "<p>Update Device Information</p>",
    "version": "1.0.0",
    "name": "UpdateDevice",
    "group": "Device",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User's access token</p>"
          },
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "userId",
            "description": "<p>User Id</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "deviceId",
            "description": "<p>deviceId</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only user with same id or admins can access the data</p>"
          }
        ],
        "Not Found 404": [
          {
            "group": "Not Found 404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>User does not exist</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/device.route.js",
    "groupTitle": "Device"
  },
  {
    "type": "post",
    "url": "v1/employee/uploadCsv",
    "title": "Bulk insert employee data by uploading csv",
    "description": "<p>Bulk insert employee data by uploading csv</p>",
    "version": "1.0.0",
    "name": "Bulk_insert_via_csv_upload",
    "group": "Employee",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User's access token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>multipart/form-data</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "csv",
            "optional": false,
            "field": "file",
            "description": "<p>set key as file</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Created 201": [
          {
            "group": "Created 201",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true</p>"
          },
          {
            "group": "Created 201",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>responce message</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Some parameters may contain invalid values</p>"
          }
        ],
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can create the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only admins can create the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/emp.route.js",
    "groupTitle": "Employee"
  },
  {
    "type": "post",
    "url": "v1/employee",
    "title": "Create employee",
    "description": "<p>Create a new employee</p>",
    "version": "1.0.0",
    "name": "CreateEmployee",
    "group": "Employee",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>User's access token</p>"
          },
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "userId",
            "description": "<p>User Id</p>"
          },
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "companyId",
            "description": "<p>Company Id</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "..100",
            "optional": false,
            "field": "name",
            "description": "<p>Asset full name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "..50",
            "optional": false,
            "field": "uniqueId",
            "description": "<p>Asset company id</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "type",
            "description": "<p>type=1 for Machine and 2 for Human</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "..100",
            "optional": false,
            "field": "email",
            "description": "<p>Asset email in case of type=2</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "size": "..50",
            "optional": false,
            "field": "contactNo",
            "description": "<p>Asset contact number in case of type=2</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "..200",
            "optional": false,
            "field": "address",
            "description": "<p>Asset address in case of type=2</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Created 201": [
          {
            "group": "Created 201",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true</p>"
          },
          {
            "group": "Created 201",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>responce message</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Some parameters may contain invalid values</p>"
          }
        ],
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can create the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only admins can create the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/emp.route.js",
    "groupTitle": "Employee"
  },
  {
    "type": "get",
    "url": "v1/employee/:employeeId",
    "title": "Get Employee detail",
    "description": "<p>Get employee information</p>",
    "version": "1.0.0",
    "name": "GetEmployee",
    "group": "Employee",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User's access token</p>"
          },
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "userId",
            "description": "<p>User Id</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "employeeId",
            "description": "<p>id of the employee</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array[]",
            "optional": false,
            "field": "data",
            "description": "<p>employee detail</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only user with same id or admins can access the data</p>"
          }
        ],
        "Not Found 404": [
          {
            "group": "Not Found 404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>User does not exist</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/emp.route.js",
    "groupTitle": "Employee"
  },
  {
    "type": "get",
    "url": "v1/employee",
    "title": "List Employees",
    "description": "<p>Get a list of employees</p>",
    "version": "1.0.0",
    "name": "ListEmployees",
    "group": "Employee",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>User's access token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array[]",
            "optional": false,
            "field": "data",
            "description": "<p>employee List</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only admins can access the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/emp.route.js",
    "groupTitle": "Employee"
  },
  {
    "type": "put",
    "url": "v1/employee/:employeeId",
    "title": "Update Employee Data",
    "description": "<p>Update Employee Information</p>",
    "version": "1.0.0",
    "name": "UpdateEmployee",
    "group": "Employee",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User's access token</p>"
          },
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "userId",
            "description": "<p>User Id</p>"
          },
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "companyId",
            "description": "<p>Company Id</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "employeeId",
            "description": "<p>employeeId</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only user with same id or admins can access the data</p>"
          }
        ],
        "Not Found 404": [
          {
            "group": "Not Found 404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>User does not exist</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/emp.route.js",
    "groupTitle": "Employee"
  },
  {
    "type": "put",
    "url": "v1/floor/:floorId",
    "title": "Update Floor",
    "description": "<p>Update Floor Information</p>",
    "version": "1.0.0",
    "name": "UpdateFloor",
    "group": "Floor",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User's access token</p>"
          },
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "userId",
            "description": "<p>User Id</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "..50",
            "optional": false,
            "field": "name",
            "description": "<p>Floor Name</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "floorNo",
            "description": "<p>Floor Number</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Updated 201": [
          {
            "group": "Updated 201",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true</p>"
          }
        ],
        "Created 201": [
          {
            "group": "Created 201",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>responce message</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only user with same id or admins can access the data</p>"
          }
        ],
        "Not Found 404": [
          {
            "group": "Not Found 404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>User does not exist</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/area.route.js",
    "groupTitle": "Floor"
  },
  {
    "type": "get",
    "url": "v1/floor/detail",
    "title": "Get user stats floor wise",
    "description": "<p>Get user stats floor wise</p>",
    "version": "1.0.0",
    "name": "User_stats",
    "group": "Floor",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User's access token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true</p>"
          },
          {
            "group": "Success 200",
            "type": "data",
            "optional": false,
            "field": "data",
            "description": "<p>user stats area wise</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>responce message</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Some parameters may contain invalid values</p>"
          }
        ],
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can create the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only admins can create the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/area.route.js",
    "groupTitle": "Floor"
  },
  {
    "type": "post",
    "url": "v1/floor",
    "title": "Get floor list",
    "description": "<p>Get floor list</p>",
    "version": "1.0.0",
    "name": "listFloor",
    "group": "Floor",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User's access token</p>"
          },
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "userId",
            "description": "<p>User Id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Created 201": [
          {
            "group": "Created 201",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true</p>"
          },
          {
            "group": "Created 201",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>responce message</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Some parameters may contain invalid values</p>"
          }
        ],
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can create the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only admins can create the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/area.route.js",
    "groupTitle": "Floor"
  },
  {
    "type": "post",
    "url": "v1/floor/uploadImage",
    "title": "Upload floor image",
    "description": "<p>Upload floor image</p>",
    "version": "1.0.0",
    "name": "upload_floor_image",
    "group": "Floor",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User's access token</p>"
          },
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "userId",
            "description": "<p>User Id</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "..50",
            "optional": false,
            "field": "name",
            "description": "<p>Floor Name</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "floorNo",
            "description": "<p>Floor Number</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Created 201": [
          {
            "group": "Created 201",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true</p>"
          },
          {
            "group": "Created 201",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>responce message</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Some parameters may contain invalid values</p>"
          }
        ],
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can create the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only admins can create the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/area.route.js",
    "groupTitle": "Floor"
  },
  {
    "type": "get",
    "url": "v1/floor/:floorId/zones",
    "title": "Get floor detail and Zone Details",
    "description": "<p>Get floor detail</p>",
    "version": "1.0.0",
    "name": "view_floor___Zone_detail",
    "group": "Floor",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User's access token</p>"
          },
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "userId",
            "description": "<p>User Id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>responce message</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Some parameters may contain invalid values</p>"
          }
        ],
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can create the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only admins can create the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/area.route.js",
    "groupTitle": "Floor"
  },
  {
    "type": "get",
    "url": "v1/floor/:floorId",
    "title": "Get floor detail",
    "description": "<p>Get floor detail</p>",
    "version": "1.0.0",
    "name": "view_floor_detail",
    "group": "Floor",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User's access token</p>"
          },
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "userId",
            "description": "<p>User Id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>responce message</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Some parameters may contain invalid values</p>"
          }
        ],
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can create the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only admins can create the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/area.route.js",
    "groupTitle": "Floor"
  },
  {
    "type": "post",
    "url": "v1/foodCart",
    "title": "Insert Food Cart Data",
    "description": "<p>Insert a new Food Cart Data</p>",
    "version": "1.0.0",
    "name": "Create_Food_Cart",
    "group": "Food_Cart",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User's access token</p>"
          },
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "companyId",
            "description": "<p>Company Id</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "..50",
            "optional": false,
            "field": "foodCartNo",
            "description": "<p>Food Cart Number</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Created 201": [
          {
            "group": "Created 201",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true</p>"
          },
          {
            "group": "Created 201",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>response message</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Some parameters may contain invalid values</p>"
          }
        ],
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can create the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only admins can create the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/foodCart.route.js",
    "groupTitle": "Food_Cart"
  },
  {
    "type": "post",
    "url": "v1/foodCart/uploadCsv",
    "title": "Bulk insert data by uploading csv",
    "description": "<p>Insert Food Cart data by uploading csv</p>",
    "version": "1.0.0",
    "name": "Insert_Food_Cart_data_by_uploading_csv_file",
    "group": "Food_Cart",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User's access token</p>"
          },
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "companyId",
            "description": "<p>Company Id</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>multipart/form-data</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "csv",
            "optional": false,
            "field": "file",
            "description": "<p>set key as file</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Created 201": [
          {
            "group": "Created 201",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true</p>"
          },
          {
            "group": "Created 201",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>responce message</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Some parameters may contain invalid values</p>"
          }
        ],
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can create the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only admins can create the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/foodCart.route.js",
    "groupTitle": "Food_Cart"
  },
  {
    "type": "put",
    "url": "v1/foodCart/:foodCartId",
    "title": "Update Food Cart Data",
    "description": "<p>Update Food Cart Information</p>",
    "version": "1.0.0",
    "name": "UpdateFoodCart",
    "group": "Food_Cart",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User's access token</p>"
          },
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "userId",
            "description": "<p>User Id</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "foodCartId",
            "description": "<p>Food Cart Id</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only user with same id or admins can access the data</p>"
          }
        ],
        "Not Found 404": [
          {
            "group": "Not Found 404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>User does not exist</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/foodCart.route.js",
    "groupTitle": "Food_Cart"
  },
  {
    "type": "post",
    "url": "v1/foodCart",
    "title": "Get Food Cart list",
    "description": "<p>Get Food Cart list</p>",
    "version": "1.0.0",
    "name": "list_Food_Cart",
    "group": "Food_Cart",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User's access token</p>"
          },
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "companyId",
            "description": "<p>Company Id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array[]",
            "optional": false,
            "field": "data",
            "description": "<p>Food Cart List</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Some parameters may contain invalid values</p>"
          }
        ],
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can create the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only admins can create the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/foodCart.route.js",
    "groupTitle": "Food_Cart"
  },
  {
    "type": "get",
    "url": "v1/bus/:foodCartId",
    "title": "Get Food Cart detail",
    "description": "<p>Get Food Cart detail</p>",
    "version": "1.0.0",
    "name": "view_Food_Cart_detail",
    "group": "Food_Cart",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User's access token</p>"
          },
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "companyId",
            "description": "<p>Company Id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>responce message</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Some parameters may contain invalid values</p>"
          }
        ],
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can create the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only admins can create the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/foodCart.route.js",
    "groupTitle": "Food_Cart"
  },
  {
    "type": "get",
    "url": "v1/notification/:type",
    "title": "List Notification on the basis of type",
    "description": "<p>Get a list of Notifications on the basis of type</p>",
    "version": "1.0.0",
    "name": "ListNotification",
    "group": "Notification",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>User's access token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array[]",
            "optional": false,
            "field": "Notification",
            "description": "<p>List .</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only admins can access the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/notifiction.route.js",
    "groupTitle": "Notification"
  },
  {
    "type": "get",
    "url": "v1/notification",
    "title": "List Notification",
    "description": "<p>Get a list of Notifications</p>",
    "version": "1.0.0",
    "name": "ListNotification",
    "group": "Notification",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>User's access token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array[]",
            "optional": false,
            "field": "Notification",
            "description": "<p>List .</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only admins can access the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/notifiction.route.js",
    "groupTitle": "Notification"
  },
  {
    "type": "post",
    "url": "v1/privlageuser",
    "title": "Create Privlage Users",
    "description": "<p>Create privlage user</p>",
    "version": "1.0.0",
    "name": "Company_privlage_user",
    "group": "Privlage_Users",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "6..128",
            "optional": false,
            "field": "password",
            "description": "<p>User's password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fullName",
            "description": "<p>User's Name</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "userType",
            "description": "<p>User Type</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Created 201": [
          {
            "group": "Created 201",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true</p>"
          },
          {
            "group": "Created 201",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>responce message</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Some parameters may contain invalid values</p>"
          }
        ],
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can create the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only admins can create the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/privilegeUser.route.js",
    "groupTitle": "Privlage_Users"
  },
  {
    "type": "post",
    "url": "v1/privlageuser/login",
    "title": "Login",
    "description": "<p>Get an accessToken</p>",
    "version": "1.0.0",
    "name": "Privlage_Users_Login",
    "group": "Privlage_Users",
    "permission": [
      {
        "name": "public"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "..128",
            "optional": false,
            "field": "password",
            "description": "<p>User's password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token.accessToken",
            "description": "<p>Authorization Token</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.id",
            "description": "<p>User's id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.name",
            "description": "<p>User's name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.email",
            "description": "<p>User's email</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.userType",
            "description": "<p>User's userType</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Some parameters may contain invalid values</p>"
          }
        ],
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Incorrect email or password</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/privilegeUser.route.js",
    "groupTitle": "Privlage_Users"
  },
  {
    "type": "get",
    "url": "v1/notification",
    "title": "Post Provision Data",
    "description": "<p>Post Provision Data</p>",
    "version": "1.0.0",
    "name": "PostProvisionData",
    "group": "Provision",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>User's access token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Created 201": [
          {
            "group": "Created 201",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true</p>"
          },
          {
            "group": "Created 201",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>responce message</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only admins can access the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/provision.route.js",
    "groupTitle": "Provision"
  },
  {
    "type": "get",
    "url": "v1/reporting",
    "title": "List Reporting",
    "description": "<p>Get a list of Reporting</p>",
    "version": "1.0.0",
    "name": "ListReporting",
    "group": "Reporting",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>User's access token</p>"
          },
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "companyId",
            "description": "<p>Company Id</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "kpi",
            "description": "<p>kpi value as integer</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "..50",
            "optional": false,
            "field": "type",
            "description": "<p>type to represent data</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array[]",
            "optional": false,
            "field": "Reporting",
            "description": "<p>List</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only admins can access the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/reporting.route.js",
    "groupTitle": "Reporting"
  },
  {
    "type": "get",
    "url": "v1/reporting",
    "title": "List Reporting",
    "description": "<p>Get a list of Reporting</p>",
    "version": "1.0.0",
    "name": "ListReporting",
    "group": "Reporting",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>User's access token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array[]",
            "optional": false,
            "field": "Reporting",
            "description": "<p>List</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only admins can access the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/reporting.route.js",
    "groupTitle": "Reporting"
  },
  {
    "type": "get",
    "url": "v1/reporting/:reportType/entryexit",
    "title": "List Reporting on the basis of Entry and Exit timing of emp.",
    "description": "<p>Get emp. Entry and Exit timings</p>",
    "version": "1.0.0",
    "name": "ListReporting_On_the_basis_of_entry_and_exit_time",
    "group": "Reporting",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User's access token</p>"
          },
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "userId",
            "description": "<p>User Id</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "ReportType",
            "description": "<p>reportType 1 is for today and 2 datewise</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "..50",
            "optional": false,
            "field": "empId",
            "description": "<p>uniqueId of the asset</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "sDate",
            "description": "<p>start date if reportType is 2</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "eDate",
            "description": "<p>end date if reportType is 2</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array[]",
            "optional": false,
            "field": "Reporting",
            "description": "<p>List on the basis of date</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only user with same id or admins can access the data</p>"
          }
        ],
        "Not Found 404": [
          {
            "group": "Not Found 404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>User does not exist</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/reporting.route.js",
    "groupTitle": "Reporting"
  },
  {
    "type": "get",
    "url": "v1/activerules",
    "title": "List Of Active Rules",
    "description": "<p>Get a list of active rules</p>",
    "version": "1.0.0",
    "name": "ActiveRules",
    "group": "Rules",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User's access token</p>"
          },
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "userId",
            "description": "<p>User Id</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>multipart/form-data</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "Rule",
            "description": "<p>List of Rules.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only admins can access the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/rule.route.js",
    "groupTitle": "Rules"
  },
  {
    "type": "get",
    "url": "v1/rule/asset",
    "title": "List Of Rule For Asset",
    "description": "<p>Get a list of asset rule</p>",
    "version": "1.0.0",
    "name": "AssetRule",
    "group": "Rules",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User's access token</p>"
          },
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "userId",
            "description": "<p>User Id</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>multipart/form-data</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "Rule",
            "description": "<p>List of asset rules.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only admins can access the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/rule.route.js",
    "groupTitle": "Rules"
  },
  {
    "type": "get",
    "url": "v1/rules",
    "title": "List Rules",
    "description": "<p>Get a list of rules</p>",
    "version": "1.0.0",
    "name": "ListRules",
    "group": "Rules",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User's access token</p>"
          },
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "userId",
            "description": "<p>User Id</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>multipart/form-data</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "Rule",
            "description": "<p>List of Rules.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only admins can access the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/rule.route.js",
    "groupTitle": "Rules"
  },
  {
    "type": "post",
    "url": "v1/rules",
    "title": "Save Rule Data",
    "description": "<p>Save Rule Data</p>",
    "version": "1.0.0",
    "name": "Save_Rules",
    "group": "Rules",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User's access token</p>"
          },
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "userId",
            "description": "<p>User Id</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "userId",
            "description": "<p>userId</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": ".",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated Users can access the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/rule.route.js",
    "groupTitle": "Rules"
  },
  {
    "type": "get",
    "url": "v1/rule/zone",
    "title": "List Of Rule For zone",
    "description": "<p>Get a list of zone rule</p>",
    "version": "1.0.0",
    "name": "ZOneRule",
    "group": "Rules",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User's access token</p>"
          },
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "userId",
            "description": "<p>User Id</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>multipart/form-data</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "Rule",
            "description": "<p>List of zone rules.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only admins can access the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/rule.route.js",
    "groupTitle": "Rules"
  },
  {
    "type": "post",
    "url": "v1/users",
    "title": "Create User",
    "description": "<p>Create a new user</p>",
    "version": "1.0.0",
    "name": "CreateUser",
    "group": "User",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>User's access token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "6..128",
            "optional": false,
            "field": "password",
            "description": "<p>User's password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "..128",
            "optional": true,
            "field": "name",
            "description": "<p>User's name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "user",
              "admin"
            ],
            "optional": true,
            "field": "role",
            "description": "<p>User's role</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Created 201": [
          {
            "group": "Created 201",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>User's id</p>"
          },
          {
            "group": "Created 201",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>User's name</p>"
          },
          {
            "group": "Created 201",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's email</p>"
          },
          {
            "group": "Created 201",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>User's role</p>"
          },
          {
            "group": "Created 201",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Timestamp</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Some parameters may contain invalid values</p>"
          }
        ],
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can create the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only admins can create the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/user.route.js",
    "groupTitle": "User"
  },
  {
    "type": "patch",
    "url": "v1/users/:id",
    "title": "Delete User",
    "description": "<p>Delete a user</p>",
    "version": "1.0.0",
    "name": "DeleteUser",
    "group": "User",
    "permission": [
      {
        "name": "user"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>User's access token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "No Content 204": [
          {
            "group": "No Content 204",
            "optional": false,
            "field": "Successfully",
            "description": "<p>deleted</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can delete the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only user with same id or admins can delete the data</p>"
          }
        ],
        "Not Found 404": [
          {
            "group": "Not Found 404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>User does not exist</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/user.route.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "v1/users/:id",
    "title": "Get User",
    "description": "<p>Get user information</p>",
    "version": "1.0.0",
    "name": "GetUser",
    "group": "User",
    "permission": [
      {
        "name": "user"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>User's access token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>User's id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>User's name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's email</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>User's role</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Timestamp</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only user with same id or admins can access the data</p>"
          }
        ],
        "Not Found 404": [
          {
            "group": "Not Found 404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>User does not exist</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/user.route.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "v1/users",
    "title": "List Users",
    "description": "<p>Get a list of users</p>",
    "version": "1.0.0",
    "name": "ListUsers",
    "group": "User",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>User's access token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "size": "1-",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>List page</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "size": "1-100",
            "optional": true,
            "field": "perPage",
            "defaultValue": "1",
            "description": "<p>Users per page</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>User's name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "email",
            "description": "<p>User's email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "user",
              "admin"
            ],
            "optional": true,
            "field": "role",
            "description": "<p>User's role</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "users",
            "description": "<p>List of users.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only admins can access the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/user.route.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "v1/users/:id",
    "title": "Replace User",
    "description": "<p>Replace the whole user document with a new one</p>",
    "version": "1.0.0",
    "name": "ReplaceUser",
    "group": "User",
    "permission": [
      {
        "name": "user"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>User's access token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "6..128",
            "optional": false,
            "field": "password",
            "description": "<p>User's password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "..128",
            "optional": true,
            "field": "name",
            "description": "<p>User's name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "user",
              "admin"
            ],
            "optional": true,
            "field": "role",
            "description": "<p>User's role (You must be an admin to change the user's role)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>User's id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>User's name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's email</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>User's role</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Timestamp</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Some parameters may contain invalid values</p>"
          }
        ],
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can modify the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only user with same id or admins can modify the data</p>"
          }
        ],
        "Not Found 404": [
          {
            "group": "Not Found 404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>User does not exist</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/user.route.js",
    "groupTitle": "User"
  },
  {
    "type": "patch",
    "url": "v1/users/:id",
    "title": "Update User",
    "description": "<p>Update some fields of a user document</p>",
    "version": "1.0.0",
    "name": "UpdateUser",
    "group": "User",
    "permission": [
      {
        "name": "user"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>User's access token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "6..128",
            "optional": false,
            "field": "password",
            "description": "<p>User's password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "..128",
            "optional": true,
            "field": "name",
            "description": "<p>User's name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "user",
              "admin"
            ],
            "optional": true,
            "field": "role",
            "description": "<p>User's role (You must be an admin to change the user's role)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>User's id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>User's name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's email</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>User's role</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Timestamp</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Some parameters may contain invalid values</p>"
          }
        ],
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can modify the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only user with same id or admins can modify the data</p>"
          }
        ],
        "Not Found 404": [
          {
            "group": "Not Found 404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>User does not exist</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/user.route.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "v1/users/profile",
    "title": "User Profile",
    "description": "<p>Get logged in user profile information</p>",
    "version": "1.0.0",
    "name": "UserProfile",
    "group": "User",
    "permission": [
      {
        "name": "user"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>User's access token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>User's id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>User's name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's email</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>User's role</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Timestamp</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated Users can access the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/user.route.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "v1/zoneId/assign/user",
    "title": "Assign asset to zone",
    "description": "<p>Assign asset to zone</p>",
    "version": "1.0.0",
    "name": "AssignUserToZone",
    "group": "Zone",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User's access token</p>"
          },
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "userId",
            "description": "<p>User Id</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "userId",
            "description": "<p>userId</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array[]",
            "optional": false,
            "field": "Gateway",
            "description": "<p>Devices List .</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated Users can access the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/zone.route.js",
    "groupTitle": "Zone"
  },
  {
    "type": "post",
    "url": "v1/zone",
    "title": "Create Zone",
    "description": "<p>Create a new Zone with zone image upload</p>",
    "version": "1.0.0",
    "name": "CreateZone",
    "group": "Zone",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User's access token</p>"
          },
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "userId",
            "description": "<p>User Id</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>multipart/form-data</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "jpg/jpeg/png",
            "optional": false,
            "field": "file",
            "description": "<p>set key as file</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "..50",
            "optional": false,
            "field": "name",
            "description": "<p>Zone Name</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "maxUsers",
            "description": "<p>No of maximum users in a zone</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Created 201": [
          {
            "group": "Created 201",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true</p>"
          },
          {
            "group": "Created 201",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>responce message</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Some parameters may contain invalid values</p>"
          }
        ],
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can create the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only admins can create the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/zone.route.js",
    "groupTitle": "Zone"
  },
  {
    "type": "get",
    "url": "v1/zoneId/assign/user",
    "title": "List of assign asset per zone",
    "description": "<p>Get a list of assign asset per zone</p>",
    "version": "1.0.0",
    "name": "GetAssignUsers",
    "group": "Zone",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>User's access token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "zoneId",
            "description": "<p>id of the zone</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of assets in zone</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only admins can access the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/zone.route.js",
    "groupTitle": "Zone"
  },
  {
    "type": "get",
    "url": "v1/zone/:zoneId",
    "title": "Get Zone information",
    "description": "<p>Get zone information</p>",
    "version": "1.0.0",
    "name": "GetZone_information",
    "group": "Zone",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User's access token</p>"
          },
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "userId",
            "description": "<p>User Id</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "zoneId",
            "description": "<p>Zone's Id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array[]",
            "optional": false,
            "field": "data",
            "description": "<p>Zone information</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only user with same id or admins can access the data</p>"
          }
        ],
        "Not Found 404": [
          {
            "group": "Not Found 404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>User does not exist</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/zone.route.js",
    "groupTitle": "Zone"
  },
  {
    "type": "get",
    "url": "v1/zone/:zoneId/zonenodeinfo",
    "title": "Zone node info",
    "description": "<p>Get list of zone node info</p>",
    "version": "1.0.0",
    "name": "Get_Zone_node_info",
    "group": "Zone",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>User's access token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "zoneId",
            "description": "<p>id of the zone</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of node info in a zone.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only admins can access the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/zone.route.js",
    "groupTitle": "Zone"
  },
  {
    "type": "post",
    "url": "v1/zone/:zoneId/nodeneighbour",
    "title": "Add node neighbour",
    "description": "<p>Add node neighbour</p>",
    "version": "1.0.0",
    "name": "Get_Zone_node_info",
    "group": "Zone",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>User's access token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "zoneId",
            "description": "<p>id of the zone</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "centralNodeId",
            "description": "<p>central node id</p>"
          },
          {
            "group": "Parameter",
            "type": "Array[]",
            "optional": false,
            "field": "neighbourNodeId",
            "description": "<p>neighbour node id</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "gatewayId",
            "description": "<p>gateway Id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Created 201": [
          {
            "group": "Created 201",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true</p>"
          },
          {
            "group": "Created 201",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>responce message</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only admins can access the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/zone.route.js",
    "groupTitle": "Zone"
  },
  {
    "type": "get",
    "url": "v1/zone/:zoneId/listEnteredAssets",
    "title": "Entered assets detail in a zone",
    "description": "<p>Get the entered assets detail in particular zone</p>",
    "version": "1.0.0",
    "name": "Get_entered_Asset_in_a_zone",
    "group": "Zone",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>User's access token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "zoneId",
            "description": "<p>id of the zone</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array[]",
            "optional": false,
            "field": "items",
            "description": "<p>List of assets in zone.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only admins can access the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/zone.route.js",
    "groupTitle": "Zone"
  },
  {
    "type": "get",
    "url": "v1/zoneId/reciver/count",
    "title": "Get the count of edge and non edge node",
    "description": "<p>Get the count of edge and non edge</p>",
    "version": "1.0.0",
    "name": "Get_reciver_count",
    "group": "Zone",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>User's access token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "zoneId",
            "description": "<p>id of the zone</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of edge and non edge node</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only admins can access the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/zone.route.js",
    "groupTitle": "Zone"
  },
  {
    "type": "get",
    "url": "v1/zone",
    "title": "List Zone",
    "description": "<p>Get a list of zones</p>",
    "version": "1.0.0",
    "name": "ListZones",
    "group": "Zone",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>User's access token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array[]",
            "optional": false,
            "field": "users",
            "description": "<p>List of zones.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only admins can access the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/zone.route.js",
    "groupTitle": "Zone"
  },
  {
    "type": "put",
    "url": "v1/zone/:zoneId",
    "title": "Update Zone Information",
    "description": "<p>Update Zone Information</p>",
    "version": "1.0.0",
    "name": "UpdateZone",
    "group": "Zone",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User's access token</p>"
          },
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "userId",
            "description": "<p>User Id</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "jpg/jpeg/png",
            "optional": false,
            "field": "file",
            "description": "<p>set key as file</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "..50",
            "optional": false,
            "field": "name",
            "description": "<p>Zone Name</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Updated 201": [
          {
            "group": "Updated 201",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true</p>"
          }
        ],
        "Created 201": [
          {
            "group": "Created 201",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>responce message</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only user with same id or admins can access the data</p>"
          }
        ],
        "Not Found 404": [
          {
            "group": "Not Found 404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>User does not exist</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/zone.route.js",
    "groupTitle": "Zone"
  },
  {
    "type": "get",
    "url": "v1/zone",
    "title": "Zone and Asset mapping list",
    "description": "<p>Get list of zone and asset mapping</p>",
    "version": "1.0.0",
    "name": "Zone_and_asset_mapping",
    "group": "Zone",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>User's access token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array[]",
            "optional": false,
            "field": "data",
            "description": "<p>zone and asset mapping List</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only admins can access the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/zone.route.js",
    "groupTitle": "Zone"
  },
  {
    "type": "get",
    "url": "v1/zone/zonedetails",
    "title": "Zone name and its user stats",
    "description": "<p>Get list of zone and its user stats</p>",
    "version": "1.0.0",
    "name": "Zone_and_user_stats",
    "group": "Zone",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>User's access token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array[]",
            "optional": false,
            "field": "data",
            "description": "<p>Zone name and its user stats</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only admins can access the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/zone.route.js",
    "groupTitle": "Zone"
  },
  {
    "type": "post",
    "url": "v1/kpi",
    "title": "Get kpi List",
    "description": "<p>Get kpi list</p>",
    "version": "1.0.0",
    "name": "listkpi",
    "group": "kpi",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>User's access token</p>"
          },
          {
            "group": "Header",
            "type": "Integer",
            "optional": false,
            "field": "companyId",
            "description": "<p>Company Id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Created 201": [
          {
            "group": "Created 201",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Some parameters may contain invalid values</p>"
          }
        ],
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can create the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only admins can create the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/kpi.route.js",
    "groupTitle": "kpi"
  },
  {
    "type": "post",
    "url": "v1/testbeacon/csv",
    "title": "Generate Csv",
    "description": "<p>Generate Csv</p>",
    "version": "1.0.0",
    "name": "Generate_Csv",
    "group": "testbeacon",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "..100",
            "optional": false,
            "field": "beaconId",
            "description": "<p>beaconId</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "..50",
            "optional": false,
            "field": "receiverId",
            "description": "<p>receiverId</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Created 201": [
          {
            "group": "Created 201",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true</p>"
          },
          {
            "group": "Created 201",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>responce message</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Some parameters may contain invalid values</p>"
          }
        ],
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can create the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only admins can create the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/testBeacon.route.js",
    "groupTitle": "testbeacon"
  },
  {
    "type": "post",
    "url": "v1/testbeacon/start",
    "title": "Start Test",
    "description": "<p>Start Test Beacon</p>",
    "version": "1.0.0",
    "name": "Start_Test",
    "group": "testbeacon",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "..100",
            "optional": false,
            "field": "beaconId",
            "description": "<p>beaconId</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "..50",
            "optional": false,
            "field": "receiverId",
            "description": "<p>receiverId</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Created 201": [
          {
            "group": "Created 201",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true</p>"
          },
          {
            "group": "Created 201",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>responce message</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Some parameters may contain invalid values</p>"
          }
        ],
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can create the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only admins can create the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/testBeacon.route.js",
    "groupTitle": "testbeacon"
  },
  {
    "type": "post",
    "url": "v1/testbeacon/stop",
    "title": "Stop Test",
    "description": "<p>Stop Test Beacon</p>",
    "version": "1.0.0",
    "name": "Stop_Test",
    "group": "testbeacon",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "..100",
            "optional": false,
            "field": "beaconId",
            "description": "<p>beaconId</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "..50",
            "optional": false,
            "field": "receiverId",
            "description": "<p>receiverId</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Created 201": [
          {
            "group": "Created 201",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true</p>"
          },
          {
            "group": "Created 201",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>responce message</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Some parameters may contain invalid values</p>"
          }
        ],
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can create the data</p>"
          }
        ],
        "Forbidden 403": [
          {
            "group": "Forbidden 403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Only admins can create the data</p>"
          }
        ]
      }
    },
    "filename": "src/api/routes/v1/testBeacon.route.js",
    "groupTitle": "testbeacon"
  }
] });
