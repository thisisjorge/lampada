document.addEventListener('DOMContentLoaded', function() {
    const lamp = document.getElementById('lamp');
    const body = document.body;
    const instructionText = document.getElementById('instruction-text');
    const soundOn = document.getElementById('sound-on');
    const soundOff = document.getElementById('sound-off');
    
    let isLightOn = false;

    // Configurar volume dos sons (0.0 a 1.0)
    soundOn.volume = 0.5;
    soundOff.volume = 0.5;

    // Função para criar efeito de partículas
    function createLightParticles() {
        if (!isLightOn) return;
        
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'light-particle';
                
                // Obter posição da lâmpada de forma mais precisa
                const lampRect = lamp.getBoundingClientRect();
                const lampCenterX = lampRect.left + lampRect.width / 2;
                const lampTopY = lampRect.top + lampRect.height * 0.3;
                
                // Adicionar variação aleatória ao redor da lâmpada
                const randomX = lampCenterX + (Math.random() - 0.5) * lampRect.width * 0.8;
                const randomY = lampTopY + (Math.random() - 0.5) * 50;
                
                particle.style.left = randomX + 'px';
                particle.style.top = randomY + 'px';
                particle.style.position = 'fixed';
                
                document.body.appendChild(particle);
                
                // Remove a partícula após a animação
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }, 3000);
            }, i * 200);
        }
    }

    // Função para reproduzir som
    function playSound(audioElement) {
        // Reset do áudio para permitir reprodução múltipla
        audioElement.currentTime = 0;
        
        // Reproduz o som
        audioElement.play().catch(function(error) {
            console.log('Erro ao reproduzir áudio:', error);
            // Fallback: criar um som sintético se não conseguir carregar o arquivo
            createSyntheticSound(isLightOn);
        });
    }

    // Função para criar som sintético (fallback)
    function createSyntheticSound(turnOn) {
        if (typeof window.AudioContext !== 'undefined' || typeof window.webkitAudioContext !== 'undefined') {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const audioContext = new AudioContext();
            
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            if (turnOn) {
                // Som de ligar: frequência crescente
                oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.3);
            } else {
                // Som de desligar: frequência decrescente
                oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.3);
            }
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        }
    }

    // Event listener para clique na lâmpada
    lamp.addEventListener('click', function() {
        if (isLightOn) {
            // Desliga a luz
            body.classList.remove('light-on');
            lamp.src = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lamp_off-zF07L6jLy3fOrj1JXyjbtBB5BMCq5X.png';
            lamp.alt = 'Lâmpada apagada';
            instructionText.textContent = 'Clique na lâmpada para ligar';
            
            // Reproduz som de desligar
            playSound(soundOff);
            
        } else {
            // Liga a luz
            body.classList.add('light-on');
            lamp.src = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lamp_on-fkGcvXoXAPkV8rlxxYT44Re8nZay5J.png';
            lamp.alt = 'Lâmpada acesa';
            instructionText.textContent = 'Clique na lâmpada para desligar';
            
            // Reproduz som de ligar
            playSound(soundOn);
            
            // Cria efeito de partículas
            createLightParticles();
        }
        
        // Alterna o estado
        isLightOn = !isLightOn;
    });

    // Event listener para tecla de espaço (acessibilidade)
    document.addEventListener('keydown', function(event) {
        if (event.code === 'Space') {
            event.preventDefault();
            lamp.click();
        }
    });

    // Efeito de partículas contínuo quando a luz está ligada
    setInterval(createLightParticles, 2000);
});
