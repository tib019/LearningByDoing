// HTML5 Semantic Learning - Interactive JavaScript
// Modern ES6+ JavaScript with interactive features

class HTML5LearningApp {
    constructor() {
        this.currentQuestion = 0;
        this.score = 0;
        this.quizData = [
            {
                question: "Welches HTML5-Element wird für den Hauptinhalt einer Webseite verwendet?",
                options: ["&lt;header&gt;", "&lt;main&gt;", "&lt;section&gt;", "&lt;article&gt;"],
                correct: 1,
                explanation: "Das &lt;main&gt;-Element definiert den Hauptinhalt der Seite und sollte nur einmal pro Seite verwendet werden."
            },
            {
                question: "Welches Element wird für die Navigation verwendet?",
                options: ["&lt;nav&gt;", "&lt;menu&gt;", "&lt;navigation&gt;", "&lt;link&gt;"],
                correct: 0,
                explanation: "Das &lt;nav&gt;-Element definiert einen Navigationsbereich mit Links."
            },
            {
                question: "Welches Element ist für eigenständige Inhalte gedacht?",
                options: ["&lt;section&gt;", "&lt;article&gt;", "&lt;div&gt;", "&lt;content&gt;"],
                correct: 1,
                explanation: "Das &lt;article&gt;-Element definiert einen eigenständigen, wiederverwendbaren Inhalt."
            },
            {
                question: "Welches Element wird für thematische Abschnitte verwendet?",
                options: ["&lt;article&gt;", "&lt;section&gt;", "&lt;div&gt;", "&lt;aside&gt;"],
                correct: 1,
                explanation: "Das &lt;section&gt;-Element definiert einen thematischen Abschnitt innerhalb eines Dokuments."
            },
            {
                question: "Welches Element ist für Inhalte gedacht, die vom Hauptinhalt getrennt sind?",
                options: ["&lt;aside&gt;", "&lt;section&gt;", "&lt;div&gt;", "&lt;sidebar&gt;"],
                correct: 0,
                explanation: "Das &lt;aside&gt;-Element definiert Inhalte, die vom Hauptinhalt getrennt sind, wie Sidebars."
            }
        ];
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupMobileMenu();
        this.setupFormValidation();
        this.setupSmoothScrolling();
        this.setupElementCards();
        this.startQuiz();
    }

    setupEventListeners() {
        // Mobile menu toggle
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (mobileToggle && navMenu) {
            mobileToggle.addEventListener('click', () => {
                const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
                mobileToggle.setAttribute('aria-expanded', !isExpanded);
                navMenu.classList.toggle('active');
                mobileToggle.classList.toggle('active');
            });
        }

        // Form submission
        const form = document.querySelector('.modern-form');
        if (form) {
            form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }

        // Quiz buttons
        const submitBtn = document.getElementById('submit-answer');
        const nextBtn = document.getElementById('next-question');
        
        if (submitBtn) {
            submitBtn.addEventListener('click', () => this.submitAnswer());
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextQuestion());
        }

