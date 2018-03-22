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

var Header = {
	settings: {
		taglineElem: document.getElementById("page-head-tagline")
	},

	getTagline: function() {
		if (getCookie("tagline") == null) {
			document.cookie = "tagline=true";
			return false;
		}

		var taglines = [
			'A guy who does things', 'As seen on "Shark Tank"...OK, not really', 'Since 1842', 'It&rsquo;s Good', 'Has never eaten avocado toast', 'A jack of all trades is a master of...all trades', 'Puts his pants on two legs at a time', 'lmao xD', 'Tagline Writer Extraordinaire', 'You are tearing me apart!', 'As seen on the local news in like 4th grade', 'Sold as-is', 'Shirt size large, Heart size XXL', 'Voted &ldquo;Good Drawer&rdquo; in elementary school', 'For President 2068', 'Do you understand life? Do you?!', 'That&rsquo;s all there is to it', 'I&rsquo;m Lovin&rsquo; It', 'In the past you&rsquo;re always stupid, but right now you&rsquo;re awesome', 'Say what you will about armchair activists; at least we have good lumbar support.', 'How are my approval ratings?', 'Just how many of these things did I write?', 'Lifelong occupant of the darkest timeline', 'If I can&rsquo;t scuba, then what&rsquo;s this all been about?', 'I do what I do so I don&rsquo;t have to do what I don&rsquo;t do', 'Magic&rsquo;s in the air', 'No free refills', 'and the Chamber of Echoes', 'Won some kind of award once, I&rsquo;m pretty sure', 'Remarkably unremarkable', 'A product of 13 billion years of trial and error', 'Well, this is awkward', 'Drafter of Ones and Zeroes', 'Comes with a medium drink and a side of your choice', 'Nothing to it'
		];

		var rand = taglines[Math.random() * taglines.length>>0];

		return rand;
	},

	init: function() {
		var tagline = this.getTagline();
		if (tagline.length) this.settings.taglineElem.innerHTML = tagline;
		this.settings.taglineElem.style.display = "block";
	}
};

(function() {
	Header.init();
})();