function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
        end = dc.length;
        }
    }
    return decodeURI(dc.substring(begin + prefix.length, end));
} 

function getElementPosition(elem) {
    var offsetLeft = 0;
    var offsetTop = 0;
    offsetLeft += elem.offsetLeft;
    offsetTop += elem.offsetTop;
    offsetTrail = elem.offsetParent;

    return {
        left: offsetLeft,
        top: offsetTop
    }
}

var Page = {
	settings: {
		taglineElem: document.getElementById("page-head-tagline"),
		pageTitleElem: document.getElementById("page-title"),
		gridElem: document.getElementById("home-grid"),
		headerElem: document.getElementById("page-head")
	},

	getTagline: function() {
		if (getCookie("tagline") == null) {
			document.cookie = "tagline=true";
			return false;
		}

		var taglines = [
			'Let&rsquo;s get it started', 'Just Do It', 'A quarter century of human experience', 'You&rsquo;re in my world now', 'Famous movie star in several parallel universes', 'Ha ha, what a story.', 'That&rsquo;s my name, don&rsquo;t wear it out', 'You may have seen me at the grocery store', 'A guy who does things', 'As seen on "Shark Tank"...OK, not really', 'Since 1842', 'It&rsquo;s Good', 'Has never eaten avocado toast', 'A jack of all trades is a master of...all trades', 'Puts his pants on two legs at a time', 'lmao xD', 'Tagline Writer Extraordinaire', 'You are tearing me apart!', 'As seen on the local news in like 4th grade', 'Sold as-is', 'Shirt size large, Heart size XXL', 'Voted &ldquo;Good Drawer&rdquo; in elementary school', 'For President 2068', 'Do you understand life? Do you?!', 'That&rsquo;s all there is to it', 'I&rsquo;m Lovin&rsquo; It', 'In the past you&rsquo;re always stupid, but right now you&rsquo;re awesome', 'Say what you will about armchair activists; at least we have good lumbar support.', 'How are my approval ratings?', 'Just how many of these things did I write?', 'Lifelong occupant of the darkest timeline', 'If I can&rsquo;t scuba, then what&rsquo;s this all been about?', 'I do what I do so I don&rsquo;t have to do what I don&rsquo;t do', 'Magic&rsquo;s in the air', 'No free refills', 'and the Chamber of Echoes', 'Won some kind of award once, I&rsquo;m pretty sure', 'Remarkably unremarkable', 'A product of 13 billion years of trial and error', 'Well, this is awkward', 'Drafter of Ones and Zeroes', 'Comes with a medium drink and a side of your choice', 'Nothing to it'
		];

		var rand = taglines[Math.random() * taglines.length>>0];

		return rand;
	},

	sizeGrid: function() {
		var headerH = this.settings.headerElem.offsetHeight;
		var viewportH = window.innerHeight;
		var gridH = viewportH - headerH;

		this.settings.gridElem.style.height = gridH + 'px';
	},

	init: function() {
		var page = this;
		var pageTitleElem = page.settings.pageTitleElem;
		var headerElem = page.settings.headerElem;
		var gridElem = page.settings.gridElem;

		var tagline = page.getTagline();
		if (tagline.length) page.settings.taglineElem.innerHTML = tagline;
		page.settings.taglineElem.style.display = "block";

		if (gridElem) {
			page.sizeGrid();
			window.addEventListener("resize", function() {
				page.sizeGrid();
			});
		}

		// Remove preload class to enable transitions
		document.addEventListener("DOMContentLoaded", function() {
			document.body.classList.remove("preload");
		});
	}
};

