let menu =document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

window.onscroll = () => {
     menu.classList.remove('bx-x');
    navbar.classList.remove('active');
}

const typed = new Typed('.multiple-text', {
      strings: ['<i>Frontend Developer</i>', '<i>Web Developer</i>', '<i>UI/UX Designer</i>'],
      typeSpeed: 80,
      backSpeed: 80,
      bachDelay: 1200,
      loop: true,
    });

// Web3Forms Contact Form Handler
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const btnText = document.getElementById('btnText');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Disable button and show loading state
        submitBtn.disabled = true;
        btnText.textContent = 'Sending...';
        formMessage.style.display = 'none';
        
        try {
            // Create FormData from the form
            const formData = new FormData(contactForm);
            
            // Send to Web3Forms API
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            
            if (data.success) {
                // Show success message
                formMessage.style.display = 'block';
                formMessage.style.backgroundColor = 'rgba(81, 207, 102, 0.15)';
                formMessage.style.color = '#51cf66';
                formMessage.style.border = '1px solid #51cf66';
                formMessage.innerHTML = '<i class="bx bx-check-circle"></i> Message sent successfully!';
                
                // Reset form
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            } else {
                throw new Error(data.message || 'Something went wrong');
            }
        } catch (error) {
            // Show error message
            formMessage.style.display = 'block';
            formMessage.style.backgroundColor = 'rgba(255, 107, 107, 0.15)';
            formMessage.style.color = '#ff6b6b';
            formMessage.style.border = '1px solid #ff6b6b';
            formMessage.innerHTML = '<i class="bx bx-error-circle"></i> Failed to send message. Please try again.';
            console.error('Form submission error:', error);
        } finally {
            // Re-enable button
            submitBtn.disabled = false;
            btnText.textContent = 'Send Message';
        }
    });
}