/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from "../models/BaseResponse_boolean_";
import type { BaseResponse_Comments_ } from "../models/BaseResponse_Comments_";
import type { BaseResponse_long_ } from "../models/BaseResponse_long_";
import type { BaseResponse_Page_Comment_ } from "../models/BaseResponse_Page_Comment_";
import type { BaseResponse_Page_Comments_ } from "../models/BaseResponse_Page_Comments_";
import type { BaseResponse_Page_Question_ } from "../models/BaseResponse_Page_Question_";
import type { BaseResponse_Page_QuestionList_ } from "../models/BaseResponse_Page_QuestionList_";
import type { BaseResponse_Page_QuestionListVO_ } from "../models/BaseResponse_Page_QuestionListVO_";
import type { BaseResponse_Page_QuestionSubmitVO_ } from "../models/BaseResponse_Page_QuestionSubmitVO_";
import type { BaseResponse_Page_QuestionVO_ } from "../models/BaseResponse_Page_QuestionVO_";
import type { BaseResponse_Page_UserRank_ } from "../models/BaseResponse_Page_UserRank_";
import type { BaseResponse_Question_ } from "../models/BaseResponse_Question_";
import type { BaseResponse_QuestionListUpdateRequest_ } from "../models/BaseResponse_QuestionListUpdateRequest_";
import type { BaseResponse_QuestionListVO_ } from "../models/BaseResponse_QuestionListVO_";
import type { BaseResponse_QuestionSubmit_ } from "../models/BaseResponse_QuestionSubmit_";
import type { BaseResponse_QuestionSubmitVO_ } from "../models/BaseResponse_QuestionSubmitVO_";
import type { BaseResponse_QuestionVO_ } from "../models/BaseResponse_QuestionVO_";
import type { BaseResponse_UserRank_ } from "../models/BaseResponse_UserRank_";
import type { CommentAddRequest } from "../models/CommentAddRequest";
import type { CommentEditRequest } from "../models/CommentEditRequest";
import type { CommentQueryRequest } from "../models/CommentQueryRequest";
import type { CommentUpdateRequest } from "../models/CommentUpdateRequest";
import type { DeleteRequest } from "../models/DeleteRequest";
import type { QuestionAddRequest } from "../models/QuestionAddRequest";
import type { QuestionEditRequest } from "../models/QuestionEditRequest";
import type { QuestionListAddRequest } from "../models/QuestionListAddRequest";
import type { QuestionListEditRequest } from "../models/QuestionListEditRequest";
import type { QuestionListQueryRequest } from "../models/QuestionListQueryRequest";
import type { QuestionListUpdateRequest } from "../models/QuestionListUpdateRequest";
import type { QuestionQueryRequest } from "../models/QuestionQueryRequest";
import type { QuestionSubmitAddRequest } from "../models/QuestionSubmitAddRequest";
import type { QuestionSubmitQueryRequest } from "../models/QuestionSubmitQueryRequest";
import type { QuestionUpdateRequest } from "../models/QuestionUpdateRequest";
import type { UserRankQueryRequest } from "../models/UserRankQueryRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class QuestionControllerService {
  /**
   * addQuestion
   * @param questionAddRequest questionAddRequest
   * @returns BaseResponse_long_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static addQuestionUsingPost(
    questionAddRequest: QuestionAddRequest
  ): CancelablePromise<BaseResponse_long_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/question/add",
      body: questionAddRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

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
      url: "/api/question/comment/add",
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
      url: "/api/question/comment/delete",
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
      url: "/api/question/comment/edit",
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
      url: "/api/question/comment/get",
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
      url: "/api/question/comment/list/comment/all/page",
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
      url: "/api/question/comment/list/comment/root/page",
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
      url: "/api/question/comment/update",
      body: commentUpdateRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * deleteQuestion
   * @param deleteRequest deleteRequest
   * @returns BaseResponse_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static deleteQuestionUsingPost(
    deleteRequest: DeleteRequest
  ): CancelablePromise<BaseResponse_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/question/delete",
      body: deleteRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * editQuestion
   * @param questionEditRequest questionEditRequest
   * @returns BaseResponse_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static editQuestionUsingPost(
    questionEditRequest: QuestionEditRequest
  ): CancelablePromise<BaseResponse_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/question/edit",
      body: questionEditRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * getQuestionById
   * @param id id
   * @returns BaseResponse_Question_ OK
   * @throws ApiError
   */
  public static getQuestionByIdUsingGet(
    id?: number
  ): CancelablePromise<BaseResponse_Question_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/question/get",
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
   * getQuestionVOById
   * @param id id
   * @returns BaseResponse_QuestionVO_ OK
   * @throws ApiError
   */
  public static getQuestionVoByIdUsingGet(
    id?: number
  ): CancelablePromise<BaseResponse_QuestionVO_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/question/get/vo",
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
   * listQuestionByPage
   * @param questionQueryRequest questionQueryRequest
   * @returns BaseResponse_Page_Question_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static listQuestionByPageUsingPost(
    questionQueryRequest: QuestionQueryRequest
  ): CancelablePromise<BaseResponse_Page_Question_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/question/list/page",
      body: questionQueryRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * listQuestionVOByPage
   * @param questionQueryRequest questionQueryRequest
   * @returns BaseResponse_Page_QuestionVO_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static listQuestionVoByPageUsingPost(
    questionQueryRequest: QuestionQueryRequest
  ): CancelablePromise<BaseResponse_Page_QuestionVO_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/question/list/page/vo",
      body: questionQueryRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * listMyQuestionVOByPage
   * @param questionQueryRequest questionQueryRequest
   * @returns BaseResponse_Page_QuestionVO_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static listMyQuestionVoByPageUsingPost(
    questionQueryRequest: QuestionQueryRequest
  ): CancelablePromise<BaseResponse_Page_QuestionVO_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/question/my/list/page/vo",
      body: questionQueryRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

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
      url: "/api/question/questionList/add",
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
      url: "/api/question/questionList/delete",
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
      url: "/api/question/questionList/edit",
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
   * @returns BaseResponse_QuestionListUpdateRequest_ OK
   * @throws ApiError
   */
  public static getQuestionListByIdUsingGet(
    id?: number
  ): CancelablePromise<BaseResponse_QuestionListUpdateRequest_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/question/questionList/get",
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
      url: "/api/question/questionList/get/vo",
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
      url: "/api/question/questionList/list/page",
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
      url: "/api/question/questionList/list/page/vo",
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
      url: "/api/question/questionList/my/list/page/vo",
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
      url: "/api/question/questionList/update",
      body: questionListUpdateRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * doQuestionSubmit
   * @param questionSubmitAddRequest questionSubmitAddRequest
   * @returns BaseResponse_long_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static doQuestionSubmitUsingPost(
    questionSubmitAddRequest: QuestionSubmitAddRequest
  ): CancelablePromise<BaseResponse_long_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/question/question_submit/do",
      body: questionSubmitAddRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * getQuestionSubmitById
   * @param id id
   * @returns BaseResponse_QuestionSubmit_ OK
   * @throws ApiError
   */
  public static getQuestionSubmitByIdUsingGet(
    id?: number
  ): CancelablePromise<BaseResponse_QuestionSubmit_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/question/question_submit/get",
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
   * getQuestionSubmitVOById
   * @param id id
   * @returns BaseResponse_QuestionSubmitVO_ OK
   * @throws ApiError
   */
  public static getQuestionSubmitVoByIdUsingGet(
    id?: number
  ): CancelablePromise<BaseResponse_QuestionSubmitVO_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/question/question_submit/get/vo",
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
   * listQuestionSubmitByPage
   * @param questionSubmitQueryRequest questionSubmitQueryRequest
   * @returns BaseResponse_Page_QuestionSubmitVO_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static listQuestionSubmitByPageUsingPost(
    questionSubmitQueryRequest: QuestionSubmitQueryRequest
  ): CancelablePromise<BaseResponse_Page_QuestionSubmitVO_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/question/question_submit/list/page",
      body: questionSubmitQueryRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * updateQuestion
   * @param questionUpdateRequest questionUpdateRequest
   * @returns BaseResponse_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static updateQuestionUsingPost(
    questionUpdateRequest: QuestionUpdateRequest
  ): CancelablePromise<BaseResponse_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/question/update",
      body: questionUpdateRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * getUserRank
   * @returns BaseResponse_UserRank_ OK
   * @throws ApiError
   */
  public static getUserRankUsingGet(): CancelablePromise<BaseResponse_UserRank_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/question/userrank/get",
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * listUserRankByPage
   * @param userRankQueryRequest userRankQueryRequest
   * @returns BaseResponse_Page_UserRank_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static listUserRankByPageUsingPost(
    userRankQueryRequest: UserRankQueryRequest
  ): CancelablePromise<BaseResponse_Page_UserRank_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/question/userrank/list/page",
      body: userRankQueryRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
}