        // Keyboard navigation for quiz
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && document.getElementById('submit-answer').style.display !== 'none') {
                this.submitAnswer();
            }
        });
    }

    setupMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        
        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => {
                hamburger.classList.toggle('active');
            });
        }
    }

    setupFormValidation() {
        const inputs = document.querySelectorAll('.modern-form input, .modern-form textarea, .modern-form select');
        
        inputs.forEach(input => {
            // Real-time validation
            input.addEventListener('input', () => this.validateField(input));
            input.addEventListener('blur', () => this.validateField(input));
            
            // Character counter for textarea
            if (input.tagName === 'TEXTAREA') {
                input.addEventListener('input', () => this.updateCharacterCount(input));
            }
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const isValid = field.checkValidity();
        
        // Remove existing validation classes
        field.classList.remove('valid', 'invalid');
        
        if (value === '') {
            return; // Don't show validation for empty fields
        }
        
        if (isValid) {
            field.classList.add('valid');
            this.showFieldMessage(field, '✓ Gültig', 'success');
        } else {
            field.classList.add('invalid');
            this.showFieldMessage(field, field.validationMessage, 'error');
        }
    }

    showFieldMessage(field, message, type) {
        // Remove existing message
        const existingMessage = field.parentNode.querySelector('.field-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new message
        const messageElement = document.createElement('div');
        messageElement.className = `field-message field-message-${type}`;
        messageElement.textContent = message;
        messageElement.style.cssText = `
            font-size: 0.875rem;
            margin-top: 0.25rem;
            color: ${type === 'success' ? '#10b981' : '#ef4444'};
        `;
        
        field.parentNode.appendChild(messageElement);
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.remove();
            }
        }, 3000);
    }

    updateCharacterCount(textarea) {
        const maxLength = textarea.getAttribute('maxlength');
        const currentLength = textarea.value.length;
        const remaining = maxLength - currentLength;
        
        // Update hint text
        const hint = textarea.parentNode.querySelector('.form-hint');
        if (hint) {
            hint.textContent = `${remaining} Zeichen verbleibend`;
            
            if (remaining < 50) {
                hint.style.color = remaining < 10 ? '#ef4444' : '#f59e0b';
            } else {
                hint.style.color = '#6b7280';
            }
        }
    }

    setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupElementCards() {
        const cards = document.querySelectorAll('.element-card');
        
        cards.forEach(card => {
            card.addEventListener('click', () => {
                this.showElementDetails(card);
            });
            
            // Keyboard navigation
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.showElementDetails(card);
                }
            });
        });
    }

    showElementDetails(card) {
        const elementName = card.querySelector('code').textContent.replace(/[<>]/g, '');
        const details = this.getElementDetails(elementName);
        
        this.showModal(details);
    }

    getElementDetails(elementName) {
        const details = {
            'header': {
                title: 'Header Element',
                description: 'Das &lt;header&gt;-Element definiert den Kopfbereich einer Seite oder eines Abschnitts.',
                usage: 'Verwende es für Seitentitel, Navigation, Logos und andere einleitende Inhalte.',
                examples: [
                    '&lt;header&gt;&lt;h1&gt;Website Titel&lt;/h1&gt;&lt;/header&gt;',
                    '&lt;header&gt;&lt;nav&gt;Navigation&lt;/nav&gt;&lt;/header&gt;'
                ],
                accessibility: 'Screen Reader erkennen automatisch Header-Elemente und können sie für die Navigation verwenden.'
            },
            'nav': {
                title: 'Navigation Element',
                description: 'Das &lt;nav&gt;-Element definiert einen Navigationsbereich mit Links.',
                usage: 'Verwende es für Hauptnavigation, Breadcrumbs, Pagination und andere Navigationslisten.',
                examples: [
                    '&lt;nav&gt;&lt;ul&gt;&lt;li&gt;&lt;a href="#"&gt;Home&lt;/a&gt;&lt;/li&gt;&lt;/ul&gt;&lt;/nav&gt;',
                    '&lt;nav aria-label="Main navigation"&gt;...&lt;/nav&gt;'
                ],
                accessibility: 'Füge aria-label hinzu, um die Navigation zu beschreiben.'
            },
            'main': {
                title: 'Main Element',
                description: 'Das &lt;main&gt;-Element definiert den Hauptinhalt der Seite.',
                usage: 'Verwende es nur einmal pro Seite für den primären Inhalt.',
                examples: [
                    '&lt;main&gt;&lt;h1&gt;Haupttitel&lt;/h1&gt;&lt;article&gt;Inhalt&lt;/article&gt;&lt;/main&gt;',
                    '&lt;main role="main"&gt;...&lt;/main&gt;'
                ],
                accessibility: 'Screen Reader springen automatisch zum main-Element.'
            },
            'article': {
                title: 'Article Element',
                description: 'Das &lt;article&gt;-Element definiert einen eigenständigen, wiederverwendbaren Inhalt.',
                usage: 'Verwende es für Blog-Posts, Kommentare, Produktkarten und andere eigenständige Inhalte.',
                examples: [
                    '&lt;article&gt;&lt;h2&gt;Blog Post&lt;/h2&gt;&lt;p&gt;Inhalt...&lt;/p&gt;&lt;/article&gt;',
                    '&lt;article&gt;&lt;header&gt;&lt;h3&gt;Kommentar&lt;/h3&gt;&lt;/header&gt;...&lt;/article&gt;'
                ],
                accessibility: 'Jedes article kann unabhängig von der Seite verstanden werden.'
            },
            'section': {
                title: 'Section Element',
                description: 'Das &lt;section&gt;-Element definiert einen thematischen Abschnitt.',
                usage: 'Verwende es für thematisch gruppierte Inhalte innerhalb eines Dokuments.',
                examples: [
                    '&lt;section&gt;&lt;h2&gt;Über uns&lt;/h2&gt;&lt;p&gt;Text...&lt;/p&gt;&lt;/section&gt;',
                    '&lt;section aria-labelledby="section-title"&gt;...&lt;/section&gt;'
                ],
                accessibility: 'Füge eine Überschrift hinzu oder verwende aria-labelledby.'
            },
            'aside': {
                title: 'Aside Element',
                description: 'Das &lt;aside&gt;-Element definiert Inhalte, die vom Hauptinhalt getrennt sind.',
                usage: 'Verwende es für Sidebars, Werbung, Fußnoten und andere sekundäre Inhalte.',
                examples: [
                    '&lt;aside&gt;&lt;h3&gt;Sidebar&lt;/h3&gt;&lt;ul&gt;&lt;li&gt;Links&lt;/li&gt;&lt;/ul&gt;&lt;/aside&gt;',
                    '&lt;aside&gt;&lt;blockquote&gt;Zitat&lt;/blockquote&gt;&lt;/aside&gt;'
                ],
                accessibility: 'Kann mit aria-label beschrieben werden, wenn der Inhalt nicht klar ist.'
            },
            'footer': {
                title: 'Footer Element',
                description: 'Das &lt;footer&gt;-Element definiert den Fußbereich einer Seite oder eines Abschnitts.',
                usage: 'Verwende es für Copyright-Informationen, Kontaktdaten, Links und andere Fußbereich-Inhalte.',
                examples: [
                    '&lt;footer&gt;&lt;p&gt;&copy; 2024 Website&lt;/p&gt;&lt;/footer&gt;',
                    '&lt;footer&gt;&lt;nav&gt;Footer Navigation&lt;/nav&gt;&lt;/footer&gt;'
                ],
                accessibility: 'Wird automatisch von Screen Readern als Footer erkannt.'
            }
        };
        
        return details[elementName] || {
            title: 'Element nicht gefunden',
            description: 'Keine Details verfügbar.',
            usage: '',
            examples: [],
            accessibility: ''
        };
    }

    showModal(details) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${details.title}</h3>
                    <button class="modal-close" aria-label="Close modal">&times;</button>
                </div>
                <div class="modal-body">
                    <p><strong>Beschreibung:</strong> ${details.description}</p>
                    <p><strong>Verwendung:</strong> ${details.usage}</p>
                    <div class="examples">
                        <h4>Beispiele:</h4>
                        ${details.examples.map(example => `<pre><code>${example}</code></pre>`).join('')}
                    </div>
                    <p><strong>Accessibility:</strong> ${details.accessibility}</p>
                </div>
            </div>
        `;
        
        // Add styles
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            animation: fadeIn 0.3s ease-out;
        `;
        
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.cssText = `
            background: white;
            border-radius: 12px;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
            animation: slideIn 0.3s ease-out;
        `;
        
        const modalHeader = modal.querySelector('.modal-header');
        modalHeader.style.cssText = `
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem;
            border-bottom: 1px solid #e5e7eb;
        `;
        
        const modalBody = modal.querySelector('.modal-body');
        modalBody.style.cssText = `
            padding: 1.5rem;
        `;
        
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #6b7280;
            padding: 0.25rem;
        `;
        
        // Close functionality
        const closeModal = () => {
            modal.style.animation = 'fadeOut 0.3s ease-out';
            modalContent.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => modal.remove(), 300);
        };
        
        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        
        document.body.appendChild(modal);
        
        // Focus management
        closeBtn.focus();
        
        // Keyboard navigation
        modal.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });
    }

    startQuiz() {
        this.currentQuestion = 0;
        this.score = 0;
        this.updateQuizDisplay();
    }

    updateQuizDisplay() {
        const question = this.quizData[this.currentQuestion];
        const questionText = document.getElementById('question-text');
        const optionsContainer = document.getElementById('quiz-options');
        const currentQuestionSpan = document.getElementById('current-question');
        const totalQuestionsSpan = document.getElementById('total-questions');
        const progressFill = document.getElementById('progress-fill');
        
        if (questionText) questionText.textContent = question.question;
        if (currentQuestionSpan) currentQuestionSpan.textContent = this.currentQuestion + 1;
        if (totalQuestionsSpan) totalQuestionsSpan.textContent = this.quizData.length;
        if (progressFill) {
            const progress = ((this.currentQuestion + 1) / this.quizData.length) * 100;
            progressFill.style.width = `${progress}%`;
        }
        
        if (optionsContainer) {
            optionsContainer.innerHTML = question.options.map((option, index) => `
                <label class="quiz-option">
                    <input type="radio" name="answer" value="${index}">
                    <span class="option-text">${option}</span>
                </label>
            `).join('');
        }
        
        // Reset button states
        const submitBtn = document.getElementById('submit-answer');
        const nextBtn = document.getElementById('next-question');
        
        if (submitBtn) {
            submitBtn.style.display = 'inline-flex';
            submitBtn.disabled = false;
        }
        if (nextBtn) {
            nextBtn.style.display = 'none';
        }
    }

    submitAnswer() {
        const selectedAnswer = document.querySelector('input[name="answer"]:checked');
        
        if (!selectedAnswer) {
            this.showMessage('Bitte wähle eine Antwort aus!', 'warning');
            return;
        }
        
        const answer = parseInt(selectedAnswer.value);
        const question = this.quizData[this.currentQuestion];
        const isCorrect = answer === question.correct;
        
        if (isCorrect) {
            this.score++;
            this.showMessage('Richtig! 🎉', 'success');
        } else {
            this.showMessage(`Falsch! Die richtige Antwort ist: ${question.options[question.correct]}`, 'error');
        }
        
        // Disable all options
        const options = document.querySelectorAll('.quiz-option input');
        options.forEach(option => {
            option.disabled = true;
            const label = option.closest('.quiz-option');
            if (parseInt(option.value) === question.correct) {
                label.style.background = '#d1fae5';
                label.style.borderColor = '#10b981';
            } else if (option.checked && parseInt(option.value) !== question.correct) {
                label.style.background = '#fee2e2';
                label.style.borderColor = '#ef4444';
            }
        });
        
        // Show next button
        const submitBtn = document.getElementById('submit-answer');
        const nextBtn = document.getElementById('next-question');
        
        if (submitBtn) submitBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'inline-flex';
    }

    nextQuestion() {
        this.currentQuestion++;
        
        if (this.currentQuestion >= this.quizData.length) {
            this.showQuizResult();
        } else {
            this.updateQuizDisplay();
        }
    }

    showQuizResult() {
        const quizQuestion = document.getElementById('quiz-question');
        const quizResult = document.getElementById('quiz-result');
        const scoreSpan = document.getElementById('score');
        const maxScoreSpan = document.getElementById('max-score');
        
        if (quizQuestion) quizQuestion.style.display = 'none';
        if (quizResult) quizResult.style.display = 'block';
        if (scoreSpan) scoreSpan.textContent = this.score;
        if (maxScoreSpan) maxScoreSpan.textContent = this.quizData.length;
        
        const percentage = (this.score / this.quizData.length) * 100;
        let message = '';
        
        if (percentage === 100) {
            message = 'Perfekt! Du beherrschst HTML5-Semantik! 🏆';
        } else if (percentage >= 80) {
            message = 'Sehr gut! Du hast ein solides Verständnis! 🌟';
        } else if (percentage >= 60) {
            message = 'Gut! Du bist auf dem richtigen Weg! 👍';
        } else {
            message = 'Übe weiter! Du wirst es schaffen! 💪';
        }
        
        this.showMessage(message, percentage >= 60 ? 'success' : 'warning');
    }

    restartQuiz() {
        const quizQuestion = document.getElementById('quiz-question');
        const quizResult = document.getElementById('quiz-result');
        
        if (quizQuestion) quizQuestion.style.display = 'block';
        if (quizResult) quizResult.style.display = 'none';
        
        this.startQuiz();
    }

    handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        // Validate all fields
        const inputs = e.target.querySelectorAll('input, textarea, select');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.checkValidity()) {
                isValid = false;
                this.validateField(input);
            }
        });
        
        if (!isValid) {
            this.showMessage('Bitte fülle alle Pflichtfelder korrekt aus.', 'error');
            return;
        }
        
        // Simulate form submission
        this.showMessage('Formular erfolgreich übermittelt! 🎉', 'success');
        e.target.reset();
        
        // Reset validation states
        inputs.forEach(input => {
            input.classList.remove('valid', 'invalid');
        });
    }

    showMessage(message, type = 'info') {
        const messageElement = document.createElement('div');
        messageElement.className = `message message-${type}`;
        messageElement.textContent = message;
        
        messageElement.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            z-index: 1000;
            animation: slideInRight 0.3s ease-out;
            max-width: 400px;
        `;
        
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#3b82f6'
        };
        
        messageElement.style.background = colors[type] || colors.info;
        
        document.body.appendChild(messageElement);
        
        // Auto-remove after 4 seconds
        setTimeout(() => {
            messageElement.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                if (messageElement.parentNode) {
                    messageElement.remove();
                }
            }, 300);
        }, 4000);
    }
}

