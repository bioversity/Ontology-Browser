/**
 * 
 * Define a new constant
 * 
 * @param String name
 * @param String value
 */
function define (name, value) {
    // Define a new constant
    //
    // version: 903.3016
    // discuss at: http://phpjs.org/functions/define    // +      original by: Paulo Freitas
    // +       revised by: Andrea Giammarchi (http://webreflection.blogspot.com)
    // + reimplemented by: Brett Zamir (http://brett-zamir.me)
    // *        example 1: define('IMAGINARY_CONSTANT1', 'imaginary_value1');
    // *        results 1: IMAGINARY_CONSTANT1 == 'imaginary_value1'    var defn, replace, script, that = this,
        d = this.window.document;
    var toString = function (name, value) {
        return 'const ' + name + '=' + (/^(null|true|false|(\+|\-)?\d+(\.\d+)?)$/.test(value = String(value)) ? value : '"' + replace(value) + '"');
    };    try {
        eval('const e=1');
        replace = function (value) {
            var replace = {
                "\x08": "b",                "\x0A": "\\n",
                "\x0B": "v",
                "\x0C": "f",
                "\x0D": "\\r",
                '"': '"',                "\\": "\\"
            };
            return value.replace(/\x08|[\x0A-\x0D]|"|\\/g, function (value) {
                return "\\" + replace[value];
            });        };
        defn = function (name, value) {
            if (d.createElementNS) {
                script = d.createElementNS('http://www.w3.org/1999/xhtml', 'script');
            } else {                script = d.createElement('script');
            }
            script.type = 'text/javascript';
            script.appendChild(d.createTextNode(toString(name, value)));
            d.documentElement.appendChild(script);            d.documentElement.removeChild(script);
        };
    } catch (e) {
        replace = function (value) {
            var replace = {                "\x0A": "\\n",
                "\x0D": "\\r"
            };
            return value.replace(/"/g, '""').replace(/\n|\r/g, function (value) {
                return replace[value];            });
        };
        defn = (this.execScript ?
        function (name, value) {
            that.execScript(toString(name, value), 'VBScript');        } : function (name, value) {
            eval(toString(name, value).substring(6));
        });
    }
    defn(name, value);
 }
 
	/*=======================================================================================
	 *	DATABASE 																			*
	 *======================================================================================*/
	/**
	 * Default database URL
	 * 
	 * This value defines the default database URL
	 */
	define("CROPONTOLOGY_URL", "http://localhost/newwrapper/WarehouseWrapper.php");

	/**
	 * Default database name.
	 *
	 * This value defines the default database name for the current application.
	 */
	define( "kDEFAULT_DATABASE",		"WAREHOUSE" );
	
	/**
	 * Default container name.
	 * 
	 * This value defines the defautl container name for the current application.
	 */
	define(	"kDEFAULT_CONTAINER",		"TERMS");
	


	/*=======================================================================================
	 *	QUERY OPERATORS																		*
	 *======================================================================================*/
	/**
	 * Disabled.
	 *
	 * This enumeration represents a disabled operator.
	 */
	define( "kOPERATOR_DISABLED",			'$NO' );			// Disabled.
	
	/**
	 * Equal.
	 *
	 * This enumeration represents equality.
	 */
	define( "kOPERATOR_EQUAL",				'$EQ' );			// Equals.
	
	/**
	 * Not equal.
	 *
	 * This enumeration represents inequality.
	 */
	define( "kOPERATOR_EQUAL_NOT",			'$NE' );			// Not equal.
	
	/**
	 * Like.
	 *
	 * This enumeration represents case and accent matching (for strings).
	 */
	define( "kOPERATOR_LIKE",				'$AS' );			// Like.
	
	/**
	 * Not like.
	 *
	 * This enumeration represents case and accent non matching (for strings).
	 */
	define( "kOPERATOR_LIKE_NOT",			'$NS' );			// Not like.
	
	/**
	 * Prefix.
	 *
	 * This enumeration represents prefix comparaison: <i>starts with</i> (for strings).
	 */
	define( "kOPERATOR_PREFIX",				'$PX' );			// Starts with.
	
	/**
	 * Prefix case-insensitive.
	 *
	 * This enumeration represents prefix comparaison: <i>starts with</i> (for strings) with
	 * case and accent insensitive matching.
	 */
	define( "kOPERATOR_PREFIX_NOCASE",		'$PXi' );			// Starts with no-case.
	
	/**
	 * Contains.
	 *
	 * This enumeration represents content comparaison: <i>contains</i> (for strings).
	 */
	define( "kOPERATOR_CONTAINS",			'$CX' );			// Contains.
	
	/**
	 * Contains case-insensitive.
	 *
	 * This enumeration represents content comparaison: <i>contains</i> (for strings) with
	 * case and accent insensitive matching.
	 */
	define( "kOPERATOR_CONTAINS_NOCASE",	'$CXi' );			// Contains with no-case.
	
	/**
	 * Suffix.
	 *
	 * This enumeration represents suffix comparaison: <i>ends with</i> (for strings).
	 */
	define( "kOPERATOR_SUFFIX",				'$SX' );			// Ends with.
	
	/**
	 * Suffix case-insensitive.
	 *
	 * This enumeration represents suffix comparaison: <i>ends with</i> (for strings) with
	 * case and accent insensitive matching.
	 */
	define( "kOPERATOR_SUFFIX_NOCASE",		'$SXi' );			// Ends with with no-case.
	
	/**
	 * Regular expression.
	 *
	 * This enumeration represents a regular expression (for strings).
	 */
	define( "kOPERATOR_REGEX",				'$RE' );			// Regular expression.
	
	/**
	 * Smaller.
	 *
	 * This enumeration represents less than.
	 */
	define( "kOPERATOR_LESS",				'$LT' );			// Less than.
	
	/**
	 * Smaller or equal.
	 *
	 * This enumeration represents less than or equal.
	 */
	define( "kOPERATOR_LESS_EQUAL",			'$LE' );			// Less than or equal.
	
	/**
	 * Greater.
	 *
	 * This enumeration represents greater than.
	 */
	define( "kOPERATOR_GREAT",				'$GT' );			// Greater than.
	
	/**
	 * Greater or equal.
	 *
	 * This enumeration represents greater than or equal.
	 */
	define( "kOPERATOR_GREAT_EQUAL",		'$GE' );			// Greater than or equal.
	
	/**
	 * Range inclusive.
	 *
	 * This enumeration represents a range including limits.
	 */
	define( "kOPERATOR_IRANGE",				'$IRG' );			// Range inclusive.
	
	/**
	 * Range exclusive.
	 *
	 * This enumeration represents a range excluding limits.
	 */
	define( "kOPERATOR_ERANGE",				'$ERG' );			// Range exclusive.
	
	/**
	 * Empty or null.
	 *
	 * This enumeration represents empty or null.
	 */
	define( "kOPERATOR_NULL",				'$NU' );			// Empty or null.
	
	/**
	 * Not empty or null.
	 *
	 * This enumeration represents not empty or null.
	 */
	define( "kOPERATOR_NOT_NULL",			'$NN' );			// Not empty or null.
	
	/**
	 * Belongs to.
	 *
	 * This enumeration matches the value to a list of options.
	 */
	define( "kOPERATOR_IN",					'$IN' );			// Belongs to.
	
	/**
	 * Does not belong to.
	 *
	 * This enumeration excludes values that match a list of options.
	 */
	define( "kOPERATOR_NI",					'$NI' );			// Does not belong to.
	
	/**
	 * All.
	 *
	 * This enumeration matches a list of values to all elements of a list of options.
	 */
	define( "kOPERATOR_ALL",				'$AL' );			// All.
	
	/**
	 * Not all.
	 *
	 * This enumeration is the negation of the match {@link kOPERATOR_ALL all} operator.
	 */
	define( "kOPERATOR_NALL",				'$NAL' );			// Not all.
	
	/**
	 * Expression.
	 *
	 * This enumeration qualifies expression terms.
	 */
	define( "kOPERATOR_EX",					'$EX' );			// Expression.
	
	/*=======================================================================================
	 *	BOOLEAN OPERATORS																	*
	 *======================================================================================*/
	
	/**
	 * AND.
	 *
	 * This value represents the AND (A && B) operator.
	 */
	define( "kOPERATOR_AND",				'$AND' );
	
	/**
	 * Not AND.
	 *
	 * This value represents the not AND (NOT(A && B)) operator.
	 */
	define( "kOPERATOR_NAND",				'$NAND' );
	
	/**
	 * OR.
	 *
	 * This value represents the OR (A || B) operator.
	 */
	define( "kOPERATOR_OR",					'$OR' );
	
	/**
	 * Not OR.
	 *
	 * This value represents the not OR (NOT(A || B)) operator.
	 */
	define( "kOPERATOR_NOR",				'$NOR' );


	/*=======================================================================================
	 *	PRIMITIVE DATA TYPE ENUMERATIONS													*
	 *======================================================================================*/
	
	/**
	 * String type.
	 *
	 * This tag represents the primitive string data type.
	 */
	define( "kTYPE_STRING",						':STR' );				// String.
	
	/**
	 * 32 bit signed integer type.
	 *
	 * This value represents the primitive 32 bit signed integer data type.
	 *
	 * This data type is serialised as foillows:
	 *
	 * <ul>
	 *	<li><i>{@link kTAG_TYPE kTAG_TYPE}</i>: Will contain this constant.
	 *	<li><i>{@link kTAG_DATA kTAG_DATA}</i>: Will contain the string representation of the
	 *		integer.
	 * </ul>
	 */
	define( "kTYPE_INT32",						':INT32' );				// 32 bit integer.
	
	/**
	 * 64 bit signed integer type.
	 *
	 * This value represents the primitive 64 bit signed integer data type.
	 *
	 * This data type is serialised as foillows:
	 *
	 * <ul>
	 *	<li><i>{@link kTAG_TYPE kTAG_TYPE}</i>: Will contain this constant.
	 *	<li><i>{@link kTAG_DATA kTAG_DATA}</i>: Will contain the string representation of the
	 *		integer.
	 * </ul>
	 */
	define( "kTYPE_INT64",						':INT64' );				// 64 bit integer.
	
	/**
	 * Float type.
	 *
	 * This value represents the primitive floating point data type.
	 */
	define( "kTYPE_FLOAT",						':FLOAT' );				// Float.
	
	/**
	 * Boolean type.
	 *
	 * This value represents the primitive boolean data type, it is assumed that it is provided
	 * as (y/n; Yes/No; 1/0; TRUE/FALSE) and will be converted to 1/0.
	 */
	define( "kTYPE_BOOLEAN",					':BOOL' );				// Boolean.
	
	/*=======================================================================================
	 *	COMPOSITE DATA TYPE ENUMERATIONS													*
	 *======================================================================================*/
	
	/**
	 * Binary type.
	 *
	 * This value represents a binary string data type, it is generally expressed as an instance
	 * of the {@link CDataTypeBinary CDataTypeBinary} class.
	 */
	define( "kTYPE_BINARY",						':BIN' );				// Binary.
	
	/**
	 * Date type.
	 *
	 * This value represents a date represented as a <i>YYYYMMDD</i> string in which missing
	 * elements should be omitted. This means that if we don't know the day we can express that
	 * date as <i>YYYYMM</i>.
	 */
	define( "kTYPE_DATE",						':DATE' );				// Date.
	
	/**
	 * Time type.
	 *
	 * This value represents a time represented as a <i>YYYY-MM-DD HH:MM:SS</i> string in which
	 * you may not have missing elements.
	 */
	define( "kTYPE_TIME",						':TIME' );				// Time.
	
	/**
	 * Regular expression type.
	 *
	 * This tag defines a regular expression string type, it is generally expressed as an
	 * instance of the {@link CDataTypeRegex CDataTypeRegex} class.
	 */
	define( "kTYPE_REGEX",						':RGEX' );				// Regular expression.
	
	/*=======================================================================================
	 *	STRUCTURED DATA TYPE ENUMERATIONS													*
	 *======================================================================================*/
	
	/**
	 * Object reference type.
	 *
	 * This data type should be used as object references, it is generally expressed as a
	 * structure composed of the following elements:
	 *
	 * <ul>
	 *	<li><i>{@link kTAG_REFERENCE_ID kTAG_REFERENCE_ID}</i>: Object
	 *		{@link kTAG_LID local} unique identifier. This value may be used as a scalar in
	 *		cases in which the location of the object is univoque.
	 *	<li><i>{@link kTAG_REFERENCE_CONTAINER kTAG_REFERENCE_CONTAINER}</i>: Object container,
	 *		reference to the container in which the object is stored. This component will be
	 *		used in cases in which the container of the object is not univoque.
	 *	<li><i>{@link kTAG_REFERENCE_DATABASE kTAG_REFERENCE_DATABASE}</i>: Database container,
	 *		reference to the database or container superclass in which the object is stored.
	 *		This component will be used in cases in which the database of the object is not
	 *		univoque.
	 * </ul>
	 */
	define( "kTYPE_REF",						':REF' );				// Timestamp.
	
	/**
	 * Timestamp type.
	 *
	 * This data type should be used for native time-stamps, it is generally expressed as an
	 * instance of the {@link CDataTypeStamp CDataTypeStamp} class.
	 */
	define( "kTYPE_STAMP",						':STAMP' );				// Timestamp.
	
	/**
	 * Enumeration type.
	 *
	 * This value represents the enumeration data type, it represents an enumeration element or
	 * container.
	 *
	 * Enumerations represent a vocabulary from which one value must be chosen.
	 */
	define( "kTYPE_ENUM",						':ENUM' );				// Enumeration.
	
	/**
	 * Set type.
	 *
	 * This value represents the enumerated set data type, it represents an enumerated set
	 * element or container.
	 *
	 * Sets represent a vocabulary from which one or more value must be chosen.
	 */
	define( "kTYPE_ENUM_SET",					':SET' );				// Set.
	
	/*=======================================================================================
	 *	SUB-OBJECT TYPES																	*
	 *======================================================================================*/
	
	/**
	 * Seconds.
	 *
	 * This tag defines the number of seconds since January 1st, 1970.
	 */
	define( "kTYPE_STAMP_SEC",					'sec' );
	
	/**
	 * Microseconds.
	 *
	 * This tag defines microseconds.
	 */
	define( "kTYPE_STAMP_USEC",					'usec' );
	
	/**
	 * Binary string.
	 *
	 * This tag defines a binary string.
	 */
	define( "kTYPE_BINARY_STRING",				'bin' );
	
	/**
	 * Binary string type.
	 *
	 * This tag defines a binary string type (integer):
	 *
	 * <ul>
	 *	<li><i>1</i>: Function.
	 *	<li><i>2</i>: Byte array (use as default).
	 *	<li><i>3</i>: UUID.
	 *	<li><i>5</i>: MD5.
	 *	<li><i>128</i>: Custom.
	 * </ul>
	 */
	define( "kTYPE_BINARY_TYPE",				'type' );
	
	/*=======================================================================================
	 *	DATA FORMAT ENUMERATIONS															*
	 *======================================================================================*/
	
	/**
	 * PHP type.
	 *
	 * This value represents the primitive PHP data type, it is an PHP serialised object string.
	 */
	define( "kTYPE_PHP",						':PHP' );				// PHP.
	
	/**
	 * JSON type.
	 *
	 * This value represents the primitive JSON data type, it is an JSON encoded string.
	 */
	define( "kTYPE_JSON",						':JSON' );				// JSON.
	
	/**
	 * XML type.
	 *
	 * This value represents the primitive XML data type, it is an XML encoded string.
	 */
	define( "kTYPE_XML",						':XML' );				// XML.
	
	/**
	 * HTML type.
	 *
	 * This value represents the primitive HTML data type, it is an HTML encoded string.
	 */
	define( "kTYPE_HTML",						':HTML' );				// HTML.
	
	/**
	 * CSV type.
	 *
	 * This value represents the primitive comma separated data type, it is an CSV encoded
	 * string.
	 */
	define( "kTYPE_CSV",						':CSV' );				// CSV.
	
	/**
	 * SVG type.
	 *
	 * This value represents the SVG image data type, it is generally expressed in XML.
	 */
	define( "kTYPE_SVG",						':SVG' );				// SVG.
	
	/**
	 * PNG type.
	 *
	 * This value represents the PNG image data type, it is generally expressed in hexadecimal.
	 */
	define( "kTYPE_PNG",						':PNG' );				// PNG.
	
	/**
	 * META type.
	 *
	 * This value represents the primitive meta data type, it is a generalised metadata type.
	 */
	define( "kTYPE_META",						':META' );				// META.
	
	/*=======================================================================================
	 *	REFERENCE TYPES																		*
	 *======================================================================================*/
	
	/**
	 * Exact reference.
	 *
	 * This is the tag that represents an exact reference.
	 */
	define( "kTYPE_EXACT",						':EXACT' );
	
	/**
	 * Broad reference.
	 *
	 * This is the tag that represents a broad reference.
	 */
	define( "kTYPE_BROAD",						':BROAD' );
	
	/**
	 * Narrow reference.
	 *
	 * This is the tag that represents a narrow reference.
	 */
	define( "kTYPE_NARROW",						':NARROW' );
	
	/**
	 * Related reference.
	 *
	 * This is the tag that represents a related reference.
	 */
	define( "kTYPE_RELATED",					':RELATED' );
	
	/*=======================================================================================
	 *	TERM OR ONTOLOGY GRAPH NODE TYPES													*
	 *======================================================================================*/
	
	/**
	 * Root.
	 *
	 * This is the tag that represents a root term or node.
	 */
	define( "kTYPE_ROOT",						':ROOT' );
	
	/**
	 * Namespace.
	 *
	 * This is the tag that represents a namespace.
	 */
	define( "kTYPE_NAMESPACE",					':NAMESPACE' );
	
	/**
	 * Attribute.
	 *
	 * This is the tag that represents an attribute.
	 */
	define( "kTYPE_ATTRIBUTE",					':ATTRIBUTE' );
	
	/**
	 * Predicate.
	 *
	 * This is the tag that represents a predicate.
	 */
	define( "kTYPE_PREDICATE",					':PREDICATE' );
	
	/**
	 * Trait.
	 *
	 * This is the tag that represents a generic trait.
	 */
	define( "kTYPE_TRAIT",						':TRAIT' );
	
	/**
	 * Method.
	 *
	 * This is the tag that represents a generic method.
	 */
	define( "kTYPE_METHOD",						':METHOD' );
	
	/**
	 * Measure.
	 *
	 * This is the tag that represents a measure term.
	 */
	define( "kTYPE_MEASURE",					':MEASURE' );
	
	/**
	 * Enumeration.
	 *
	 * This is the tag that represents an enumeration term.
	 */
	define( "kTYPE_ENUMERATION",				':ENUMERATION' );
	
	/*=======================================================================================
	 *	MONGODB DATA TYPES																	*
	 *======================================================================================*/
	
	/**
	 * MongoId.
	 *
	 * This value represents the MongoId object data type, when serialised it will have the
	 * following structure:
	 *
	 * <ul>
	 *	<li><i>{@link kTAG_TYPE kTAG_TYPE}</i>: Will contain this constant.
	 *	<li><i>{@link kTAG_DATA kTAG_DATA}</i>: Will contain the HEX string ID.
	 * </ul>
	 */
	define( "kTYPE_MongoId",					':MongoId' );			// MongoId.
	
	/**
	 * MongoCode.
	 *
	 * This value represents the MongoCode object data type, when serialised it will have the
	 * following structure:
	 *
	 * <ul>
	 *	<li><i>{@link kTAG_TYPE kTAG_TYPE}</i>: Will contain this constant.
	 *	<li><i>{@link kTAG_DATA kTAG_DATA}</i>: Will contain the following structure:
	 *	 <ul>
	 *		<li><i>code</i>: The javascript code string.
	 *		<li><i>scope</i>: The list of key/value pairs.
	 *	 </ul>
	 * </ul>
	 */
	define( "kTYPE_MongoCode",					':MongoCode' );		// MongoCode.
	

	/*=======================================================================================
	 *	DEFAULT OPERATION ENUMERATIONS														*
	 *======================================================================================*/
	
	/**
	 * COUNT web-service.
	 *
	 * This is the tag that represents the COUNT web-service operation, used to return the
	 * total number of elements satisfying a query.
	 */
	define( "kAPI_OP_COUNT",			'@COUNT' );
	
	/**
	 * MATCH web-service.
	 *
	 * This is the tag that represents the MATCH web-service operation, used to retrieve objects
	 * based on a list of possible matches.
	 */
	define( "kAPI_OP_MATCH",			'@MATCH' );
	
	/**
	 * GET web-service.
	 *
	 * This is the tag that represents the GET web-service operation, used to retrieve objects
	 * from the data store.
	 */
	define( "kAPI_OP_GET",				'@GET' );
	
	/**
	 * SET web-service.
	 *
	 * This is the tag that represents the SET web-service operation, used to insert or update
	 * objects in the data store.
	 */
	define( "kAPI_OP_SET",				'@SET' );
	
	/**
	 * UPDATE web-service.
	 *
	 * This is the tag that represents the UPDATE web-service operation, used to update existing
	 * objects in the data store.
	 *
	 * This option implies that the object already exists, or the operation should fail.
	 */
	define( "kAPI_OP_UPDATE",			'@UPDATE' );
	
	/**
	 * INSERT web-service.
	 *
	 * This is the tag that represents the INSERT web-service operation, used to insert new
	 * objects in the data store.
	 *
	 * This option implies that the object does not exists, or the operation should fail.
	 */
	define( "kAPI_OP_INSERT",			'@INSERT' );
	
	/**
	 * BATCH-INSERT web-service.
	 *
	 * This service is equivalent to the {@link kAPI_OP_INSERT kAPI_OP_INSERT} command, except
	 * that in this case you provide a list ov objects to insert.
	 *
	 * This option implies that the objects do not exists, or the operation should fail.
	 */
	define( "kAPI_OP_BATCH_INSERT",		'@BINSERT' );
	
	/**
	 * MODIFY web-service.
	 *
	 * This is the tag that represents the MODIFY web-service operation, used to modify partial
	 * contents of objects in the data store.
	 *
	 * This option implies that the object already exists, or the operation should fail.
	 */
	define( "kAPI_OP_MODIFY",			'@MODIFY' );
	
	/**
	 * DELETE web-service.
	 *
	 * This is the tag that represents the DELETE web-service operation, used to delete objects
	 * from the data store.
	 */
	define( "kAPI_OP_DEL",				'@DELETE' );
	
	/*=======================================================================================
	 *	DEFAULT SERVICE TAGS																*
	 *======================================================================================*/
	
	/**
	 * Web-service database.
	 *
	 * This is the tag that represents the database on which we want to operate.
	 *
	 * Cardinality: one.
	 */
	define( "kAPI_DATABASE",			':@database' );
	
	/**
	 * Web-service database container.
	 *
	 * This is the tag that represents the database container on which we want to operate.
	 *
	 * Cardinality: one.
	 */
	define( "kAPI_CONTAINER",			':@container' );
	
	/*=======================================================================================
	 *	DEFAULT PAGING TAGS																	*
	 *======================================================================================*/
	
	/**
	 * Page start tag.
	 *
	 * This tag is used to define the starting page or record number.
	 */
	define( "kAPI_PAGE_START",			':@page-start' );
	
	/**
	 * Page limit tag.
	 *
	 * This tag is used to define the maximum number of elements to be returned by a request,
	 * this should not be confused with the {@link kAPI_PAGE_COUNT count} tag which defines
	 * the total number of elements affected by a request.
	 */
	define( "kAPI_PAGE_LIMIT",			':@page-limit' );
	
	/**
	 * Page count tag.
	 *
	 * This tag is used to define the <i>actual</i> number of elements returned by a request,
	 * this value will be smaller or equal {@link kAPI_PAGE_LIMIT limit} tag which defines
	 * the maximum number of elements to be returned by a request.
	 */
	define( "kAPI_PAGE_COUNT",			':@page-count' );
	
	/*=======================================================================================
	 *	DEFAULT DATA MANAGEMENT TAGS														*
	 *======================================================================================*/
	
	/**
	 * Data store filter.
	 *
	 * This is the tag that represents the data store filter or query.
	 *
	 * Cardinality: one or zero.
	 */
	define( "kAPI_DATA_QUERY",			':@query' );
	
	/**
	 * Data store object fields.
	 *
	 * This is the tag that represents the data store object elements that should be returned:
	 * if omitted it is assumed that the whole object is to be returned.
	 *
	 * Cardinality: one or zero.
	 */
	define( "kAPI_DATA_FIELD",			':@field' );
	
	/**
	 * Data store sort order.
	 *
	 * This is the tag that represents the data store sort elements that should be used for
	 * sorting the results.
	 *
	 * Cardinality: one or zero.
	 */
	define( "kAPI_DATA_SORT",			':@sort' );
	
	/**
	 * Data store object.
	 *
	 * This is the tag that represents the data store object, this value is used when committing
	 * data back to the data store.
	 *
	 * Cardinality: one or zero.
	 */
	define( "kAPI_DATA_OBJECT",			':@object' );
	
	/**
	 * Data store options.
	 *
	 * This is the tag that represents the data store options, this value is used to provide
	 * additional options to the operation. It is structured as a key/value pair having the
	 * following default key elements:
	 *
	 * <ul>
	 *	<li><i>{@link kAPI_OPT_SAFE kAPI_OPT_SAFE}</i>: Safe commit option.
	 *	<li><i>{@link kAPI_OPT_FSYNC kAPI_OPT_FSYNC}</i>: Safe and sync commit option.
	 *	<li><i>{@link kAPI_OPT_TIMEOUT kAPI_OPT_TIMEOUT}</i>: Operation timeout.
	 *	<li><i>{@link kAPI_OPT_SINGLE kAPI_OPT_SINGLE}</i>: Single object selection.
	 * </ul>
	 *
	 * Cardinality: one or zero.
	 */
	define( "kAPI_DATA_OPTIONS",		':@options' );
	
	/*=======================================================================================
	 *	DEFAULT RESPONSE TAGS																*
	 *======================================================================================*/
	
	/**
	 * Paging.
	 *
	 * This offset represents the collector tag for request paging parameters.
	 *
	 * <i>Note: this is a <b>reserved offset tag</b>.</i>
	 */
	define( "kAPI_DATA_PAGING",			'_paging' );
	
	/*=======================================================================================
	 *	DEFAULT OPTION ENUMERATIONS															*
	 *======================================================================================*/
	
	/**
	 * SAFE option.
	 *
	 * Can be a boolean or integer, defaults to FALSE. If FALSE, the program continues executing
	 * without waiting for a database response. If TRUE, the program will wait for the database
	 * response and throw an exception if the operation did not succeed.
	 */
	define( "kAPI_OPT_SAFE",			'safe' );
	
	/**
	 * FSYNC option.
	 *
	 * Boolean, defaults to FALSE. Forces the update to be synced to disk before returning
	 * success. If TRUE, a safe update is implied and will override setting safe to FALSE.
	 */
	define( "kAPI_OPT_FSYNC",			'fsync' );
	
	/**
	 * TIMEOUT option.
	 *
	 * Integer, if "safe" is set, this sets how long (in milliseconds) for the client to wait
	 * for a database response. If the database does not respond within the timeout period, an
	 * exception will be thrown.
	 */
	define( "kAPI_OPT_TIMEOUT",			'timeout' );
	
	/**
	 * SINGLE option.
	 *
	 * Boolean, used in the {@link kAPI_OP_DEL delete} operation: if TRUE, only one object will
	 * be deleted; if not, all matching objects will be deleted.
	 */
	define( "kAPI_OPT_SINGLE",			'justOne' );
	

	/*=======================================================================================
	 *	DEFAULT OPERATION ENUMERATIONS														*
	 *======================================================================================*/
	
	/**
	 * GET-ONE web-service.
	 *
	 * This is the tag that represents the findOne Mongo operation, it will return the first
	 * matched object.
	 */
	define( "kAPI_OP_GET_ONE",			'@GET-ONE' );
	
	/**
	 * GET-OBJECT-REF web-service.
	 *
	 * This tag defines a web service that returns an object by reference. It is equivalent to
	 * the {@link kAPI_OP_GET_ONE kAPI_OP_GET_ONE} operation, except that instead of using the
	 * query provided in the {@link kAPI_DATA_QUERY kAPI_DATA_QUERY} parameter, it will try to
	 * extract an identifier from the object provided in the
	 * {@link kAPI_DATA_OBJECT kAPI_DATA_OBJECT} parameter.
	 *
	 * Note that as with other values in the {@link kAPI_DATA_OBJECT object} parameter, you must
	 * {@link CDataType::SerialiseObject() serialise} the value.
	 */
	define( "kAPI_OP_GET_OBJECT_REF",	'@GET-REF' );
	
	/*=======================================================================================
	 *	DEFAULT STATUS TAGS																	*
	 *======================================================================================*/
	
	/**
	 * Native status.
	 *
	 * This tag will hold the native status of the operation.
	 */
	define( "kAPI_STATUS_NATIVE",		'native' );
	
	/*=======================================================================================
	 *	DEFAULT COUNTER TAGS																*
	 *======================================================================================*/
	
	/**
	 * Count tag.
	 *
	 * This tag will hold the total number of elements affected by the operation.
	 */
	define( "kAPI_AFFECTED_COUNT",		'affected' );
	
	/*=======================================================================================
	 *	DEFAULT OPTION ENUMERATIONS															*
	 *======================================================================================*/
	
	/**
	 * No response option.
	 *
	 * Can be a boolean or integer, defaults to FALSE. If TRUE, the
	 * {@link kAPI_DATA_RESPONSE response} section will not be included in the result. This can
	 * be useful when you are only interested in the status of the operation and not in the
	 * response.
	 */
	define( "kAPI_OPT_NO_RESP",			':@no-response' );
	
	/*=======================================================================================
	 *	DEFAULT OPERATION ENUMERATIONS														*
	 *======================================================================================*/
	
	/**
	 * LOGIN web-service.
	 *
	 * This is the tag that represents the LOGIN operation, it will check for the
	 * {@link kAPI_OPT_USER_CODE user} and {@link kAPI_OPT_USER_PASS password} and match both
	 * with a user record.
	 */
	define( "kAPI_OP_LOGIN",			'@LOGIN' );
	
	/**
	 * Get terms web-service.
	 *
	 * This is the tag that represents the get terms web service, it will locate all
	 * {@link COntologyTerm terms} matching the provided identifiers in the
	 * {@link kAPI_OPT_IDENTIFIERS kAPI_OPT_IDENTIFIERS} parameter and return an array whose key
	 * is the provided identifier and as value the matched object or <i>NULL</i>. If you omit
	 * the {@link kAPI_OPT_IDENTIFIERS kAPI_OPT_IDENTIFIERS} parameter it mis assumed that you
	 * want all terms, in that case the service will enforce the use of
	 * {@link kAPI_DATA_PAGING paging} options.
	 */
	define( "kAPI_OP_GET_TERMS",		'@GET_TERMS' );
	
	/**
	 * Get terms count web-service.
	 *
	 * This is the tag that represents the get terms count web service, it will locate all
	 * {@link COntologyTerm terms} matching the provided identifiers in the
	 * {@link kAPI_OPT_IDENTIFIERS kAPI_OPT_IDENTIFIERS} parameter and return the number of
	 * found elements in the {@link kAPI_AFFECTED_COUNT kAPI_AFFECTED_COUNT} response parameter.
	 */
	define( "kAPI_OP_GET_TERMS_COUNT",	'@GET_TERMS_COUNT' );
	
	/**
	 * Get nodes web-service.
	 *
	 * This is the tag that represents the get nodes web service, it will locate all
	 * {@link COntologyNode nodes} matching the provided identifiers in the
	 * {@link kAPI_OPT_IDENTIFIERS kAPI_OPT_IDENTIFIERS} parameter and return the following
	 * structure:
	 *
	 * <ul>
	 *	<li><i>{@link kAPI_RESPONSE_TERMS kAPI_RESPONSE_TERMS}</i>: The list of terms related to
	 *		the list of nodes as follows:
	 *	 <ul>
	 *		<li><i>Index</i>: The term {@link kTAG_GID identifier}.
	 *		<li><i>Value</i>: The term properties.
	 *	 </ul>
	 *	<li><i>{@link kAPI_RESPONSE_NODES kAPI_RESPONSE_NODES}</i>: The list of nodes as
	 *		follows:
	 *	 <ul>
	 *		<li><i>Index</i>: The node ID.
	 *		<li><i>Value</i>: The node properties.
	 *	 </ul>
	 * </ul>
	 *
	 * If you omit the {@link kAPI_OPT_IDENTIFIERS kAPI_OPT_IDENTIFIERS} parameter, no elements
	 * will be returned. The service does not use {@link kAPI_DATA_PAGING paging} options.
	 */
	define( "kAPI_OP_GET_NODES",		'@GET_NODES' );
	
	/**
	 * Get edges web-service.
	 *
	 * This is the tag that represents the get edges web service, it will either locate all
	 * {@link COntologyEdge edge} nodes matching the provided identifiers in the
	 * {@link kAPI_OPT_IDENTIFIERS kAPI_OPT_IDENTIFIERS} parameter or locate all
	 * {@link COntologyEdge edge} nodes related to the {@link COntologyNode node} identifiers
	 * provided in the {@link kAPI_OPT_DIRECTION kAPI_OPT_DIRECTION} parameter.
	 *
	 * Depending on the presence or not of the {@link kAPI_OPT_DIRECTION kAPI_OPT_DIRECTION}
	 * parameter:
	 *
	 * <ul>
	 *	<li><i>{@link kAPI_OPT_DIRECTION kAPI_OPT_DIRECTION} not provided</i>: In this case we
	 *		assume that the {@link kAPI_OPT_IDENTIFIERS kAPI_OPT_IDENTIFIERS} parameter contains
	 *		the list of {@link COntologyEdge edge} node identifiers to match.
	 *	<li><i>{@link kAPI_OPT_DIRECTION kAPI_OPT_DIRECTION} provided</i>: In this case we
	 *		assume that the {@link kAPI_OPT_IDENTIFIERS kAPI_OPT_IDENTIFIERS} parameter contains
	 *		the list of {@link COntologyNode node} identifiers for which we want to retrieve
	 *		related {@link COntologyEdge edges} in the direction provided in the
	 *		{@link kAPI_OPT_DIRECTION kAPI_OPT_DIRECTION} parameter:
	 *	 <ul>
	 *		<li><i>{@link kAPI_DIRECTION_IN kAPI_DIRECTION_IN}</i>: The service will return all
	 *			{@link COntologyEdge edges} that point to the {@link COntologyNode nodes}
	 *			provided in the {@link kAPI_OPT_IDENTIFIERS kAPI_OPT_IDENTIFIERS} parameter.
	 *		<li><i>{@link kAPI_DIRECTION_OUT kAPI_DIRECTION_OUT}</i>: The service will return
	 *			all {@link COntologyEdge edges} pointing from the {@link COntologyNode nodes}
	 *			provided in the {@link kAPI_OPT_IDENTIFIERS kAPI_OPT_IDENTIFIERS} parameter.
	 *		<li><i>{@link kAPI_DIRECTION_ALL kAPI_DIRECTION_ALL}</i>: The service will return
	 *			all {@link COntologyEdge edges} connected in any way to the
	 *			{@link COntologyNode nodes} provided in the
	 *			{@link kAPI_OPT_IDENTIFIERS kAPI_OPT_IDENTIFIERS} parameter.
	 *	 </ul>
	 *		In this case the service also expects a {@link kAPI_OPT_LEVELS kAPI_OPT_LEVELS}
	 *		parameter, a signed integer number, that indicates how many levels to recurse the
	 *		graph traversal, is this parameter is not provided, it will default to 1 level; to
	 *		traverse all levels this parameter should be set to a negative number; a level of
	 *		0 will only return the list of involved nodes and terms.
	 * </ul>
	 *
	 * The service will return the following structure:
	 *
	 * <ul>
	 *	<li><i>{@link kAPI_RESPONSE_TERMS kAPI_RESPONSE_TERMS}</i>: The list of terms related to
	 *		the list of subject and object nodes and the list of predicate terms as follows:
	 *	 <ul>
	 *		<li><i>Index</i>: The term {@link kTAG_GID identifier}.
	 *		<li><i>Value</i>: The term properties.
	 *	 </ul>
	 *	<li><i>{@link kAPI_RESPONSE_NODES kAPI_RESPONSE_NODES}</i>: The list of subject and
	 *		object nodes as follows:
	 *	 <ul>
	 *		<li><i>Index</i>: The node ID.
	 *		<li><i>Value</i>: The node properties.
	 *	 </ul>
	 *	<li><i>{@link kAPI_RESPONSE_EDGES kAPI_RESPONSE_EDGES}</i>: The list of edges as an
	 *		array structured as follows:
	 *	 <ul>
	 *		<li><i>Index</i>: The edge identifier.
	 *		<li><i>Value</i>: An array structured as follows:
	 *		 <ul>
	 *			<li><i>{@link kAPI_RESPONSE_SUBJECT kAPI_RESPONSE_SUBJECT}</i>: The subject
	 *				{@link COntologyNode node} ID.
	 *			<li><i>{@link kAPI_RESPONSE_PREDICATE kAPI_RESPONSE_PREDICATE}</i>: The
	 *				predicate {@link COntologyTerm term} {@link kTAG_GID identifier}.
	 *			<li><i>{@link kAPI_RESPONSE_OBJECT kAPI_RESPONSE_OBJECT}</i>: The object
	 *				{@link COntologyNode node} ID.
	 *		 </ul>
	 *	 </ul>
	 * </ul>
	 *
	 * If you provide the {@link kAPI_OPT_PREDICATES kAPI_OPT_PREDICATES} parameter, only those
	 * {@link COntologyEdge edges} whose type matches any of the predicate
	 * {@link COntologyTerm term} identifiers provided in that parameter will be selected.
	 *
	 * If you omit the {@link kAPI_OPT_IDENTIFIERS kAPI_OPT_IDENTIFIERS} parameter, no elements
	 * will be returned. The service does not use {@link kAPI_DATA_PAGING paging} options.
	 */
	define( "kAPI_OP_GET_EDGES",		'@GET_EDGES' );
	/**
 * Get relationships web-service.
 *
 * This is the tag that represents the get relationships web service, it will locate all
 * {@link COntologyEdge edge} nodes related to the {@link COntologyNode node} identifiers
 * provided in the {@link kAPI_OPT_IDENTIFIERS kAPI_OPT_IDENTIFIERS} parameter, following
 * the direction provided in the {@link kAPI_OPT_DIRECTION kAPI_OPT_DIRECTION} parameter.
 *
 * Depending on the value of the {@link kAPI_OPT_DIRECTION kAPI_OPT_DIRECTION} parameter:
 *
 * <ul>
 *	<li><i>{@link kAPI_DIRECTION_IN kAPI_DIRECTION_IN}</i>: The service will return all
 *		{@link COntologyEdge edges} that point to the {@link COntologyNode nodes}
 *		provided in the {@link kAPI_OPT_IDENTIFIERS kAPI_OPT_IDENTIFIERS} parameter.
 *	<li><i>{@link kAPI_DIRECTION_OUT kAPI_DIRECTION_OUT}</i>: The service will return
 *		all {@link COntologyEdge edges} pointing from the {@link COntologyNode nodes}
 *		provided in the {@link kAPI_OPT_IDENTIFIERS kAPI_OPT_IDENTIFIERS} parameter.
 *	<li><i>{@link kAPI_DIRECTION_ALL kAPI_DIRECTION_ALL}</i>: The service will return
 *		all {@link COntologyEdge edges} connected in any way to the
 *		{@link COntologyNode nodes} provided in the
 *		{@link kAPI_OPT_IDENTIFIERS kAPI_OPT_IDENTIFIERS} parameter.
 *	<li><i>{@link kAPI_OPT_DIRECTION kAPI_OPT_DIRECTION} parameter not provided</i>: In this
 *		case the service will assume that the identifiers provided in the
 *		{@link kAPI_OPT_IDENTIFIERS kAPI_OPT_IDENTIFIERS} parameter are edge node IDs, and
 *		it will simply return the matching edges.
 * </ul>
 *
 * The service also expects a {@link kAPI_OPT_LEVELS kAPI_OPT_LEVELS}parameter, a signed
 * integer, that indicates how many levels to recurse the graph traversal, if this parameter
 * is not provided, it will default to 1 level; to traverse all levels this parameter should
 * be set to a negative number; a level of 0 will only return the list of involved nodes and
 * terms.
 *
 * The service will return the same structure as the
 * {@link kAPI_OP_GET_EDGES kAPI_OP_GET_EDGES} service:
 *
 * <ul>
 *	<li><i>{@link kAPI_RESPONSE_EDGES kAPI_RESPONSE_EDGES}</i>: The list of edges as an
 *		array structured as follows:
 *	 <ul>
 *		<li><i>key</i>: The edge identifier.
 *		<li><i>Value</i>: An array structured as follows:
 *		 <ul>
 *			<li><i>{@link kAPI_RESPONSE_SUBJECT kAPI_RESPONSE_SUBJECT}</i>: The subject
 *				{@link COntologyNode node} ID.
 *			<li><i>{@link kAPI_RESPONSE_PREDICATE kAPI_RESPONSE_PREDICATE}</i>: The
 *				predicate {@link COntologyTerm term} {@link kTAG_GID identifier}.
 *			<li><i>{@link kAPI_RESPONSE_OBJECT kAPI_RESPONSE_OBJECT}</i>: The object
 *				{@link COntologyNode node} ID.
 *		 </ul>
 *	 </ul>
 *	<li><i>{@link kAPI_RESPONSE_NODES kAPI_RESPONSE_NODES}</i>: The list of
 *		{@link kAPI_RESPONSE_SUBJECT subject} and {@link kAPI_RESPONSE_OBJECT object}
 *		found nodes as follows:
 *	 <ul>
 *		<li><i>Key</i>: The node ID.
 *		<li><i>Value</i>: The node properties.
 *	 </ul>
 *	<li><i>{@link kAPI_RESPONSE_TERMS kAPI_RESPONSE_TERMS}</i>: The list of terms
 *		related to the list of found nodes and to the edge predicate as follows:
 *	 <ul>
 *		<li><i>Key</i>: The {@link COntologyTerm term} global
 *			{@link kTAG_GID identifier}.
 *		<li><i>Value</i>: The contents of the {@link COntologyTerm term}.
 *	 </ul>
 * </ul>
 *
 * If you provide the {@link kAPI_OPT_PREDICATES kAPI_OPT_PREDICATES} parameter, only those
 * {@link COntologyEdge edges} whose type matches any of the predicate
 * {@link COntologyTerm term} identifiers provided in that parameter will be selected.
 *
 * If you omit the {@link kAPI_OPT_IDENTIFIERS kAPI_OPT_IDENTIFIERS} parameter, no elements
 * will be returned. The service does not use {@link kAPI_DATA_PAGING paging} options.
 *
 * Note that the {@link kAPI_CONTAINER container} is not required, if omitted it will be
 * initialised to the {@link kDEFAULT_CNT_TERMS kDEFAULT_CNT_TERMS} constant.
 */
