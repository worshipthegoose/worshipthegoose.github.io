document.addEventListener("DOMContentLoaded", function () {
    const PAGES = [
        {
            title: "Front Page",
            url: "/",
            content: "Welcome to everyone except Saam! Repent your goosins at St. Duck's Church, view our great bulletin board, and gooseling.",
            keywords: "home, welcome, main, index, goose, goosism, repent, worship"
        },
        {
            title: "The Unity Videos",
            url: "/videos",
            content: "Worship, pray, and repent with the unity videos.",
            keywords: "goosevideos, quiteholy, channel, videos, unity"
        },
        {
            title: "The Trinity Slideshows",
            url: "/powerpoint",
            content: "Pray with the trinity slideshows...",
            keywords: "slides, powerpoint, microsoft, trinity, slideshow, slideshows"
        },
        {
            title: "The Holy Goose Bible",
            url: "/bible",
            content: "Read the holy goose bible and cherish it for dear life.",
            keywords: "quran, bible, book, holy"
        },
        {
            title: "Dancing Monster",
            url: "/saint-rainbowhairs",
            content: "A goose page dedicated to Saint Duck's nephew *twice removed*.",
            keywords: "canon, dancingmonster, monster, rainbowhairs"
        },
        {
            title: "Interactives",
            url: "/interactives",
            content: "Goose games coded in HTML5!",
            keywords: "interactives, games, goosegames, breakout, brickbreaker, pong"
        },
        {
            title: "Youtube Channel",
            url: "/youtube",
            content: "The great Youtube channel.... subscribe or die.",
            keywords: "unity, youtube, channel, videos"
        },
        {
            title: "Gooseling-only Page",
            url: "/gooseling",
            content: "Sacred page for gooselings ONLY...",
            keywords: "secret, gooseling, goose, sacredpage, gooselingonly, developer, gosedev, goosedev, goosedevs, gosedevs"
        }
    ];

    
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');


    function performSearch(query) {
        searchResults.style.display="flex";
        searchResults.innerHTML = '';
        
        const cleanQuery = query.toLowerCase().trim();
        
        if (cleanQuery === '') {
            searchResults.style.display="none";
            return; 
        }
        
        const filteredPages = PAGES.filter(page => {
            return page.title.toLowerCase().includes(cleanQuery) || 
                   page.content.toLowerCase().includes(cleanQuery) || 
                   page.keywords.toLowerCase().includes(cleanQuery);
        });
        
        if (filteredPages.length === 0) {
            searchResults.innerHTML = '<li class="no-results">No pages found matching your search.</li>';
        } else {
            filteredPages.forEach(page => {
                const li = document.createElement('li');
                li.className = 'result-item';
                
                // Create standard snippet from content
                let snippet = page.content;
                if (snippet.length > 120) {
                    snippet = snippet.substring(0, 120) + '...';
                }

                li.innerHTML = `
                    <h2><a href="${page.url}">${page.title}</a></h2>
                    <p>${snippet}</p>
                `;
                searchResults.appendChild(li);
            });
        }
    } 
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            performSearch(e.target.value);
        });
    }
}); 