var sjs,
    Search = {
	settings: {
		searchToggleElem: document.getElementById("page-search-toggle"),
		searchElem: document.getElementById("page-search"),
		searchResultsElem: document.getElementById("page-search-results"),
		searchInputElem: document.getElementById("page-search-input"),
		searchCloseElem: document.getElementById("search-close")
	},

	searchOpen: false,

	resultsOpen: false,

	openSearch: function() {
		this.settings.searchElem.classList.add("page-search--open");
		this.settings.searchInputElem.focus();
		this.searchOpen = true;
	},

	closeSearch: function() {
		this.settings.searchElem.classList.remove("page-search--open");
		this.searchOpen = false;
	},

	toggleSearch: function() {
		if (this.searchOpen) {
			this.closeSearch();
		} else {
			this.openSearch();
		}
	},

	openResults: function() {
		this.settings.searchResultsElem.classList.add("page-search__results--open");
		this.searchOpen = true;
	},

	closeResults: function() {
		this.settings.searchResultsElem.classList.remove("page-search__results--open");
		this.searchOpen = false;
	},

	toggleResults: function() {
		if (this.resultsOpen) {
			this.closeResults();
		} else {
			this.openResults();
		}
	},

	init: function() {
		var search = this;
		var searchToggleElem = search.settings.searchToggleElem;
		var searchElem = search.settings.searchElem;
		var searchResultsElem = search.settings.searchResultsElem;
		var searchInputElem = search.settings.searchInputElem;
		var searchCloseElem = search.settings.searchCloseElem;

		sjs = SimpleJekyllSearch({
		  searchInput: searchInputElem,
		  resultsContainer: searchResultsElem,
		  json: '/search.json',
		  searchResultTemplate: '<li class="media media--middle">'+
									'<img class="media__img" src="/assets/images/posts{permalink}{image}" alt="">'+
									'<div class="media__body">'+
										'<a href="{url}" title="{desc}">{title}</a>'+
									'</div>'+
								'</li>',
          noResultsText: '<li class="page-search__noresults">No results found</li>',
          fuzzy: true
		});

		document.addEventListener("click", function(e) {
			if (searchElem != e.target && searchToggleElem != e.target && searchInputElem != e.target
				&& !searchToggleElem.contains(e.target) && !searchElem.contains(e.target)) {
				search.closeSearch();
			}
		});

		searchInputElem.addEventListener("input", function() {
			var val = searchInputElem.value;
			if (!search.resultsOpen && val.length) {
				search.openResults();
			} else {
				search.closeResults();
			}
		}, false);

		searchToggleElem.addEventListener("click", function(e) {
			e.preventDefault();
			search.toggleSearch();
		});

		searchCloseElem.addEventListener("click", function(e) {
			e.preventDefault();
			search.closeSearch();
		});
	}
};

var Post = {
	settings: {
		pageTitleElem: document.getElementById("page-title"),
		postImageElem: document.getElementsByClassName("post__image")[0],
		postContentElem: document.getElementsByClassName("post__content")[0],
		headerElem: document.getElementById("page-head")
	},

	sizePostImage: function() {
		//var h = window.innerHeight - this.settings.pageTitleElem.offsetHeight;
		var h = window.innerHeight;
		if (h < this.settings.postImageElem.getAttribute('data-natural-height')) {
			this.settings.postImageElem.style.height = h + "px";
		}
	},

	stickPostTitle: function(postImageElem, pageTitleElem) {
		var postImageElem = this.settings.postImageElem;
		var pageTitleElem = this.settings.pageTitleElem;
		var h = postImageElem.offsetHeight - (window.innerHeight - getElementPosition(postImageElem).top) + pageTitleElem.offsetHeight;

		if (window.scrollY >= h) {
			pageTitleElem.style.position = "static";
		} else {
			pageTitleElem.style.position = "fixed";
		}
	},

	init: function() {
		var post = this;
		var postTitleElem = post.settings.postTitleElem;
		var postImageElem = post.settings.postImageElem;
		var postContentElem = post.settings.postContentElem;
		var headerElem = post.settings.headerElem;

		if (postImageElem) {
			postImageElem.setAttribute('data-natural-height', postImageElem.offsetHeight);
			post.sizePostImage();
			window.addEventListener("resize", function() {
				postImageElem.style.height = null;
				postImageElem.setAttribute('data-natural-height', postImageElem.offsetHeight);
				post.sizePostImage();
				post.stickPostTitle();
			});

			post.stickPostTitle();
			window.addEventListener("scroll", function() {
				post.stickPostTitle();
			});
		}
	}
};

(function() {
	Page.init();
	Search.init();

	if (document.getElementsByClassName("post--full").length) {
		Post.init();
	}
})();