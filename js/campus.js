/* ==========================================================================
   Campus Virtual - Oscar Benítez | Coach Ontológico
   Soporta modo local/demo inmediato y está preparado para conectar Supabase.
   ========================================================================== */

// Configuración opcional para producción con Supabase:
const CAMPUS_CONFIG = {
    SUPABASE_URL: '',
    SUPABASE_ANON_KEY: ''
};

const CAMPUS_COURSES = [
    {
        id: 'course1',
        category: 'COMUNICACIÓN & VÍNCULOS',
        title: 'El Arte de las Conversaciones Difíciles',
        hours: '6 hs en Video HD',
        colorClass: 'from-forest-700 to-forest-900',
        modules: [
            {
                id: 'c1-m1',
                title: 'Módulo 1: Anatomía de la Conversación Difícil',
                videoTitle: 'Clase 1 — Por qué postergamos lo importante',
                videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                pdfTitle: 'Guía PDF: Mapa de Conversaciones Pendientes',
                pdfSummary: 'Herramienta práctica para identificar juicios, hechos y pedidos antes de iniciar una charla clave.',
                quiz: [
                    {
                        q: '¿Qué es lo primero que debemos distinguir antes de tener una conversación difícil?',
                        options: [
                            'Quién tiene la culpa de la situación',
                            'Los hechos observables de nuestras interpretaciones o juicios',
                            'Cómo convencer al otro rápidamente'
                        ],
                        answer: 1
                    },
                    {
                        q: 'En el Coaching Ontológico, un pedido efectivo debe incluir:',
                        options: [
                            'Una exigencia sin plazo definido',
                            'Acción concreta, condiciones de satisfacción y tiempo acordado',
                            'Solo la expresión de nuestro malestar'
                        ],
                        answer: 1
                    }
                ]
            },
            {
                id: 'c1-m2',
                title: 'Módulo 2: Escucha Activa y Firmeza Respetuosa',
                videoTitle: 'Clase 2 — Escuchar sin defenderse ni atacar',
                videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                pdfTitle: 'Workbook PDF: Frases de Apertura Generativa',
                pdfSummary: 'Ejercicios de reformulación para sostener límites sanos cuidando el vínculo.',
                quiz: [
                    {
                        q: '¿Cuál es el objetivo principal de la escucha activa en una diferencia?',
                        options: [
                            'Esperar turno para responder con más argumentos',
                            'Validar la perspectiva del otro para construir acuerdos posibles',
                            'Evitar el conflicto cediendo siempre'
                        ],
                        answer: 1
                    },
                    {
                        q: 'Decir "NO" con respeto implica:',
                        options: [
                            'Dar excusas largas para no quedar mal',
                            'Cuidar nuestra palabra y ofrecer alternativas cuando es posible',
                            'Ignorar el pedido hasta que se olvide'
                        ],
                        answer: 1
                    }
                ]
            }
        ]
    },
    {
        id: 'course2',
        category: 'LIDERAZGO & EQUIPOS',
        title: 'Liderazgo Ontológico Consciente',
        hours: '12 hs en Video HD',
        colorClass: 'from-forest-600 to-forest-800',
        modules: [
            {
                id: 'c2-m1',
                title: 'Módulo 1: De Jefe Operativo a Líder Coach',
                videoTitle: 'Clase 1 — Autoridad basada en confianza',
                videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                pdfTitle: 'Guía PDF: Los 3 Pilares de la Confianza',
                pdfSummary: 'Sinceridad, competencia y responsabilidad aplicados a la gestión diaria de equipos.',
                quiz: [
                    {
                        q: '¿Qué diferencia a un líder coach de un jefe operativo tradicional?',
                        options: [
                            'El líder coach controla cada tarea minuto a minuto',
                            'Diseña conversaciones de aprendizaje y autonomía en su equipo',
                            'Evita dar feedback negativo'
                        ],
                        answer: 1
                    },
                    {
                        q: 'La confianza en un equipo se construye principalmente mediante:',
                        options: [
                            'Promesas claras y cumplimiento consistente',
                            'Reuniones extensas sin acuerdos',
                            'Control estricto de horarios'
                        ],
                        answer: 0
                    }
                ]
            },
            {
                id: 'c2-m2',
                title: 'Módulo 2: Coordinación de Acciones y Feedback',
                videoTitle: 'Clase 2 — Feedback generativo que transforma',
                videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                pdfTitle: 'Manual PDF: Protocolo de Feedback 1 a 1',
                pdfSummary: 'Guía paso a paso para dar devoluciones basadas en hechos y enfocadas en el futuro.',
                quiz: [
                    {
                        q: 'Un feedback generativo se enfoca en:',
                        options: [
                            'Etiquetar la personalidad del colaborador',
                            'Comportamientos observables, impacto y acciones de mejora',
                            'Comparar al colaborador con otros compañeros'
                        ],
                        answer: 1
                    }
                ]
            }
        ]
    },
    {
        id: 'course3',
        category: 'BIENESTAR & PROPÓSITO',
        title: 'Gestión Emocional y Propósito',
        hours: '5 hs en Video HD',
        colorClass: 'from-forest-800 to-forest-950',
        modules: [
            {
                id: 'c3-m1',
                title: 'Módulo 1: Del Piloto Automático a la Serenidad',
                videoTitle: 'Clase 1 — Emociones vs. Estados de Ánimo',
                videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                pdfTitle: 'Workbook PDF: Bitácora Emocional Semanal',
                pdfSummary: 'Registro práctico para detectar disparadores de ansiedad y diseñar respuestas conscientes.',
                quiz: [
                    {
                        q: '¿Cuál es la diferencia clave entre emoción y estado de ánimo?',
                        options: [
                            'La emoción responde a un evento puntual; el estado de ánimo es más sostenido en el tiempo',
                            'Son exactamente sinónimos',
                            'Los estados de ánimo no pueden transformarse'
                        ],
                        answer: 0
                    },
                    {
                        q: 'Para salir de la resignación hacia la ambición sana es clave:',
                        options: [
                            'Negar lo que sentimos',
                            'Identificar qué posibilidades de acción sí dependen de nosotros',
                            'Esperar que cambie el entorno primero'
                        ],
                        answer: 1
                    }
                ]
            }
        ]
    }
];

