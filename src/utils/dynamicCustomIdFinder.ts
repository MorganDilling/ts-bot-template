import Button from "classes/Button";
import Modal from "classes/Modal";
import { Collection } from "discord.js";

/** Regex for extracting content from [] */
const EXTRACTION_REGEX = /\[(.*?)\]/g;

/**
 * Extracts the dynamic data from the provided customId
 * @param itemId The id to extract the data from
 * @param route The routeId to get the keys from
 */
function getPathData(itemId: string, route: string) {
	const itemDataArray = itemId.match(EXTRACTION_REGEX) ?? [];
	const routeDataArray = route.match(EXTRACTION_REGEX) ?? [];
	const pathDataArray = routeDataArray
		.map((key, index) => {
			const data = itemDataArray[index];
			if (!data) return null;

			return { [key]: data };
		})
		.filter(Boolean);

	// Forcing types because TypeScript still things null values exist after Boolean filter
	const pathData = pathDataArray as { [slug: string]: string }[];
	return pathData.reduce((a, b) => ({ ...a, ...b }), {});
}

/**
 * Returns the ids where the content in [] is replaced with [placeholder] to make filtering easier
 * @param itemId The id to update
 * @param route The routeId to update
 */
function getMatchingId(itemId: string, route: string) {
	const matchingItemId = itemId.replace(EXTRACTION_REGEX, "[placeholder]");
	const matchingRouteId = route.replace(EXTRACTION_REGEX, "[placeholder]");

	return { itemId: matchingItemId, route: matchingRouteId };
}

/**
 * @param collection The collection of registered modals and buttons
 * @param route The custom id of the button or modal. It can include dynamic parts. e.g. "support-close-[id]"
 */
function dynamicCustomIdFinder(
	collection: Collection<string, Modal | Button>,
	route: string
): [Modal | Button | null, { [slug: string]: string }?] {
	const exactMatch = collection.get(route);
	if (exactMatch) return [exactMatch];

	const returnItem = collection.find((item) => {
		const itemId = item.customId;
		const matchingIds = getMatchingId(itemId, route);
		return matchingIds.itemId === matchingIds.route;
	});
	if (!returnItem) return [null, undefined];

	const pathData = getPathData(returnItem.customId, route);
	return [returnItem, pathData];
}

export default dynamicCustomIdFinder;
