(function initSettings() {
    function getCookie(name) {
        let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match ? match[2] : null;
    }

    let gooset = document.querySelector(".gooset");
    if (!gooset) {
        document.body.insertAdjacentHTML("beforeend", `
            <div class="gooset-container" style="display:none;flex-direction:column;">
                <h1 style="color:white;text-align:left !important;margin-bottom:7px;border-bottom:1.5px solid white;">Goosettings <span style="font-size:17px;font-weight:normal;">for legacy</span><a class="textex">Apply Changes</a></h1>
                <div class="gooset" style="display:none;flex-direction:row !important;margin:7px !important;">
                    <ul>
                        <li class="gooset-general-li">General</li>
                        <li class="gooset-accessibility-li">Accessibility</li>
                        <li class="gooset-themes-li">Themes</li>
                        <li class="gooset-about-li">About</li>
                    </ul>
                    <div class="settings" style="display:flex;flex-direction:column !important; margin:10px !important"></div>
                </div>
            </div>
        `);
        gooset = document.querySelector(".gooset");
    }
    const style = document.querySelector(".settings-css");
    const footer = document.querySelector("footer");

    const genEl = document.querySelector('.gooset ul li:nth-child(1)');
    const assEl = document.querySelector('.gooset ul li:nth-child(2)');
    const themEl = document.querySelector('.gooset ul li:nth-child(3)');
    const aboEl = document.querySelector('.gooset ul li:nth-child(4)');

    function closeOrInit() {
        if (gooset) gooset.style.display = "none";
        if (style) style.disabled = true;
    }

    closeOrInit();

    if (footer && !document.querySelector(".eyecare")) {
        footer.insertAdjacentHTML("beforeend", "<ul class='link-bottom-ul'><li><a title='Toggle goosettings' class='eyecare'>Open Goosettings</a></li><li><a title='Visit the new site...' href='https://thegoosesite.github.io'>Open New Site</a></li></ul>");
    }

    const state = {
        contrastMode: false,
        duckMode: false,
        canadaTheme: false,
        homepage: "standard",
        trackers: true,
        secureconn: true,
        fontGlobal: localStorage.getItem("fontGlobal") !== null
    };
    
    if (localStorage.getItem("homepage") !== null){
        state.homepage = "search";
    }

    const settings = document.querySelector('.settings');
    const general = document.querySelector(".gooset-general-li");
    const accessibility = document.querySelector(".gooset-accessibility-li");
    const about = document.querySelector(".gooset-about-li");
    const themes = document.querySelector(".gooset-themes-li");
    const toggle = document.querySelector(".eyecare");

    if (toggle) {
        toggle.addEventListener("click", function() {
            if (gooset.style.display === "flex") {
                closeOrInit();
                toggle.textContent = "Open Goosettings";
            } else {
                if (style) style.disabled = false;
                gooset.style.display = "flex";
                toggle.parentElement.style.display = "none";
                toggle.style.display = "none";
                if (getCookie("duck_mode") === "on"){
                    state.duckMode = true;
                }
                if (getCookie("canada_goose") === "true") {
                    state.canadaTheme = true;
                    state.duckMode = false;
                    state.contrastMode = false;
                    state.fontGlobal = false;
                }
                if (getCookie("high_contrast") === "on"){
                    state.contrastMode = true;
                }
            }
        });
    }

    const generalScript = `<h2>General</h2>
            <strong>Default Start Page</strong>
            <label for="gooset-gen-homepage">Homepage:
            <select name="gooset-gen-homepage" id="gooset-gen-homepage">
                <option value="standard">Default (index.html)</option>
                <option value="search">Search Page (search/index.html)</option>
            </select>
            </label>
            <strong>Trackers</strong>
            <label for="trackers"><input id="trackers" name="trackers" type="checkbox" />Block known trackers from The Goose Site</label>
            <label for="secureconn"><input id="secureconn" name="secureconn" type="checkbox" />Enforce a secure (https) connection</label>
            <strong>Cookies</strong>
            <label for="cookies"><input name="cookies" type="checkbox" disabled checked />Use cookies</label>
            <span>(!) This cannot be disabled :[</span>`;

    const aboutScript = "<h2>About</h2><p style='overflow-y: auto;'>What started as an ongoing joke in a computer science class rapidly got out of hand. Zero of three people in that period remember the exact origin of the goose obsession. Rather quickly, it led to presentations, a religion, games, videos, and most importantly, a website.<br><br>With over twenty goose pages that include games, slideshows, videos, a bible, a search engine, and a wiki; The Goose Site is one of the largest Anseriformes-dedicated websites.</p>";
    
    const themeScript = `
        <h2>Themes</h2>
        <strong>Goose Experience Package (GEP)</strong>
        <label for="canada-check"><input id="canada-check" name="canada-check" type="checkbox" />Canada Goose</label>
        <i>Excuse me?????</i>
        `;
    
    const accessibilityScript = `<h2>Accessibility</h2><strong>Color Filters</strong><label><input class="ass-check" id="duck-mode-check" name="assCheck" type="checkbox" /> Enable Duck Mode</label><i>Best for gooselings who like dark mode...</i><label><input id="hi-co-check" name="assCheck" class="ass-check" type="checkbox" />Enable Vision Support</label><i>Great for gooselings who experience color blindness. Tested and proven.</i><br><strong>Cross System Features</strong><label><input type="checkbox" id="gooset-font-check" />Use a global font</label><i>Makes the site a little less GOOSE but forms a more readable enviroment on non-Microsoft devices.</i>`;

    function renderGeneral() {
        if (genEl) genEl.style.textShadow = "1px 0 0 currentColor";
        if (assEl) assEl.style.textShadow = "none";
        if (themEl) themEl.style.textShadow = "none";
        if (aboEl) aboEl.style.textShadow = "none";

        if (!settings) return;
        settings.innerHTML = generalScript;
        
        const homepageSelect = document.getElementById("gooset-gen-homepage");
        const trackersCheck = document.getElementById("trackers");
        const secureCheck = document.getElementById("secureconn");

        if (homepageSelect) homepageSelect.value = state.homepage;
        if (trackersCheck) trackersCheck.checked = state.trackers;
        if (secureCheck) secureCheck.checked = state.secureconn;

        if (homepageSelect) homepageSelect.addEventListener("change", (e) => { state.homepage = e.target.value; });
        if (trackersCheck) trackersCheck.addEventListener("change", (e) => { state.trackers = e.target.checked; });
        if (secureCheck) secureCheck.addEventListener("change", (e) => { state.secureconn = e.target.checked; });
    }

    function renderAccessibility() {
        if (genEl) genEl.style.textShadow = "none";
        if (assEl) assEl.style.textShadow = "1px 0 0 currentColor";
        if (themEl) themEl.style.textShadow = "none";
        if (aboEl) aboEl.style.textShadow = "none";

        if (!settings) return;
        settings.innerHTML = accessibilityScript;
        
        const duckCheck = document.getElementById("duck-mode-check");
        const hiCoCheck = document.getElementById("hi-co-check"); 
        const fontCheck = document.getElementById("gooset-font-check");

        function applyAccessibilityState() {
            const checks = [duckCheck, hiCoCheck, fontCheck];
            checks.forEach(check => {
                if (check) {
                    if (state.canadaTheme) {
                        check.checked = false;
                        check.disabled = true;
                    } else {
                        check.disabled = false;
                    }
                }
            });

            if (!state.canadaTheme) {
                if (duckCheck) duckCheck.checked = state.duckMode;
                if (hiCoCheck) hiCoCheck.checked = state.contrastMode;
                if (fontCheck) fontCheck.checked = state.fontGlobal;
            }
        }

        applyAccessibilityState();

        if (duckCheck) {
            duckCheck.addEventListener("change", (e) => {
                if (!state.canadaTheme) state.duckMode = e.target.checked;
            });
        }
        
        if (hiCoCheck) {
            hiCoCheck.addEventListener("change", (e) => { 
                if (!state.canadaTheme) state.contrastMode = e.target.checked;
            });
        }
        
        if (fontCheck) {
            fontCheck.addEventListener("change", (e) => { 
                if (!state.canadaTheme) state.fontGlobal = e.target.checked; 
            });
        }

        const assChecks = document.querySelectorAll('.ass-check');
        assChecks.forEach(assCheck => {
            assCheck.addEventListener('change', function() {
                if (this.checked && !state.canadaTheme) {
                    assChecks.forEach(aC => {
                        if (aC !== this) {
                            aC.checked = false;
                            if (aC.id === "duck-mode-check") state.duckMode = false;
                            if (aC.id === "hi-co-check") state.contrastMode = false;
                        }
                    });
                }
            });
        });
    }

    function renderThemes() {
        if (genEl) genEl.style.textShadow = "none";
        if (assEl) assEl.style.textShadow = "none";
        if (themEl) themEl.style.textShadow = "1px 0 0 currentColor";
        if (aboEl) aboEl.style.textShadow = "none";

        if (!settings) return;
        settings.innerHTML = themeScript;

        const canadaCheck = document.querySelector("#canada-check");
        if (canadaCheck) {
            canadaCheck.checked = state.canadaTheme;
            canadaCheck.addEventListener("change", (e) => {
                state.canadaTheme = e.target.checked;
                
                if (state.canadaTheme) {
                    state.duckMode = false;
                    state.contrastMode = false;
                    state.fontGlobal = false;
                }
            });
        }
    }

    renderGeneral();

    if (general) general.addEventListener("click", renderGeneral);
    if (accessibility) accessibility.addEventListener("click", renderAccessibility);
    if (about && settings) about.addEventListener("click", () => {
        if (genEl) genEl.style.textShadow = "none";
        if (assEl) assEl.style.textShadow = "none";
        if (themEl) themEl.style.textShadow = "none";
        if (aboEl) aboEl.style.textShadow = "1px 0 0 currentColor";
        settings.innerHTML = aboutScript; 
    });
    if (themes) themes.addEventListener("click", renderThemes);

    const closeBtn = document.querySelector(".textex");
    if (closeBtn) {
        closeBtn.addEventListener("click", function() {
            if (toggle) toggle.textContent = "Open Goosettings";

            if (state.duckMode) {
                document.cookie = "duck_mode=on; path=/";
            } else {
                document.cookie = "duck_mode=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            }
            if (state.contrastMode){
                document.cookie = "high_contrast=on;path=/";
            } else {
                document.cookie = "high_contrast=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            }
            if (state.canadaTheme) {
                document.cookie = "canada_goose=true;path=/";
            } else {
                document.cookie = "canada_goose=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            }

            if (state.homepage === "search") {
                localStorage.setItem("homepage", "search");
            } else {
                localStorage.removeItem("homepage");
            }
            if (state.fontGlobal) {
                localStorage.setItem("fontGlobal", "on");
            } else {
                localStorage.removeItem("fontGlobal");
            }
            window.location.search = "";
            closeOrInit();
            setTimeout(function() { window.location.reload(); }, 500);
        });
    }
})();