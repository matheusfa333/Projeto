// Verifica se o Firebase está carregado
if (typeof firebase === "undefined") {
    console.error("Erro: Firebase não carregado corretamente!");
} else {
    console.log("Firebase carregado!");

    // Configuração do Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyCAgo8BbtCRTkUvqwPMIJTq4hUsBCXvaEo",
        authDomain: "projeto-troca-78f8c.firebaseapp.com",
        projectId: "projeto-troca-78f8c",
        storageBucket: "projeto-troca-78f8c.appspot.com",
        messagingSenderId: "262913602560",
        appId: "1:262913602560:web:ed38fff0ba12e11999d4e5",
        measurementId: "G-YX9FYEXWQ9"
    };

    // Inicializa o Firebase
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();
    console.log("Firebase inicializado com sucesso!");

    // Referência ao botão de compartilhar
    const shareButton = document.getElementById("shareButton");
    const countSpan = document.getElementById("count");

    // Pega o ID do usuário (simplesmente gerando um ID único para cada pessoa)
    let userId = localStorage.getItem("userId");
    if (!userId) {
        userId = "user_" + Math.random().toString(36).substring(2, 15);
        localStorage.setItem("userId", userId);
    }

    // Atualiza a contagem do banco de dados
    async function updateShareCount() {
        try {
            const userRef = db.collection("compartilhamentos").doc(userId);
            const doc = await userRef.get();

            let shareCount = 0;
            if (doc.exists) {
                shareCount = doc.data().count || 0;
            }

            shareCount++;
            await userRef.set({ count: shareCount });

            countSpan.innerText = shareCount;
            console.log("Compartilhamento atualizado:", shareCount);

            if (shareCount >= 15) {
                alert("Parabéns! Você atingiu 15 compartilhamentos e pode resgatar sua muda!");
            }
        } catch (error) {
            console.error("Erro ao atualizar compartilhamentos:", error);
        }
    }

    // Evento de clique no botão de compartilhamento
    shareButton.addEventListener("click", async () => {
        console.log("Botão de compartilhar clicado!");

        if (!navigator.share) {
            alert("Compartilhamento não suportado neste navegador!");
            return;
        }

        try {
            await navigator.share({
                title: "Ganhe uma muda!",
                text: "Compartilhe este link para ganhar uma muda de planta!",
                url: window.location.href,
            });

            console.log("Compartilhamento realizado com sucesso!");
            updateShareCount();
        } catch (error) {
            console.error("Erro ao compartilhar:", error);
        }
    });

    // Pega a contagem inicial ao carregar a página
    async function loadInitialCount() {
        try {
            const userRef = db.collection("compartilhamentos").doc(userId);
            const doc = await userRef.get();
            if (doc.exists) {
                countSpan.innerText = doc.data().count || 0;
            }
        } catch (error) {
            console.error("Erro ao carregar compartilhamentos:", error);
        }
    }

    loadInitialCount();
}
