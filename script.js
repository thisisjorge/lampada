document.addEventListener('DOMContentLoaded', function() {
    const lamp = document.getElementById('lamp');
    const body = document.body;
    let isLightOn = false;

    lamp.addEventListener('click', function() {
        if (isLightOn) {
            // Desliga a luz
            body.style.background = 'radial-gradient(circle, white 8%, black 100%)';
            lamp.src = 'assets/lamp_off.png';
            lamp.alt = 'Lâmpada apagada';
        } else {
            // Liga a luz
            body.style.background = 'radial-gradient(circle, white 8%, white 100%)';
            lamp.src = 'assets/lamp_on.png';
            lamp.alt = 'Lâmpada acesa';
        }
        
        // Alterna o estado
        isLightOn = !isLightOn;
    });
});