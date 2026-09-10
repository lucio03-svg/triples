document.addEventListener("DOMContentLoaded", function () {

    const carousels = document.querySelectorAll(".carousel");

    carousels.forEach(function (carousel) {

        const slides = carousel.querySelectorAll(".carousel-item");

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

    const memberModal = document.getElementById("memberModal");

    memberModal.addEventListener(
        "show.bs.modal",
        function (event) {

            const card = event.relatedTarget;

            const memberId = card.dataset.member;

            const member = members[memberId];

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

            const image = document.getElementById(
                "modalImage"
            );

            image.src = member.image;

            image.alt = member.name;


            // ==========================
            // COLOR
            // ==========================

            document.getElementById("modalColor")
                .style.backgroundColor = member.color;


            // Color del borde del modal

            const modalContent =
                document.querySelector(".member-modal-content");

            modalContent.style.borderColor = member.color;

            modalContent.style.setProperty( "--member-color", member.color);

        }
    );

});
