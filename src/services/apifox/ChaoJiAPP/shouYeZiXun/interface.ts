/**
 * @description /文章详情（对H5）--接口请求Query参数
 * @url GET /infoflow/article/detail
 */
export interface getInfoflowArticleDetailQuery {
  app_version_num?: number;
  /** 文章详情ID */
  id?: number;
  [key: string]: any;
}

/**
 * @description /文章详情（对H5）--接口请求Body参数
 * @url GET /infoflow/article/detail
 */
export interface getInfoflowArticleDetailBody {
  [key: string]: any;
}

/**
 * @description /文章详情（对H5）--接口返回值
 * @url GET /infoflow/article/detail
 */
export interface getInfoflowArticleDetailRes {
  /** 线索归类图片 */
  clue_classify_img_url: string;
  collect_count: number;
  content: string;
  id: number;
  img_url: string;
  img_url_compress: string;
  is_finished_transcode: number;
  media_transcode_url: string;
  release_time: string;
  title: string;
  view_count: number;
  [key: string]: any;
}

/**
 * @description /文章基本信息APP使用--接口请求Query参数
 * @url GET /infoflow/article/info
 */
export interface getInfoflowArticleInfoQuery {
  id?: number;
  [key: string]: any;
}

/**
 * @description /文章基本信息APP使用--接口请求Body参数
 * @url GET /infoflow/article/info
 */
export interface getInfoflowArticleInfoBody {
  [key: string]: any;
}

/**
 * @description /文章基本信息APP使用--接口返回值
 * @url GET /infoflow/article/info
 */
export interface getInfoflowArticleInfoRes {
  /** 线索归类二维码 */
  clue_classify_img_url: string;
  collect_count: number;
  id: number;
  img_url: string;
  img_url_compress: string;
  is_collect: boolean;
  is_like: boolean;
  like_count: number;
  media_url: string;
  title: string;
  view_count: number;
  [key: string]: any;
}
