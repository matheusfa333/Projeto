document.getElementById("shareButton").addEventListener("click", async () => {
    if (navigator.share) {
        try {
            await navigator.share({
                title: "Ganhe uma muda!",
                text: "Compartilhe este link para ganhar uma muda de planta!",
                url: window.location.href,
            });
            console.log("Compartilhamento realizado com sucesso!");
        } catch (error) {
            console.error("Erro ao compartilhar:", error);
        }
    } else {
        alert("Compartilhamento não suportado neste navegador!");
    }
});
