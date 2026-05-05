// Password Configuration
// 注意：前端密码验证仅用于简单保护，懂技术的人可以绕过
// 如需真正安全，需要后端支持
const PASSWORDS = {
    hobbies: 'hobby123',      // 个人爱好密码
    social: 'social456',      // 社交密码
    growth: 'growth789',      // 成长经历密码
    art: 'art2024',          // 艺术与审美密码
    personality: 'person321', // 性格与特质密码
    moments: 'moment654'      // moments 密码
};

// Module paths
const MODULE_PATHS = {
    resume: 'resume/',
    hobbies: 'hobbies/',
    social: 'social/',
    growth: 'growth/',
    art: 'art/',
    personality: 'personality/',
    moments: 'moments/'
};

// Current module being accessed
let currentModule = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Get all books
    const books = document.querySelectorAll('.book');

    // Add click listeners
    books.forEach(book => {
        book.addEventListener('click', () => {
            const module = book.dataset.module;
            const isProtected = book.dataset.protected === 'true';

            if (isProtected) {
                showPasswordModal(module);
            } else {
                navigateToModule(module);
            }
        });
    });

    // Modal buttons
    document.getElementById('btn-confirm').addEventListener('click', verifyPassword);
    document.getElementById('btn-cancel').addEventListener('click', hidePasswordModal);
    document.getElementById('password-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            verifyPassword();
        }
    });

    // Close modal on overlay click
    document.getElementById('password-modal').addEventListener('click', (e) => {
        if (e.target.id === 'password-modal') {
            hidePasswordModal();
        }
    });
});

// Show password modal
function showPasswordModal(module) {
    currentModule = module;
    const modal = document.getElementById('password-modal');
    const input = document.getElementById('password-input');
    const error = document.getElementById('error-message');

    error.textContent = '';
    input.value = '';
    modal.classList.add('visible');

    setTimeout(() => {
        input.focus();
    }, 300);
}

// Hide password modal
function hidePasswordModal() {
    const modal = document.getElementById('password-modal');
    modal.classList.remove('visible');
    currentModule = null;
}

// Verify password
function verifyPassword() {
    if (!currentModule) return;

    const input = document.getElementById('password-input');
    const error = document.getElementById('error-message');
    const enteredPassword = input.value.trim();

    if (!enteredPassword) {
        error.textContent = '请输入密码';
        shakeInput();
        return;
    }

    const correctPassword = PASSWORDS[currentModule];

    if (enteredPassword === correctPassword) {
        // Password correct
        error.textContent = '';
        hidePasswordModal();
        navigateToModule(currentModule);
    } else {
        // Password incorrect
        error.textContent = '密码错误，请重试';
        input.value = '';
        shakeInput();
    }
}

// Shake animation for wrong password
function shakeInput() {
    const input = document.getElementById('password-input');
    input.style.animation = 'shake 0.5s ease';
    setTimeout(() => {
        input.style.animation = '';
    }, 500);
}

// Add shake animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);

// Navigate to module
function navigateToModule(module) {
    const path = MODULE_PATHS[module];
    if (path) {
        // Add fade out effect
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '0';

        setTimeout(() => {
            window.location.href = path;
        }, 500);
    } else {
        alert('模块路径未配置');
    }
}
