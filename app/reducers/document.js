import initialState from '../initialState.json';

export const DOCUMENT_FETCH_LOADING = Symbol('document/DOCUMENT_FETCH_LOADING');
export const DOCUMENT_FETCH_SUCCESS = Symbol('document/DOCUMENT_FETCH_SUCCESS');
export const DOCUMENT_FETCH_ERROR = Symbol('document/DOCUMENT_FETCH_ERROR');

export default function (state = initialState.document, action) {
  switch (action.type) {
    case DOCUMENT_FETCH_LOADING:
      return {
        ...state,
        error: false,
        loading: true,
        loaded: false,
      };
    case DOCUMENT_FETCH_SUCCESS: {
      const { splunk } = action.payload.warehouse_api;
      const { date_created, date_published, date_updated } = action.payload.msgsaver;
      const { url, headline, pal } = action.payload.web;
      const { total_updates: totalUpdates } = action.payload.msgsaver;
      const { content_guid: contentGuid } = action.payload;
      const { content_id: contentId, drupal } = action.payload;
      const { content_publisher: contentPublisher } = action.payload;
      const { raw_messages: rawMessages } = action.payload.msgsaver;
      const total = action.payload.msgsaver.totalUpdates;
      const {
        content_api: contentApi,
        content_scm: contentScm,
        hal_browser: halBrowser } = action.payload.warehouse_api;
      const resCodes = action.payload.resCodes;
      const coverImage = action.payload.coverImage;

      return {
        ...state,
        splunk,
        url,
        headline,
        pal,
        total,
        contentGuid,
        contentId,
        contentPublisher,
        totalUpdates,
        rawMessages,
        date_created,
        date_published,
        date_updated,
        contentApi,
        contentScm,
        halBrowser,
        drupal,
        loading: false,
        loaded: true,
        resCodes,
        coverImage,
      };
    }
    case DOCUMENT_FETCH_ERROR: {
      return {
        ...initialState.document,
        error: true,
        message: action.payload,
        loaded: false,
      };
    }
    default:
      return state;
  }
}

