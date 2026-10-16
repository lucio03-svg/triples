document.addEventListener("DOMContentLoaded", function () {

    // =================================
    // TARJETAS DE INTEGRANTES
    // =================================

    const miembros = [
        { n: 1,  key: "seoyeon",  name: "Yoon Seo-Yeon",  age: 23, flag: "kr", color: "#1E90FF" },
        { n: 2,  key: "hyerin",   name: "Jeong Hye-Rin",  age: 19, flag: "kr", color: "#8B5FBF" },
        { n: 3,  key: "jiwoo",    name: "Lee Ji-Woo",     age: 21, flag: "kr", color: "#FFF44F" },
        { n: 4,  key: "chaeyeon", name: "Kim Chae-Yeon",  age: 21, flag: "kr", color: "#7CB342" },
        { n: 5,  key: "yooyeon",  name: "Kim Yoo-Yeon",   age: 25, flag: "kr", color: "#F47CB4" },
        { n: 6,  key: "soomin",   name: "Kim Soo-Min",    age: 19, flag: "kr", color: "#F091A9" },
        { n: 7,  key: "nakyoung", name: "Kim Na-Kyoung",  age: 24, flag: "kr", color: "#5F9EA0" },
        { n: 8,  key: "yubin",    name: "Gong Yu-Bin",    age: 21, flag: "kr", color: "#FFE4E1" },
        { n: 9,  key: "kaede",    name: "Kaede",          age: 20, flag: "jp", color: "#FFCC33" },
        { n: 10, key: "dahyun",   name: "Seo Da-Hyun",    age: 23, flag: "kr", color: "#FBAED2" },
        { n: 11, key: "kotone",   name: "Kotone",         age: 22, flag: "jp", color: "#FFDF00" },
        { n: 12, key: "yeonji",   name: "Kwak Yeon-Ji",   age: 18, flag: "kr", color: "#4169E1" },
        { n: 13, key: "nien",     name: "Nien",           age: 23, flag: "tw", color: "#FFA343" },
        { n: 14, key: "sohyun",   name: "Park So-Hyun",   age: 24, flag: "kr", color: "#1034A6" },
        { n: 15, key: "xinyu",    name: "Xinyu",          age: 24, flag: "cn", color: "#C80815" },
        { n: 16, key: "mayu",     name: "Mayu",           age: 24, flag: "jp", color: "#FFA089" },
        { n: 17, key: "lynn",     name: "Lynn",           age: 20, flag: "jp", color: "#9955BB" },
        { n: 18, key: "joobin",   name: "Joo-Bin",        age: 17, flag: "kr", color: "#ACDD4D" },
        { n: 19, key: "hayeon",   name: "Jeong Ha-Yeon",  age: 19, flag: "kr", color: "#48D1CC" },
        { n: 20, key: "shion",    name: "Park Shi-On",    age: 20, flag: "kr", color: "#F64A8A" },
        { n: 21, key: "chaewon",  name: "Kim Chae-Won",   age: 19, flag: "kr", color: "#C9A0DC" },
        { n: 22, key: "sullin",   name: "Sullin",         age: 19, flag: "th", color: "#8FBC8F"},
        { n: 23, key: "seoah",    name: "Seo-Ah",         age: 16, flag: "kr", color: "#E0FFFF"},
        { n: 24, key: "jiyeon",   name: "Ji-Yeon",        age: 22, flag: "kr", color: "#FCAA67" }
    ];

    const grid = document.getElementById("members-grid");

    grid.innerHTML = miembros.map((m, i) => `
        <div class="col-6 col-md-4 col-lg-3 col-xl-2">
            <div class="member-card" id="s${m.n}"
                data-bs-toggle="modal" data-bs-target="#memberModal"
                data-member="${m.key}"
                style="--color: ${m.color}">
            <div class="member-avatar">S${m.n}</div>
            <div class="member-info">
                <span>S${m.n} ${m.name}</span>
                <h5>${m.age} Años</h5>
                <h6 class="fi fi-${m.flag}"></h6>
            </div>
            </div>
        </div>
        `).join("");

    // =================================
    // CARRUSELES
    // =================================

    function getYouTubeId(url) {
        try {
            const u = new URL(url);
            if (u.hostname === "youtu.be") return u.pathname.slice(1);
            return u.searchParams.get("v");
        } catch {
            return null;
        }
    }

    document.querySelectorAll("#subunidades .carousel").forEach(carousel => {

        // 1) Reemplazar cada imagen por un iframe de YouTube
        carousel.querySelectorAll(".carousel-item").forEach(item => {
            const img = item.querySelector("img");
            const link = item.querySelector(".mv-button");
            const id = link && getYouTubeId(link.href);
            if (!img || !id) return;

            const wrapper = document.createElement("div");
            wrapper.className = "ratio ratio-16x9";

            const iframe = document.createElement("iframe");
            iframe.dataset.src = "https://www.youtube-nocookie.com/embed/" + id;
            iframe.title = link.getAttribute("title") || img.alt;
            iframe.allow = "accelerometer; encrypted-media; gyroscope; picture-in-picture";
            iframe.allowFullscreen = true;

            wrapper.appendChild(iframe);
            img.replaceWith(wrapper);
            link.classList.add("d-none");   // oculta el botón "Ver MV"
        });

        // 2) Cargar solo el video que se ve
        const frames = () => carousel.querySelectorAll("iframe");

        const load = f => {
            if (f && f.dataset.src && f.getAttribute("src") !== f.dataset.src) {
                f.setAttribute("src", f.dataset.src);
            }
        };
        const unload = f => {
            if (f.getAttribute("src")) f.setAttribute("src", "about:blank");
        };

        load(frames()[0]);

        carousel.addEventListener("slide.bs.carousel", e => load(frames()[e.to]));

        carousel.addEventListener("slid.bs.carousel", e => {
            frames().forEach((f, i) => { if (i !== e.to) unload(f); });
        });
    });

    const carousels =
        document.querySelectorAll(".carousel");

    carousels.forEach(function (carousel) {

        const slides =
            carousel.querySelectorAll(".carousel-item");

        const currentSlide =
            carousel.querySelector(".current-slide");

        const totalSlides =
            carousel.querySelector(".total-slides");


        // Cantidad total

        totalSlides.textContent =
            String(slides.length).padStart(2, "0");


        // Slide inicial

        currentSlide.textContent = "01";


        // Cuando cambia el slide

        carousel.addEventListener(
            "slid.bs.carousel",
            function (event) {

                const index = event.to + 1;

                currentSlide.textContent =
                    String(index).padStart(2, "0");

            }
        );

    });


    // =================================
    // DATOS DE INTEGRANTES
    // =================================

    let members = {};


    // =================================
    // CARGAR DATOS DESDE JSON
    // =================================

    fetch("Miembros.json")
        .then(response => response.json())
        .then(data => {

            members = data;

        })
        .catch(error => {

            console.error(
                "Error al cargar members.json:",
                error
            );

        });


    // =================================
    // MODAL DINÁMICO DE INTEGRANTES
    // =================================

    const memberModal =
        document.getElementById("memberModal");


    if (memberModal) {

        memberModal.addEventListener(
            "show.bs.modal",
            function (event) {

                const card =
                    event.relatedTarget;

                const memberId =
                    card.dataset.member;

                const member =
                    members[memberId];


                if (!member) {

                    console.error(
                        "No se encontró la integrante:",
                        memberId
                    );

                    return;

                }


                // ==========================
                // INFORMACIÓN
                // ==========================

                document.getElementById("modalName")
                    .textContent = member.name;

                document.getElementById("modalS")
                    .textContent = member.s;

                document.getElementById("modalRealName")
                    .textContent = member.realName;

                document.getElementById("modalBirth")
                    .textContent = member.birth;

                document.getElementById("modalCountry")
                    .textContent = member.country;

                document.getElementById("modalUnit")
                    .textContent = member.unit;

                document.getElementById("modalEmoji")
                    .textContent = member.emoji;

                document.getElementById("modalDescription")
                    .textContent = member.description;

                // ==========================
                // INSTAGRAM
                // ==========================

                const igBox = document.getElementById("modalInstagram");
                const posts = member.instagram || [];

                igBox.innerHTML = posts.length
                    ? posts.map(url => `
                        <blockquote class="instagram-media"
                            data-instgrm-permalink="${url}"
                            data-instgrm-version="14"
                            style="max-width:540px; width:100%; margin:0 auto 1rem;">
                        </blockquote>`).join("")
                    : "<p class='text-muted'>Todavía no hay publicaciones para mostrar.</p>";


                // ==========================
                // COLOR
                // ==========================

                document.getElementById(
                    "modalColor"
                ).style.backgroundColor =
                    member.color;


                // Color del borde del modal

                const modalContent =
                    document.querySelector(
                        ".member-modal-content"
                    );


                modalContent.style.borderColor =
                    member.color;


                modalContent.style.setProperty(
                    "--member-color",
                    member.color
                );

            }
        );

        memberModal.addEventListener("shown.bs.modal", function () {
            
            if (window.instgrm) window.instgrm.Embeds.process();

        });

        memberModal.addEventListener("hidden.bs.modal", function () {

            document.getElementById("modalInstagram").innerHTML = "";

        });

    }


    // =================================
    // YOUTUBE PLAYER
    // =================================

    const youtubeContainer =
        document.getElementById(
            "youtube-player"
        );


    // Si la página no tiene el reproductor,
    // no hacemos nada.

    if (!youtubeContainer) {
        return;
    }


    // =================================
    // ID DE LA PLAYLIST
    // =================================

    const YOUTUBE_PLAYLIST_ID =
        "PLSrcfugRVzc5niupj3wkMVqvC6_cMTfq5";


    // =================================
    // CARGAR YOUTUBE IFRAME API
    // =================================

    const youtubeScript =
        document.createElement("script");

    youtubeScript.src =
        "https://www.youtube.com/iframe_api";

    document.head.appendChild(youtubeScript);


    // =================================
    // VARIABLE DEL REPRODUCTOR
    // =================================

    let youtubePlayer;


    // =================================
    // CREAR REPRODUCTOR
    // =================================

    window.onYouTubeIframeAPIReady =
        function () {

            youtubePlayer =
                new YT.Player(
                    "youtube-player",
                    {

                        width: "100%",

                        height: "100%",


                        playerVars: {

                            listType:
                                "playlist",

                            list:
                                YOUTUBE_PLAYLIST_ID,

                            playsinline: 1,

                            rel: 0

                        },


                        events: {

                            onReady:
                                onYouTubeReady,

                            onStateChange:
                                onYouTubeStateChange

                        }

                    }
                );

        };


    // =================================
    // PLAYER READY
    // =================================

    function onYouTubeReady() {

        updateYouTubeTrack();

    }


    // =================================
    // CAMBIO DE ESTADO
    // =================================

    function onYouTubeStateChange(event) {

        const playButton =
            document.getElementById("play-btn");


        if (!playButton) {
            return;
        }


        const icon =
            playButton.querySelector("i");


        if (!icon) {
            return;
        }


        if (
            event.data ===
            YT.PlayerState.PLAYING
        ) {

            // Cambiar a PAUSA

            icon.classList.remove(
                "bi-play-fill"
            );

            icon.classList.add(
                "bi-pause-fill"
            );

            playButton.setAttribute(
                "aria-label",
                "Pausar"
            );

        } else {

            // Cambiar a PLAY

            icon.classList.remove(
                "bi-pause-fill"
            );

            icon.classList.add(
                "bi-play-fill"
            );

            playButton.setAttribute(
                "aria-label",
                "Reproducir"
            );

        }


        updateYouTubeTrack();

    }


    // =================================
    // PLAY / PAUSE
    // =================================

    const playButton =
        document.getElementById(
            "play-btn"
        );


    if (playButton) {

        playButton.addEventListener(
            "click",
            function () {

                if (!youtubePlayer) {
                    return;
                }


                const state =
                    youtubePlayer.getPlayerState();


                if (
                    state ===
                    YT.PlayerState.PLAYING
                ) {

                    youtubePlayer.pauseVideo();

                } else {

                    youtubePlayer.playVideo();

                }

            }
        );

    }


    // =================================
    // ANTERIOR
    // =================================

    const previousButton =
        document.getElementById(
            "previous-btn"
        );


    if (previousButton) {

        previousButton.addEventListener(
            "click",
            function () {

                if (youtubePlayer) {

                    youtubePlayer.previousVideo();

                }

            }
        );

    }


    // =================================
    // SIGUIENTE
    // =================================

    const nextButton =
        document.getElementById(
            "next-btn"
        );


    if (nextButton) {

        nextButton.addEventListener(
            "click",
            function () {

                if (youtubePlayer) {

                    youtubePlayer.nextVideo();

                }

            }
        );

    }


    // =================================
    // BARRA DE PROGRESO
    // =================================

    const progressBar =
        document.getElementById(
            "progress-bar"
        );


    if (progressBar) {

        progressBar.addEventListener(
            "input",
            function () {

                if (!youtubePlayer) {
                    return;
                }


                const duration =
                    youtubePlayer.getDuration();


                const position =
                    (this.value / 100) *
                    duration;


                youtubePlayer.seekTo(
                    position,
                    true
                );

            }
        );

    }


    // =================================
    // ACTUALIZAR PROGRESO
    // =================================

    setInterval(function () {

        if (!youtubePlayer) {
            return;
        }


        if (
            typeof youtubePlayer.getCurrentTime !==
            "function"
        ) {

            return;

        }


        const current =
            youtubePlayer.getCurrentTime();


        const duration =
            youtubePlayer.getDuration();


        if (!duration) {
            return;
        }


        const percentage =
            (current / duration) * 100;


        if (progressBar) {

            progressBar.value =
                percentage;

        }


        const currentTime =
            document.getElementById(
                "current-time"
            );


        const durationElement =
            document.getElementById(
                "duration"
            );


        if (currentTime) {

            currentTime.textContent =
                formatTime(current);

        }


        if (durationElement) {

            durationElement.textContent =
                formatTime(duration);

        }

    }, 500);


    // =================================
    // VOLUMEN
    // =================================

    const volumeBar =
        document.getElementById("volume-bar");

    const volumeButton =
        document.getElementById("volume-btn");

    let previousVolume = 100;


    /* Cambiar volumen */

    if (volumeBar) {

        volumeBar.addEventListener(
            "input",
            function () {

                if (!youtubePlayer) {
                    return;
                }

                const volume =
                    Number(this.value);

                youtubePlayer.setVolume(volume);

                updateVolumeIcon(volume);

            }
        );

    }


    /* Silenciar / activar */

    if (volumeButton) {

        volumeButton.addEventListener(
            "click",
            function () {

                if (!youtubePlayer) {
                    return;
                }

                const volume =
                    youtubePlayer.getVolume();


                if (volume > 0) {

                    previousVolume = volume;

                    youtubePlayer.setVolume(0);

                    volumeBar.value = 0;

                    updateVolumeIcon(0);

                } else {

                    youtubePlayer.setVolume(
                        previousVolume
                    );

                    volumeBar.value =
                        previousVolume;

                    updateVolumeIcon(
                        previousVolume
                    );

                }

            }
        );

    }


    /* =================================
    ICONO DEL VOLUMEN
    ================================= */

    function updateVolumeIcon(volume) {

        if (!volumeButton) {
            return;
        }


        const icon =
            volumeButton.querySelector("i");


        if (!icon) {
            return;
        }


        // Quitar iconos anteriores

        icon.classList.remove(
            "bi-volume-mute-fill",
            "bi-volume-down-fill",
            "bi-volume-up-fill"
        );


        // Volumen apagado

        if (volume === 0) {

            icon.classList.add(
                "bi-volume-mute-fill"
            );

            volumeButton.setAttribute(
                "aria-label",
                "Activar sonido"
            );

        }

        // Volumen bajo

        else if (volume <= 50) {

            icon.classList.add(
                "bi-volume-down-fill"
            );

            volumeButton.setAttribute(
                "aria-label",
                "Silenciar"
            );

        }

        // Volumen alto

        else {

            icon.classList.add(
                "bi-volume-up-fill"
            );

            volumeButton.setAttribute(
                "aria-label",
                "Silenciar"
            );

        }

    }


    // =================================
    // INFORMACIÓN DE LA CANCIÓN
    // =================================

    function updateYouTubeTrack() {

        if (!youtubePlayer) {
            return;
        }


        const data =
            youtubePlayer.getVideoData();


        if (!data) {
            return;
        }


        const title =
            data.title;


        const titleElement =
            document.getElementById(
                "track-title"
            );


        if (
            titleElement &&
            title
        ) {

            titleElement.textContent =
                title;

        }


        const playlist =
            youtubePlayer.getPlaylist();


        const index =
            youtubePlayer.getPlaylistIndex();


        const trackIndex =
            document.getElementById(
                "track-index"
            );


        if (
            playlist &&
            index >= 0 &&
            trackIndex
        ) {

            trackIndex.textContent =
                `Canción ${index + 1} de ${playlist.length}`;

        }

    }


    // =================================
    // FORMATO DE TIEMPO
    // =================================

    function formatTime(seconds) {

        seconds =
            Math.floor(seconds);


        const minutes =
            Math.floor(seconds / 60);


        const remaining =
            seconds % 60;


        return (
            minutes +
            ":" +
            remaining
                .toString()
                .padStart(2, "0")
        );

    }

});
