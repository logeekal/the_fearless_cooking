"use strict";
exports.__esModule = true;
exports.TimezoneEnum = exports.MediaItemStatusEnum = exports.UsersConnectionSearchColumnEnum = exports.UserRoleEnum = exports.UsersConnectionOrderbyEnum = exports.UserNodeIdTypeEnum = exports.TermNodeIdTypeEnum = exports.TaxonomyIdTypeEnum = exports.TagIdType = exports.RecipeCuisineIdType = exports.RecipeCourseIdType = exports.RecipeIdType = exports.PostFormatIdType = exports.PostIdType = exports.PageIdType = exports.MenuItemNodeIdTypeEnum = exports.MenuLocationEnum = exports.MenuNodeIdTypeEnum = exports.MediaItemIdType = exports.FaqIdType = exports.ContentTypeIdTypeEnum = exports.ContentNodeIdTypeEnum = exports.CategoryIdType = exports.TaxonomyEnum = exports.MediaItemSizeEnum = exports.PostObjectFieldFormatEnum = exports.CommentsConnectionOrderbyEnum = exports.ContentTypeEnum = exports.AvatarRatingEnum = exports.PostStatusEnum = exports.PostObjectsConnectionOrderbyEnum = exports.MimeTypeEnum = exports.RelationEnum = exports.PostObjectsConnectionDateColumnEnum = exports.TermObjectsConnectionOrderbyEnum = exports.OrderEnum = void 0;
/** The cardinality of the connection order */
var OrderEnum;
(function (OrderEnum) {
    /** Sort the query result set in an ascending order */
    OrderEnum["Asc"] = "ASC";
    /** Sort the query result set in a descending order */
    OrderEnum["Desc"] = "DESC";
})(OrderEnum = exports.OrderEnum || (exports.OrderEnum = {}));
/** Options for ordering the connection by */
var TermObjectsConnectionOrderbyEnum;
(function (TermObjectsConnectionOrderbyEnum) {
    /** Order the connection by item count. */
    TermObjectsConnectionOrderbyEnum["Count"] = "COUNT";
    /** Order the connection by description. */
    TermObjectsConnectionOrderbyEnum["Description"] = "DESCRIPTION";
    /** Order the connection by name. */
    TermObjectsConnectionOrderbyEnum["Name"] = "NAME";
    /** Order the connection by slug. */
    TermObjectsConnectionOrderbyEnum["Slug"] = "SLUG";
    /** Order the connection by term group. */
    TermObjectsConnectionOrderbyEnum["TermGroup"] = "TERM_GROUP";
    /** Order the connection by term id. */
    TermObjectsConnectionOrderbyEnum["TermId"] = "TERM_ID";
    /** Order the connection by term order. */
    TermObjectsConnectionOrderbyEnum["TermOrder"] = "TERM_ORDER";
})(TermObjectsConnectionOrderbyEnum = exports.TermObjectsConnectionOrderbyEnum || (exports.TermObjectsConnectionOrderbyEnum = {}));
/** The column to use when filtering by date */
var PostObjectsConnectionDateColumnEnum;
(function (PostObjectsConnectionDateColumnEnum) {
    /** The date the comment was created in local time. */
    PostObjectsConnectionDateColumnEnum["Date"] = "DATE";
    /** The most recent modification date of the comment. */
    PostObjectsConnectionDateColumnEnum["Modified"] = "MODIFIED";
})(PostObjectsConnectionDateColumnEnum = exports.PostObjectsConnectionDateColumnEnum || (exports.PostObjectsConnectionDateColumnEnum = {}));
/** The logical relation between each item in the array when there are more than one. */
var RelationEnum;
(function (RelationEnum) {
    /** The logical AND condition returns true if both operands are true, otherwise, it returns false. */
    RelationEnum["And"] = "AND";
    /** The logical OR condition returns false if both operands are false, otherwise, it returns true. */
    RelationEnum["Or"] = "OR";
})(RelationEnum = exports.RelationEnum || (exports.RelationEnum = {}));
/** The MimeType of the object */
var MimeTypeEnum;
(function (MimeTypeEnum) {
    /** MimeType application/java */
    MimeTypeEnum["ApplicationJava"] = "APPLICATION_JAVA";
    /** MimeType application/msword */
    MimeTypeEnum["ApplicationMsword"] = "APPLICATION_MSWORD";
    /** MimeType application/octet-stream */
    MimeTypeEnum["ApplicationOctetStream"] = "APPLICATION_OCTET_STREAM";
    /** MimeType application/onenote */
    MimeTypeEnum["ApplicationOnenote"] = "APPLICATION_ONENOTE";
    /** MimeType application/oxps */
    MimeTypeEnum["ApplicationOxps"] = "APPLICATION_OXPS";
    /** MimeType application/pdf */
    MimeTypeEnum["ApplicationPdf"] = "APPLICATION_PDF";
    /** MimeType application/rar */
    MimeTypeEnum["ApplicationRar"] = "APPLICATION_RAR";
    /** MimeType application/rtf */
    MimeTypeEnum["ApplicationRtf"] = "APPLICATION_RTF";
    /** MimeType application/ttaf+xml */
    MimeTypeEnum["ApplicationTtafXml"] = "APPLICATION_TTAF_XML";
    /** MimeType application/vnd.apple.keynote */
    MimeTypeEnum["ApplicationVndAppleKeynote"] = "APPLICATION_VND_APPLE_KEYNOTE";
    /** MimeType application/vnd.apple.numbers */
    MimeTypeEnum["ApplicationVndAppleNumbers"] = "APPLICATION_VND_APPLE_NUMBERS";
    /** MimeType application/vnd.apple.pages */
    MimeTypeEnum["ApplicationVndApplePages"] = "APPLICATION_VND_APPLE_PAGES";
    /** MimeType application/vnd.ms-access */
    MimeTypeEnum["ApplicationVndMsAccess"] = "APPLICATION_VND_MS_ACCESS";
    /** MimeType application/vnd.ms-excel */
    MimeTypeEnum["ApplicationVndMsExcel"] = "APPLICATION_VND_MS_EXCEL";
    /** MimeType application/vnd.ms-excel.addin.macroEnabled.12 */
    MimeTypeEnum["ApplicationVndMsExcelAddinMacroenabled_12"] = "APPLICATION_VND_MS_EXCEL_ADDIN_MACROENABLED_12";
    /** MimeType application/vnd.ms-excel.sheet.binary.macroEnabled.12 */
    MimeTypeEnum["ApplicationVndMsExcelSheetBinaryMacroenabled_12"] = "APPLICATION_VND_MS_EXCEL_SHEET_BINARY_MACROENABLED_12";
    /** MimeType application/vnd.ms-excel.sheet.macroEnabled.12 */
    MimeTypeEnum["ApplicationVndMsExcelSheetMacroenabled_12"] = "APPLICATION_VND_MS_EXCEL_SHEET_MACROENABLED_12";
    /** MimeType application/vnd.ms-excel.template.macroEnabled.12 */
    MimeTypeEnum["ApplicationVndMsExcelTemplateMacroenabled_12"] = "APPLICATION_VND_MS_EXCEL_TEMPLATE_MACROENABLED_12";
    /** MimeType application/vnd.ms-powerpoint */
    MimeTypeEnum["ApplicationVndMsPowerpoint"] = "APPLICATION_VND_MS_POWERPOINT";
    /** MimeType application/vnd.ms-powerpoint.addin.macroEnabled.12 */
    MimeTypeEnum["ApplicationVndMsPowerpointAddinMacroenabled_12"] = "APPLICATION_VND_MS_POWERPOINT_ADDIN_MACROENABLED_12";
    /** MimeType application/vnd.ms-powerpoint.presentation.macroEnabled.12 */
    MimeTypeEnum["ApplicationVndMsPowerpointPresentationMacroenabled_12"] = "APPLICATION_VND_MS_POWERPOINT_PRESENTATION_MACROENABLED_12";
    /** MimeType application/vnd.ms-powerpoint.slideshow.macroEnabled.12 */
    MimeTypeEnum["ApplicationVndMsPowerpointSlideshowMacroenabled_12"] = "APPLICATION_VND_MS_POWERPOINT_SLIDESHOW_MACROENABLED_12";
    /** MimeType application/vnd.ms-powerpoint.slide.macroEnabled.12 */
    MimeTypeEnum["ApplicationVndMsPowerpointSlideMacroenabled_12"] = "APPLICATION_VND_MS_POWERPOINT_SLIDE_MACROENABLED_12";
    /** MimeType application/vnd.ms-powerpoint.template.macroEnabled.12 */
    MimeTypeEnum["ApplicationVndMsPowerpointTemplateMacroenabled_12"] = "APPLICATION_VND_MS_POWERPOINT_TEMPLATE_MACROENABLED_12";
    /** MimeType application/vnd.ms-project */
    MimeTypeEnum["ApplicationVndMsProject"] = "APPLICATION_VND_MS_PROJECT";
    /** MimeType application/vnd.ms-word.document.macroEnabled.12 */
    MimeTypeEnum["ApplicationVndMsWordDocumentMacroenabled_12"] = "APPLICATION_VND_MS_WORD_DOCUMENT_MACROENABLED_12";
    /** MimeType application/vnd.ms-word.template.macroEnabled.12 */
    MimeTypeEnum["ApplicationVndMsWordTemplateMacroenabled_12"] = "APPLICATION_VND_MS_WORD_TEMPLATE_MACROENABLED_12";
    /** MimeType application/vnd.ms-write */
    MimeTypeEnum["ApplicationVndMsWrite"] = "APPLICATION_VND_MS_WRITE";
    /** MimeType application/vnd.ms-xpsdocument */
    MimeTypeEnum["ApplicationVndMsXpsdocument"] = "APPLICATION_VND_MS_XPSDOCUMENT";
    /** MimeType application/vnd.oasis.opendocument.chart */
    MimeTypeEnum["ApplicationVndOasisOpendocumentChart"] = "APPLICATION_VND_OASIS_OPENDOCUMENT_CHART";
    /** MimeType application/vnd.oasis.opendocument.database */
    MimeTypeEnum["ApplicationVndOasisOpendocumentDatabase"] = "APPLICATION_VND_OASIS_OPENDOCUMENT_DATABASE";
    /** MimeType application/vnd.oasis.opendocument.formula */
    MimeTypeEnum["ApplicationVndOasisOpendocumentFormula"] = "APPLICATION_VND_OASIS_OPENDOCUMENT_FORMULA";
    /** MimeType application/vnd.oasis.opendocument.graphics */
    MimeTypeEnum["ApplicationVndOasisOpendocumentGraphics"] = "APPLICATION_VND_OASIS_OPENDOCUMENT_GRAPHICS";
    /** MimeType application/vnd.oasis.opendocument.presentation */
    MimeTypeEnum["ApplicationVndOasisOpendocumentPresentation"] = "APPLICATION_VND_OASIS_OPENDOCUMENT_PRESENTATION";
    /** MimeType application/vnd.oasis.opendocument.spreadsheet */
    MimeTypeEnum["ApplicationVndOasisOpendocumentSpreadsheet"] = "APPLICATION_VND_OASIS_OPENDOCUMENT_SPREADSHEET";
    /** MimeType application/vnd.oasis.opendocument.text */
    MimeTypeEnum["ApplicationVndOasisOpendocumentText"] = "APPLICATION_VND_OASIS_OPENDOCUMENT_TEXT";
    /** MimeType application/vnd.openxmlformats-officedocument.presentationml.presentation */
    MimeTypeEnum["ApplicationVndOpenxmlformatsOfficedocumentPresentationmlPresentation"] = "APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_PRESENTATIONML_PRESENTATION";
    /** MimeType application/vnd.openxmlformats-officedocument.presentationml.slide */
    MimeTypeEnum["ApplicationVndOpenxmlformatsOfficedocumentPresentationmlSlide"] = "APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_PRESENTATIONML_SLIDE";
    /** MimeType application/vnd.openxmlformats-officedocument.presentationml.slideshow */
    MimeTypeEnum["ApplicationVndOpenxmlformatsOfficedocumentPresentationmlSlideshow"] = "APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_PRESENTATIONML_SLIDESHOW";
    /** MimeType application/vnd.openxmlformats-officedocument.presentationml.template */
    MimeTypeEnum["ApplicationVndOpenxmlformatsOfficedocumentPresentationmlTemplate"] = "APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_PRESENTATIONML_TEMPLATE";
    /** MimeType application/vnd.openxmlformats-officedocument.spreadsheetml.sheet */
    MimeTypeEnum["ApplicationVndOpenxmlformatsOfficedocumentSpreadsheetmlSheet"] = "APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_SPREADSHEETML_SHEET";
    /** MimeType application/vnd.openxmlformats-officedocument.spreadsheetml.template */
    MimeTypeEnum["ApplicationVndOpenxmlformatsOfficedocumentSpreadsheetmlTemplate"] = "APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_SPREADSHEETML_TEMPLATE";
    /** MimeType application/vnd.openxmlformats-officedocument.wordprocessingml.document */
    MimeTypeEnum["ApplicationVndOpenxmlformatsOfficedocumentWordprocessingmlDocument"] = "APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_WORDPROCESSINGML_DOCUMENT";
    /** MimeType application/vnd.openxmlformats-officedocument.wordprocessingml.template */
    MimeTypeEnum["ApplicationVndOpenxmlformatsOfficedocumentWordprocessingmlTemplate"] = "APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_WORDPROCESSINGML_TEMPLATE";
    /** MimeType application/wordperfect */
    MimeTypeEnum["ApplicationWordperfect"] = "APPLICATION_WORDPERFECT";
    /** MimeType application/x-7z-compressed */
    MimeTypeEnum["ApplicationX_7ZCompressed"] = "APPLICATION_X_7Z_COMPRESSED";
    /** MimeType application/x-gzip */
    MimeTypeEnum["ApplicationXGzip"] = "APPLICATION_X_GZIP";
    /** MimeType application/x-tar */
    MimeTypeEnum["ApplicationXTar"] = "APPLICATION_X_TAR";
    /** MimeType application/zip */
    MimeTypeEnum["ApplicationZip"] = "APPLICATION_ZIP";
    /** MimeType audio/aac */
    MimeTypeEnum["AudioAac"] = "AUDIO_AAC";
    /** MimeType audio/flac */
    MimeTypeEnum["AudioFlac"] = "AUDIO_FLAC";
    /** MimeType audio/midi */
    MimeTypeEnum["AudioMidi"] = "AUDIO_MIDI";
    /** MimeType audio/mpeg */
    MimeTypeEnum["AudioMpeg"] = "AUDIO_MPEG";
    /** MimeType audio/ogg */
    MimeTypeEnum["AudioOgg"] = "AUDIO_OGG";
    /** MimeType audio/wav */
    MimeTypeEnum["AudioWav"] = "AUDIO_WAV";
    /** MimeType audio/x-matroska */
    MimeTypeEnum["AudioXMatroska"] = "AUDIO_X_MATROSKA";
    /** MimeType audio/x-ms-wax */
    MimeTypeEnum["AudioXMsWax"] = "AUDIO_X_MS_WAX";
    /** MimeType audio/x-ms-wma */
    MimeTypeEnum["AudioXMsWma"] = "AUDIO_X_MS_WMA";
    /** MimeType audio/x-realaudio */
    MimeTypeEnum["AudioXRealaudio"] = "AUDIO_X_REALAUDIO";
    /** MimeType image/bmp */
    MimeTypeEnum["ImageBmp"] = "IMAGE_BMP";
    /** MimeType image/gif */
    MimeTypeEnum["ImageGif"] = "IMAGE_GIF";
    /** MimeType image/heic */
    MimeTypeEnum["ImageHeic"] = "IMAGE_HEIC";
    /** MimeType image/jpeg */
    MimeTypeEnum["ImageJpeg"] = "IMAGE_JPEG";
    /** MimeType image/png */
    MimeTypeEnum["ImagePng"] = "IMAGE_PNG";
    /** MimeType image/tiff */
    MimeTypeEnum["ImageTiff"] = "IMAGE_TIFF";
    /** MimeType image/x-icon */
    MimeTypeEnum["ImageXIcon"] = "IMAGE_X_ICON";
    /** MimeType text/calendar */
    MimeTypeEnum["TextCalendar"] = "TEXT_CALENDAR";
    /** MimeType text/css */
    MimeTypeEnum["TextCss"] = "TEXT_CSS";
    /** MimeType text/csv */
    MimeTypeEnum["TextCsv"] = "TEXT_CSV";
    /** MimeType text/plain */
    MimeTypeEnum["TextPlain"] = "TEXT_PLAIN";
    /** MimeType text/richtext */
    MimeTypeEnum["TextRichtext"] = "TEXT_RICHTEXT";
    /** MimeType text/tab-separated-values */
    MimeTypeEnum["TextTabSeparatedValues"] = "TEXT_TAB_SEPARATED_VALUES";
    /** MimeType text/vtt */
    MimeTypeEnum["TextVtt"] = "TEXT_VTT";
    /** MimeType video/3gpp */
    MimeTypeEnum["Video_3Gpp"] = "VIDEO_3GPP";
    /** MimeType video/3gpp2 */
    MimeTypeEnum["Video_3Gpp2"] = "VIDEO_3GPP2";
    /** MimeType video/avi */
    MimeTypeEnum["VideoAvi"] = "VIDEO_AVI";
    /** MimeType video/divx */
    MimeTypeEnum["VideoDivx"] = "VIDEO_DIVX";
    /** MimeType video/mp4 */
    MimeTypeEnum["VideoMp4"] = "VIDEO_MP4";
    /** MimeType video/mpeg */
    MimeTypeEnum["VideoMpeg"] = "VIDEO_MPEG";
    /** MimeType video/ogg */
    MimeTypeEnum["VideoOgg"] = "VIDEO_OGG";
    /** MimeType video/quicktime */
    MimeTypeEnum["VideoQuicktime"] = "VIDEO_QUICKTIME";
    /** MimeType video/webm */
    MimeTypeEnum["VideoWebm"] = "VIDEO_WEBM";
    /** MimeType video/x-flv */
    MimeTypeEnum["VideoXFlv"] = "VIDEO_X_FLV";
    /** MimeType video/x-matroska */
    MimeTypeEnum["VideoXMatroska"] = "VIDEO_X_MATROSKA";
    /** MimeType video/x-ms-asf */
    MimeTypeEnum["VideoXMsAsf"] = "VIDEO_X_MS_ASF";
    /** MimeType video/x-ms-wm */
    MimeTypeEnum["VideoXMsWm"] = "VIDEO_X_MS_WM";
    /** MimeType video/x-ms-wmv */
    MimeTypeEnum["VideoXMsWmv"] = "VIDEO_X_MS_WMV";
    /** MimeType video/x-ms-wmx */
    MimeTypeEnum["VideoXMsWmx"] = "VIDEO_X_MS_WMX";
})(MimeTypeEnum = exports.MimeTypeEnum || (exports.MimeTypeEnum = {}));
/** Field to order the connection by */
var PostObjectsConnectionOrderbyEnum;
(function (PostObjectsConnectionOrderbyEnum) {
    /** Order by author */
    PostObjectsConnectionOrderbyEnum["Author"] = "AUTHOR";
    /** Order by the number of comments it has acquired */
    PostObjectsConnectionOrderbyEnum["CommentCount"] = "COMMENT_COUNT";
    /** Order by publish date */
    PostObjectsConnectionOrderbyEnum["Date"] = "DATE";
    /** Preserve the ID order given in the IN array */
    PostObjectsConnectionOrderbyEnum["In"] = "IN";
    /** Order by the menu order value */
    PostObjectsConnectionOrderbyEnum["MenuOrder"] = "MENU_ORDER";
    /** Order by last modified date */
    PostObjectsConnectionOrderbyEnum["Modified"] = "MODIFIED";
    /** Preserve slug order given in the NAME_IN array */
    PostObjectsConnectionOrderbyEnum["NameIn"] = "NAME_IN";
    /** Order by parent ID */
    PostObjectsConnectionOrderbyEnum["Parent"] = "PARENT";
    /** Order by slug */
    PostObjectsConnectionOrderbyEnum["Slug"] = "SLUG";
    /** Order by title */
    PostObjectsConnectionOrderbyEnum["Title"] = "TITLE";
})(PostObjectsConnectionOrderbyEnum = exports.PostObjectsConnectionOrderbyEnum || (exports.PostObjectsConnectionOrderbyEnum = {}));
/** The status of the object. */
var PostStatusEnum;
(function (PostStatusEnum) {
    /** Objects with the auto-draft status */
    PostStatusEnum["AutoDraft"] = "AUTO_DRAFT";
    /** Objects with the draft status */
    PostStatusEnum["Draft"] = "DRAFT";
    /** Objects with the future status */
    PostStatusEnum["Future"] = "FUTURE";
    /** Objects with the inherit status */
    PostStatusEnum["Inherit"] = "INHERIT";
    /** Objects with the pending status */
    PostStatusEnum["Pending"] = "PENDING";
    /** Objects with the private status */
    PostStatusEnum["Private"] = "PRIVATE";
    /** Objects with the publish status */
    PostStatusEnum["Publish"] = "PUBLISH";
    /** Objects with the request-completed status */
    PostStatusEnum["RequestCompleted"] = "REQUEST_COMPLETED";
    /** Objects with the request-confirmed status */
    PostStatusEnum["RequestConfirmed"] = "REQUEST_CONFIRMED";
    /** Objects with the request-failed status */
    PostStatusEnum["RequestFailed"] = "REQUEST_FAILED";
    /** Objects with the request-pending status */
    PostStatusEnum["RequestPending"] = "REQUEST_PENDING";
    /** Objects with the trash status */
    PostStatusEnum["Trash"] = "TRASH";
})(PostStatusEnum = exports.PostStatusEnum || (exports.PostStatusEnum = {}));
/** What rating to display avatars up to. Accepts 'G', 'PG', 'R', 'X', and are judged in that order. Default is the value of the 'avatar_rating' option */
var AvatarRatingEnum;
(function (AvatarRatingEnum) {
    /** Indicates a G level avatar rating level. */
    AvatarRatingEnum["G"] = "G";
    /** Indicates a PG level avatar rating level. */
    AvatarRatingEnum["Pg"] = "PG";
    /** Indicates an R level avatar rating level. */
    AvatarRatingEnum["R"] = "R";
    /** Indicates an X level avatar rating level. */
    AvatarRatingEnum["X"] = "X";
})(AvatarRatingEnum = exports.AvatarRatingEnum || (exports.AvatarRatingEnum = {}));
/** Allowed Content Types */
var ContentTypeEnum;
(function (ContentTypeEnum) {
    /** The Type of Content object */
    ContentTypeEnum["Attachment"] = "ATTACHMENT";
    /** The Type of Content object */
    ContentTypeEnum["HelpieFaq"] = "HELPIE_FAQ";
    /** The Type of Content object */
    ContentTypeEnum["Page"] = "PAGE";
    /** The Type of Content object */
    ContentTypeEnum["Post"] = "POST";
    /** The Type of Content object */
    ContentTypeEnum["Recipe"] = "RECIPE";
})(ContentTypeEnum = exports.ContentTypeEnum || (exports.ContentTypeEnum = {}));
/** Options for ordering the connection */
var CommentsConnectionOrderbyEnum;
(function (CommentsConnectionOrderbyEnum) {
    /** Order by browser user agent of the commenter. */
    CommentsConnectionOrderbyEnum["CommentAgent"] = "COMMENT_AGENT";
    /** Order by true/false approval of the comment. */
    CommentsConnectionOrderbyEnum["CommentApproved"] = "COMMENT_APPROVED";
    /** Order by name of the comment author. */
    CommentsConnectionOrderbyEnum["CommentAuthor"] = "COMMENT_AUTHOR";
    /** Order by e-mail of the comment author. */
    CommentsConnectionOrderbyEnum["CommentAuthorEmail"] = "COMMENT_AUTHOR_EMAIL";
    /** Order by IP address of the comment author. */
    CommentsConnectionOrderbyEnum["CommentAuthorIp"] = "COMMENT_AUTHOR_IP";
    /** Order by URL address of the comment author. */
    CommentsConnectionOrderbyEnum["CommentAuthorUrl"] = "COMMENT_AUTHOR_URL";
    /** Order by the comment contents. */
    CommentsConnectionOrderbyEnum["CommentContent"] = "COMMENT_CONTENT";
    /** Order by date/time timestamp of the comment. */
    CommentsConnectionOrderbyEnum["CommentDate"] = "COMMENT_DATE";
    /** Order by GMT timezone date/time timestamp of the comment. */
    CommentsConnectionOrderbyEnum["CommentDateGmt"] = "COMMENT_DATE_GMT";
    /** Order by the globally unique identifier for the comment object */
    CommentsConnectionOrderbyEnum["CommentId"] = "COMMENT_ID";
    /** Order by the array list of comment IDs listed in the where clause. */
    CommentsConnectionOrderbyEnum["CommentIn"] = "COMMENT_IN";
    /** Order by the comment karma score. */
    CommentsConnectionOrderbyEnum["CommentKarma"] = "COMMENT_KARMA";
    /** Order by the comment parent ID. */
    CommentsConnectionOrderbyEnum["CommentParent"] = "COMMENT_PARENT";
    /** Order by the post object ID. */
    CommentsConnectionOrderbyEnum["CommentPostId"] = "COMMENT_POST_ID";
    /** Order by the the type of comment, such as 'comment', 'pingback', or 'trackback'. */
    CommentsConnectionOrderbyEnum["CommentType"] = "COMMENT_TYPE";
    /** Order by the user ID. */
    CommentsConnectionOrderbyEnum["UserId"] = "USER_ID";
})(CommentsConnectionOrderbyEnum = exports.CommentsConnectionOrderbyEnum || (exports.CommentsConnectionOrderbyEnum = {}));
/** The format of post field data. */
var PostObjectFieldFormatEnum;
(function (PostObjectFieldFormatEnum) {
    /** Provide the field value directly from database */
    PostObjectFieldFormatEnum["Raw"] = "RAW";
    /** Apply the default WordPress rendering */
    PostObjectFieldFormatEnum["Rendered"] = "RENDERED";
})(PostObjectFieldFormatEnum = exports.PostObjectFieldFormatEnum || (exports.PostObjectFieldFormatEnum = {}));
/** The size of the media item object. */
var MediaItemSizeEnum;
(function (MediaItemSizeEnum) {
    /** MediaItem with the bootstrap-blog-slider size */
    MediaItemSizeEnum["BootstrapBlogSlider"] = "BOOTSTRAP_BLOG_SLIDER";
    /** MediaItem with the delrecpe-structured-data-16_9 size */
    MediaItemSizeEnum["DelrecpeStructuredData_16_9"] = "DELRECPE_STRUCTURED_DATA_16_9";
    /** MediaItem with the delrecpe-structured-data-1_1 size */
    MediaItemSizeEnum["DelrecpeStructuredData_1_1"] = "DELRECPE_STRUCTURED_DATA_1_1";
    /** MediaItem with the delrecpe-structured-data-4_3 size */
    MediaItemSizeEnum["DelrecpeStructuredData_4_3"] = "DELRECPE_STRUCTURED_DATA_4_3";
    /** MediaItem with the large size */
    MediaItemSizeEnum["Large"] = "LARGE";
    /** MediaItem with the mailchimp size */
    MediaItemSizeEnum["Mailchimp"] = "MAILCHIMP";
    /** MediaItem with the medium size */
    MediaItemSizeEnum["Medium"] = "MEDIUM";
    /** MediaItem with the medium_large size */
    MediaItemSizeEnum["MediumLarge"] = "MEDIUM_LARGE";
    /** MediaItem with the post-slider-thumb-size size */
    MediaItemSizeEnum["PostSliderThumbSize"] = "POST_SLIDER_THUMB_SIZE";
    /** MediaItem with the recipe-archive-grid size */
    MediaItemSizeEnum["RecipeArchiveGrid"] = "RECIPE_ARCHIVE_GRID";
    /** MediaItem with the recipe-archive-list size */
    MediaItemSizeEnum["RecipeArchiveList"] = "RECIPE_ARCHIVE_LIST";
    /** MediaItem with the recipe-author-image size */
    MediaItemSizeEnum["RecipeAuthorImage"] = "RECIPE_AUTHOR_IMAGE";
    /** MediaItem with the recipe-feat-gallery size */
    MediaItemSizeEnum["RecipeFeatGallery"] = "RECIPE_FEAT_GALLERY";
    /** MediaItem with the recipe-feat-print size */
    MediaItemSizeEnum["RecipeFeatPrint"] = "RECIPE_FEAT_PRINT";
    /** MediaItem with the recipe-feat-tall size */
    MediaItemSizeEnum["RecipeFeatTall"] = "RECIPE_FEAT_TALL";
    /** MediaItem with the recipe-feat-thumbnail size */
    MediaItemSizeEnum["RecipeFeatThumbnail"] = "RECIPE_FEAT_THUMBNAIL";
    /** MediaItem with the thumbnail size */
    MediaItemSizeEnum["Thumbnail"] = "THUMBNAIL";
    /** MediaItem with the wprm-metadata-16_9 size */
    MediaItemSizeEnum["WprmMetadata_16_9"] = "WPRM_METADATA_16_9";
    /** MediaItem with the wprm-metadata-1_1 size */
    MediaItemSizeEnum["WprmMetadata_1_1"] = "WPRM_METADATA_1_1";
    /** MediaItem with the wprm-metadata-4_3 size */
    MediaItemSizeEnum["WprmMetadata_4_3"] = "WPRM_METADATA_4_3";
    /** MediaItem with the 1536x1536 size */
    MediaItemSizeEnum["1536X1536"] = "_1536X1536";
    /** MediaItem with the 2048x2048 size */
    MediaItemSizeEnum["2048X2048"] = "_2048X2048";
})(MediaItemSizeEnum = exports.MediaItemSizeEnum || (exports.MediaItemSizeEnum = {}));
/** Allowed taxonomies */
var TaxonomyEnum;
(function (TaxonomyEnum) {
    /** Taxonomy enum category */
    TaxonomyEnum["Category"] = "CATEGORY";
    /** Taxonomy enum post_format */
    TaxonomyEnum["Postformat"] = "POSTFORMAT";
    /** Taxonomy enum recipe-course */
    TaxonomyEnum["Recipecourse"] = "RECIPECOURSE";
    /** Taxonomy enum recipe-cuisine */
    TaxonomyEnum["Recipecuisine"] = "RECIPECUISINE";
    /** Taxonomy enum post_tag */
    TaxonomyEnum["Tag"] = "TAG";
})(TaxonomyEnum = exports.TaxonomyEnum || (exports.TaxonomyEnum = {}));
/** The Type of Identifier used to fetch a single resource. Default is ID. */
var CategoryIdType;
(function (CategoryIdType) {
    /** The Database ID for the node */
    CategoryIdType["DatabaseId"] = "DATABASE_ID";
    /** The hashed Global ID */
    CategoryIdType["Id"] = "ID";
    /** The name of the node */
    CategoryIdType["Name"] = "NAME";
    /** Url friendly name of the node */
    CategoryIdType["Slug"] = "SLUG";
    /** The URI for the node */
    CategoryIdType["Uri"] = "URI";
})(CategoryIdType = exports.CategoryIdType || (exports.CategoryIdType = {}));
/** The Type of Identifier used to fetch a single resource. Default is ID. */
var ContentNodeIdTypeEnum;
(function (ContentNodeIdTypeEnum) {
    /** Identify a resource by the Database ID. */
    ContentNodeIdTypeEnum["DatabaseId"] = "DATABASE_ID";
    /** Identify a resource by the (hashed) Global ID. */
    ContentNodeIdTypeEnum["Id"] = "ID";
    /** Identify a resource by the URI. */
    ContentNodeIdTypeEnum["Uri"] = "URI";
})(ContentNodeIdTypeEnum = exports.ContentNodeIdTypeEnum || (exports.ContentNodeIdTypeEnum = {}));
/** The Type of Identifier used to fetch a single Content Type node. To be used along with the "id" field. Default is "ID". */
var ContentTypeIdTypeEnum;
(function (ContentTypeIdTypeEnum) {
    /** The globally unique ID */
    ContentTypeIdTypeEnum["Id"] = "ID";
    /** The name of the content type. */
    ContentTypeIdTypeEnum["Name"] = "NAME";
})(ContentTypeIdTypeEnum = exports.ContentTypeIdTypeEnum || (exports.ContentTypeIdTypeEnum = {}));
/** The Type of Identifier used to fetch a single resource. Default is ID. */
var FaqIdType;
(function (FaqIdType) {
    /** Identify a resource by the Database ID. */
    FaqIdType["DatabaseId"] = "DATABASE_ID";
    /** Identify a resource by the (hashed) Global ID. */
    FaqIdType["Id"] = "ID";
    /** Identify a resource by the slug. Available to non-hierarchcial Types where the slug is a unique identifier. */
    FaqIdType["Slug"] = "SLUG";
    /** Identify a resource by the URI. */
    FaqIdType["Uri"] = "URI";
})(FaqIdType = exports.FaqIdType || (exports.FaqIdType = {}));
/** The Type of Identifier used to fetch a single resource. Default is ID. */
var MediaItemIdType;
(function (MediaItemIdType) {
    /** Identify a resource by the Database ID. */
    MediaItemIdType["DatabaseId"] = "DATABASE_ID";
    /** Identify a resource by the (hashed) Global ID. */
    MediaItemIdType["Id"] = "ID";
    /** Identify a resource by the slug. Available to non-hierarchcial Types where the slug is a unique identifier. */
    MediaItemIdType["Slug"] = "SLUG";
    /** Identify a media item by its source url */
    MediaItemIdType["SourceUrl"] = "SOURCE_URL";
    /** Identify a resource by the URI. */
    MediaItemIdType["Uri"] = "URI";
})(MediaItemIdType = exports.MediaItemIdType || (exports.MediaItemIdType = {}));
/** The Type of Identifier used to fetch a single node. Default is "ID". To be used along with the "id" field. */
var MenuNodeIdTypeEnum;
(function (MenuNodeIdTypeEnum) {
    /** Identify a menu node by the Database ID. */
    MenuNodeIdTypeEnum["DatabaseId"] = "DATABASE_ID";
    /** Identify a menu node by the (hashed) Global ID. */
    MenuNodeIdTypeEnum["Id"] = "ID";
    /** Identify a menu node by it's name */
    MenuNodeIdTypeEnum["Name"] = "NAME";
})(MenuNodeIdTypeEnum = exports.MenuNodeIdTypeEnum || (exports.MenuNodeIdTypeEnum = {}));
/** Registered menu locations */
var MenuLocationEnum;
(function (MenuLocationEnum) {
    /** Put the menu in the amp-footer-menu location */
    MenuLocationEnum["AmpFooterMenu"] = "AMP_FOOTER_MENU";
    /** Put the menu in the amp-menu location */
    MenuLocationEnum["AmpMenu"] = "AMP_MENU";
    /** Put the menu in the primary location */
    MenuLocationEnum["Primary"] = "PRIMARY";
})(MenuLocationEnum = exports.MenuLocationEnum || (exports.MenuLocationEnum = {}));
/** The Type of Identifier used to fetch a single node. Default is "ID". To be used along with the "id" field. */
var MenuItemNodeIdTypeEnum;
(function (MenuItemNodeIdTypeEnum) {
    /** Identify a resource by the Database ID. */
    MenuItemNodeIdTypeEnum["DatabaseId"] = "DATABASE_ID";
    /** Identify a resource by the (hashed) Global ID. */
    MenuItemNodeIdTypeEnum["Id"] = "ID";
})(MenuItemNodeIdTypeEnum = exports.MenuItemNodeIdTypeEnum || (exports.MenuItemNodeIdTypeEnum = {}));
/** The Type of Identifier used to fetch a single resource. Default is ID. */
var PageIdType;
(function (PageIdType) {
    /** Identify a resource by the Database ID. */
    PageIdType["DatabaseId"] = "DATABASE_ID";
    /** Identify a resource by the (hashed) Global ID. */
    PageIdType["Id"] = "ID";
    /** Identify a resource by the URI. */
    PageIdType["Uri"] = "URI";
})(PageIdType = exports.PageIdType || (exports.PageIdType = {}));
/** The Type of Identifier used to fetch a single resource. Default is ID. */
var PostIdType;
(function (PostIdType) {
    /** Identify a resource by the Database ID. */
    PostIdType["DatabaseId"] = "DATABASE_ID";
    /** Identify a resource by the (hashed) Global ID. */
    PostIdType["Id"] = "ID";
    /** Identify a resource by the slug. Available to non-hierarchcial Types where the slug is a unique identifier. */
    PostIdType["Slug"] = "SLUG";
    /** Identify a resource by the URI. */
    PostIdType["Uri"] = "URI";
})(PostIdType = exports.PostIdType || (exports.PostIdType = {}));
/** The Type of Identifier used to fetch a single resource. Default is ID. */
var PostFormatIdType;
(function (PostFormatIdType) {
    /** The Database ID for the node */
    PostFormatIdType["DatabaseId"] = "DATABASE_ID";
    /** The hashed Global ID */
    PostFormatIdType["Id"] = "ID";
    /** The name of the node */
    PostFormatIdType["Name"] = "NAME";
    /** Url friendly name of the node */
    PostFormatIdType["Slug"] = "SLUG";
    /** The URI for the node */
    PostFormatIdType["Uri"] = "URI";
})(PostFormatIdType = exports.PostFormatIdType || (exports.PostFormatIdType = {}));
/** The Type of Identifier used to fetch a single resource. Default is ID. */
var RecipeIdType;
(function (RecipeIdType) {
    /** Identify a resource by the Database ID. */
    RecipeIdType["DatabaseId"] = "DATABASE_ID";
    /** Identify a resource by the (hashed) Global ID. */
    RecipeIdType["Id"] = "ID";
    /** Identify a resource by the slug. Available to non-hierarchcial Types where the slug is a unique identifier. */
    RecipeIdType["Slug"] = "SLUG";
    /** Identify a resource by the URI. */
    RecipeIdType["Uri"] = "URI";
})(RecipeIdType = exports.RecipeIdType || (exports.RecipeIdType = {}));
/** The Type of Identifier used to fetch a single resource. Default is ID. */
var RecipeCourseIdType;
(function (RecipeCourseIdType) {
    /** The Database ID for the node */
    RecipeCourseIdType["DatabaseId"] = "DATABASE_ID";
    /** The hashed Global ID */
    RecipeCourseIdType["Id"] = "ID";
    /** The name of the node */
    RecipeCourseIdType["Name"] = "NAME";
    /** Url friendly name of the node */
    RecipeCourseIdType["Slug"] = "SLUG";
    /** The URI for the node */
    RecipeCourseIdType["Uri"] = "URI";
})(RecipeCourseIdType = exports.RecipeCourseIdType || (exports.RecipeCourseIdType = {}));
/** The Type of Identifier used to fetch a single resource. Default is ID. */
var RecipeCuisineIdType;
(function (RecipeCuisineIdType) {
    /** The Database ID for the node */
    RecipeCuisineIdType["DatabaseId"] = "DATABASE_ID";
    /** The hashed Global ID */
    RecipeCuisineIdType["Id"] = "ID";
    /** The name of the node */
    RecipeCuisineIdType["Name"] = "NAME";
    /** Url friendly name of the node */
    RecipeCuisineIdType["Slug"] = "SLUG";
    /** The URI for the node */
    RecipeCuisineIdType["Uri"] = "URI";
})(RecipeCuisineIdType = exports.RecipeCuisineIdType || (exports.RecipeCuisineIdType = {}));
/** The Type of Identifier used to fetch a single resource. Default is ID. */
var TagIdType;
(function (TagIdType) {
    /** The Database ID for the node */
    TagIdType["DatabaseId"] = "DATABASE_ID";
    /** The hashed Global ID */
    TagIdType["Id"] = "ID";
    /** The name of the node */
    TagIdType["Name"] = "NAME";
    /** Url friendly name of the node */
    TagIdType["Slug"] = "SLUG";
    /** The URI for the node */
    TagIdType["Uri"] = "URI";
})(TagIdType = exports.TagIdType || (exports.TagIdType = {}));
/** The Type of Identifier used to fetch a single Taxonomy node. To be used along with the "id" field. Default is "ID". */
var TaxonomyIdTypeEnum;
(function (TaxonomyIdTypeEnum) {
    /** The globally unique ID */
    TaxonomyIdTypeEnum["Id"] = "ID";
    /** The name of the taxonomy */
    TaxonomyIdTypeEnum["Name"] = "NAME";
})(TaxonomyIdTypeEnum = exports.TaxonomyIdTypeEnum || (exports.TaxonomyIdTypeEnum = {}));
/** The Type of Identifier used to fetch a single resource. Default is "ID". To be used along with the "id" field. */
var TermNodeIdTypeEnum;
(function (TermNodeIdTypeEnum) {
    /** The Database ID for the node */
    TermNodeIdTypeEnum["DatabaseId"] = "DATABASE_ID";
    /** The hashed Global ID */
    TermNodeIdTypeEnum["Id"] = "ID";
    /** The name of the node */
    TermNodeIdTypeEnum["Name"] = "NAME";
    /** Url friendly name of the node */
    TermNodeIdTypeEnum["Slug"] = "SLUG";
    /** The URI for the node */
    TermNodeIdTypeEnum["Uri"] = "URI";
})(TermNodeIdTypeEnum = exports.TermNodeIdTypeEnum || (exports.TermNodeIdTypeEnum = {}));
/** The Type of Identifier used to fetch a single User node. To be used along with the "id" field. Default is "ID". */
var UserNodeIdTypeEnum;
(function (UserNodeIdTypeEnum) {
    /** The Database ID for the node */
    UserNodeIdTypeEnum["DatabaseId"] = "DATABASE_ID";
    /** The Email of the User */
    UserNodeIdTypeEnum["Email"] = "EMAIL";
    /** The hashed Global ID */
    UserNodeIdTypeEnum["Id"] = "ID";
    /** The slug of the User */
    UserNodeIdTypeEnum["Slug"] = "SLUG";
    /** The URI for the node */
    UserNodeIdTypeEnum["Uri"] = "URI";
    /** The username the User uses to login with */
    UserNodeIdTypeEnum["Username"] = "USERNAME";
})(UserNodeIdTypeEnum = exports.UserNodeIdTypeEnum || (exports.UserNodeIdTypeEnum = {}));
/** Field to order the connection by */
var UsersConnectionOrderbyEnum;
(function (UsersConnectionOrderbyEnum) {
    /** Order by display name */
    UsersConnectionOrderbyEnum["DisplayName"] = "DISPLAY_NAME";
    /** Order by email address */
    UsersConnectionOrderbyEnum["Email"] = "EMAIL";
    /** Order by login */
    UsersConnectionOrderbyEnum["Login"] = "LOGIN";
    /** Preserve the login order given in the LOGIN_IN array */
    UsersConnectionOrderbyEnum["LoginIn"] = "LOGIN_IN";
    /** Order by nice name */
    UsersConnectionOrderbyEnum["NiceName"] = "NICE_NAME";
    /** Preserve the nice name order given in the NICE_NAME_IN array */
    UsersConnectionOrderbyEnum["NiceNameIn"] = "NICE_NAME_IN";
    /** Order by registration date */
    UsersConnectionOrderbyEnum["Registered"] = "REGISTERED";
    /** Order by URL */
    UsersConnectionOrderbyEnum["Url"] = "URL";
})(UsersConnectionOrderbyEnum = exports.UsersConnectionOrderbyEnum || (exports.UsersConnectionOrderbyEnum = {}));
/** Names of available user roles */
var UserRoleEnum;
(function (UserRoleEnum) {
    /** User role with specific capabilities */
    UserRoleEnum["Administrator"] = "ADMINISTRATOR";
    /** User role with specific capabilities */
    UserRoleEnum["Author"] = "AUTHOR";
    /** User role with specific capabilities */
    UserRoleEnum["Contributor"] = "CONTRIBUTOR";
    /** User role with specific capabilities */
    UserRoleEnum["Editor"] = "EDITOR";
    /** User role with specific capabilities */
    UserRoleEnum["RecipeEditor"] = "RECIPE_EDITOR";
    /** User role with specific capabilities */
    UserRoleEnum["Subscriber"] = "SUBSCRIBER";
    /** User role with specific capabilities */
    UserRoleEnum["WebDesigner"] = "WEB_DESIGNER";
})(UserRoleEnum = exports.UserRoleEnum || (exports.UserRoleEnum = {}));
/** Column used for searching for users. */
var UsersConnectionSearchColumnEnum;
(function (UsersConnectionSearchColumnEnum) {
    /** The user's email address. */
    UsersConnectionSearchColumnEnum["Email"] = "EMAIL";
    /** The globally unique ID. */
    UsersConnectionSearchColumnEnum["Id"] = "ID";
    /** The username the User uses to login with. */
    UsersConnectionSearchColumnEnum["Login"] = "LOGIN";
    /** A URL-friendly name for the user. The default is the user's username. */
    UsersConnectionSearchColumnEnum["Nicename"] = "NICENAME";
    /** The URL of the user\s website. */
    UsersConnectionSearchColumnEnum["Url"] = "URL";
})(UsersConnectionSearchColumnEnum = exports.UsersConnectionSearchColumnEnum || (exports.UsersConnectionSearchColumnEnum = {}));
/** The status of the media item object. */
var MediaItemStatusEnum;
(function (MediaItemStatusEnum) {
    /** Objects with the auto-draft status */
    MediaItemStatusEnum["AutoDraft"] = "AUTO_DRAFT";
    /** Objects with the inherit status */
    MediaItemStatusEnum["Inherit"] = "INHERIT";
    /** Objects with the private status */
    MediaItemStatusEnum["Private"] = "PRIVATE";
    /** Objects with the trash status */
    MediaItemStatusEnum["Trash"] = "TRASH";
})(MediaItemStatusEnum = exports.MediaItemStatusEnum || (exports.MediaItemStatusEnum = {}));
/** Available timezones */
var TimezoneEnum;
(function (TimezoneEnum) {
    /** Abidjan */
    TimezoneEnum["AfricaAbidjan"] = "AFRICA_ABIDJAN";
    /** Accra */
    TimezoneEnum["AfricaAccra"] = "AFRICA_ACCRA";
    /** Addis Ababa */
    TimezoneEnum["AfricaAddisAbaba"] = "AFRICA_ADDIS_ABABA";
    /** Algiers */
    TimezoneEnum["AfricaAlgiers"] = "AFRICA_ALGIERS";
    /** Asmara */
    TimezoneEnum["AfricaAsmara"] = "AFRICA_ASMARA";
    /** Bamako */
    TimezoneEnum["AfricaBamako"] = "AFRICA_BAMAKO";
    /** Bangui */
    TimezoneEnum["AfricaBangui"] = "AFRICA_BANGUI";
    /** Banjul */
    TimezoneEnum["AfricaBanjul"] = "AFRICA_BANJUL";
    /** Bissau */
    TimezoneEnum["AfricaBissau"] = "AFRICA_BISSAU";
    /** Blantyre */
    TimezoneEnum["AfricaBlantyre"] = "AFRICA_BLANTYRE";
    /** Brazzaville */
    TimezoneEnum["AfricaBrazzaville"] = "AFRICA_BRAZZAVILLE";
    /** Bujumbura */
    TimezoneEnum["AfricaBujumbura"] = "AFRICA_BUJUMBURA";
    /** Cairo */
    TimezoneEnum["AfricaCairo"] = "AFRICA_CAIRO";
    /** Casablanca */
    TimezoneEnum["AfricaCasablanca"] = "AFRICA_CASABLANCA";
    /** Ceuta */
    TimezoneEnum["AfricaCeuta"] = "AFRICA_CEUTA";
    /** Conakry */
    TimezoneEnum["AfricaConakry"] = "AFRICA_CONAKRY";
    /** Dakar */
    TimezoneEnum["AfricaDakar"] = "AFRICA_DAKAR";
    /** Dar es Salaam */
    TimezoneEnum["AfricaDarEsSalaam"] = "AFRICA_DAR_ES_SALAAM";
    /** Djibouti */
    TimezoneEnum["AfricaDjibouti"] = "AFRICA_DJIBOUTI";
    /** Douala */
    TimezoneEnum["AfricaDouala"] = "AFRICA_DOUALA";
    /** El Aaiun */
    TimezoneEnum["AfricaElAaiun"] = "AFRICA_EL_AAIUN";
    /** Freetown */
    TimezoneEnum["AfricaFreetown"] = "AFRICA_FREETOWN";
    /** Gaborone */
    TimezoneEnum["AfricaGaborone"] = "AFRICA_GABORONE";
    /** Harare */
    TimezoneEnum["AfricaHarare"] = "AFRICA_HARARE";
    /** Johannesburg */
    TimezoneEnum["AfricaJohannesburg"] = "AFRICA_JOHANNESBURG";
    /** Juba */
    TimezoneEnum["AfricaJuba"] = "AFRICA_JUBA";
    /** Kampala */
    TimezoneEnum["AfricaKampala"] = "AFRICA_KAMPALA";
    /** Khartoum */
    TimezoneEnum["AfricaKhartoum"] = "AFRICA_KHARTOUM";
    /** Kigali */
    TimezoneEnum["AfricaKigali"] = "AFRICA_KIGALI";
    /** Kinshasa */
    TimezoneEnum["AfricaKinshasa"] = "AFRICA_KINSHASA";
    /** Lagos */
    TimezoneEnum["AfricaLagos"] = "AFRICA_LAGOS";
    /** Libreville */
    TimezoneEnum["AfricaLibreville"] = "AFRICA_LIBREVILLE";
    /** Lome */
    TimezoneEnum["AfricaLome"] = "AFRICA_LOME";
    /** Luanda */
    TimezoneEnum["AfricaLuanda"] = "AFRICA_LUANDA";
    /** Lubumbashi */
    TimezoneEnum["AfricaLubumbashi"] = "AFRICA_LUBUMBASHI";
    /** Lusaka */
    TimezoneEnum["AfricaLusaka"] = "AFRICA_LUSAKA";
    /** Malabo */
    TimezoneEnum["AfricaMalabo"] = "AFRICA_MALABO";
    /** Maputo */
    TimezoneEnum["AfricaMaputo"] = "AFRICA_MAPUTO";
    /** Maseru */
    TimezoneEnum["AfricaMaseru"] = "AFRICA_MASERU";
    /** Mbabane */
    TimezoneEnum["AfricaMbabane"] = "AFRICA_MBABANE";
    /** Mogadishu */
    TimezoneEnum["AfricaMogadishu"] = "AFRICA_MOGADISHU";
    /** Monrovia */
    TimezoneEnum["AfricaMonrovia"] = "AFRICA_MONROVIA";
    /** Nairobi */
    TimezoneEnum["AfricaNairobi"] = "AFRICA_NAIROBI";
    /** Ndjamena */
    TimezoneEnum["AfricaNdjamena"] = "AFRICA_NDJAMENA";
    /** Niamey */
    TimezoneEnum["AfricaNiamey"] = "AFRICA_NIAMEY";
    /** Nouakchott */
    TimezoneEnum["AfricaNouakchott"] = "AFRICA_NOUAKCHOTT";
    /** Ouagadougou */
    TimezoneEnum["AfricaOuagadougou"] = "AFRICA_OUAGADOUGOU";
    /** Porto-Novo */
    TimezoneEnum["AfricaPortoNovo"] = "AFRICA_PORTO_NOVO";
    /** Sao Tome */
    TimezoneEnum["AfricaSaoTome"] = "AFRICA_SAO_TOME";
    /** Tripoli */
    TimezoneEnum["AfricaTripoli"] = "AFRICA_TRIPOLI";
    /** Tunis */
    TimezoneEnum["AfricaTunis"] = "AFRICA_TUNIS";
    /** Windhoek */
    TimezoneEnum["AfricaWindhoek"] = "AFRICA_WINDHOEK";
    /** Adak */
    TimezoneEnum["AmericaAdak"] = "AMERICA_ADAK";
    /** Anchorage */
    TimezoneEnum["AmericaAnchorage"] = "AMERICA_ANCHORAGE";
    /** Anguilla */
    TimezoneEnum["AmericaAnguilla"] = "AMERICA_ANGUILLA";
    /** Antigua */
    TimezoneEnum["AmericaAntigua"] = "AMERICA_ANTIGUA";
    /** Araguaina */
    TimezoneEnum["AmericaAraguaina"] = "AMERICA_ARAGUAINA";
    /** Argentina - Buenos Aires */
    TimezoneEnum["AmericaArgentinaBuenosAires"] = "AMERICA_ARGENTINA_BUENOS_AIRES";
    /** Argentina - Catamarca */
    TimezoneEnum["AmericaArgentinaCatamarca"] = "AMERICA_ARGENTINA_CATAMARCA";
    /** Argentina - Cordoba */
    TimezoneEnum["AmericaArgentinaCordoba"] = "AMERICA_ARGENTINA_CORDOBA";
    /** Argentina - Jujuy */
    TimezoneEnum["AmericaArgentinaJujuy"] = "AMERICA_ARGENTINA_JUJUY";
    /** Argentina - La Rioja */
    TimezoneEnum["AmericaArgentinaLaRioja"] = "AMERICA_ARGENTINA_LA_RIOJA";
    /** Argentina - Mendoza */
    TimezoneEnum["AmericaArgentinaMendoza"] = "AMERICA_ARGENTINA_MENDOZA";
    /** Argentina - Rio Gallegos */
    TimezoneEnum["AmericaArgentinaRioGallegos"] = "AMERICA_ARGENTINA_RIO_GALLEGOS";
    /** Argentina - Salta */
    TimezoneEnum["AmericaArgentinaSalta"] = "AMERICA_ARGENTINA_SALTA";
    /** Argentina - San Juan */
    TimezoneEnum["AmericaArgentinaSanJuan"] = "AMERICA_ARGENTINA_SAN_JUAN";
    /** Argentina - San Luis */
    TimezoneEnum["AmericaArgentinaSanLuis"] = "AMERICA_ARGENTINA_SAN_LUIS";
    /** Argentina - Tucuman */
    TimezoneEnum["AmericaArgentinaTucuman"] = "AMERICA_ARGENTINA_TUCUMAN";
    /** Argentina - Ushuaia */
    TimezoneEnum["AmericaArgentinaUshuaia"] = "AMERICA_ARGENTINA_USHUAIA";
    /** Aruba */
    TimezoneEnum["AmericaAruba"] = "AMERICA_ARUBA";
    /** Asuncion */
    TimezoneEnum["AmericaAsuncion"] = "AMERICA_ASUNCION";
    /** Atikokan */
    TimezoneEnum["AmericaAtikokan"] = "AMERICA_ATIKOKAN";
    /** Bahia */
    TimezoneEnum["AmericaBahia"] = "AMERICA_BAHIA";
    /** Bahia Banderas */
    TimezoneEnum["AmericaBahiaBanderas"] = "AMERICA_BAHIA_BANDERAS";
    /** Barbados */
    TimezoneEnum["AmericaBarbados"] = "AMERICA_BARBADOS";
    /** Belem */
    TimezoneEnum["AmericaBelem"] = "AMERICA_BELEM";
    /** Belize */
    TimezoneEnum["AmericaBelize"] = "AMERICA_BELIZE";
    /** Blanc-Sablon */
    TimezoneEnum["AmericaBlancSablon"] = "AMERICA_BLANC_SABLON";
    /** Boa Vista */
    TimezoneEnum["AmericaBoaVista"] = "AMERICA_BOA_VISTA";
    /** Bogota */
    TimezoneEnum["AmericaBogota"] = "AMERICA_BOGOTA";
    /** Boise */
    TimezoneEnum["AmericaBoise"] = "AMERICA_BOISE";
    /** Cambridge Bay */
    TimezoneEnum["AmericaCambridgeBay"] = "AMERICA_CAMBRIDGE_BAY";
    /** Campo Grande */
    TimezoneEnum["AmericaCampoGrande"] = "AMERICA_CAMPO_GRANDE";
    /** Cancun */
    TimezoneEnum["AmericaCancun"] = "AMERICA_CANCUN";
    /** Caracas */
    TimezoneEnum["AmericaCaracas"] = "AMERICA_CARACAS";
    /** Cayenne */
    TimezoneEnum["AmericaCayenne"] = "AMERICA_CAYENNE";
    /** Cayman */
    TimezoneEnum["AmericaCayman"] = "AMERICA_CAYMAN";
    /** Chicago */
    TimezoneEnum["AmericaChicago"] = "AMERICA_CHICAGO";
    /** Chihuahua */
    TimezoneEnum["AmericaChihuahua"] = "AMERICA_CHIHUAHUA";
    /** Costa Rica */
    TimezoneEnum["AmericaCostaRica"] = "AMERICA_COSTA_RICA";
    /** Creston */
    TimezoneEnum["AmericaCreston"] = "AMERICA_CRESTON";
    /** Cuiaba */
    TimezoneEnum["AmericaCuiaba"] = "AMERICA_CUIABA";
    /** Curacao */
    TimezoneEnum["AmericaCuracao"] = "AMERICA_CURACAO";
    /** Danmarkshavn */
    TimezoneEnum["AmericaDanmarkshavn"] = "AMERICA_DANMARKSHAVN";
    /** Dawson */
    TimezoneEnum["AmericaDawson"] = "AMERICA_DAWSON";
    /** Dawson Creek */
    TimezoneEnum["AmericaDawsonCreek"] = "AMERICA_DAWSON_CREEK";
    /** Denver */
    TimezoneEnum["AmericaDenver"] = "AMERICA_DENVER";
    /** Detroit */
    TimezoneEnum["AmericaDetroit"] = "AMERICA_DETROIT";
    /** Dominica */
    TimezoneEnum["AmericaDominica"] = "AMERICA_DOMINICA";
    /** Edmonton */
    TimezoneEnum["AmericaEdmonton"] = "AMERICA_EDMONTON";
    /** Eirunepe */
    TimezoneEnum["AmericaEirunepe"] = "AMERICA_EIRUNEPE";
    /** El Salvador */
    TimezoneEnum["AmericaElSalvador"] = "AMERICA_EL_SALVADOR";
    /** Fortaleza */
    TimezoneEnum["AmericaFortaleza"] = "AMERICA_FORTALEZA";
    /** Fort Nelson */
    TimezoneEnum["AmericaFortNelson"] = "AMERICA_FORT_NELSON";
    /** Glace Bay */
    TimezoneEnum["AmericaGlaceBay"] = "AMERICA_GLACE_BAY";
    /** Goose Bay */
    TimezoneEnum["AmericaGooseBay"] = "AMERICA_GOOSE_BAY";
    /** Grand Turk */
    TimezoneEnum["AmericaGrandTurk"] = "AMERICA_GRAND_TURK";
    /** Grenada */
    TimezoneEnum["AmericaGrenada"] = "AMERICA_GRENADA";
    /** Guadeloupe */
    TimezoneEnum["AmericaGuadeloupe"] = "AMERICA_GUADELOUPE";
    /** Guatemala */
    TimezoneEnum["AmericaGuatemala"] = "AMERICA_GUATEMALA";
    /** Guayaquil */
    TimezoneEnum["AmericaGuayaquil"] = "AMERICA_GUAYAQUIL";
    /** Guyana */
    TimezoneEnum["AmericaGuyana"] = "AMERICA_GUYANA";
    /** Halifax */
    TimezoneEnum["AmericaHalifax"] = "AMERICA_HALIFAX";
    /** Havana */
    TimezoneEnum["AmericaHavana"] = "AMERICA_HAVANA";
    /** Hermosillo */
    TimezoneEnum["AmericaHermosillo"] = "AMERICA_HERMOSILLO";
    /** Indiana - Indianapolis */
    TimezoneEnum["AmericaIndianaIndianapolis"] = "AMERICA_INDIANA_INDIANAPOLIS";
    /** Indiana - Knox */
    TimezoneEnum["AmericaIndianaKnox"] = "AMERICA_INDIANA_KNOX";
    /** Indiana - Marengo */
    TimezoneEnum["AmericaIndianaMarengo"] = "AMERICA_INDIANA_MARENGO";
    /** Indiana - Petersburg */
    TimezoneEnum["AmericaIndianaPetersburg"] = "AMERICA_INDIANA_PETERSBURG";
    /** Indiana - Tell City */
    TimezoneEnum["AmericaIndianaTellCity"] = "AMERICA_INDIANA_TELL_CITY";
    /** Indiana - Vevay */
    TimezoneEnum["AmericaIndianaVevay"] = "AMERICA_INDIANA_VEVAY";
    /** Indiana - Vincennes */
    TimezoneEnum["AmericaIndianaVincennes"] = "AMERICA_INDIANA_VINCENNES";
    /** Indiana - Winamac */
    TimezoneEnum["AmericaIndianaWinamac"] = "AMERICA_INDIANA_WINAMAC";
    /** Inuvik */
    TimezoneEnum["AmericaInuvik"] = "AMERICA_INUVIK";
    /** Iqaluit */
    TimezoneEnum["AmericaIqaluit"] = "AMERICA_IQALUIT";
    /** Jamaica */
    TimezoneEnum["AmericaJamaica"] = "AMERICA_JAMAICA";
    /** Juneau */
    TimezoneEnum["AmericaJuneau"] = "AMERICA_JUNEAU";
    /** Kentucky - Louisville */
    TimezoneEnum["AmericaKentuckyLouisville"] = "AMERICA_KENTUCKY_LOUISVILLE";
    /** Kentucky - Monticello */
    TimezoneEnum["AmericaKentuckyMonticello"] = "AMERICA_KENTUCKY_MONTICELLO";
    /** Kralendijk */
    TimezoneEnum["AmericaKralendijk"] = "AMERICA_KRALENDIJK";
    /** La Paz */
    TimezoneEnum["AmericaLaPaz"] = "AMERICA_LA_PAZ";
    /** Lima */
    TimezoneEnum["AmericaLima"] = "AMERICA_LIMA";
    /** Los Angeles */
    TimezoneEnum["AmericaLosAngeles"] = "AMERICA_LOS_ANGELES";
    /** Lower Princes */
    TimezoneEnum["AmericaLowerPrinces"] = "AMERICA_LOWER_PRINCES";
    /** Maceio */
    TimezoneEnum["AmericaMaceio"] = "AMERICA_MACEIO";
    /** Managua */
    TimezoneEnum["AmericaManagua"] = "AMERICA_MANAGUA";
    /** Manaus */
    TimezoneEnum["AmericaManaus"] = "AMERICA_MANAUS";
    /** Marigot */
    TimezoneEnum["AmericaMarigot"] = "AMERICA_MARIGOT";
    /** Martinique */
    TimezoneEnum["AmericaMartinique"] = "AMERICA_MARTINIQUE";
    /** Matamoros */
    TimezoneEnum["AmericaMatamoros"] = "AMERICA_MATAMOROS";
    /** Mazatlan */
    TimezoneEnum["AmericaMazatlan"] = "AMERICA_MAZATLAN";
    /** Menominee */
    TimezoneEnum["AmericaMenominee"] = "AMERICA_MENOMINEE";
    /** Merida */
    TimezoneEnum["AmericaMerida"] = "AMERICA_MERIDA";
    /** Metlakatla */
    TimezoneEnum["AmericaMetlakatla"] = "AMERICA_METLAKATLA";
    /** Mexico City */
    TimezoneEnum["AmericaMexicoCity"] = "AMERICA_MEXICO_CITY";
    /** Miquelon */
    TimezoneEnum["AmericaMiquelon"] = "AMERICA_MIQUELON";
    /** Moncton */
    TimezoneEnum["AmericaMoncton"] = "AMERICA_MONCTON";
    /** Monterrey */
    TimezoneEnum["AmericaMonterrey"] = "AMERICA_MONTERREY";
    /** Montevideo */
    TimezoneEnum["AmericaMontevideo"] = "AMERICA_MONTEVIDEO";
    /** Montserrat */
    TimezoneEnum["AmericaMontserrat"] = "AMERICA_MONTSERRAT";
    /** Nassau */
    TimezoneEnum["AmericaNassau"] = "AMERICA_NASSAU";
    /** New York */
    TimezoneEnum["AmericaNewYork"] = "AMERICA_NEW_YORK";
    /** Nipigon */
    TimezoneEnum["AmericaNipigon"] = "AMERICA_NIPIGON";
    /** Nome */
    TimezoneEnum["AmericaNome"] = "AMERICA_NOME";
    /** Noronha */
    TimezoneEnum["AmericaNoronha"] = "AMERICA_NORONHA";
    /** North Dakota - Beulah */
    TimezoneEnum["AmericaNorthDakotaBeulah"] = "AMERICA_NORTH_DAKOTA_BEULAH";
    /** North Dakota - Center */
    TimezoneEnum["AmericaNorthDakotaCenter"] = "AMERICA_NORTH_DAKOTA_CENTER";
    /** North Dakota - New Salem */
    TimezoneEnum["AmericaNorthDakotaNewSalem"] = "AMERICA_NORTH_DAKOTA_NEW_SALEM";
    /** Nuuk */
    TimezoneEnum["AmericaNuuk"] = "AMERICA_NUUK";
    /** Ojinaga */
    TimezoneEnum["AmericaOjinaga"] = "AMERICA_OJINAGA";
    /** Panama */
    TimezoneEnum["AmericaPanama"] = "AMERICA_PANAMA";
    /** Pangnirtung */
    TimezoneEnum["AmericaPangnirtung"] = "AMERICA_PANGNIRTUNG";
    /** Paramaribo */
    TimezoneEnum["AmericaParamaribo"] = "AMERICA_PARAMARIBO";
    /** Phoenix */
    TimezoneEnum["AmericaPhoenix"] = "AMERICA_PHOENIX";
    /** Porto Velho */
    TimezoneEnum["AmericaPortoVelho"] = "AMERICA_PORTO_VELHO";
    /** Port-au-Prince */
    TimezoneEnum["AmericaPortAuPrince"] = "AMERICA_PORT_AU_PRINCE";
    /** Port of Spain */
    TimezoneEnum["AmericaPortOfSpain"] = "AMERICA_PORT_OF_SPAIN";
    /** Puerto Rico */
    TimezoneEnum["AmericaPuertoRico"] = "AMERICA_PUERTO_RICO";
    /** Punta Arenas */
    TimezoneEnum["AmericaPuntaArenas"] = "AMERICA_PUNTA_ARENAS";
    /** Rainy River */
    TimezoneEnum["AmericaRainyRiver"] = "AMERICA_RAINY_RIVER";
    /** Rankin Inlet */
    TimezoneEnum["AmericaRankinInlet"] = "AMERICA_RANKIN_INLET";
    /** Recife */
    TimezoneEnum["AmericaRecife"] = "AMERICA_RECIFE";
    /** Regina */
    TimezoneEnum["AmericaRegina"] = "AMERICA_REGINA";
    /** Resolute */
    TimezoneEnum["AmericaResolute"] = "AMERICA_RESOLUTE";
    /** Rio Branco */
    TimezoneEnum["AmericaRioBranco"] = "AMERICA_RIO_BRANCO";
    /** Santarem */
    TimezoneEnum["AmericaSantarem"] = "AMERICA_SANTAREM";
    /** Santiago */
    TimezoneEnum["AmericaSantiago"] = "AMERICA_SANTIAGO";
    /** Santo Domingo */
    TimezoneEnum["AmericaSantoDomingo"] = "AMERICA_SANTO_DOMINGO";
    /** Sao Paulo */
    TimezoneEnum["AmericaSaoPaulo"] = "AMERICA_SAO_PAULO";
    /** Scoresbysund */
    TimezoneEnum["AmericaScoresbysund"] = "AMERICA_SCORESBYSUND";
    /** Sitka */
    TimezoneEnum["AmericaSitka"] = "AMERICA_SITKA";
    /** St Barthelemy */
    TimezoneEnum["AmericaStBarthelemy"] = "AMERICA_ST_BARTHELEMY";
    /** St Johns */
    TimezoneEnum["AmericaStJohns"] = "AMERICA_ST_JOHNS";
    /** St Kitts */
    TimezoneEnum["AmericaStKitts"] = "AMERICA_ST_KITTS";
    /** St Lucia */
    TimezoneEnum["AmericaStLucia"] = "AMERICA_ST_LUCIA";
    /** St Thomas */
    TimezoneEnum["AmericaStThomas"] = "AMERICA_ST_THOMAS";
    /** St Vincent */
    TimezoneEnum["AmericaStVincent"] = "AMERICA_ST_VINCENT";
    /** Swift Current */
    TimezoneEnum["AmericaSwiftCurrent"] = "AMERICA_SWIFT_CURRENT";
    /** Tegucigalpa */
    TimezoneEnum["AmericaTegucigalpa"] = "AMERICA_TEGUCIGALPA";
    /** Thule */
    TimezoneEnum["AmericaThule"] = "AMERICA_THULE";
    /** Thunder Bay */
    TimezoneEnum["AmericaThunderBay"] = "AMERICA_THUNDER_BAY";
    /** Tijuana */
    TimezoneEnum["AmericaTijuana"] = "AMERICA_TIJUANA";
    /** Toronto */
    TimezoneEnum["AmericaToronto"] = "AMERICA_TORONTO";
    /** Tortola */
    TimezoneEnum["AmericaTortola"] = "AMERICA_TORTOLA";
    /** Vancouver */
    TimezoneEnum["AmericaVancouver"] = "AMERICA_VANCOUVER";
    /** Whitehorse */
    TimezoneEnum["AmericaWhitehorse"] = "AMERICA_WHITEHORSE";
    /** Winnipeg */
    TimezoneEnum["AmericaWinnipeg"] = "AMERICA_WINNIPEG";
    /** Yakutat */
    TimezoneEnum["AmericaYakutat"] = "AMERICA_YAKUTAT";
    /** Yellowknife */
    TimezoneEnum["AmericaYellowknife"] = "AMERICA_YELLOWKNIFE";
    /** Casey */
    TimezoneEnum["AntarcticaCasey"] = "ANTARCTICA_CASEY";
    /** Davis */
    TimezoneEnum["AntarcticaDavis"] = "ANTARCTICA_DAVIS";
    /** DumontDUrville */
    TimezoneEnum["AntarcticaDumontdurville"] = "ANTARCTICA_DUMONTDURVILLE";
    /** Macquarie */
    TimezoneEnum["AntarcticaMacquarie"] = "ANTARCTICA_MACQUARIE";
    /** Mawson */
    TimezoneEnum["AntarcticaMawson"] = "ANTARCTICA_MAWSON";
    /** McMurdo */
    TimezoneEnum["AntarcticaMcmurdo"] = "ANTARCTICA_MCMURDO";
    /** Palmer */
    TimezoneEnum["AntarcticaPalmer"] = "ANTARCTICA_PALMER";
    /** Rothera */
    TimezoneEnum["AntarcticaRothera"] = "ANTARCTICA_ROTHERA";
    /** Syowa */
    TimezoneEnum["AntarcticaSyowa"] = "ANTARCTICA_SYOWA";
    /** Troll */
    TimezoneEnum["AntarcticaTroll"] = "ANTARCTICA_TROLL";
    /** Vostok */
    TimezoneEnum["AntarcticaVostok"] = "ANTARCTICA_VOSTOK";
    /** Longyearbyen */
    TimezoneEnum["ArcticLongyearbyen"] = "ARCTIC_LONGYEARBYEN";
    /** Aden */
    TimezoneEnum["AsiaAden"] = "ASIA_ADEN";
    /** Almaty */
    TimezoneEnum["AsiaAlmaty"] = "ASIA_ALMATY";
    /** Amman */
    TimezoneEnum["AsiaAmman"] = "ASIA_AMMAN";
    /** Anadyr */
    TimezoneEnum["AsiaAnadyr"] = "ASIA_ANADYR";
    /** Aqtau */
    TimezoneEnum["AsiaAqtau"] = "ASIA_AQTAU";
    /** Aqtobe */
    TimezoneEnum["AsiaAqtobe"] = "ASIA_AQTOBE";
    /** Ashgabat */
    TimezoneEnum["AsiaAshgabat"] = "ASIA_ASHGABAT";
    /** Atyrau */
    TimezoneEnum["AsiaAtyrau"] = "ASIA_ATYRAU";
    /** Baghdad */
    TimezoneEnum["AsiaBaghdad"] = "ASIA_BAGHDAD";
    /** Bahrain */
    TimezoneEnum["AsiaBahrain"] = "ASIA_BAHRAIN";
    /** Baku */
    TimezoneEnum["AsiaBaku"] = "ASIA_BAKU";
    /** Bangkok */
    TimezoneEnum["AsiaBangkok"] = "ASIA_BANGKOK";
    /** Barnaul */
    TimezoneEnum["AsiaBarnaul"] = "ASIA_BARNAUL";
    /** Beirut */
    TimezoneEnum["AsiaBeirut"] = "ASIA_BEIRUT";
    /** Bishkek */
    TimezoneEnum["AsiaBishkek"] = "ASIA_BISHKEK";
    /** Brunei */
    TimezoneEnum["AsiaBrunei"] = "ASIA_BRUNEI";
    /** Chita */
    TimezoneEnum["AsiaChita"] = "ASIA_CHITA";
    /** Choibalsan */
    TimezoneEnum["AsiaChoibalsan"] = "ASIA_CHOIBALSAN";
    /** Colombo */
    TimezoneEnum["AsiaColombo"] = "ASIA_COLOMBO";
    /** Damascus */
    TimezoneEnum["AsiaDamascus"] = "ASIA_DAMASCUS";
    /** Dhaka */
    TimezoneEnum["AsiaDhaka"] = "ASIA_DHAKA";
    /** Dili */
    TimezoneEnum["AsiaDili"] = "ASIA_DILI";
    /** Dubai */
    TimezoneEnum["AsiaDubai"] = "ASIA_DUBAI";
    /** Dushanbe */
    TimezoneEnum["AsiaDushanbe"] = "ASIA_DUSHANBE";
    /** Famagusta */
    TimezoneEnum["AsiaFamagusta"] = "ASIA_FAMAGUSTA";
    /** Gaza */
    TimezoneEnum["AsiaGaza"] = "ASIA_GAZA";
    /** Hebron */
    TimezoneEnum["AsiaHebron"] = "ASIA_HEBRON";
    /** Hong Kong */
    TimezoneEnum["AsiaHongKong"] = "ASIA_HONG_KONG";
    /** Hovd */
    TimezoneEnum["AsiaHovd"] = "ASIA_HOVD";
    /** Ho Chi Minh */
    TimezoneEnum["AsiaHoChiMinh"] = "ASIA_HO_CHI_MINH";
    /** Irkutsk */
    TimezoneEnum["AsiaIrkutsk"] = "ASIA_IRKUTSK";
    /** Jakarta */
    TimezoneEnum["AsiaJakarta"] = "ASIA_JAKARTA";
    /** Jayapura */
    TimezoneEnum["AsiaJayapura"] = "ASIA_JAYAPURA";
    /** Jerusalem */
    TimezoneEnum["AsiaJerusalem"] = "ASIA_JERUSALEM";
    /** Kabul */
    TimezoneEnum["AsiaKabul"] = "ASIA_KABUL";
    /** Kamchatka */
    TimezoneEnum["AsiaKamchatka"] = "ASIA_KAMCHATKA";
    /** Karachi */
    TimezoneEnum["AsiaKarachi"] = "ASIA_KARACHI";
    /** Kathmandu */
    TimezoneEnum["AsiaKathmandu"] = "ASIA_KATHMANDU";
    /** Khandyga */
    TimezoneEnum["AsiaKhandyga"] = "ASIA_KHANDYGA";
    /** Kolkata */
    TimezoneEnum["AsiaKolkata"] = "ASIA_KOLKATA";
    /** Krasnoyarsk */
    TimezoneEnum["AsiaKrasnoyarsk"] = "ASIA_KRASNOYARSK";
    /** Kuala Lumpur */
    TimezoneEnum["AsiaKualaLumpur"] = "ASIA_KUALA_LUMPUR";
    /** Kuching */
    TimezoneEnum["AsiaKuching"] = "ASIA_KUCHING";
    /** Kuwait */
    TimezoneEnum["AsiaKuwait"] = "ASIA_KUWAIT";
    /** Macau */
    TimezoneEnum["AsiaMacau"] = "ASIA_MACAU";
    /** Magadan */
    TimezoneEnum["AsiaMagadan"] = "ASIA_MAGADAN";
    /** Makassar */
    TimezoneEnum["AsiaMakassar"] = "ASIA_MAKASSAR";
    /** Manila */
    TimezoneEnum["AsiaManila"] = "ASIA_MANILA";
    /** Muscat */
    TimezoneEnum["AsiaMuscat"] = "ASIA_MUSCAT";
    /** Nicosia */
    TimezoneEnum["AsiaNicosia"] = "ASIA_NICOSIA";
    /** Novokuznetsk */
    TimezoneEnum["AsiaNovokuznetsk"] = "ASIA_NOVOKUZNETSK";
    /** Novosibirsk */
    TimezoneEnum["AsiaNovosibirsk"] = "ASIA_NOVOSIBIRSK";
    /** Omsk */
    TimezoneEnum["AsiaOmsk"] = "ASIA_OMSK";
    /** Oral */
    TimezoneEnum["AsiaOral"] = "ASIA_ORAL";
    /** Phnom Penh */
    TimezoneEnum["AsiaPhnomPenh"] = "ASIA_PHNOM_PENH";
    /** Pontianak */
    TimezoneEnum["AsiaPontianak"] = "ASIA_PONTIANAK";
    /** Pyongyang */
    TimezoneEnum["AsiaPyongyang"] = "ASIA_PYONGYANG";
    /** Qatar */
    TimezoneEnum["AsiaQatar"] = "ASIA_QATAR";
    /** Qostanay */
    TimezoneEnum["AsiaQostanay"] = "ASIA_QOSTANAY";
    /** Qyzylorda */
    TimezoneEnum["AsiaQyzylorda"] = "ASIA_QYZYLORDA";
    /** Riyadh */
    TimezoneEnum["AsiaRiyadh"] = "ASIA_RIYADH";
    /** Sakhalin */
    TimezoneEnum["AsiaSakhalin"] = "ASIA_SAKHALIN";
    /** Samarkand */
    TimezoneEnum["AsiaSamarkand"] = "ASIA_SAMARKAND";
    /** Seoul */
    TimezoneEnum["AsiaSeoul"] = "ASIA_SEOUL";
    /** Shanghai */
    TimezoneEnum["AsiaShanghai"] = "ASIA_SHANGHAI";
    /** Singapore */
    TimezoneEnum["AsiaSingapore"] = "ASIA_SINGAPORE";
    /** Srednekolymsk */
    TimezoneEnum["AsiaSrednekolymsk"] = "ASIA_SREDNEKOLYMSK";
    /** Taipei */
    TimezoneEnum["AsiaTaipei"] = "ASIA_TAIPEI";
    /** Tashkent */
    TimezoneEnum["AsiaTashkent"] = "ASIA_TASHKENT";
    /** Tbilisi */
    TimezoneEnum["AsiaTbilisi"] = "ASIA_TBILISI";
    /** Tehran */
    TimezoneEnum["AsiaTehran"] = "ASIA_TEHRAN";
    /** Thimphu */
    TimezoneEnum["AsiaThimphu"] = "ASIA_THIMPHU";
    /** Tokyo */
    TimezoneEnum["AsiaTokyo"] = "ASIA_TOKYO";
    /** Tomsk */
    TimezoneEnum["AsiaTomsk"] = "ASIA_TOMSK";
    /** Ulaanbaatar */
    TimezoneEnum["AsiaUlaanbaatar"] = "ASIA_ULAANBAATAR";
    /** Urumqi */
    TimezoneEnum["AsiaUrumqi"] = "ASIA_URUMQI";
    /** Ust-Nera */
    TimezoneEnum["AsiaUstNera"] = "ASIA_UST_NERA";
    /** Vientiane */
    TimezoneEnum["AsiaVientiane"] = "ASIA_VIENTIANE";
    /** Vladivostok */
    TimezoneEnum["AsiaVladivostok"] = "ASIA_VLADIVOSTOK";
    /** Yakutsk */
    TimezoneEnum["AsiaYakutsk"] = "ASIA_YAKUTSK";
    /** Yangon */
    TimezoneEnum["AsiaYangon"] = "ASIA_YANGON";
    /** Yekaterinburg */
    TimezoneEnum["AsiaYekaterinburg"] = "ASIA_YEKATERINBURG";
    /** Yerevan */
    TimezoneEnum["AsiaYerevan"] = "ASIA_YEREVAN";
    /** Azores */
    TimezoneEnum["AtlanticAzores"] = "ATLANTIC_AZORES";
    /** Bermuda */
    TimezoneEnum["AtlanticBermuda"] = "ATLANTIC_BERMUDA";
    /** Canary */
    TimezoneEnum["AtlanticCanary"] = "ATLANTIC_CANARY";
    /** Cape Verde */
    TimezoneEnum["AtlanticCapeVerde"] = "ATLANTIC_CAPE_VERDE";
    /** Faroe */
    TimezoneEnum["AtlanticFaroe"] = "ATLANTIC_FAROE";
    /** Madeira */
    TimezoneEnum["AtlanticMadeira"] = "ATLANTIC_MADEIRA";
    /** Reykjavik */
    TimezoneEnum["AtlanticReykjavik"] = "ATLANTIC_REYKJAVIK";
    /** South Georgia */
    TimezoneEnum["AtlanticSouthGeorgia"] = "ATLANTIC_SOUTH_GEORGIA";
    /** Stanley */
    TimezoneEnum["AtlanticStanley"] = "ATLANTIC_STANLEY";
    /** St Helena */
    TimezoneEnum["AtlanticStHelena"] = "ATLANTIC_ST_HELENA";
    /** Adelaide */
    TimezoneEnum["AustraliaAdelaide"] = "AUSTRALIA_ADELAIDE";
    /** Brisbane */
    TimezoneEnum["AustraliaBrisbane"] = "AUSTRALIA_BRISBANE";
    /** Broken Hill */
    TimezoneEnum["AustraliaBrokenHill"] = "AUSTRALIA_BROKEN_HILL";
    /** Currie */
    TimezoneEnum["AustraliaCurrie"] = "AUSTRALIA_CURRIE";
    /** Darwin */
    TimezoneEnum["AustraliaDarwin"] = "AUSTRALIA_DARWIN";
    /** Eucla */
    TimezoneEnum["AustraliaEucla"] = "AUSTRALIA_EUCLA";
    /** Hobart */
    TimezoneEnum["AustraliaHobart"] = "AUSTRALIA_HOBART";
    /** Lindeman */
    TimezoneEnum["AustraliaLindeman"] = "AUSTRALIA_LINDEMAN";
    /** Lord Howe */
    TimezoneEnum["AustraliaLordHowe"] = "AUSTRALIA_LORD_HOWE";
    /** Melbourne */
    TimezoneEnum["AustraliaMelbourne"] = "AUSTRALIA_MELBOURNE";
    /** Perth */
    TimezoneEnum["AustraliaPerth"] = "AUSTRALIA_PERTH";
    /** Sydney */
    TimezoneEnum["AustraliaSydney"] = "AUSTRALIA_SYDNEY";
    /** Amsterdam */
    TimezoneEnum["EuropeAmsterdam"] = "EUROPE_AMSTERDAM";
    /** Andorra */
    TimezoneEnum["EuropeAndorra"] = "EUROPE_ANDORRA";
    /** Astrakhan */
    TimezoneEnum["EuropeAstrakhan"] = "EUROPE_ASTRAKHAN";
    /** Athens */
    TimezoneEnum["EuropeAthens"] = "EUROPE_ATHENS";
    /** Belgrade */
    TimezoneEnum["EuropeBelgrade"] = "EUROPE_BELGRADE";
    /** Berlin */
    TimezoneEnum["EuropeBerlin"] = "EUROPE_BERLIN";
    /** Bratislava */
    TimezoneEnum["EuropeBratislava"] = "EUROPE_BRATISLAVA";
    /** Brussels */
    TimezoneEnum["EuropeBrussels"] = "EUROPE_BRUSSELS";
    /** Bucharest */
    TimezoneEnum["EuropeBucharest"] = "EUROPE_BUCHAREST";
    /** Budapest */
    TimezoneEnum["EuropeBudapest"] = "EUROPE_BUDAPEST";
    /** Busingen */
    TimezoneEnum["EuropeBusingen"] = "EUROPE_BUSINGEN";
    /** Chisinau */
    TimezoneEnum["EuropeChisinau"] = "EUROPE_CHISINAU";
    /** Copenhagen */
    TimezoneEnum["EuropeCopenhagen"] = "EUROPE_COPENHAGEN";
    /** Dublin */
    TimezoneEnum["EuropeDublin"] = "EUROPE_DUBLIN";
    /** Gibraltar */
    TimezoneEnum["EuropeGibraltar"] = "EUROPE_GIBRALTAR";
    /** Guernsey */
    TimezoneEnum["EuropeGuernsey"] = "EUROPE_GUERNSEY";
    /** Helsinki */
    TimezoneEnum["EuropeHelsinki"] = "EUROPE_HELSINKI";
    /** Isle of Man */
    TimezoneEnum["EuropeIsleOfMan"] = "EUROPE_ISLE_OF_MAN";
    /** Istanbul */
    TimezoneEnum["EuropeIstanbul"] = "EUROPE_ISTANBUL";
    /** Jersey */
    TimezoneEnum["EuropeJersey"] = "EUROPE_JERSEY";
    /** Kaliningrad */
    TimezoneEnum["EuropeKaliningrad"] = "EUROPE_KALININGRAD";
    /** Kiev */
    TimezoneEnum["EuropeKiev"] = "EUROPE_KIEV";
    /** Kirov */
    TimezoneEnum["EuropeKirov"] = "EUROPE_KIROV";
    /** Lisbon */
    TimezoneEnum["EuropeLisbon"] = "EUROPE_LISBON";
    /** Ljubljana */
    TimezoneEnum["EuropeLjubljana"] = "EUROPE_LJUBLJANA";
    /** London */
    TimezoneEnum["EuropeLondon"] = "EUROPE_LONDON";
    /** Luxembourg */
    TimezoneEnum["EuropeLuxembourg"] = "EUROPE_LUXEMBOURG";
    /** Madrid */
    TimezoneEnum["EuropeMadrid"] = "EUROPE_MADRID";
    /** Malta */
    TimezoneEnum["EuropeMalta"] = "EUROPE_MALTA";
    /** Mariehamn */
    TimezoneEnum["EuropeMariehamn"] = "EUROPE_MARIEHAMN";
    /** Minsk */
    TimezoneEnum["EuropeMinsk"] = "EUROPE_MINSK";
    /** Monaco */
    TimezoneEnum["EuropeMonaco"] = "EUROPE_MONACO";
    /** Moscow */
    TimezoneEnum["EuropeMoscow"] = "EUROPE_MOSCOW";
    /** Oslo */
    TimezoneEnum["EuropeOslo"] = "EUROPE_OSLO";
    /** Paris */
    TimezoneEnum["EuropeParis"] = "EUROPE_PARIS";
    /** Podgorica */
    TimezoneEnum["EuropePodgorica"] = "EUROPE_PODGORICA";
    /** Prague */
    TimezoneEnum["EuropePrague"] = "EUROPE_PRAGUE";
    /** Riga */
    TimezoneEnum["EuropeRiga"] = "EUROPE_RIGA";
    /** Rome */
    TimezoneEnum["EuropeRome"] = "EUROPE_ROME";
    /** Samara */
    TimezoneEnum["EuropeSamara"] = "EUROPE_SAMARA";
    /** San Marino */
    TimezoneEnum["EuropeSanMarino"] = "EUROPE_SAN_MARINO";
    /** Sarajevo */
    TimezoneEnum["EuropeSarajevo"] = "EUROPE_SARAJEVO";
    /** Saratov */
    TimezoneEnum["EuropeSaratov"] = "EUROPE_SARATOV";
    /** Simferopol */
    TimezoneEnum["EuropeSimferopol"] = "EUROPE_SIMFEROPOL";
    /** Skopje */
    TimezoneEnum["EuropeSkopje"] = "EUROPE_SKOPJE";
    /** Sofia */
    TimezoneEnum["EuropeSofia"] = "EUROPE_SOFIA";
    /** Stockholm */
    TimezoneEnum["EuropeStockholm"] = "EUROPE_STOCKHOLM";
    /** Tallinn */
    TimezoneEnum["EuropeTallinn"] = "EUROPE_TALLINN";
    /** Tirane */
    TimezoneEnum["EuropeTirane"] = "EUROPE_TIRANE";
    /** Ulyanovsk */
    TimezoneEnum["EuropeUlyanovsk"] = "EUROPE_ULYANOVSK";
    /** Uzhgorod */
    TimezoneEnum["EuropeUzhgorod"] = "EUROPE_UZHGOROD";
    /** Vaduz */
    TimezoneEnum["EuropeVaduz"] = "EUROPE_VADUZ";
    /** Vatican */
    TimezoneEnum["EuropeVatican"] = "EUROPE_VATICAN";
    /** Vienna */
    TimezoneEnum["EuropeVienna"] = "EUROPE_VIENNA";
    /** Vilnius */
    TimezoneEnum["EuropeVilnius"] = "EUROPE_VILNIUS";
    /** Volgograd */
    TimezoneEnum["EuropeVolgograd"] = "EUROPE_VOLGOGRAD";
    /** Warsaw */
    TimezoneEnum["EuropeWarsaw"] = "EUROPE_WARSAW";
    /** Zagreb */
    TimezoneEnum["EuropeZagreb"] = "EUROPE_ZAGREB";
    /** Zaporozhye */
    TimezoneEnum["EuropeZaporozhye"] = "EUROPE_ZAPOROZHYE";
    /** Zurich */
    TimezoneEnum["EuropeZurich"] = "EUROPE_ZURICH";
    /** Antananarivo */
    TimezoneEnum["IndianAntananarivo"] = "INDIAN_ANTANANARIVO";
    /** Chagos */
    TimezoneEnum["IndianChagos"] = "INDIAN_CHAGOS";
    /** Christmas */
    TimezoneEnum["IndianChristmas"] = "INDIAN_CHRISTMAS";
    /** Cocos */
    TimezoneEnum["IndianCocos"] = "INDIAN_COCOS";
    /** Comoro */
    TimezoneEnum["IndianComoro"] = "INDIAN_COMORO";
    /** Kerguelen */
    TimezoneEnum["IndianKerguelen"] = "INDIAN_KERGUELEN";
    /** Mahe */
    TimezoneEnum["IndianMahe"] = "INDIAN_MAHE";
    /** Maldives */
    TimezoneEnum["IndianMaldives"] = "INDIAN_MALDIVES";
    /** Mauritius */
    TimezoneEnum["IndianMauritius"] = "INDIAN_MAURITIUS";
    /** Mayotte */
    TimezoneEnum["IndianMayotte"] = "INDIAN_MAYOTTE";
    /** Reunion */
    TimezoneEnum["IndianReunion"] = "INDIAN_REUNION";
    /** Apia */
    TimezoneEnum["PacificApia"] = "PACIFIC_APIA";
    /** Auckland */
    TimezoneEnum["PacificAuckland"] = "PACIFIC_AUCKLAND";
    /** Bougainville */
    TimezoneEnum["PacificBougainville"] = "PACIFIC_BOUGAINVILLE";
    /** Chatham */
    TimezoneEnum["PacificChatham"] = "PACIFIC_CHATHAM";
    /** Chuuk */
    TimezoneEnum["PacificChuuk"] = "PACIFIC_CHUUK";
    /** Easter */
    TimezoneEnum["PacificEaster"] = "PACIFIC_EASTER";
    /** Efate */
    TimezoneEnum["PacificEfate"] = "PACIFIC_EFATE";
    /** Enderbury */
    TimezoneEnum["PacificEnderbury"] = "PACIFIC_ENDERBURY";
    /** Fakaofo */
    TimezoneEnum["PacificFakaofo"] = "PACIFIC_FAKAOFO";
    /** Fiji */
    TimezoneEnum["PacificFiji"] = "PACIFIC_FIJI";
    /** Funafuti */
    TimezoneEnum["PacificFunafuti"] = "PACIFIC_FUNAFUTI";
    /** Galapagos */
    TimezoneEnum["PacificGalapagos"] = "PACIFIC_GALAPAGOS";
    /** Gambier */
    TimezoneEnum["PacificGambier"] = "PACIFIC_GAMBIER";
    /** Guadalcanal */
    TimezoneEnum["PacificGuadalcanal"] = "PACIFIC_GUADALCANAL";
    /** Guam */
    TimezoneEnum["PacificGuam"] = "PACIFIC_GUAM";
    /** Honolulu */
    TimezoneEnum["PacificHonolulu"] = "PACIFIC_HONOLULU";
    /** Kiritimati */
    TimezoneEnum["PacificKiritimati"] = "PACIFIC_KIRITIMATI";
    /** Kosrae */
    TimezoneEnum["PacificKosrae"] = "PACIFIC_KOSRAE";
    /** Kwajalein */
    TimezoneEnum["PacificKwajalein"] = "PACIFIC_KWAJALEIN";
    /** Majuro */
    TimezoneEnum["PacificMajuro"] = "PACIFIC_MAJURO";
    /** Marquesas */
    TimezoneEnum["PacificMarquesas"] = "PACIFIC_MARQUESAS";
    /** Midway */
    TimezoneEnum["PacificMidway"] = "PACIFIC_MIDWAY";
    /** Nauru */
    TimezoneEnum["PacificNauru"] = "PACIFIC_NAURU";
    /** Niue */
    TimezoneEnum["PacificNiue"] = "PACIFIC_NIUE";
    /** Norfolk */
    TimezoneEnum["PacificNorfolk"] = "PACIFIC_NORFOLK";
    /** Noumea */
    TimezoneEnum["PacificNoumea"] = "PACIFIC_NOUMEA";
    /** Pago Pago */
    TimezoneEnum["PacificPagoPago"] = "PACIFIC_PAGO_PAGO";
    /** Palau */
    TimezoneEnum["PacificPalau"] = "PACIFIC_PALAU";
    /** Pitcairn */
    TimezoneEnum["PacificPitcairn"] = "PACIFIC_PITCAIRN";
    /** Pohnpei */
    TimezoneEnum["PacificPohnpei"] = "PACIFIC_POHNPEI";
    /** Port Moresby */
    TimezoneEnum["PacificPortMoresby"] = "PACIFIC_PORT_MORESBY";
    /** Rarotonga */
    TimezoneEnum["PacificRarotonga"] = "PACIFIC_RAROTONGA";
    /** Saipan */
    TimezoneEnum["PacificSaipan"] = "PACIFIC_SAIPAN";
    /** Tahiti */
    TimezoneEnum["PacificTahiti"] = "PACIFIC_TAHITI";
    /** Tarawa */
    TimezoneEnum["PacificTarawa"] = "PACIFIC_TARAWA";
    /** Tongatapu */
    TimezoneEnum["PacificTongatapu"] = "PACIFIC_TONGATAPU";
    /** Wake */
    TimezoneEnum["PacificWake"] = "PACIFIC_WAKE";
    /** Wallis */
    TimezoneEnum["PacificWallis"] = "PACIFIC_WALLIS";
    /** UTC offset: UTC+0 */
    TimezoneEnum["Utc_0"] = "UTC_0";
    /** UTC offset: UTC+0:30 */
    TimezoneEnum["Utc_0_30"] = "UTC_0_30";
    /** UTC offset: UTC+1 */
    TimezoneEnum["Utc_1"] = "UTC_1";
    /** UTC offset: UTC+10 */
    TimezoneEnum["Utc_10"] = "UTC_10";
    /** UTC offset: UTC+10:30 */
    TimezoneEnum["Utc_10_30"] = "UTC_10_30";
    /** UTC offset: UTC+11 */
    TimezoneEnum["Utc_11"] = "UTC_11";
    /** UTC offset: UTC+11:30 */
    TimezoneEnum["Utc_11_30"] = "UTC_11_30";
    /** UTC offset: UTC+12 */
    TimezoneEnum["Utc_12"] = "UTC_12";
    /** UTC offset: UTC+12:45 */
    TimezoneEnum["Utc_12_45"] = "UTC_12_45";
    /** UTC offset: UTC+13 */
    TimezoneEnum["Utc_13"] = "UTC_13";
    /** UTC offset: UTC+13:45 */
    TimezoneEnum["Utc_13_45"] = "UTC_13_45";
    /** UTC offset: UTC+14 */
    TimezoneEnum["Utc_14"] = "UTC_14";
    /** UTC offset: UTC+1:30 */
    TimezoneEnum["Utc_1_30"] = "UTC_1_30";
    /** UTC offset: UTC+2 */
    TimezoneEnum["Utc_2"] = "UTC_2";
    /** UTC offset: UTC+2:30 */
    TimezoneEnum["Utc_2_30"] = "UTC_2_30";
    /** UTC offset: UTC+3 */
    TimezoneEnum["Utc_3"] = "UTC_3";
    /** UTC offset: UTC+3:30 */
    TimezoneEnum["Utc_3_30"] = "UTC_3_30";
    /** UTC offset: UTC+4 */
    TimezoneEnum["Utc_4"] = "UTC_4";
    /** UTC offset: UTC+4:30 */
    TimezoneEnum["Utc_4_30"] = "UTC_4_30";
    /** UTC offset: UTC+5 */
    TimezoneEnum["Utc_5"] = "UTC_5";
    /** UTC offset: UTC+5:30 */
    TimezoneEnum["Utc_5_30"] = "UTC_5_30";
    /** UTC offset: UTC+5:45 */
    TimezoneEnum["Utc_5_45"] = "UTC_5_45";
    /** UTC offset: UTC+6 */
    TimezoneEnum["Utc_6"] = "UTC_6";
    /** UTC offset: UTC+6:30 */
    TimezoneEnum["Utc_6_30"] = "UTC_6_30";
    /** UTC offset: UTC+7 */
    TimezoneEnum["Utc_7"] = "UTC_7";
    /** UTC offset: UTC+7:30 */
    TimezoneEnum["Utc_7_30"] = "UTC_7_30";
    /** UTC offset: UTC+8 */
    TimezoneEnum["Utc_8"] = "UTC_8";
    /** UTC offset: UTC+8:30 */
    TimezoneEnum["Utc_8_30"] = "UTC_8_30";
    /** UTC offset: UTC+8:45 */
    TimezoneEnum["Utc_8_45"] = "UTC_8_45";
    /** UTC offset: UTC+9 */
    TimezoneEnum["Utc_9"] = "UTC_9";
    /** UTC offset: UTC+9:30 */
    TimezoneEnum["Utc_9_30"] = "UTC_9_30";
})(TimezoneEnum = exports.TimezoneEnum || (exports.TimezoneEnum = {}));
