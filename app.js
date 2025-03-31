// Importando as funções do SDK do Firebase
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"; 

// Configuração do Firebase (copiado do console do Firebase)
const firebaseConfig = {
  apiKey: "AIzaSyCAgo8BbtCRTkUvqwPMIJTq4hUsBCXvaEo",
  authDomain: "projeto-troca-78f8c.firebaseapp.com",
  projectId: "projeto-troca-78f8c",
  storageBucket: "projeto-troca-78f8c.firebasestorage.app",
  messagingSenderId: "262913602560",
  appId: "1:262913602560:web:ed38fff0ba12e11999d4e5",
  measurementId: "G-YX9FYEXWQ9"
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);

// Inicializando o Firestore
const db = getFirestore(app);

// Função para registrar compartilhamento
async function registrarCompartilhamento(userId) {
    const userRef = doc(db, "compartilhamentos", userId);
    const docSnap = await getDoc(userRef);

    let count = 0;
    if (docSnap.exists()) {
        count = docSnap.data().quantidade || 0;
    }

    await setDoc(userRef, { quantidade: count + 1 });
    document.getElementById("count").innerText = count + 1;
}

// Evento de clique no botão de compartilhamento
document.getElementById("shareButton").addEventListener("click", async () => {
    console.log("Botão clicado!");  // Verifique se isso aparece no console

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

        console.log("Compartilhamento feito com sucesso!");
    } catch (error) {
        console.error("Erro ao compartilhar:", error);
    }
});
