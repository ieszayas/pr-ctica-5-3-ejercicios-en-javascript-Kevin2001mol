
        const players = [
            { name: "Lewandowski", position: "Delantero", age: 35, number: 9, nationality: "Polonia", img: "../media/lewan.jpg" },
            { name: "Ter Stegen", position: "Portero", age: 31, number: 1, nationality: "Alemania", img: "../media/terstegen.jpg" },
            { name: "Pedri", position: "Centrocampista", age: 21, number: 8, nationality: "España", img: "../media/pedri.jpg" },
            { name: "Iñaki Peña", position: "Portero", age: 25, number: 13, nationality: "España", img: "../media/iñaki.webp" },
            { name: "Wojciech Szczesny", position: "Portero", age: 34, number: 25, nationality: "Polonia", img: "../media/chesni.jpg" },
            { name: "Ander Astralaga", position: "Portero", age: 20, number: 26, nationality: "España", img: "../media/astralaga.webp" },
            { name: "Pau Cubarsi", position: "Defensa", age: 18, number: 2, nationality: "España", img: "../media/cubarsi.jpg" },
            { name: "Ronald Araujo", position: "Defensa", age: 25, number: 4, nationality: "Uruguay", img: "../media/araujo.webp" },
            { name: "Andreas Christensen", position: "Defensa", age: 28, number: 15, nationality: "Dinamarca", img: "../media/christensen.webp" },
            { name: "Eric Garcia", position: "Defensa", age: 24, number: 24, nationality: "España", img: "../media/eric.jpg" },
            { name: "Iñigo Martinez", position: "Defensa", age: 33, number: 5, nationality: "España", img: "../media/iñigo.jpg" },
            { name: "Sergi Dominguez", position: "Defensa", age: 19, number: 36, nationality: "España", img: "../media/sergi.webp" },
            { name: "Alejandro Balde", position: "Defensa", age: 21, number: 3, nationality: "España", img: "../media/balde.webp" },
            { name: "Gerard Martin", position: "Defensa", age: 22, number: 35, nationality: "España", img: "../media/gerard.webp" },
            { name: "Jules Kounde", position: "Defensa", age: 26, number: 23, nationality: "Francia", img: "../media/kounde.webp" },
            { name: "Hector Fort", position: "Defensa", age: 18, number: 32, nationality: "España", img: "../media/fort.jpg" },
            { name: "Marc Casado", position: "Centrocampista", age: 21, number: 17, nationality: "España", img: "../media/casado.jpg" },
            { name: "Marc Bernal", position: "Centrocampista", age: 17, number: 28, nationality: "España", img: "../media/bernal.webp" },
            { name: "Gavi", position: "Centrocampista", age: 20, number: 6, nationality: "España", img: "../media/gavi.jpg" },
            { name: "Fermin Lopez", position: "Centrocampista", age: 21, number: 16, nationality: "España", img: "../media/fermin.jpg" },
            { name: "Frenkie de Jong", position: "Centrocampista", age: 27, number: 21, nationality: "Países Bajos", img: "../media/frenkie.jpg" },
            { name: "Dani Olmo", position: "Centrocampista", age: 26, number: 20, nationality: "España", img: "../media/olmo.jpg" },
            { name: "Pablo Torre", position: "Centrocampista", age: 21, number: 14, nationality: "España", img: "../media/pabloTorre.jpg" },
            { name: "Raphinha", position: "Delantero", age: 28, number: 11, nationality: "Brasil", img: "../media/raphinha.jpg" },
            { name: "Ansu Fati", position: "Delantero", age: 22, number: 10, nationality: "España", img: "../media/ansu.jpg" },
            { name: "Lamine Yamal", position: "Delantero", age: 17, number: 19, nationality: "España", img: "../media/lamineY.webp" },
            { name: "Ferran Torres", position: "Delantero", age: 24, number: 7, nationality: "España", img: "../media/ferran.jpg" },
            { name: "Pau Victor", position: "Delantero", age: 23, number: 18, nationality: "España", img: "../media/pauVictor.webp" }
        ];


        let attempts = 4;
        let mysteryPlayer;
        let guessedPlayers = [];

        function startGame() {
            mysteryPlayer = players[Math.floor(Math.random() * players.length)];
            document.getElementById("player-image").src = mysteryPlayer.img;
            document.getElementById("player-image").style.filter = "blur(20px)";
            document.getElementById("guess-input").value = "";
            document.getElementById("hints").innerHTML = "";
            document.getElementById("attempts").innerText = "Intentos restantes: 4";
            document.getElementById("new-game").style.display = "none";
            document.getElementById("new-game").disabled = true;
            attempts = 4;
            guessedPlayers = [];
        }

        window.onload = startGame;

        function showToast() {
            const toastElement = document.getElementById('toastLimpiar');
            const toast = new bootstrap.Toast(toastElement);
            toast.show();
        }

        function checkGuess() {
            if (attempts <= 0) return;

            let guess = document.getElementById("guess-input").value.trim();
            let foundPlayer = players.find(p => p.name.toLowerCase() === guess.toLowerCase());

            if (guessedPlayers.includes(guess.toLowerCase())) {
                showToast(); // Mostrar el toast
                return;
            }

            if (!foundPlayer) {
                alert("Jugador no encontrado en la lista.");
                return;
            }

            guessedPlayers.push(guess.toLowerCase());
            attempts--;
            document.getElementById("attempts").innerText = `Intentos restantes: ${attempts}`;

            if (foundPlayer.name === mysteryPlayer.name) {
                document.getElementById("player-image").style.filter = "blur(0px)";
                document.getElementById("hints").innerHTML = `<h2>¡Correcto! Era ${mysteryPlayer.name}.</h2>`;
                document.getElementById("new-game").style.display = "inline";
                document.getElementById("new-game").disabled = false;
            } else {
                let ageHint = '';
                if (foundPlayer.age < mysteryPlayer.age) {
                    ageHint = '⬆️';
                } else if (foundPlayer.age > mysteryPlayer.age) {
                    ageHint = '⬇️';
                } else {
                    ageHint = '✅';
                }

                let numberHint = '';
                if (foundPlayer.number < mysteryPlayer.number) {
                    numberHint = '⬆️';
                } else if (foundPlayer.number > mysteryPlayer.number) {
                    numberHint = '⬇️';
                } else {
                    numberHint = '✅';
                }

                let hints = `<div class='hint'>
            Nombre: ${guess} ❌<br>
            Posición: ${foundPlayer.position === mysteryPlayer.position ? '✅' : '❌'} (${foundPlayer.position})<br>
            Edad: ${ageHint} (${foundPlayer.age})<br>
            Dorsal: ${numberHint} (${foundPlayer.number})<br>
            Nacionalidad: ${foundPlayer.nationality === mysteryPlayer.nationality ? '✅' : '❌'} (${foundPlayer.nationality})
        </div>`;
                document.getElementById("hints").innerHTML += hints;
                document.getElementById("player-image").style.filter = `blur(${20 - (4 - attempts) * 3}px)`;
            }

            if (attempts === 0) {
                document.getElementById("hints").innerHTML = `<h2>Se acabaron los intentos. El jugador era: ${mysteryPlayer.name}</h2>`;
                document.getElementById("player-image").style.filter = "blur(0px)";
                document.getElementById("new-game").style.display = "inline";
                document.getElementById("new-game").disabled = false;
            }
        }

        document.getElementById("new-game").onclick = startGame;
