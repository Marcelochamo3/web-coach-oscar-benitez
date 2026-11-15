/* ==========================================================================
   Lógica Interactiva - Oscar Benítez | Coach Ontológico
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar iconos Lucide
    if (window.lucide) {
        lucide.createIcons();
    }

    initCountrySelector();
    initMobileMenu();
    initScrollReveal();
    initFAQ();
    initQuiz();
    initEventFilters();
    initCalendar();
    initInternalMessages();
});

/* --------------------------------------------------------------------------
   0. SELECTOR DE PAÍS E IDIOMA (SIEMPRE INICIA EN ARGENTINA)
   -------------------------------------------------------------------------- */
let currentCountry = { code: 'ar', name: 'Argentina', lang: 'es', hispanic: true };

function initCountrySelector() {
    const btn = document.getElementById('country-selector-btn');
    const dropdown = document.getElementById('country-dropdown');
    const searchInput = document.getElementById('country-search');
    const listEl = document.getElementById('country-list');

    if (!btn || !dropdown || !listEl || !window.COUNTRIES) return;

    function renderList(filter = '') {
        const term = filter.trim().toLowerCase();
        const filtered = window.COUNTRIES.filter(c =>
            c.name.toLowerCase().includes(term)
        );

        listEl.innerHTML = filtered.map(c => {
            const isActive = c.code === currentCountry.code;
            return `
                <li>
                    <button type="button" data-code="${c.code}" class="country-option w-full flex items-center justify-between px-3.5 py-2.5 text-left text-sm hover:bg-forest-50 transition-colors ${isActive ? 'bg-forest-50 font-bold text-forest-800' : 'text-forest-900'}">
                        <span class="flex items-center gap-3">
                            <img src="https://flagcdn.com/w40/${c.code}.png" alt="${c.name}" class="w-5 h-3.5 object-cover rounded-[3px] shadow-xs shrink-0">
                            <span>${c.name}</span>
                        </span>
                        ${isActive ? '<span class="w-2 h-2 rounded-full bg-forest-600"></span>' : ''}
                    </button>
                </li>
            `;
        }).join('');

        listEl.querySelectorAll('.country-option').forEach(optBtn => {
            optBtn.addEventListener('click', () => {
                const selected = window.COUNTRIES.find(c => c.code === optBtn.dataset.code);
                if (selected) {
                    applyCountryMode(selected);
                    dropdown.classList.add('hidden');
                    btn.setAttribute('aria-expanded', 'false');
                    renderList(searchInput ? searchInput.value : '');
                }
            });
        });
    }

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = !dropdown.classList.contains('hidden');
        dropdown.classList.toggle('hidden');
        btn.setAttribute('aria-expanded', String(!isOpen));
        if (!isOpen && searchInput) {
            searchInput.value = '';
            renderList('');
            setTimeout(() => searchInput.focus(), 50);
        }
    });

    if (searchInput) {
        searchInput.addEventListener('input', () => renderList(searchInput.value));
        searchInput.addEventListener('click', (e) => e.stopPropagation());
    }

    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target) && !btn.contains(e.target)) {
            dropdown.classList.add('hidden');
            btn.setAttribute('aria-expanded', 'false');
        }
    });

    // Siempre iniciar con Argentina por defecto
    const argentina = window.COUNTRIES.find(c => c.code === 'ar') || window.COUNTRIES[0];
    applyCountryMode(argentina);
    renderList('');
}

function getDict(lang) {
    const base = (window.TRANSLATIONS && window.TRANSLATIONS.es) || {};
    const target = (window.TRANSLATIONS && window.TRANSLATIONS[lang]) || {};
    return { ...base, ...target };
}

