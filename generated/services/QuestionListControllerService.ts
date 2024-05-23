/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from "../models/BaseResponse_boolean_";
import type { BaseResponse_long_ } from "../models/BaseResponse_long_";
import type { BaseResponse_Page_QuestionList_ } from "../models/BaseResponse_Page_QuestionList_";
import type { BaseResponse_Page_QuestionListVO_ } from "../models/BaseResponse_Page_QuestionListVO_";
import type { BaseResponse_QuestionList_ } from "../models/BaseResponse_QuestionList_";
import type { BaseResponse_QuestionListVO_ } from "../models/BaseResponse_QuestionListVO_";
import type { DeleteRequest } from "../models/DeleteRequest";
import type { QuestionListAddRequest } from "../models/QuestionListAddRequest";
import type { QuestionListEditRequest } from "../models/QuestionListEditRequest";
import type { QuestionListQueryRequest } from "../models/QuestionListQueryRequest";
import type { QuestionListUpdateRequest } from "../models/QuestionListUpdateRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class QuestionListControllerService {
  /**
   * addQuestionList
   * @param questionListAddRequest questionListAddRequest
   * @returns BaseResponse_long_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static addQuestionListUsingPost(
    questionListAddRequest: QuestionListAddRequest
  ): CancelablePromise<BaseResponse_long_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/questionList/add",
      body: questionListAddRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * deleteQuestionList
   * @param deleteRequest deleteRequest
   * @returns BaseResponse_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static deleteQuestionListUsingPost(
    deleteRequest: DeleteRequest
  ): CancelablePromise<BaseResponse_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/questionList/delete",
      body: deleteRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * editQuestionList
   * @param questionListEditRequest questionListEditRequest
   * @returns BaseResponse_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static editQuestionListUsingPost(
    questionListEditRequest: QuestionListEditRequest
  ): CancelablePromise<BaseResponse_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/questionList/edit",
      body: questionListEditRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * getQuestionListById
   * @param id id
   * @returns BaseResponse_QuestionList_ OK
   * @throws ApiError
   */
  public static getQuestionListByIdUsingGet(
    id?: number
  ): CancelablePromise<BaseResponse_QuestionList_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/questionList/get",
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
   * getQuestionListVOById
   * @param id id
   * @returns BaseResponse_QuestionListVO_ OK
   * @throws ApiError
   */
  public static getQuestionListVoByIdUsingGet(
    id?: number
  ): CancelablePromise<BaseResponse_QuestionListVO_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/questionList/get/vo",
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
   * listQuestionListByPage
   * @param questionQueryRequest questionQueryRequest
   * @returns BaseResponse_Page_QuestionList_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static listQuestionListByPageUsingPost(
    questionQueryRequest: QuestionListQueryRequest
  ): CancelablePromise<BaseResponse_Page_QuestionList_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/questionList/list/page",
      body: questionQueryRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * listQuestionListVOByPage
   * @param questionListQueryRequest questionListQueryRequest
   * @returns BaseResponse_Page_QuestionListVO_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static listQuestionListVoByPageUsingPost(
    questionListQueryRequest: QuestionListQueryRequest
  ): CancelablePromise<BaseResponse_Page_QuestionListVO_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/questionList/list/page/vo",
      body: questionListQueryRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * listMyQuestionListVOByPage
   * @param questionListQueryRequest questionListQueryRequest
   * @returns BaseResponse_Page_QuestionListVO_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static listMyQuestionListVoByPageUsingPost(
    questionListQueryRequest: QuestionListQueryRequest
  ): CancelablePromise<BaseResponse_Page_QuestionListVO_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/questionList/my/list/page/vo",
      body: questionListQueryRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * updateQuestionList
   * @param questionListUpdateRequest questionListUpdateRequest
   * @returns BaseResponse_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static updateQuestionListUsingPost(
    questionListUpdateRequest: QuestionListUpdateRequest
  ): CancelablePromise<BaseResponse_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/questionList/update",
      body: questionListUpdateRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
}