let campusUser = null;
let activeCourseId = null;
let activeModuleId = null;

document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) lucide.createIcons();
    initCampusSession();
    initLoginForm();
    initSearchFilter();
});

function getStorageKey(email) {
    return `ob_campus_progress_${email.toLowerCase().trim()}`;
}

function getUserProgress() {
    if (!campusUser) return {};
    try {
        return JSON.parse(localStorage.getItem(getStorageKey(campusUser.email)) || '{}');
    } catch {
        return {};
    }
}

function saveUserProgress(data) {
    if (!campusUser) return;
    localStorage.setItem(getStorageKey(campusUser.email), JSON.stringify(data));
}

function initCampusSession() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('demo') === '1') {
        enterDemoCampus();
        return;
    }

    try {
        const saved = localStorage.getItem('ob_campus_user');
        if (saved) {
            campusUser = JSON.parse(saved);
            showAuthenticatedUI();
            return;
        }
    } catch { /* ignore */ }
    showLoginUI();
}

window.enterDemoCampus = function() {
    campusUser = {
        name: 'Alumno Invitado (Demo)',
        email: 'demo@oscarbenitezcoach.com'
    };
    localStorage.setItem('ob_campus_user', JSON.stringify(campusUser));
    showAuthenticatedUI();
};

function initLoginForm() {
    const form = document.getElementById('campus-login-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('login-name').value.trim();
        const email = document.getElementById('login-email').value.trim();
        if (!name || !email) return;

        campusUser = { name, email };
        localStorage.setItem('ob_campus_user', JSON.stringify(campusUser));
        showAuthenticatedUI();
    });
}

window.logoutCampus = function() {
    localStorage.removeItem('ob_campus_user');
    campusUser = null;
    activeCourseId = null;
    showLoginUI();
};

function showLoginUI() {
    document.getElementById('login-view').classList.remove('hidden');
    document.getElementById('overview-view').classList.add('hidden');
    document.getElementById('course-view').classList.add('hidden');
    document.getElementById('user-menu').classList.add('hidden');
}

function showAuthenticatedUI() {
    document.getElementById('login-view').classList.add('hidden');
    document.getElementById('user-menu').classList.remove('hidden');

    document.getElementById('header-user-name').textContent = campusUser.name;
    document.getElementById('header-user-email').textContent = campusUser.email;
    document.getElementById('welcome-user-name').textContent = campusUser.name.toUpperCase();

    const initials = campusUser.name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map(w => w[0])
        .join('')
        .toUpperCase();
    document.getElementById('header-user-avatar').textContent = initials || 'OB';

    showCoursesOverview();
}

