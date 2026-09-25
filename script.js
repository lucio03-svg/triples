document.addEventListener("DOMContentLoaded", function () {


    // =================================
    // CARRUSELES
    // =================================

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
                // IMAGEN
                // ==========================

                const image =
                    document.getElementById(
                        "modalImage"
                    );

                image.src = member.image;

                image.alt = member.name;


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