define( "kAPI_OP_GET_RELS",			'@GET_RELS' );
	
	/**
	 * Query roots web-service.
	 *
	 * This is the tag that represents the query roots web service, it will locate all
	 * {@link kTYPE_ROOT root} {@link COntologyNode nodes} matching the provided
	 * attributes in the {@link kAPI_OPT_ATTRIBUTES kAPI_OPT_ATTRIBUTES} parameter and
	 * return the following structure:
	 *
	 * <ul>
	 *	<li><i>{@link kAPI_RESPONSE_TERMS kAPI_RESPONSE_TERMS}</i>: The list of terms related to
	 *		the list of root nodes as follows:
	 *	 <ul>
	 *		<li><i>Index</i>: The term {@link kTAG_GID identifier}.
	 *		<li><i>Value</i>: The term properties.
	 *	 </ul>
	 *	<li><i>{@link kAPI_RESPONSE_NODES kAPI_RESPONSE_NODES}</i>: The list of root nodes as
	 *		follows:
	 *	 <ul>
	 *		<li><i>Index</i>: The node ID.
	 *		<li><i>Value</i>: The node properties.
	 *	 </ul>
	 * </ul>
	 *
	 * If you omit the {@link kAPI_OPT_ATTRIBUTES kAPI_OPT_ATTRIBUTES} parameter, all
	 * {@link COntologyNode nodes} with {@link kTYPE_ROOT root}
	 * {@link COntologyNode::Kind() kind} will be returned.
	 */
	define( "kAPI_OP_QUERY_ROOTS",		'@QUERY_ROOTS' );
	/**
	 * Get roots web-service.
	 *
	 * This is the tag that represents the get roots web service, it will locate all
	 * {@link kTYPE_ROOT root} {@link COntologyNode nodes} matching the provided
	 * {@link kAPI_DATA_QUERY query}.
	 *
	 * A node is a root if it has among its {@link COntologyNode::Kind() kinds} the
	 * {@link kTYPE_ROOT kTYPE_ROOT} tag.
	 *
	 * The method will return the following structure:
	 *
	 * <ul>
	 *	<li><i>{@link kAPI_RESPONSE_NODES kAPI_RESPONSE_NODES}</i>: The list of found nodes as
	 *		follows:
	 *	 <ul>
	 *		<li><i>Key</i>: The node ID.
	 *		<li><i>Value</i>: The node properties.
	 *	 </ul>
	 *	<li><i>{@link kAPI_RESPONSE_TERMS kAPI_RESPONSE_TERMS}</i>: The list of terms related to
	 *		the list of found nodes as follows:
	 *	 <ul>
	 *		<li><i>Key</i>: The {@link COntologyTerm term} global {@link kTAG_GID identifier}.
	 *		<li><i>Value</i>: The contents of the {@link COntologyTerm term}.
	 *	 </ul>
	 * </ul>
	 *
	 * If you omit the {@link kAPI_DATA_QUERY kAPI_DATA_QUERY} parameter, all
	 * {@link kTYPE_ROOT root} {@link COntologyNode nodes} will be selected.
	 */
	define( "kAPI_OP_GET_ROOTS",		'@GET_ROOTS' );
	/**
	 * Match terms web-service.
	 *
	 * This is the tag that represents the match terms web-service operation, it is equivalent
	 * to the inherited {@link kAPI_OP_MATCH kAPI_OP_MATCH} operation, except that it applies
	 * to terms and will return the matching combination of terms and nodes.
	 *
	 * <ul>
	 *	<li><i>{@link kAPI_RESPONSE_TERMS kAPI_RESPONSE_TERMS}</i>: The list of terms matched
	 *		by the {@link kAPI_OP_MATCH match} service as follows:
	 *	 <ul>
	 *		<li><i>Key</i>: The {@link COntologyTerm term} global {@link kTAG_GID identifier}.
	 *		<li><i>Value</i>: The contents of the {@link COntologyTerm term}.
	 *	 </ul>
	 *	<li><i>{@link kAPI_RESPONSE_NODES kAPI_RESPONSE_NODES}</i>: The list of found nodes
	 *		related to the matched terms as follows:
	 *	 <ul>
	 *		<li><i>Key</i>: The node ID.
	 *		<li><i>Value</i>: The node properties.
	 *	 </ul>
	 * </ul>
	 */
	define( "kAPI_OP_MATCH_TERMS",		'@MATCH_TERMS' );
	
	/*=======================================================================================
	 *	DEFAULT OPTION ENUMERATIONS															*
	 *======================================================================================*/
	
	/**
	 * User code option.
	 *
	 * This option refers to the user {@link CEntity::Code() code} for the
	 * {@link kAPI_OP_LOGIN login} operation.
	 */
	define( "kAPI_OPT_USER_CODE",		':@user-code' );
	
	/**
	 * User password option.
	 *
	 * This option refers to the user {@link CUser::Password() password} for the
	 * {@link kAPI_OP_LOGIN login} operation.
	 */
	define( "kAPI_OPT_USER_PASS",		':@user-pass' );
	
	/**
	 * Identifiers option.
	 *
	 * This option refers to a list of object identifiers, this option is used by assorted
	 * operations to receive the list of objects to be retrieved; the type of the list's
	 * elements is determined by the operation.
	 */
	define( "kAPI_OPT_IDENTIFIERS",		':@identifiers' );
	
	/**
	 * Predicates option.
	 *
	 * This option refers to a list of predicate {@link COntologyTerm term} identifiers, this
	 * option is used by operations involving the selection of {@link COntologyEdge edge} nodes:
	 * only those {@link COntologyEdge edge} nodes referring to any of the provided predicate
	 * {@link COntologyTerm term} identifiers will be selected.
	 */
	define( "kAPI_OPT_PREDICATES",		':@predicates' );
	
	/**
	 * Attribute selectors option.
	 *
	 * This option is used by operations that query {@link COntologyNode nodes}, its content is
	 * an array structured as follows:
	 *
	 * <ul>
	 *	<li><i>Index</i>: The array element index is the attribute key.
	 *	<li><i>Value</i>: The value is an array of attribute values to be matched.
	 * </ul>
	 *
	 * The resulting query will be composed in <i>AND</i> mode.
	 */
	define( "kAPI_OPT_ATTRIBUTES",		':@attributes' );
	
	/**
	 * Relationship direction.
	 *
	 * This option is used when retrieving {@link kAPI_OP_GET_EDGES edges}: it indicates
	 * the direction of the relationships in regard to the node identifiers provided in the
	 * {@link kAPI_OPT_IDENTIFIERS kAPI_OPT_IDENTIFIERS} parameter:
	 *
	 * <ul>
	 *	<li><i>{@link kAPI_DIRECTION_IN kAPI_DIRECTION_IN}</i>: Incoming relationships, this
	 *		will select all elements that point to the objects provided in the
	 *		{@link kAPI_OPT_IDENTIFIERS kAPI_OPT_IDENTIFIERS} parameter.
	 *	<li><i>{@link kAPI_DIRECTION_OUT kAPI_DIRECTION_OUT}</i>: Outgoing relationships, this
	 *		will select all elements pointed to by the objects provided in the
	 *		{@link kAPI_OPT_IDENTIFIERS kAPI_OPT_IDENTIFIERS} parameter.
	 *	<li><i>{@link kAPI_DIRECTION_ALL kAPI_DIRECTION_ALL}</i>: All relationships, this will
	 *		select all elements both pointing to and pointed to by the objects provided in the
	 *		{@link kAPI_OPT_IDENTIFIERS kAPI_OPT_IDENTIFIERS} parameter.
	 * </ul>
	 */
	define( "kAPI_OPT_DIRECTION",		':@direction' );
	
	/**
	 * Relationship levels.
	 *
	 * This option is used when retrieving for {@link kAPI_OP_GET_EDGES relationships}: it
	 * indicates the amount of levels to follow.
	 *
	 * If the integer parameter is omitted, the service will force a one level step, if the
	 * parameter is negative, it means that the service will continue until all levels have been
	 * reached.
	 */
	define( "kAPI_OPT_LEVELS",			':@levels' );
	
	/*=======================================================================================
	 *	DEFAULT RESPONSE TAGS																*
	 *======================================================================================*/
	
	/**
	 * Terms.
	 *
	 * This tag will hold the list of terms.
	 */
	define( "kAPI_RESPONSE_TERMS",		'terms' );
	
	/**
	 * Nodes.
	 *
	 * This tag will hold the list of nodes.
	 */
	define( "kAPI_RESPONSE_NODES",		'nodes' );
	
	/**
	 * Edges.
	 *
	 * This tag will hold the list of edges.
	 */
	define( "kAPI_RESPONSE_EDGES",		'edges' );
	
	/*=======================================================================================
	 *	DEFAULT RELATIONSHIP TAGS															*
	 *======================================================================================*/
	
	/**
	 * Subject.
	 *
	 * This tag {@link kAPI_RESPONSE_NODES refers} to the subject {@link COntologyNode node} of
	 * a relationship.
	 */
	define( "kAPI_RESPONSE_SUBJECT",	's' );
	
	/**
	 * Predicate.
	 *
	 * This tag {@link kAPI_RESPONSE_TERMS refers} to the predicate {@link COntologyTerm term}
	 * of a relationship.
	 */
	define( "kAPI_RESPONSE_PREDICATE",	'p' );
	
	/**
	 * Object.
	 *
	 * This tag {@link kAPI_RESPONSE_NODES refers} to the object {@link COntologyNode node} of
	 * a relationship.
	 */
	define( "kAPI_RESPONSE_OBJECT",		'o' );
	
	/*=======================================================================================
	 *	DEFAULT RELATIONSHIP DIRECTIONS														*
	 *======================================================================================*/
	
	/**
	 * Incoming.
	 *
	 * This tag indicates an incoming relationship, in other words, all elements that point to
	 * the current object.
	 */
	define( "kAPI_DIRECTION_IN",		'i' );
	
	/**
	 * Outgoing.
	 *
	 * This tag indicates an outgoing relationship, in other words, all elements to which the
	 * current object points to.
	 */
	define( "kAPI_DIRECTION_OUT",		'o' );
	
	/**
	 * Incoming and outgoing.
	 *
	 * This tag indicates incoming and outgoing relationships, in other words, all elements that
	 * are related to the current object, both pointing to it and pointed by it.
	 */
	define( "kAPI_DIRECTION_ALL",		'a' );
	

	/*=======================================================================================
	 *	DEFAULT QUERY STATEMENT TAGS														*
	 *======================================================================================*/
	
	/**
	 * Query subject.
	 *
	 * This is the tag that represents the query subject.
	 *
	 * Cardinality: one or zero.
	 */
	define( "kAPI_QUERY_SUBJECT",		':$query-subject' );
	
	/**
	 * Query operator.
	 *
	 * This is the tag that represents the query operator.
	 *
	 * Cardinality: one or zero.
	 */
	define( "kAPI_QUERY_OPERATOR",		':$query-operator' );
	
	/**
	 * Query data type.
	 *
	 * This is the tag that represents the query data type.
	 *
	 * Cardinality: one or zero.
	 */
	define( "kAPI_QUERY_TYPE",			':$query-data-type' );
	
	/**
	 * Query data.
	 *
	 * This is the tag that represents the query data.
	 *
	 * Cardinality: one or zero.
	 */
	define( "kAPI_QUERY_DATA",			':$query-data' );
	
	/*=======================================================================================
	 *	DEFAULT OPERATION ENUMERATIONS														*
	 *======================================================================================*/
	
	/**
	 * HELP web-service.
	 *
	 * This is the tag that represents the HELP web-service operation, which returns the list
	 * of supported operations and options.
	 */
	define( "kAPI_OP_HELP",				'@HELP' );
	
	/**
	 * PING web-service.
	 *
	 * This is the tag that represents the PING web-service operation, which returns a status
	 * response.
	 */
	define( "kAPI_OP_PING",				'@PING' );
	
	/*=======================================================================================
	 *	DEFAULT PROPERTY TAGS																*
	 *======================================================================================*/
	
	/**
	 * Web-service format.
	 *
	 * This is the tag that represents the web-service request and response format.
	 *
	 * This applies both to the request and the response; if the parameter is not provided we
	 * assume the {@link kTYPE_JSON JSON} format.
	 *
	 * Cardinality: one.
	 */
	define( "kAPI_FORMAT",				':@format' );
	
	/**
	 * Web-service operation.
	 *
	 * This is the tag that represents the web-service operation.
	 *
	 * Cardinality: one.
	 */
	define( "kAPI_OPERATION",			':@operation' );
	
	/*=======================================================================================
	 *	DEFAULT OPTION TAGS																	*
	 *======================================================================================*/
	
	/**
	 * Log reauest.
	 *
	 * If the value of this tag resolves to <i>TRUE</i>, the request will be logged in the
	 * response.
	 *
	 * Cardinality: one or zero.
	 */
	define( "kAPI_OPT_LOG_REQUEST",		':@log-request' );
	
	/**
	 * Trace errors.
	 *
	 * If the value of this tag resolves to <i>TRUE</i>, eventual errors will bare the trace.
	 *
	 * Cardinality: one or zero.
	 */
	define( "kAPI_OPT_LOG_TRACE",		':@log-trace' );
	
	/*=======================================================================================
	 *	DEFAULT TIMING TAGS																	*
	 *======================================================================================*/
	
	/**
	 * Web-service request time stamp.
	 *
	 * This is the tag that represents the request time stamp, it should contain the timestamp
	 * in which the client sent the request; if present, the service will return the following
	 * time stamps:
	 *
	 * <ul>
	 *	<li><i>{@link kAPI_REC_STAMP kAPI_REC_STAMP}</i>: Received time stamp.
	 *	<li><i>{@link kAPI_PARSE_STAMP kAPI_PARSE_STAMP}</i>: Parsed time stamp.
	 *	<li><i>{@link kAPI_RES_STAMP kAPI_RES_STAMP}</i>: Response time stamp.
	 * </ul>
	 *
	 * These values are provided as floating point numbers such as the result of the
	 * <i>gettimeofday( true )</i> function.
	 *
	 * Cardinality: one or zero.
	 */
	define( "kAPI_REQ_STAMP",			':@time-request' );
	
	/**
	 * Web-service received time stamp.
	 *
	 * This is the tag that represents the time stamp in which the request was received.
	 *
	 * These values are provided as floating point numbers such as the result of the
	 * <i>gettimeofday( true )</i> function.
	 *
	 * Cardinality: one or zero.
	 */
	define( "kAPI_REC_STAMP",			':@time-received' );
	
	/**
	 * Web-service parsed time stamp.
	 *
	 * This is the tag that represents the time stamp in which the request was parsed.
	 *
	 * These values are provided as floating point numbers such as the result of the
	 * <i>gettimeofday( true )</i> function.
	 *
	 * Cardinality: one or zero.
	 */
	define( "kAPI_PARSE_STAMP",			':@time-parsed' );
	
	/**
	 * Web-service response time stamp.
	 *
	 * This is the tag that represents the time stamp in which the response was sent.
	 *
	 * These values are provided as floating point numbers such as the result of the
	 * <i>gettimeofday( true )</i> function.
	 *
	 * Cardinality: one or zero.
	 */
	define( "kAPI_RES_STAMP",			':@time-sent' );
	
	/*=======================================================================================
	 *	DEFAULT RESPONSE TAGS																*
	 *======================================================================================*/
	
	/**
	 * Request.
	 *
	 * This tag holds the request block.
	 */
	define( "kAPI_DATA_REQUEST",		'_request' );
	
	/**
	 * Status.
	 *
	 * This tag holds the operation status block.
	 */
	define( "kAPI_DATA_STATUS",			'_status' );
	
	/**
	 * Timing.
	 *
	 * This offset represents the collector tag for request timing parameters.
	 *
	 * <i>Note: this is a <b>reserved offset tag</b>.</i>
	 */
	define( "kAPI_DATA_TIMING",			'_timing' );
	
	/**
	 * Response.
	 *
	 * This tag holds the response block.
	 */
	define( "kAPI_DATA_RESPONSE",		'_response' );


	/*=======================================================================================
	 *	DEFAULT IDENTIFICATION TAGS															*
	 *======================================================================================*/
	
	/**
	 * Local unique identifier offset.
	 *
	 * This is the tag that represents the object's local unique identifier, this offset should
	 * hold a scalar value which uniquely identifies the object within the collection that holds
	 * it.
	 *
	 * This should not be confused with the {@link kTAG_GID global} identifier, which represents
	 * the value or values used by the public to refer to that object.
	 *
	 * This value should be tightly integrated with the database.
	 */
	define( "kTAG_LID",								'_id' );
	
	/**
	 * Global unique identifier offset.
	 *
	 * This is the tag that represents the object's global unique identifier, this offset should
	 * uniquely identify the object among all collections, it represents a string that may only
	 * reference that specific object.
	 *
	 * This should not be confused with the {@link kTAG_LID local} identifier, which represents
	 * the key to the object within the local database.
	 */
	define( "kTAG_GID",								':GID' );
	
	/*=======================================================================================
	 *	DEFAULT REFERENCE TAGS																*
	 *======================================================================================*/
	
	/**
	 * Synonym offset.
	 *
	 * This is the offset used to indicate a synonym, a synonym is a string that can be used as
	 * a substitute to the term, it may be of several kinds: {@link kTYPE_EXACT exact},
	 * {@link kTYPE_BROAD broad}, {@link kTYPE_NARROW narrow} and
	 * {@link kTYPE_RELATED related}.
	 */
	define( "kTAG_REFERENCE_SYNONYM",				':SYNONYM' );
	
	/**
	 * This is the offset used to indicate a cross-reference, a cross-reference is a reference
	 * to another term in the same container, a sort of synonym, except that it is not a string,
	 * but a reference to another term object. Cross-references can be of several kinds:
	 * {@link kTYPE_EXACT exact}, {@link kTYPE_BROAD broad},
	 * {@link kTYPE_NARROW narrow} and {@link kTYPE_RELATED related}.
	 */
	define( "kTAG_REFERENCE_XREF",					':XREF' );
	
	/**
	 * Identifier reference tag.
	 *
	 * This is the tag is the offset used to indicate an object unique identifier within an
	 * object reference.
	 */
	define( "kTAG_REFERENCE_ID",					'$id' );
	
	/**
	 * Container name reference tag.
	 *
	 * This tag is the offset used to indicate a container within an object reference.
	 */
	define( "kTAG_REFERENCE_CONTAINER",				'$ref' );
	
	/**
	 * Database name reference tag.
	 *
	 * This tag is the offset used to indicate a database within an object reference.
	 */
	define( "kTAG_REFERENCE_DATABASE",				'$db' );
	
	/*=======================================================================================
	 *	DEFAULT TAGS																		*
	 *======================================================================================*/
	
	/**
	 * Class tag.
	 *
	 * This is the offset that should be used to store the object's class name, it will be used
	 * to {@link CMongoUnitObject::NewObject() instantiate} objects when loading them from their
	 * containers.
	 */
	define( "kTAG_CLASS",							':CLASS' );
	
	/**
	 * Creation time-stammp.
	 *
	 * This tag is used as the default offset for indicating a creation time-stamp.
	 */
	define( "kTAG_CREATED",							':CREATED' );
	
	/**
	 * Last modification time-stammp.
	 *
	 * This tag is used as the default offset for indicating a last modification time-stamp.
	 */
	define( "kTAG_MODIFIED",						':MODIFIED' );
	
	/**
	 * Version tag.
	 *
	 * This tag is an offset that should be used to represent the object's version, the version
	 * is a value that should change each time the object is saved: it can be used to check
	 * whether an object was modified since the last time it was read.
	 *
	 * By default it is an integer incremented each time the object is saved.
	 */
	define( "kTAG_VERSION",							':VERS' );
	
	/**
	 * Type.
	 *
	 * This tag is used as the default offset for indicating an attribute's data type, in
	 * general it is used in a structure in conjunction with the {@link kTAG_DATA data} offset
	 * to indicate the data type of the item.
	 */
	define( "kTAG_TYPE",							':TYPE' );
	
	/**
	 * Pattern.
	 *
	 * This tag is used to describe a pattern, in general this may be applied to terms that are
	 * of the {@link kTYPE_STRING string} type which are restricted by a pattern.
	 */
	define( "kTAG_PATTERN",							':PATTERN' );
	
	/**
	 * Kind.
	 *
	 * This tag is used as the default offset for indicating a kind attribute. A kind is
	 * similar to the {@link kTAG_TYPE kTAG_TYPE} attribute, except that in the latter case it
	 * qualifies specifically the {@link kTAG_DATA kTAG_DATA} elements, in this case it
	 * discriminates the elements of a list.
	 */
	define( "kTAG_KIND",							':KIND' );
	
	/**
	 * Domain.
	 *
	 * This tag is used as the default offset for indicating a domain attribute. A domain
	 * represents what kind of object the current object represents, it should indicate the
	 * nature of the instance it represents.
	 */
	define( "kTAG_DOMAIN",							':DOMAIN' );
	
	/**
	 * Category.
	 *
	 * This tag is used as the default offset for indicating a category attribute. A category
	 * represents an area to which the current instance belongs to, it should indicate the main
	 * quality of the instance in regards to other instances.
	 */
	define( "kTAG_CATEGORY",						':CATEGORY' );
	
	/**
	 * Cardinality.
	 *
	 * This tag is used as the default offset for indicating the cardinality of a data
	 * attribute, it can take the following values:
	 *
	 * <ul>
	 *	<li><i>{@link kCARD_0_1 kCARD_0_1}</i>: Zero or one, the data is either a scalar or it
	 *		may not be present.
	 *	<li><i>{@link kCARD_1 kCARD_1}</i>: One, the data is a required scalar.
	 *	<li><i>{@link kCARD_ANY kCARD_ANY}</i>: Any, the data may not be present or it may have
	 *		many elements; in general this indicates that the data element must be an array.
	 * </ul>
	 */
	define( "kTAG_CARDINALITY",						':CARD' );
	
	/**
	 * Unit.
	 *
	 * This tag is used as the default offset for indicating a unit attribute. A unit is a
	 * measurement unit such as centimeters, in general this offset will hold a reference to
	 * an object that defines the unit.
	 */
	define( "kTAG_UNIT",							':UNIT' );
	
	/**
	 * Source.
	 *
	 * This tag is used as the default offset for indicating a source. A source indicates from
	 * where an object comes from, it is usually expressed as an URL.
	 */
	define( "kTAG_SOURCE",							':SOURCE' );
	
	/**
	 * Data.
	 *
	 * This tag is used as the default offset for indicating an attribute's data or content, in
	 * general this tag is used in conjunction with the {@link kTAG_TYPE type} or
	 * {@link kTAG_KIND kind} offsets when storing lists of items.
	 */
	define( "kTAG_DATA",							':DATA' );
	
	/**
	 * Code offset.
	 *
	 * This tag is used as the default offset for indicating an attribute's code or acronym.
	 */
	define( "kTAG_CODE",							':CODE' );
	
	/**
	 * Enumeration offset.
	 *
	 * This tag is used as the default offset for indicating an attribute containing an
	 * enumeration code or acronym.
	 */
	define( "kTAG_ENUM",							':ENUM' );
	
	/**
	 * Namespace offset.
	 *
	 * This tag is used as the default offset for indicating a namespace term reference.
	 */
	define( "kTAG_NAMESPACE",						':NS' );
	
	/**
	 * Graph node offset.
	 *
	 * This tag is used as the default offset for indicating a graph node.
	 */
	define( "kTAG_NODE",							':NODE' );
	
	/**
	 * Graph edge offset.
	 *
	 * This tag is used as the default offset for indicating a graph edge node.
	 */
	define( "kTAG_EDGE",							':EDGE' );
	
	/**
	 * Subject term offset.
	 *
	 * This tag is used as the default offset for indicating the subject term.
	 */
	define( "kTAG_SUB_TERM",						':STERM' );
	
	/**
	 * Subject node offset.
	 *
	 * This tag is used as the default offset for indicating the subject node.
	 */
	define( "kTAG_SUB_NODE",						':SNODE' );
	
	/**
	 * Predicate term offset.
	 *
	 * This tag is used as the default offset for indicating the predicate term.
	 */
	define( "kTAG_PRE_TERM",						':PTERM' );
	
	/**
	 * Object term offset.
	 *
	 * This tag is used as the default offset for indicating the object term.
	 */
	define( "kTAG_OBJ_TERM",						':OTERM' );
	
	/**
	 * Object node offset.
	 *
	 * This tag is used as the default offset for indicating the object node.
	 */
	define( "kTAG_OBJ_NODE",						':ONODE' );
	
	/**
	 * Term offset.
	 *
	 * This tag is used as the default offset for indicating a graph node term.
	 */
	define( "kTAG_TERM",							':TERM' );
	
	/**
	 * Name offset.
	 *
	 * This tag is used as the default offset for indicating an attribute's name.
	 */
	define( "kTAG_NAME",							':NAME' );
	
	/**
	 * Description.
	 *
	 * This tag is used as the default offset for indicating an attribute's description.
	 */
	define( "kTAG_DESCRIPTION",						':DESCR' );
	
	/**
	 * Definition.
	 *
	 * This tag is used as the default offset for indicating an attribute's definition.
	 */
	define( "kTAG_DEFINITION",						':DEF' );
	
	/**
	 * Examples.
	 *
	 * This tag is used as the default offset for indicating an attribute containing a list of
	 * examples.
	 */
	define( "kTAG_EXAMPLES",						':EXAMPLE' );
	
	/**
	 * Language.
	 *
	 * This tag is used as the default offset for indicating the language of an attribute, it
	 * should be the 2 character ISO 639 language code.
	 */
	define( "kTAG_LANGUAGE",						':LANGUAGE' );
	
	/**
	 * Status.
	 *
	 * This tag is used as the default offset for indicating an attribute's status or state, it
	 * will generally be an array of tags defining the various states associated with the
	 * object.
	 */
	define( "kTAG_STATUS",							':STATUS' );
	
	/**
	 * Annotation.
	 *
	 * This tag is used as the default offset for indicating a list of annotations, in general
	 * it will contain a list of key/value pairs.
	 */
	define( "kTAG_ANNOTATION",						':ANNOTATION' );
	
	/**
	 * References tag.
	 *
	 * This is the tag that represents the list of references of an object, it is an array of
	 * object references in which each element may either be the reference itself or the
	 * following structure:
	 *
	 * <ul>
	 *	<li><i>{@link kTAG_KIND kTAG_KIND}</i>: Relation predicate, it can either be an object
	 *		reference or a string.
	 *	<li><i>{@link kTAG_DATA kTAG_DATA}</i>: Relation object, it will be a reference to an
	 *		object in which the following elements may appear:
	 *	 <ul>
	 *		<li><i>{@link kTAG_REFERENCE_ID kTAG_REFERENCE_ID}</i>: The unique identifier of the
	 *			referenced object.
	 *		<li><i>{@link kTAG_REFERENCE_CONTAINER kTAG_REFERENCE_CONTAINER}</i>: The
	 *			{@link CContainer container} name.
	 *		<li><i>{@link kTAG_REFERENCE_DATABASE kTAG_REFERENCE_DATABASE}</i>: The database
	 *			name.
	 *		<li><i>{@link kTAG_CLASS kTAG_CLASS}</i>: The object class name.
	 *	 </ul>
	 * </ul>
	 */
	define( "kTAG_REFS",							':REFS' );
	
	/**
	 * Tags.
	 *
	 * This tag represents a list of attribute tags, it is generally used to collect the list of
	 * tags used in an object.
	 */
	define( "kTAG_TAGS",							':TAGS' );
	
	/**
	 * Edge terms path.
	 *
	 * This tag represents a graph edge node by using its related terms as a path in the form of
	 * a string containing the <i>SUBJECT/PREDICATE/OBJECT</i> path constituted by the term
	 * identifier elements.
	 */
	define( "kTAG_EDGE_TERM",						':TEDGE' );
	
	/**
	 * Edge nodes path.
	 *
	 * This tag represents a graph edge node by using its related nodes and predicate term as a
	 * path in the form of a string containing the <i>SUBJECT/PREDICATE/OBJECT</i> path in which
	 * the subject and object elements are represented by the respective node identifiers, and
	 * the predicate element is represented by the edge term identifier.
	 */
	define( "kTAG_EDGE_NODE",						':NEDGE' );
	
	/**
	 * Default tag.
	 *
	 * This is the tag that represents the default entry related to the current one. There may be
	 * cases in which an object is interchangeable with many others, in enumerations, for
	 * instance: in this case we can use this tag to point to the default or used instance.
	 */
	define( "kTAG_DEFAULT",							':DEFAULT' );
	
	/**
	 * Preferred tag.
	 *
	 * This is the tag that represents the preferred entry related to the current one. There may
	 * be cases in which an object may be obsolete, but still in use, this tag refers to the
	 * object that should be used in place of the current one. This tag  expects the value of
	 * the {@link kTAG_LID native} identifier of the preferred object here.
	 */
	define( "kTAG_PREFERRED",						':PREFERRED' );
	
	/**
	 * Valid tag.
	 *
	 * This is the tag that represents the valid entry related to the current one. There may be
	 * cases in which it is not an option to delete objects, so we create a new one and the old
	 * one will point to the new one. This tag represents that property and it expects the value
	 * of the {@link kTAG_LID native} identifier of the new object here.
	 */
	define( "kTAG_VALID",							':VALID' );
	
	/*=======================================================================================
	 *	DEFAULT PROPERTY OFFSETS															*
	 *======================================================================================*/
	
	/**
	 * Password offset.
	 *
	 * This is the tag that represents a password; the value is a string.
	 */
	define( "kOFFSET_PASSWORD",						':PASS' );
	
	/**
	 * Mail offset.
	 *
	 * This is the tag that represents a mailing address, the value may either be a string or
	 * an array.
	 */
	define( "kOFFSET_MAIL",							':MAIL' );
	
	/**
	 * E-mail offset.
	 *
	 * This is the tag that represents an e-mail, the value may either be a string or an array.
	 */
	define( "kOFFSET_EMAIL",						':EMAIL' );
	
	/**
	 * Telephone offset.
	 *
	 * This is the tag that represents a telephone number, the value may either be a string or
	 * an array.
	 */
	define( "kOFFSET_PHONE",						':PHONE' );
	
	/**
	 * Telefax offset.
	 *
	 * This is the tag that represents a telefax number, the value may either be a string or
	 * an array.
	 */
	define( "kOFFSET_FAX",							':FAX' );
	
	/**
	 * URL.
	 *
	 * This is the tag that represents an URL, link or web address.
	 */
	define( "kOFFSET_URL",							':URL' );
	
	/**
	 * Acronym.
	 *
	 * This is the tag that represents a list of acronyms.
	 */
	define( "kOFFSET_ACRONYM",						':ACRONYM' );
	
	/**
	 * Version.
	 *
	 * This is the tag that represents the version, it should not be confused with the
	 * {@link kTAG_VERSION kTAG_VERSION} which is automatically managed in the class library:
	 * this offset represents the actual version.
	 */
	define( "kOFFSET_VERSION",						':VERSION' );
	
	/**
	 * Namespace offset.
	 *
	 * This tag is used as the default offset for indicating a namespace name or acronym.
	 */
	define( "kOFFSET_NAMESPACE",					':NAMESPACE' );
	
	/**
	 * Image offset.
	 *
	 * This tag is used as the default offset for indicating an images list.
	 */
	define( "kOFFSET_IMAGE",						':IMAGE' );
	
	/*=======================================================================================
	 *	DEFAULT MAIL PROPERTY OFFSETS														*
	 *======================================================================================*/
	
	/**
	 * Place offset.
	 *
	 * This is the tag that represents a place or named location.
	 */
	define( "kOFFSET_PLACE",						':PLACE' );
	
	/**
	 * Care of offset.
	 *
	 * This is the tag that represents a care of address reference.
	 */
	define( "kOFFSET_CARE",							':CARE' );
	
	/**
	 * Street offset.
	 *
	 * This is the tag that represents a place or named location.
	 */
	define( "kOFFSET_STREET",						':STREET' );
	
	/**
	 * ZIP offset.
	 *
	 * This is the tag that represents a ZIP code.
	 */
	define( "kOFFSET_ZIP_CODE",						':ZIP' );
	
	/**
	 * City offset.
	 *
	 * This is the tag that represents a city name.
	 */
	define( "kOFFSET_CITY",							':CITY' );
	
	/**
	 * Province offset.
	 *
	 * This is the tag that represents a province name or code.
	 */
	define( "kOFFSET_PROVINCE",						':PROV' );
	
	/**
	 * Country offset.
	 *
	 * This is the tag that represents an ISO3166 3 character country code.
	 */
	define( "kOFFSET_COUNTRY",						':COUNTRY' );
	
	/**
	 * Full data offset.
	 *
	 * This is the tag that represents the full data as a string.
	 */
	define( "kOFFSET_FULL",							':FULL' );
	
	/*=======================================================================================
	 *	DEFAULT PREDICATES																	*
	 *======================================================================================*/
	
	/**
	 * IS-A.
	 *
	 * This is the tag that defines the IS-A predicate.
	 *
	 * This predicate is equivalent to a subclass, it can be used to relate a term to the
	 * default category to which it belongs within the current ontology.
	 */
	define( "kPRED_IS_A",							':IS-A' );
	
	/**
	 * PART-OF.
	 *
	 * This is the tag that defines the PART-OF predicate.
	 *
	 * This predicate indicates that the subject is part of the object.
	 */
	define( "kPRED_PART_OF",						':PART-OF' );
	
	/**
	 * COMPONENT-OF.
	 *
	 * This is the tag that defines the COMPONENT-OF predicate.
	 *
	 * This predicate indicates that the subject is a component of the object.
	 */
	define( "kPRED_COMPONENT_OF",					':COMPONENT-OF' );
	
	/**
	 * SCALE-OF.
	 *
	 * This is the tag that defines the SCALE-OF predicate.
	 *
	 * This predicate is used to relate a term that can be used to annotate data with its method
	 * term or trait term.
	 */
	define( "kPRED_SCALE_OF",						':SCALE-OF' );
	
	/**
	 * METHOD-OF.
	 *
	 * This is the tag that defines the METHOD-OF predicate.
	 *
	 * This predicate is used to relate a term that defines a measurement method to the trait
	 * term.
	 */
	define( "kPRED_METHOD_OF",						':METHOD-OF' );
	
	/**
	 * ENUM-OF.
	 *
	 * This is the tag that defines the ENUM-OF predicate.
	 *
	 * This predicate is used to relate {@link kTAG_ENUM enumeration} terms, this edge type
	 * relates enumeration terms in a hierarchy.
	 */
	define( "kPRED_ENUM_OF",						':ENUM-OF' );
	
	/*=======================================================================================
	 *	DEFAULT CARDINALITIES																*
	 *======================================================================================*/
	
	/**
	 * Zero or one.
	 *
	 * This is the tag that defines a cardinality of zero or one.
	 */
	define( "kCARD_0_1",							':01' );
	
	/**
	 * One.
	 *
	 * This is the tag that defines a cardinality of exactly one.
	 */
	define( "kCARD_1",								':1' );
	
	/**
	 * Any.
	 *
	 * This is the tag that defines a cardinality of any kind.
	 */
	define( "kCARD_ANY",							':ANY' );
	
	/*=======================================================================================
	 *	DEFAULT TAXON ATTRIBUTES															*
	 *======================================================================================*/
	
	/**
	 * Rank.
	 *
	 * This is the tag that defines a taxon rank.
	 */
	define( "kTAXON_RANK",							':RANK' );
	
	/**
	 * Epithet.
	 *
	 * This is the tag that defines a taxon epithet.
	 */
	define( "kTAXON_EPITHET",						':EPITH' );
	
	/**
	 * Authority.
	 *
	 * This is the tag that defines a taxon authority.
	 */
	define( "kTAXON_AUTHORITY",						':AUTH' );
	
	/**
	 * Taxon.
	 *
	 * This is the tag that defines a full taxon epithet.
	 */
	define( "kTAXON_NAME",							':TAXON' );
