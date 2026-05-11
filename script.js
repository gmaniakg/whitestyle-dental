// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1000,
        offset: 100,
        once: true,
        easing: 'ease-out-cubic'
    });
    
    // CountUp Animation Trigger
    initCounters();
});

// Header Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth Scrolling for Nav Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Mobile Menu Toggle
const menuBtn = document.querySelector('.mobile-menu-btn');
menuBtn.addEventListener('click', () => {
    alert("모바일 메뉴 기능은 실제 개발 시 사이드바나 풀스크린 메뉴로 구현됩니다.");
});

// CountUp Animation Logic
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower

    const startCounter = (counter) => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            
            // Lower inc to slow and higher to speed up
            const inc = target / speed;

            if (count < target) {
                // Add inc to count and output in counter
                counter.innerText = Math.ceil(count + inc);
                // Call function every ms
                setTimeout(updateCount, 15);
            } else {
                counter.innerText = target.toLocaleString();
            }
        };
        updateCount();
    };

    // Intersection Observer to trigger counting only when scrolled into view
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        observer.observe(counter);
    });
}
// --- AI Chat Widget Logic ---
const chatToggle = document.getElementById('chat-toggle');
const chatModal = document.getElementById('chat-modal');
const chatClose = document.getElementById('chat-close');
const chatSend = document.getElementById('chat-send');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');

const CHAT_API_URL = "/api/chat";

chatToggle.addEventListener('click', () => {
    chatModal.style.display = chatModal.style.display === 'flex' ? 'none' : 'flex';
});

chatClose.addEventListener('click', () => {
    chatModal.style.display = 'none';
});

function addChatBubble(text, sender) {
    const bubble = document.createElement('div');
    bubble.className = `${sender}-bubble`;
    bubble.textContent = text;
    chatMessages.appendChild(bubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return bubble;
}

async function handleChatSend() {
    const prompt = chatInput.value.trim();
    if (!prompt) return;

    addChatBubble(prompt, 'user');
    chatInput.value = '';

    const aiBubble = addChatBubble("...", 'ai');

    try {
        const response = await fetch(CHAT_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: prompt })
        });

        const data = await response.json();
        if (data.reply) {
            aiBubble.textContent = data.reply;
        } else if (data.error) {
            aiBubble.textContent = `오류: ${data.error}`;
        } else {
            aiBubble.textContent = "죄송합니다. 답변을 가져오는 중 오류가 발생했습니다.";
        }
        chatMessages.scrollTop = chatMessages.scrollHeight;
    } catch (error) {
        aiBubble.textContent = "오류: 서버 통신에 실패했습니다.";
    }
}

chatSend.addEventListener('click', handleChatSend);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleChatSend();
});

// --- Booking Form Submission Logic (Web3Forms) ---
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    bookingForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // --- ⚠️ 중요: Web3Forms 액세스 키 설정 ---
        // web3forms.com 에 접속하여 ymaniak@yahoo.com 이메일로 발급받은 액세스 키를 아래에 입력하세요.
        const accessKey = "82b8c61c-c1f7-4153-9e87-69efc30c28dd"; 
        
        if (accessKey === "YOUR_ACCESS_KEY_HERE") {
            alert("시스템 안내: 무료 상담 폼을 활성화하려면 web3forms.com에서 액세스 키를 발급받아 script.js에 입력해주세요.");
            return;
        }

        const submitBtn = bookingForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerText;
        submitBtn.innerText = "전송 중...";
        submitBtn.disabled = true;

        const formData = new FormData(bookingForm);
        formData.append("access_key", accessKey);
        formData.append("subject", "[화이트스타일치과] 새로운 VVIP 상담 신청이 접수되었습니다");
        formData.append("from_name", "화이트스타일 웹사이트");
        
        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });
            const data = await response.json();

            if (data.success) {
                alert("상담 신청이 성공적으로 완료되었습니다. 기재해주신 연락처로 곧 연락드리겠습니다.");
                bookingForm.reset();
            } else {
                alert("전송에 실패했습니다. 잠시 후 다시 시도해주세요.");
            }
        } catch (error) {
            alert("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        } finally {
            submitBtn.innerText = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}
