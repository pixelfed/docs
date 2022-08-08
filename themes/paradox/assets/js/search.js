/*
tutorials used:
- https://aaronluna.dev/blog/add-search-to-static-site-lunrjs-hugo-vanillajs/#codepen-with-final-code
- https://victoria.dev/blog/add-search-to-hugo-static-sites-with-lunr/
*/

let pagesIndex, searchIndex
const MAX_SUMMARY_LENGTH = 30
const SENTENCE_BOUNDARY_REGEX = /\b\.\s/gm
const WORD_REGEX = /\b(\w*)[\W|\s|\b]?/gm

async function initSearch() {
	try {
		const response = await fetch("/index.json");
		pagesIndex = await response.json();
		searchIndex = lunr(function () {
			this.field("title");
			this.field("content");
			this.ref("href");
			pagesIndex.forEach((page) => this.add(page));
		});
	} catch (e) {
		console.log(e);
	}
	console.log("Search index initialized")
	// Get the query parameter(s)
	const params = new URLSearchParams(window.location.search)
	const query = params.get('query')

	// Perform a search if there is a query
	if (query) {
		// Retain the search input in the form when displaying results
		document.getElementById('search-input').setAttribute('value', query)

		// Update the list with results
		console.log("search performed")
		let results = searchSite(query)
		renderSearchResults(query, results)
	}
}

initSearch();

function searchSite(query) {
	const originalQuery = query;
	query = getLunrSearchQuery(query);
	let results = getSearchResults(query);
	return results.length
	? results
	: query !== originalQuery
	? getSearchResults(originalQuery)
	: [];
}

function getLunrSearchQuery(query) {
	const searchTerms = query.split(" ");
	if (searchTerms.length === 1) {
	return query;
	}
	query = "";
	for (const term of searchTerms) {
	query += `+${term} `;
	}
	return query.trim();
}

function getSearchResults(query) {
	return searchIndex.search(query).flatMap((hit) => {
	if (hit.ref == "undefined") return [];
	let pageMatch = pagesIndex.filter((page) => page.href === hit.ref)[0];
	pageMatch.score = hit.score;
	return [pageMatch];
	});
}

function renderSearchResults(query, results) {
	clearSearchResults();
	updateSearchResults(query, results);
}

function clearSearchResults() {
	const results = document.querySelector("#search-results");
	while (results.firstChild) results.removeChild(results.firstChild);
}

function updateSearchResults(query, results) {
	document.getElementById("results-query").innerHTML = query;
	document.querySelector("#search-results").innerHTML = results
	.map(
		(hit) => `
	<li class="search-result-item" data-score="${hit.score.toFixed(2)}">
		<a href="${hit.href}" class="search-result-page-title">${createTitleBlurb(query, hit.title)}</a>
		<p>${createSearchResultBlurb(query, hit.content)}</p>
	</li>
	`
	)
	.join("");
	const searchResultListItems = document.querySelectorAll("#search-results li");
	document.getElementById("results-count").innerHTML = searchResultListItems.length;
	document.getElementById("results-count-text").innerHTML = searchResultListItems.length === 1 ? "result" : "results";
	// searchResultListItems.forEach(
	//   (li) => (li.firstElementChild.style.color = getColorForSearchResult(li.dataset.score))
	// );
}

function createTitleBlurb(query, title) {
	const searchQueryRegex = new RegExp(createQueryStringRegex(query), "gmi");
	return title.replace(
		searchQueryRegex,
		"<strong>$&</strong>"
		)
}

function createSearchResultBlurb(query, pageContent) {
	const searchQueryRegex = new RegExp(createQueryStringRegex(query), "gmi");
	const searchQueryHits = Array.from(
	pageContent.matchAll(searchQueryRegex),
	(m) => m.index
	);
	const sentenceBoundaries = Array.from(
	pageContent.matchAll(SENTENCE_BOUNDARY_REGEX),
	(m) => m.index
	);
	let searchResultText = "";
	let lastEndOfSentence = 0;
	for (const hitLocation of searchQueryHits) {
	if (hitLocation > lastEndOfSentence) {
		for (let i = 0; i < sentenceBoundaries.length; i++) {
			if (sentenceBoundaries[i] > hitLocation) {
			const startOfSentence = i > 0 ? sentenceBoundaries[i - 1] + 1 : 0;
			const endOfSentence = sentenceBoundaries[i];
			lastEndOfSentence = endOfSentence;
			parsedSentence = pageContent.slice(startOfSentence, endOfSentence).trim();
			searchResultText += `${parsedSentence} ... `;
			break;
			}
		}
	}
	const searchResultWords = tokenize(searchResultText);
	const pageBreakers = searchResultWords.filter((word) => word.length > 50);
	if (pageBreakers.length > 0) {
		searchResultText = fixPageBreakers(searchResultText, pageBreakers);
	}
	if (searchResultWords.length >= MAX_SUMMARY_LENGTH) break;
	}
	return ellipsize(searchResultText, MAX_SUMMARY_LENGTH).replace(
	searchQueryRegex,
	"<strong>$&</strong>"
	);
}

function createQueryStringRegex(query) {
	const searchTerms = query.split(" ");
	if (searchTerms.length == 1) {
	return query;
	}
	query = "";
	for (const term of searchTerms) {
	query += `${term}|`;
	}
	query = query.slice(0, -1);
	return `(${query})`;
}

function tokenize(input) {
	const wordMatches = Array.from(input.matchAll(WORD_REGEX), (m) => m);
	return wordMatches.map((m) => ({
	word: m[0],
	start: m.index,
	end: m.index + m[0].length,
	length: m[0].length,
	}));
}

function fixPageBreakers(input, largeWords) {
	largeWords.forEach((word) => {
	const chunked = chunkify(word.word, 20);
	input = input.replace(word.word, chunked);
	});
	return input;
}

function chunkify(input, chunkSize) {
	let output = "";
	let totalChunks = (input.length / chunkSize) | 0;
	let lastChunkIsUneven = input.length % chunkSize > 0;
	if (lastChunkIsUneven) {
	totalChunks += 1;
	}
	for (let i = 0; i < totalChunks; i++) {
	let start = i * chunkSize;
	let end = start + chunkSize;
	if (lastChunkIsUneven && i === totalChunks - 1) {
		end = input.length;
	}
	output += input.slice(start, end) + " ";
	}
	return output;
}

function ellipsize(input, maxLength) {
	const words = tokenize(input);
	if (words.length <= maxLength) {
	return input;
	}
	return input.slice(0, words[maxLength].end) + "...";
}

if (!String.prototype.matchAll) {
	String.prototype.matchAll = function (regex) {
	"use strict";
	function ensureFlag(flags, flag) {
		return flags.includes(flag) ? flags : flags + flag;
	}
	function* matchAll(str, regex) {
		const localCopy = new RegExp(regex, ensureFlag(regex.flags, "g"));
		let match;
		while ((match = localCopy.exec(str))) {
			match.index = localCopy.lastIndex - match[0].length;
			yield match;
		}
	}
	return matchAll(this, regex);
	};
}