 let html5QrCode = null;

        function showScreen(screenId) {
            document.getElementById("homeScreen").style.display = "none";
            document.getElementById("scannerScreen").style.display = "none";
            document.getElementById("resultScreen").style.display = "none";
            document.getElementById(screenId).style.display = "flex";
        }

        function startCamera() {
            showScreen("scannerScreen");

            setTimeout(() => {
                html5QrCode = new Html5Qrcode("reader");

                const config = {
                    fps: 10,
                    qrbox: { width: 250, height: 250 }
                };

                html5QrCode.start(
                    { facingMode: "environment" },
                    config,
                    onScanSuccess,
                    onScanError
                ).catch(err => {
                    alert("Camera error: " + err);
                    goHome();
                });
            }, 300);
        }

        function onScanSuccess(decodedText) {
            stopCamera();

            const result = document.getElementById("result");

            if (decodedText.startsWith("http://") || decodedText.startsWith("https://")) {
                result.innerHTML = `<a href="${decodedText}" target="_blank" class="qr-link">${decodedText}</a>`;
            } else {
                result.innerText = decodedText;
            }

            showScreen("resultScreen");
        }

        function onScanError(errorMessage) {
            // keep empty
        }

        function stopCamera() {
            if (html5QrCode) {
                html5QrCode.stop().then(() => {
                    html5QrCode.clear();
                    html5QrCode = null;
                }).catch(() => {});
            }
        }

        function goHome() {
            stopCamera();
            document.getElementById("result").innerHTML = "";
            showScreen("homeScreen");
        }