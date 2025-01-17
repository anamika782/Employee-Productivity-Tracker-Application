const { createApp, reactive, ref, onMounted } = Vue;

createApp({
    setup() {
        const tasks = ref([]);
        const newTask = reactive({ title: '', description: '', time: '', priority: 'low', category: 'BAU' });
        const showProfileModal = ref(false);
        const isLoggedIn = ref(localStorage.getItem('isLoggedIn') === 'true');
        const username = ref(localStorage.getItem('username') || '');
        const loading = ref(false);

        const loginForm = reactive({ email: '', password: '' });
        const registerForm = reactive({ username: '', email: '', password: '' });
        const isRegistering = ref(false);

        const addTask = () => {
            const task = { ...newTask, id: Date.now(), completed: false };
            tasks.value.push(task);
            Object.assign(newTask, { title: '', description: '', time: '', priority: 'low', category: 'BAU' });
        };

        const removeTask = (task) => {
            tasks.value = tasks.value.filter(t => t.id !== task.id);
        };

        const toggleTaskStatus = (task) => {
            task.completed = !task.completed;
        };

        const priorityClass = (priority) => {
            switch (priority) {
                case 'low': return 'bg-green-500';
                case 'medium': return 'bg-yellow-500';
                case 'high': return 'bg-red-500';
                default: return '';
            }
        };

        const categoryClass = (category) => {
            switch (category) {
                case 'BAU': return 'bg-blue-500';
                case 'Ad Hoc': return 'bg-gray-500';
                case 'Project-Based': return 'bg-purple-500';
                default: return '';
            }
        };

        const login = () => {
            if (loginForm.email && loginForm.password) {
                isLoggedIn.value = true;
                username.value = loginForm.email;
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('username', loginForm.email);
                showProfileModal.value = false;
            }
        };

        const register = () => {
            if (registerForm.username && registerForm.email && registerForm.password) {
                isLoggedIn.value = true;
                username.value = registerForm.username;
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('username', registerForm.username);
                showProfileModal.value = false;
            }
        };

        const logout = () => {
            isLoggedIn.value = false;
            username.value = '';
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('username');
        };

        const switchToRegister = () => {
            isRegistering.value = true;
        };

        const switchToLogin = () => {
            isRegistering.value = false;
        };

        onMounted(() => {
            // Load any saved user state if exists
            if (localStorage.getItem('isLoggedIn') === 'true') {
                username.value = localStorage.getItem('username');
            }
        });

        return {
            tasks,
            newTask,
            addTask,
            removeTask,
            toggleTaskStatus,
            priorityClass,
            categoryClass,
            showProfileModal,
            isLoggedIn,
            username,
            loginForm,
            registerForm,
            isRegistering,
            login,
            register,
            logout,
            switchToRegister,
            switchToLogin,
            loading
        };
    }
}).mount('#app');