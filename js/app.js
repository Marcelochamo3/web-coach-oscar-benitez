/* ==========================================================================
   Lógica Interactiva - Oscar Benítez | Coach Ontológico
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar iconos Lucide
    if (window.lucide) {
        lucide.createIcons();
    }

    initMobileMenu();
    initScrollReveal();
    initFAQ();
    initQuiz();
    initEventFilters();
    initCalendar();
    initInternalMessages();
});

/* --------------------------------------------------------------------------
   1. MENÚ MÓVIL
   -------------------------------------------------------------------------- */
function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const links = document.querySelectorAll('.mobile-link');

    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
        });
    });
}

/* --------------------------------------------------------------------------
   2. ANIMACIÓN AL HACER SCROLL
   -------------------------------------------------------------------------- */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
        reveals.forEach(el => el.classList.add('active'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    reveals.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   3. ACORDEÓN PREGUNTAS FRECUENTES (FAQ)
   -------------------------------------------------------------------------- */
function initFAQ() {
    const items = document.querySelectorAll('.faq-item');
    items.forEach(item => {
        item.addEventListener('click', () => {
            const isOpen = item.getAttribute('data-open') === 'true';
            items.forEach(i => i.setAttribute('data-open', 'false'));
            item.setAttribute('data-open', isOpen ? 'false' : 'true');
        });
    });
}

/* --------------------------------------------------------------------------
   4. AUTODIAGNÓSTICO ONTOLÓGICO INTERACTIVO
   -------------------------------------------------------------------------- */
const quizQuestions = [
    {
        question: '1. ¿Qué sientes con más frecuencia en tu semana actual?',
        options: [
            { label: 'Postergo decisiones importantes por miedo o duda', area: 'proposito' },
            { label: 'Me cuesta poner límites o tener conversaciones difíciles', area: 'vinculos' },
            { label: 'Siento desgaste liderando mi equipo o proyecto', area: 'liderazgo' }
        ]
    },
    {
        question: '2. Cuando aparece un problema inesperado, tu primera reacción suele ser:',
        options: [
            { label: 'Exigirme de más y sobrecargarme solo/a', area: 'liderazgo' },
            { label: 'Callarme para evitar conflictos', area: 'vinculos' },
            { label: 'Desorientarme y perder el foco de mis metas', area: 'proposito' }
        ]
    },
    {
        question: '3. ¿Qué resultado te daría mayor alivio en los próximos 60 días?',
        options: [
            { label: 'Claridad total sobre mi rumbo y próximos pasos', area: 'proposito' },
            { label: 'Comunicarme con firmeza, calma y empatía', area: 'vinculos' },
            { label: 'Coordinar acciones con mi equipo sin estrés', area: 'liderazgo' }
        ]
    }
];

const quizResultsMap = {
    proposito: {
        title: 'Enfoque recomendado: Claridad y Propósito Personal',
        desc: 'Tu observador actual te pide hacer una pausa estratégica para reordenar prioridades y salir del piloto automático. Una sesión de Coaching 1 a 1 te ayudará a diseñar un plan de acción concreto.'
    },
    vinculos: {
        title: 'Enfoque recomendado: Comunicación Consciente y Límites',
        desc: 'Tus mayores oportunidades de crecimiento están en las conversaciones que vienes postergando. El Coaching Ontológico te dará herramientas para expresar lo que necesitas sin romper tus vínculos.'
    },
    liderazgo: {
        title: 'Enfoque recomendado: Liderazgo Ontológico y Gestión Emocional',
        desc: 'Liderar no significa cargar con todo. Trabajar en pedidos claros, delegación efectiva y serenidad emocional multiplicará tu impacto profesional sin sacrificar tu bienestar.'
    }
};

let currentQuizStep = 0;
let quizScores = { proposito: 0, vinculos: 0, liderazgo: 0 };

function initQuiz() {
    renderQuizStep();
}

function renderQuizStep() {
    const container = document.getElementById('quiz-step-content');
    const progress = document.getElementById('quiz-progress');
    if (!container || !progress) return;

    const q = quizQuestions[currentQuizStep];
    progress.style.width = `${((currentQuizStep + 1) / quizQuestions.length) * 100}%`;

    container.innerHTML = `
        <h3 class="text-lg sm:text-xl font-bold text-forest-900 mb-4">${q.question}</h3>
        <div class="space-y-3">
            ${q.options.map(opt => `
                <button type="button" onclick="answerQuiz('${opt.area}')" class="w-full text-left p-4 rounded-2xl border border-forest-200 bg-forest-50/40 hover:bg-forest-100/70 hover:border-forest-400 text-sm sm:text-base font-medium text-forest-900 transition-all flex items-center justify-between group">
                    <span>${opt.label}</span>
                    <span class="text-forest-600 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </button>
            `).join('')}
        </div>
    `;
}

window.answerQuiz = function(area) {
    quizScores[area] = (quizScores[area] || 0) + 1;
    currentQuizStep++;

    if (currentQuizStep < quizQuestions.length) {
        renderQuizStep();
    } else {
        showQuizResult();
    }
};

function showQuizResult() {
    const quizContainer = document.getElementById('quiz-container');
    const resultDiv = document.getElementById('quiz-result');
    const titleEl = document.getElementById('quiz-result-title');
    const descEl = document.getElementById('quiz-result-desc');

    const topArea = Object.keys(quizScores).reduce((a, b) => quizScores[a] >= quizScores[b] ? a : b);
    const data = quizResultsMap[topArea];

    titleEl.textContent = data.title;
    descEl.textContent = data.desc;

    quizContainer.classList.add('hidden');
    resultDiv.classList.remove('hidden');

    if (window.lucide) lucide.createIcons();
}

window.resetQuiz = function() {
    currentQuizStep = 0;
    quizScores = { proposito: 0, vinculos: 0, liderazgo: 0 };
    document.getElementById('quiz-result').classList.add('hidden');
    document.getElementById('quiz-container').classList.remove('hidden');
    renderQuizStep();
};

/* --------------------------------------------------------------------------
   5. FILTROS DE AGENDA DE EVENTOS
   -------------------------------------------------------------------------- */
function initEventFilters() {
    const buttons = document.querySelectorAll('.event-filter-btn');
    const cards = document.querySelectorAll('.event-card');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');

            buttons.forEach(b => {
                b.classList.remove('bg-forest-700', 'text-white');
                b.classList.add('bg-forest-50', 'text-forest-800');
            });
            btn.classList.remove('bg-forest-50', 'text-forest-800');
            btn.classList.add('bg-forest-700', 'text-white');

            cards.forEach(card => {
                const cats = card.getAttribute('data-category') || '';
                if (filter === 'todos' || cats.includes(filter)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

/* --------------------------------------------------------------------------
   6. CALENDARIO INTERACTIVO DE SESIONES
   -------------------------------------------------------------------------- */
let calDate = new Date();
let selectedDateStr = '';
let selectedTimeStr = '';

const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

function initCalendar() {
    const prevBtn = document.getElementById('prev-month');
    const nextBtn = document.getElementById('next-month');
    const timeButtons = document.querySelectorAll('.time-slot');
    const bookingForm = document.getElementById('booking-form');

    if (!prevBtn || !nextBtn) return;

    prevBtn.addEventListener('click', () => {
        calDate.setMonth(calDate.getMonth() - 1);
        renderCalendar();
    });

    nextBtn.addEventListener('click', () => {
        calDate.setMonth(calDate.getMonth() + 1);
        renderCalendar();
    });

    timeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            timeButtons.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedTimeStr = btn.getAttribute('data-time');
        });
    });

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!selectedDateStr) {
                alert('Por favor, selecciona un día disponible en el calendario.');
                return;
            }
            if (!selectedTimeStr) {
                alert('Por favor, elige un horario disponible.');
                return;
            }

            const name = document.getElementById('book-name').value.trim();
            const phone = document.getElementById('book-phone').value.trim();
            const modality = document.getElementById('book-modality').value;

            const summary = `${name}, tu turno fue pre-reservado para el ${selectedDateStr} a las ${selectedTimeStr} hs (${modality}).`;
            document.getElementById('booking-summary-text').textContent = summary;

            const waText = encodeURIComponent(
                `Hola Oscar, reservé una sesión desde tu web:\n• Nombre: ${name}\n• Teléfono: ${phone}\n• Fecha: ${selectedDateStr}\n• Horario: ${selectedTimeStr} hs\n• Modalidad: ${modality}`
            );
            document.getElementById('booking-whatsapp-link').href = `https://wa.me/5493624237272?text=${waText}`;

            document.getElementById('booking-form-wrapper').classList.add('hidden');
            document.getElementById('booking-success').classList.remove('hidden');
            if (window.lucide) lucide.createIcons();
        });
    }

    renderCalendar();
}

