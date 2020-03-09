import {Snowflake} from "../utils/mod.ts";


/** a file attachment */
export default class Attachment {
	/** attachment id */
	id: Snowflake;
	/** name of file attached */
	filename: string;
	/** size of file in bytes */
	size: number;
	/** source url of file */
	url: string;
	/** a proxied url of file */
	proxy_url: string;
	/** height of file (if image) */
	height: number | null;
	/** width of file (if image) */
	width: number | null;
}