function getCourseProgressPercent(course) {
    const prog = getUserProgress();
    const cProg = prog[course.id] || {};
    let totalSteps = 0;
    let doneSteps = 0;

    course.modules.forEach(m => {
        totalSteps += 3; // video + pdf + quiz
        const mp = cProg[m.id] || {};
        if (mp.video) doneSteps++;
        if (mp.pdf) doneSteps++;
        if (mp.quizPassed) doneSteps++;
    });

    return totalSteps === 0 ? 0 : Math.round((doneSteps / totalSteps) * 100);
}

function isCourseCompleted(course) {
    return getCourseProgressPercent(course) === 100;
}

window.showCoursesOverview = function() {
    document.getElementById('overview-view').classList.remove('hidden');
    document.getElementById('course-view').classList.add('hidden');
    renderCoursesGrid();
};

function initSearchFilter() {
    const input = document.getElementById('course-search-input');
    if (!input) return;
    input.addEventListener('input', () => renderCoursesGrid(input.value));
}

function renderCoursesGrid(filter = '') {
    const grid = document.getElementById('campus-courses-grid');
    if (!grid) return;

    const term = filter.trim().toLowerCase();
    const list = CAMPUS_COURSES.filter(c =>
        c.title.toLowerCase().includes(term) || c.category.toLowerCase().includes(term)
    );

    grid.innerHTML = list.map(course => {
        const pct = getCourseProgressPercent(course);
        const completed = pct === 100;
        return `
            <div class="card-elevate bg-cream border border-forest-100 hover:border-forest-300 rounded-3xl overflow-hidden flex flex-col justify-between">
                <div>
                    <div class="h-32 bg-gradient-to-br ${course.colorClass} p-5 flex flex-col justify-between text-white">
                        <span class="self-start px-2.5 py-1 rounded-full bg-white/15 text-[10px] font-bold tracking-wider uppercase">${course.category}</span>
                        <span class="text-xs text-forest-100 font-medium">${course.modules.length} Módulos • ${course.hours}</span>
                    </div>
                    <div class="p-5 space-y-3">
                        <h3 class="font-bold text-lg text-forest-900 leading-snug">${course.title}</h3>
                        <div class="space-y-1.5">
                            <div class="flex items-center justify-between text-xs font-semibold">
                                <span class="text-forest-700">${completed ? '¡Curso aprobado!' : 'Tu avance'}</span>
                                <span class="text-forest-900">${pct}%</span>
                            </div>
                            <div class="w-full h-2 bg-forest-100 rounded-full overflow-hidden">
                                <div class="h-full bg-forest-600 transition-all duration-500" style="width: ${pct}%"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="px-5 pb-5">
                    <button type="button" onclick="openCourse('${course.id}')" class="w-full py-3 rounded-xl bg-forest-700 hover:bg-forest-800 text-white text-sm font-semibold transition-colors">
                        ${completed ? 'Repasar / Ver Certificado' : 'Entrar al Curso'}
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

window.openCourse = function(courseId) {
    const course = CAMPUS_COURSES.find(c => c.id === courseId);
    if (!course) return;

    activeCourseId = course.id;
    activeModuleId = course.modules[0].id;

    document.getElementById('overview-view').classList.add('hidden');
    document.getElementById('course-view').classList.remove('hidden');
    document.getElementById('active-course-title').textContent = course.title;

    renderCourseSidebar();
    renderActiveModule();
    updateCourseTopBar();
};

function updateCourseTopBar() {
    const course = CAMPUS_COURSES.find(c => c.id === activeCourseId);
    if (!course) return;

    const pct = getCourseProgressPercent(course);
    document.getElementById('active-course-progress-text').textContent = `${pct}%`;

    const certBtn = document.getElementById('btn-open-certificate');
    if (pct === 100) {
        certBtn.classList.remove('hidden');
        certBtn.classList.add('inline-flex');
    } else {
        certBtn.classList.add('hidden');
        certBtn.classList.remove('inline-flex');
    }
}

function renderCourseSidebar() {
    const course = CAMPUS_COURSES.find(c => c.id === activeCourseId);
    const list = document.getElementById('course-sidebar-list');
    if (!course || !list) return;

    const prog = getUserProgress()[course.id] || {};

    list.innerHTML = course.modules.map(mod => {
        const mp = prog[mod.id] || {};
        const done = mp.video && mp.pdf && mp.quizPassed;
        const isActive = mod.id === activeModuleId;
        return `
            <button type="button" onclick="selectModule('${mod.id}')" class="w-full text-left px-3.5 py-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-between gap-2 transition-colors ${isActive ? 'bg-forest-800 text-white' : 'text-forest-900 hover:bg-forest-50'}">
                <span class="truncate">${mod.title}</span>
                ${done ? '<span class="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" title="Completado"></span>' : ''}
            </button>
        `;
    }).join('');
}

window.selectModule = function(modId) {
    activeModuleId = modId;
    renderCourseSidebar();
    renderActiveModule();
};

function renderActiveModule() {
    const course = CAMPUS_COURSES.find(c => c.id === activeCourseId);
    const mod = course?.modules.find(m => m.id === activeModuleId);
    const area = document.getElementById('module-content-area');
    if (!course || !mod || !area) return;

    const prog = getUserProgress();
    const mp = (prog[course.id] && prog[course.id][mod.id]) || {};

    area.innerHTML = `
        <div class="border-b border-forest-100 pb-4">
            <span class="text-xs font-bold uppercase tracking-wider text-forest-600">${course.category}</span>
            <h2 class="text-2xl font-bold text-forest-900 mt-1">${mod.title}</h2>
        </div>

        <!-- 1. VIDEO DE LA CLASE -->
        <div class="space-y-3">
            <div class="flex items-center justify-between gap-3">
                <h3 class="font-bold text-forest-900 flex items-center gap-2">
                    <i data-lucide="play-circle" class="w-5 h-5 text-forest-600"></i>
                    ${mod.videoTitle}
                </h3>
                <button type="button" onclick="toggleStep('${mod.id}', 'video')" class="text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${mp.video ? 'bg-forest-100 border-forest-300 text-forest-800' : 'bg-white border-forest-200 text-forest-700 hover:bg-forest-50'}">
                    ${mp.video ? '✓ Video visto' : 'Marcar como visto'}
                </button>
            </div>
            <div class="aspect-video rounded-2xl overflow-hidden bg-forest-950 border border-forest-100">
                <iframe src="${mod.videoUrl}" class="w-full h-full" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        </div>

        <!-- 2. MATERIAL DE LECTURA PDF -->
        <div class="bg-forest-50/70 border border-forest-100 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div class="space-y-1">
                <span class="inline-flex items-center gap-1.5 text-xs font-bold text-forest-700 uppercase">
                    <i data-lucide="file-text" class="w-4 h-4"></i> Material de lectura PDF
                </span>
                <h4 class="font-bold text-forest-900">${mod.pdfTitle}</h4>
                <p class="text-xs sm:text-sm text-forest-900/75">${mod.pdfSummary}</p>
            </div>
            <div class="flex items-center gap-2 shrink-0">
                <button type="button" onclick="toggleStep('${mod.id}', 'pdf', true)" class="px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors ${mp.pdf ? 'bg-forest-700 text-white' : 'bg-white border border-forest-200 text-forest-800 hover:bg-forest-100'}">
                    ${mp.pdf ? '✓ PDF Leído' : 'Abrir / Marcar PDF'}
                </button>
            </div>
        </div>

        <!-- 3. CUESTIONARIO / EXAMEN DEL MÓDULO -->
        <div class="border border-forest-200 rounded-2xl p-5 sm:p-6 space-y-5">
            <div class="flex items-center justify-between gap-2">
                <div>
                    <span class="text-xs font-bold uppercase tracking-wider text-forest-600">Evaluación del Módulo</span>
                    <h3 class="text-lg font-bold text-forest-900">Cuestionario de Aprobación (Mínimo 70%)</h3>
                </div>
                ${mp.quizPassed ? '<span class="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">Aprobado ✓</span>' : ''}
            </div>

            <form id="module-quiz-form" class="space-y-5">
                ${mod.quiz.map((qItem, qIdx) => `
                    <div class="space-y-2.5">
                        <p class="text-sm font-semibold text-forest-900">${qIdx + 1}. ${qItem.q}</p>
                        <div class="space-y-2">
                            ${qItem.options.map((opt, oIdx) => `
                                <label class="flex items-center gap-3 p-3 rounded-xl border border-forest-100 hover:bg-forest-50 cursor-pointer text-sm">
                                    <input type="radio" name="q_${qIdx}" value="${oIdx}" required class="text-forest-700 focus:ring-forest-500">
                                    <span>${opt}</span>
                                </label>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}

                <button type="submit" class="bg-forest-700 hover:bg-forest-800 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors">
                    Enviar Respuestas y Corregir
                </button>
                <div id="quiz-feedback" class="hidden text-sm font-medium p-3.5 rounded-xl"></div>
            </form>
        </div>
    `;

    if (window.lucide) lucide.createIcons();

    const quizForm = document.getElementById('module-quiz-form');
    quizForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let correct = 0;
        mod.quiz.forEach((qItem, idx) => {
            const selected = quizForm.querySelector(`input[name="q_${idx}"]:checked`);
            if (selected && parseInt(selected.value, 10) === qItem.answer) {
                correct++;
            }
        });

        const score = Math.round((correct / mod.quiz.length) * 100);
        const passed = score >= 70;
        const fb = document.getElementById('quiz-feedback');
        fb.classList.remove('hidden', 'bg-emerald-50', 'text-emerald-800', 'bg-amber-50', 'text-amber-900');

        if (passed) {
            fb.classList.add('bg-emerald-50', 'text-emerald-800');
            fb.textContent = `¡Excelente! Aprobaste con ${score}% (${correct}/${mod.quiz.length} respuestas correctas).`;
            markQuizPassed(mod.id);
        } else {
            fb.classList.add('bg-amber-50', 'text-amber-900');
            fb.textContent = `Obtuviste ${score}% (${correct}/${mod.quiz.length}). Necesitas al menos 70% para aprobar. ¡Inténtalo de nuevo!`;
        }
    });
}

window.toggleStep = function(modId, key, forceTrue = false) {
    const prog = getUserProgress();
    if (!prog[activeCourseId]) prog[activeCourseId] = {};
    if (!prog[activeCourseId][modId]) prog[activeCourseId][modId] = {};

    prog[activeCourseId][modId][key] = forceTrue ? true : !prog[activeCourseId][modId][key];
    saveUserProgress(prog);
    renderCourseSidebar();
    renderActiveModule();
    updateCourseTopBar();
};

function markQuizPassed(modId) {
    const prog = getUserProgress();
    if (!prog[activeCourseId]) prog[activeCourseId] = {};
    if (!prog[activeCourseId][modId]) prog[activeCourseId][modId] = {};
    prog[activeCourseId][modId].quizPassed = true;
    saveUserProgress(prog);
    renderCourseSidebar();
    updateCourseTopBar();
}

window.openCertificateModal = function() {
    const course = CAMPUS_COURSES.find(c => c.id === activeCourseId);
    if (!course || !campusUser) return;

    const today = new Date().toLocaleDateString('es-AR', { day: '2-digit', month: 'long', year: 'numeric' });
    const certCode = `OB-2026-${course.id.toUpperCase()}-${Math.abs(hashCode(campusUser.email)).toString().slice(0, 4)}`;

    document.getElementById('cert-student-name').textContent = campusUser.name;
    document.getElementById('cert-course-title').textContent = course.title;
    document.getElementById('cert-date').textContent = today;
    document.getElementById('cert-code').textContent = certCode;

    const verifyUrl = new URL('verificar.html', window.location.href);
    verifyUrl.searchParams.set('code', certCode);
    verifyUrl.searchParams.set('name', campusUser.name);
    verifyUrl.searchParams.set('course', course.title);
    verifyUrl.searchParams.set('date', today);

    const qrBox = document.getElementById('cert-qr-box');
    qrBox.innerHTML = '';
    if (window.QRCode) {
        new QRCode(qrBox, {
            text: verifyUrl.toString(),
            width: 88,
            height: 88,
            colorDark: '#1B4332',
            colorLight: '#FFFFFF'
        });
    }

    document.getElementById('certificate-modal').classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
};

window.closeCertificateModal = function() {
    document.getElementById('certificate-modal').classList.add('hidden');
};

function hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0;
    }
    return hash;
}