// Global functions for backward compatibility
function startLearning() {
    document.getElementById('semantic-elements').scrollIntoView({ behavior: 'smooth' });
}

function showExamples() {
    document.getElementById('media').scrollIntoView({ behavior: 'smooth' });
}

function submitAnswer() {
    if (window.app) {
        window.app.submitAnswer();
    }
}

function nextQuestion() {
    if (window.app) {
        window.app.nextQuestion();
    }
}

function restartQuiz() {
    if (window.app) {
        window.app.restartQuiz();
    }
}

function showElementDetails(elementName) {
    if (window.app) {
        window.app.showElementDetails({ querySelector: () => ({ textContent: elementName }) });
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new HTML5LearningApp();
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes slideIn {
        from { transform: translateY(-20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateY(0); opacity: 1; }
        to { transform: translateY(-20px); opacity: 0; }
    }
    
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: var(--primary-color);
        padding: 1rem;
        box-shadow: var(--shadow-lg);
    }
    
    .mobile-menu-toggle.active .hamburger {
        background: transparent;
    }
    
    .mobile-menu-toggle.active .hamburger::before {
        transform: rotate(45deg);
        top: 0;
    }
    
    .mobile-menu-toggle.active .hamburger::after {
        transform: rotate(-45deg);
        bottom: 0;
    }
    
    .field-message {
        animation: fadeIn 0.3s ease-out;
    }
    
    .quiz-option input:checked + .option-text {
        font-weight: 600;
    }
`;
document.head.appendChild(style); 