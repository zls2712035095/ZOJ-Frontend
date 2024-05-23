/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Question } from "./Question";

export type QuestionListQueryRequest = {
  content?: string;
  current?: number;
  id?: number;
  pageSize?: number;
  questionCase?: Array<Question>;
  sortField?: string;
  sortOrder?: string;
  tags?: Array<string>;
  title?: string;
  userId?: number;
};
