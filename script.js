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

    // --- Before/After Slider Logic ---
    const sliderContainer = document.querySelector('.slider-container');
    const sliderHandle = document.getElementById('slider-handle');
    const sliderAfter = document.getElementById('slider-after');

    if (sliderContainer && sliderHandle && sliderAfter) {
        const moveSlider = (e) => {
            let x;
            if (e.type === 'touchmove') {
                x = e.touches[0].pageX - sliderContainer.getBoundingClientRect().left;
            } else {
                x = e.pageX - sliderContainer.getBoundingClientRect().left;
            }
            
            let containerWidth = sliderContainer.offsetWidth;
            if (x < 0) x = 0;
            if (x > containerWidth) x = containerWidth;
            
            let percentage = (x / containerWidth) * 100;
            sliderHandle.style.left = percentage + '%';
            sliderAfter.style.width = percentage + '%';
        };

        sliderContainer.addEventListener('mousemove', moveSlider);
        sliderContainer.addEventListener('touchmove', moveSlider);
    }
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
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const submitBtn = this.querySelector('button');
        const originalText = submitBtn.innerText;
        
        // Show processing state
        submitBtn.innerText = '가용 일정 확인 중...';
        submitBtn.disabled = true;

        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());

        // Simulate server check and email sending
        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
                access_key: "79b47e09-08f3-42e1-8848-03876e6550f2", // Web3Forms Access Key
                subject: `[VVIP 예약] ${data.name}님의 예약 신청`,
                from_name: "White Style Dental",
                message: `
                    성함: ${data.name}
                    연락처: ${data.phone}
                    희망일자: ${data.date}
                    희망시간: ${data.time}
                    관심과목: ${data.interest}
                `
            })
        })
        .then(async (response) => {
            if (response.status == 200) {
                alert(`${data.name}님, 선택하신 ${data.date} ${data.time}에 예약 상담이 접수되었습니다. 담당 디렉터가 곧 연락드리겠습니다.`);
                bookingForm.reset();
            } else {
                alert('일시적인 오류가 발생했습니다. 다시 시도해 주세요.');
            }
        })
        .finally(() => {
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
        });
    });
}