function applyCountryMode(country) {
    currentCountry = country;
    const dict = getDict(country.lang);

    document.documentElement.lang = country.lang;

    const flagEl = document.getElementById('current-country-flag');
    const nameEl = document.getElementById('current-country-name');
    if (flagEl) {
        flagEl.src = `https://flagcdn.com/w40/${country.code}.png`;
        flagEl.alt = country.name;
    }
    if (nameEl) {
        nameEl.textContent = country.name;
    }

    // Mostrar u ocultar secciones de comunicación / clases en vivo
    document.querySelectorAll('.hispanic-only').forEach(el => {
        el.classList.toggle('hidden', !country.hispanic);
    });
    document.querySelectorAll('.intl-only').forEach(el => {
        el.classList.toggle('hidden', country.hispanic);
    });

    const buyPhone = document.getElementById('buy-phone');
    if (buyPhone) {
        buyPhone.required = country.hispanic;
    }

    // Traducir textos y placeholders
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
            el.textContent = dict[key];
        }
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (dict[key]) {
            el.setAttribute('placeholder', dict[key]);
        }
    });
}

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
let quizAnswers = [];

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
            ${q.options.map((opt, idx) => `
                <button type="button" onclick="answerQuiz('${opt.area}', ${idx})" class="w-full text-left p-4 rounded-2xl border border-forest-200 bg-forest-50/40 hover:bg-forest-100/70 hover:border-forest-400 text-sm sm:text-base font-medium text-forest-900 transition-all flex items-center justify-between group">
                    <span>${opt.label}</span>
                    <span class="text-forest-600 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </button>
            `).join('')}
        </div>
    `;
}

window.answerQuiz = function(area, optIdx) {
    quizScores[area] = (quizScores[area] || 0) + 1;
    const chosen = quizQuestions[currentQuizStep]?.options[optIdx]?.label;
    if (chosen) quizAnswers.push(chosen);
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

    const answersSummary = quizAnswers.map((a, i) => `${i + 1}) ${a}`).join('\n');
    const waBtn = document.getElementById('quiz-wa-btn');
    if (waBtn) {
        const waText = encodeURIComponent(
            `Hola Oscar, completé el test en tu web:\n• ${data.title}\n• Mis respuestas:\n${answersSummary}\n\nMe gustaría conversar sobre este enfoque.`
        );
        waBtn.href = `https://wa.me/5493624237272?text=${waText}`;
    }

    const bookBtn = document.getElementById('quiz-book-btn');
    if (bookBtn) {
        bookBtn.onclick = (e) => {
            e.preventDefault();
            openInquiryModal(data.title, 'Sesión recomendada según tu autodiagnóstico', `Mis respuestas del test:\n${answersSummary}`);
        };
    }

    quizContainer.classList.add('hidden');
    resultDiv.classList.remove('hidden');

    if (window.lucide) lucide.createIcons();
}

