/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from "../models/BaseResponse_boolean_";
import type { BaseResponse_Comments_ } from "../models/BaseResponse_Comments_";
import type { BaseResponse_long_ } from "../models/BaseResponse_long_";
import type { BaseResponse_Page_Comment_ } from "../models/BaseResponse_Page_Comment_";
import type { BaseResponse_Page_Comments_ } from "../models/BaseResponse_Page_Comments_";
import type { CommentAddRequest } from "../models/CommentAddRequest";
import type { CommentEditRequest } from "../models/CommentEditRequest";
import type { CommentQueryRequest } from "../models/CommentQueryRequest";
import type { CommentUpdateRequest } from "../models/CommentUpdateRequest";
import type { DeleteRequest } from "../models/DeleteRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class CommentControllerService {
  /**
   * addComment
   * @param commentAddRequest commentAddRequest
   * @returns BaseResponse_long_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static addCommentUsingPost(
    commentAddRequest: CommentAddRequest
  ): CancelablePromise<BaseResponse_long_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/comment/add",
      body: commentAddRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * deleteComment
   * @param deleteRequest deleteRequest
   * @returns BaseResponse_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static deleteCommentUsingPost(
    deleteRequest: DeleteRequest
  ): CancelablePromise<BaseResponse_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/comment/delete",
      body: deleteRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * editComment
   * @param commentEditRequest commentEditRequest
   * @returns BaseResponse_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static editCommentUsingPost(
    commentEditRequest: CommentEditRequest
  ): CancelablePromise<BaseResponse_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/comment/edit",
      body: commentEditRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * getCommentById
   * @param id id
   * @returns BaseResponse_Comments_ OK
   * @throws ApiError
   */
  public static getCommentByIdUsingGet(
    id?: number
  ): CancelablePromise<BaseResponse_Comments_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/comment/get",
      query: {
        id: id,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * listCommentByPage
   * @param commentQueryRequest commentQueryRequest
   * @returns BaseResponse_Page_Comment_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static listCommentByPageUsingPost(
    commentQueryRequest: CommentQueryRequest
  ): CancelablePromise<BaseResponse_Page_Comment_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/comment/list/comment/all/page",
      body: commentQueryRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * listCommentsByPage
   * @param commentQueryRequest commentQueryRequest
   * @returns BaseResponse_Page_Comments_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static listCommentsByPageUsingPost(
    commentQueryRequest: CommentQueryRequest
  ): CancelablePromise<BaseResponse_Page_Comments_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/comment/list/comment/root/page",
      body: commentQueryRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * updateComment
   * @param commentUpdateRequest commentUpdateRequest
   * @returns BaseResponse_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static updateCommentUsingPost(
    commentUpdateRequest: CommentUpdateRequest
  ): CancelablePromise<BaseResponse_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/comment/update",
      body: commentUpdateRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
}