function renderCalendar() {
    const grid = document.getElementById('calendar-grid');
    const title = document.getElementById('calendar-month-year');
    if (!grid || !title) return;

    const year = calDate.getFullYear();
    const month = calDate.getMonth();
    title.textContent = `${monthNames[month]} ${year}`;

    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    grid.innerHTML = '';

    for (let i = 0; i < firstDayIndex; i++) {
        grid.innerHTML += `<div></div>`;
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const currentDayObj = new Date(year, month, day);
        const dayOfWeek = currentDayObj.getDay();
        const isPast = currentDayObj < today;
        const isSunday = dayOfWeek === 0; // Domingos no disponibles
        const isToday = currentDayObj.getTime() === today.getTime();
        const formattedDate = `${String(day).padStart(2, '0')}/${String(month + 1).padStart(2, '0')}/${year}`;

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = day;
        btn.className = 'calendar-day';

        if (isPast || isSunday) {
            btn.classList.add('disabled');
            btn.disabled = true;
        } else {
            btn.classList.add('available');
            if (isToday) btn.classList.add('today');
            if (selectedDateStr === formattedDate) btn.classList.add('selected');

            btn.addEventListener('click', () => {
                selectedDateStr = formattedDate;
                document.getElementById('selected-date-label').textContent = `${day} de ${monthNames[month]} de ${year}`;
                renderCalendar();
            });
        }

        grid.appendChild(btn);
    }
}