window.resetQuiz = function() {
    currentQuizStep = 0;
    quizScores = { proposito: 0, vinculos: 0, liderazgo: 0 };
    quizAnswers = [];
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
window.openVideoByKey = function(videoId, titleKey) {
    const dict = getDict(currentCountry.lang);
    const title = dict[titleKey] || titleKey;
    openVideoModal(videoId, title);
};

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

window.openCourseByKey = function(courseKey, price) {
    const dict = getDict(currentCountry.lang);
    const title = dict[`${courseKey}_title`] || courseKey;
    const baseModules = dict[`${courseKey}_modules`] || [];
    const modules = [...baseModules];
    if (currentCountry.hispanic && modules.length > 0) {
        modules[modules.length - 1] = `${modules[modules.length - 1]} + 1 Sesión 1 a 1 GRATIS`;
    }
    openCourseModal(title, modules, price);
};

window.openBuyCourseByKey = function(courseKey, price) {
    const dict = getDict(currentCountry.lang);
    const title = dict[`${courseKey}_title`] || courseKey;
    openBuyCourseModal(title, price);
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
    const wrapper = document.getElementById('buy-course-form-wrapper');
    const success = document.getElementById('buy-course-success');
    const form = document.getElementById('buy-course-form');

    document.getElementById('buy-course-title').textContent = title;
    document.getElementById('buy-course-price').textContent = price;
    wrapper.classList.remove('hidden');
    success.classList.add('hidden');
    form.reset();
    modal.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();

    form.onsubmit = (e) => {
        e.preventDefault();
        const name = document.getElementById('buy-name').value.trim();
        const email = document.getElementById('buy-email').value.trim();
        const phone = document.getElementById('buy-phone').value.trim();

        if (currentCountry.hispanic) {
            document.getElementById('buy-course-summary').textContent = `${name}, pre-reservamos tu compra de "${title}" (${price}). Incluye Videos + PDF y 1 Sesión 1 a 1 GRATIS.`;

            const waText = encodeURIComponent(
                `Hola Oscar, pre-reservé la compra de un curso online:\n• Curso: ${title} (${price})\n• Incluye: Videos + PDF + 1 Sesión 1 a 1 GRATIS\n• Nombre: ${name}\n• Email para recibir acceso: ${email}\n• WhatsApp: ${phone}`
            );
            document.getElementById('buy-course-wa-link').href = `https://wa.me/5493624237272?text=${waText}`;
        } else {
            document.getElementById('buy-course-summary').textContent = `${name} (${email}) — "${title}" (${price}).`;
        }

        wrapper.classList.add('hidden');
        success.classList.remove('hidden');
        if (window.lucide) lucide.createIcons();
    };
};

window.closeBuyCourseModal = function() {
    document.getElementById('buy-course-modal').classList.add('hidden');
};

window.openEventModal = function(eventTitle) {
    const modal = document.getElementById('event-modal');
    const form = document.getElementById('event-register-form');
    const success = document.getElementById('event-success');

    document.getElementById('event-modal-title').textContent = eventTitle;
    form.classList.remove('hidden');
    success.classList.add('hidden');
    form.reset();
    modal.classList.remove('hidden');

    form.onsubmit = (e) => {
        e.preventDefault();
        const name = document.getElementById('ev-name').value.trim();
        const email = document.getElementById('ev-email').value.trim();
        const phone = document.getElementById('ev-phone').value.trim();

        document.getElementById('event-summary').textContent = `${name}, tu lugar para "${eventTitle}" fue pre-reservado. Envía tu confirmación por WhatsApp para recibir el acceso.`;

        const waText = encodeURIComponent(
            `Hola Oscar, pre-reservé mi lugar en un evento:\n• Evento: ${eventTitle}\n• Nombre: ${name}\n• Email: ${email}\n• WhatsApp: ${phone}`
        );
        document.getElementById('event-wa-link').href = `https://wa.me/5493624237272?text=${waText}`;

        form.classList.add('hidden');
        success.classList.remove('hidden');
        if (window.lucide) lucide.createIcons();
    };
};

window.closeEventModal = function() {
    document.getElementById('event-modal').classList.add('hidden');
};

window.openInquiryModal = function(serviceName, serviceDesc, prefillNotes = '') {
    const modal = document.getElementById('service-inquiry-modal');
    const form = document.getElementById('service-inquiry-form');
    const success = document.getElementById('inq-success');

    document.getElementById('inq-service-name').textContent = serviceName;
    document.getElementById('inq-service-desc').textContent = serviceDesc;
    form.classList.remove('hidden');
    success.classList.add('hidden');
    form.reset();
    if (prefillNotes) {
        document.getElementById('inq-notes').value = prefillNotes;
    }
    modal.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();

    form.onsubmit = (e) => {
        e.preventDefault();
        const name = document.getElementById('inq-name').value.trim();
        const phone = document.getElementById('inq-phone').value.trim();
        const email = document.getElementById('inq-email').value.trim();
        const notes = document.getElementById('inq-notes').value.trim();

        document.getElementById('inq-summary').textContent = `${name}, tu solicitud para "${serviceName}" fue pre-reservada. Envía la confirmación por WhatsApp para coordinar con Oscar.`;

        const waText = encodeURIComponent(
            `Hola Oscar, te envío una solicitud pre-reservada desde tu web:\n• Servicio / Motivo: ${serviceName}\n• Nombre: ${name}\n• WhatsApp: ${phone}\n• Email: ${email}${notes ? `\n• Detalles: ${notes}` : ''}`
        );
        document.getElementById('inq-wa-link').href = `https://wa.me/5493624237272?text=${waText}`;

        form.classList.add('hidden');
        success.classList.remove('hidden');
        if (window.lucide) lucide.createIcons();
    };
};

window.closeInquiryModal = function() {
    document.getElementById('service-inquiry-modal').classList.add('hidden');
};