window.resetBooking = function() {
    selectedTimeStr = '';
    document.querySelectorAll('.time-slot').forEach(b => b.classList.remove('selected'));
    document.getElementById('booking-form').reset();
    document.getElementById('booking-success').classList.add('hidden');
    document.getElementById('booking-form-wrapper').classList.remove('hidden');
};

/* --------------------------------------------------------------------------
   7. MENSAJE PRIVADO DIRECTO A OSCAR (WHATSAPP)
   -------------------------------------------------------------------------- */
function initInternalMessages() {
    const form = document.getElementById('internal-message-form');
    const feedback = document.getElementById('msg-feedback');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('msg-name').value.trim();
            const contact = document.getElementById('msg-contact').value.trim();
            const topic = document.getElementById('msg-topic').value;
            const body = document.getElementById('msg-body').value.trim();

            const waText = encodeURIComponent(
                `Hola Oscar, te envío un mensaje privado desde tu web:\n• Nombre: ${name}\n• Contacto: ${contact}\n• Motivo: ${topic}\n• Mensaje: ${body}`
            );
            const waUrl = `https://wa.me/5493624237272?text=${waText}`;

            window.open(waUrl, '_blank', 'noopener');

            form.reset();
            feedback.innerHTML = `✓ Mensaje preparado para Oscar. Si no se abrió WhatsApp automáticamente, <a href="${waUrl}" target="_blank" rel="noopener" class="underline font-bold">haz clic aquí para enviarlo</a>.`;
            feedback.classList.remove('hidden');
        });
    }
}

window.preselectMessage = function(text) {
    const bodyEl = document.getElementById('msg-body');
    const contactSec = document.getElementById('contacto');
    if (bodyEl && contactSec) {
        bodyEl.value = text;
        contactSec.scrollIntoView({ behavior: 'smooth' });
        bodyEl.focus();
    }
};

function escapeHtml(str) {
    return str.replace(/[&<>"']/g, m => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[m]));
}

/* --------------------------------------------------------------------------
   8. MODALES (YOUTUBE, CURSOS Y EVENTOS)
   -------------------------------------------------------------------------- */
window.openVideoModal = function(videoId, title) {
    const modal = document.getElementById('video-modal');
    const iframe = document.getElementById('video-iframe');
    const titleEl = document.getElementById('video-modal-title');

    titleEl.textContent = title;
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    modal.classList.remove('hidden');
};

window.closeVideoModal = function() {
    const modal = document.getElementById('video-modal');
    const iframe = document.getElementById('video-iframe');
    iframe.src = '';
    modal.classList.add('hidden');
};

window.openCourseModal = function(title, modules, price) {
    const modal = document.getElementById('course-modal');
    document.getElementById('course-modal-title').textContent = title;
    document.getElementById('course-modal-price').textContent = price;
    document.getElementById('course-modal-list').innerHTML = modules
        .map(m => `<li class="flex items-start gap-2.5"><span class="text-forest-600 font-bold">•</span><span>${m}</span></li>`)
        .join('');

    document.getElementById('course-modal-cta').onclick = () => {
        closeCourseModal();
        openBuyCourseModal(title, price);
    };

    modal.classList.remove('hidden');
};

window.closeCourseModal = function() {
    document.getElementById('course-modal').classList.add('hidden');
};

window.openBuyCourseModal = function(title, price) {
    const modal = document.getElementById('buy-course-modal');
    document.getElementById('buy-course-title').textContent = title;
    document.getElementById('buy-course-price').textContent = price;
    modal.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();

    const form = document.getElementById('buy-course-form');
    form.onsubmit = (e) => {
        e.preventDefault();
        const name = document.getElementById('buy-name').value.trim();
        const email = document.getElementById('buy-email').value.trim();
        const phone = document.getElementById('buy-phone').value.trim();

        const waText = encodeURIComponent(
            `Hola Oscar, quiero comprar el curso online:\n• Curso: ${title} (${price})\n• Incluye: Videos + PDF + 1 Sesión 1 a 1 GRATIS\n• Nombre: ${name}\n• Email para recibir acceso: ${email}\n• WhatsApp: ${phone}`
        );
        window.open(`https://wa.me/5493624237272?text=${waText}`, '_blank', 'noopener');
        form.reset();
        closeBuyCourseModal();
    };
};

window.closeBuyCourseModal = function() {
    document.getElementById('buy-course-modal').classList.add('hidden');
};

window.openEventModal = function(eventTitle) {
    const modal = document.getElementById('event-modal');
    document.getElementById('event-modal-title').textContent = eventTitle;
    modal.classList.remove('hidden');

    const form = document.getElementById('event-register-form');
    form.onsubmit = (e) => {
        e.preventDefault();
        const name = document.getElementById('ev-name').value.trim();
        alert(`¡Gracias ${name}! Tu lugar para "${eventTitle}" ha sido pre-reservado. Te enviaremos el enlace de acceso por correo y WhatsApp.`);
        form.reset();
        closeEventModal();
    };
};

window.closeEventModal = function() {
    document.getElementById('event-modal').classList.add('hidden');
};

