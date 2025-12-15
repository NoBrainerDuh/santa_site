document.addEventListener('DOMContentLoaded', function() {
    // === КОНФИГУРАЦИЯ ===
    const CONFIG = {
        friendName: 'Tedwin', // Замените на имя друга
        characterName: 'Ведмедь-свирепый!', // Замените на имя персонажа
        characterImage: 'character_main.png', // Путь к арту персонажа
        giftGif: 'character1.png', // Пиксель-арт гифка для подарка
        maxDecorations: 50,
        gameDuration: 40,
        maxMisses: 3
    };

    // === СОСТОЯНИЕ ПРИЛОЖЕНИЯ ===
    const state = {
        timeSpent: 0,
        roomProgress: 0,
        achievements: [],
        gameStats: {
            giftsCaught: 0,
            missed: 0,
            timeLeft: CONFIG.gameDuration,
            isPlaying: false
        },
        character: {
            level: 100,
            power: 9999,
            upgrades: 0,
            skin: 'default'
        },
        interactions: {
            snowballs: 0,
            cocoa: 0,
            decorations: 3,
            fireLit: false,
            weaponsSpun: 0
        },
        musicPlaying: false,
        giftOpened: false
    };

    // === ЭЛЕМЕНТЫ DOM ===
    const elements = {
        musicToggle: document.getElementById('musicToggle'),
        charLevel: document.getElementById('charLevel'),
        charPower: document.getElementById('charPower'),
        fireStatus: document.getElementById('fireStatus'),
        snowballCount: document.getElementById('snowballCount'),
        cocoaCount: document.getElementById('cocoaCount'),
        decorCount: document.getElementById('decorCount'),
        roomProgress: document.getElementById('roomProgress'),
        coziness: document.getElementById('coziness'),
        giftsCaught: document.getElementById('giftsCaught'),
        gameTime: document.getElementById('gameTime'),
        missed: document.getElementById('missed'),
        timeSpent: document.getElementById('timeSpent'),
        personalMsg: document.getElementById('personalMsg'),
        achievementList: document.getElementById('achievementList'),
        secretCode: document.getElementById('secretCode'),
        openGift: document.getElementById('openGift'),
        finalMessage: document.getElementById('finalMessage'),
        gameCanvas: document.getElementById('gameCanvas'),
        startGame: document.getElementById('startGame'),
        scrollTop: document.getElementById('scrollTop'),
        copyCode: document.getElementById('copyCode'),
        shareBtn: document.getElementById('shareBtn'),
        giftBox: document.querySelector('.gift-box')
    };

    // === ИНИЦИАЛИЗАЦИЯ ===
    function init() {
        updateUI();
        createSnowflakes();
        createGarlands();
        setupEventListeners();
        startTimer();
        setupParallax();
        setupVolumeSlider();
        setupGame();
        setupSteamGift();
        
        // Обновляем имена
        document.querySelectorAll('.friend-name').forEach(el => {
            el.textContent = CONFIG.friendName;
        });
        
        // Устанавливаем изображение персонажа
        const charImg = document.querySelector('.character-img');
        if (charImg) {
            charImg.src = CONFIG.characterImage;
            charImg.alt = CONFIG.characterName;
        }
        
        // Устанавливаем имя персонажа
        const charName = document.querySelector('.character-info h3');
        if (charName) {
            charName.textContent = CONFIG.characterName;
        }
        
        // Устанавливаем диалог персонажа
        const dialogue = document.getElementById('charDialogue');
        if (dialogue) {
            dialogue.textContent = 
                `"${CONFIG.friendName}! Prepare your butt cheeks, НГ INCOMMING *читать голосом хэви из TF2*"`;
        }
    }

    // === СНЕЖИНКИ ===
    function createSnowflakes() {
        const container = document.querySelector('.snow-container');
        if (!container) return;
        
        for (let i = 0; i < 150; i++) {
            const snowflake = document.createElement('div');
            snowflake.classList.add('snowflake');
            
            const size = Math.random() * 17 + 8;
            snowflake.style.width = size + 'px';
            snowflake.style.height = size + 'px';
            
            // Ключевое изменение: позиция ВЫШЕ экрана
            snowflake.style.left = Math.random() * 100 + 'vw';
            snowflake.style.top = '-' + (Math.random() * 100 + 50) + 'px'; // -50px до -150px
            
            snowflake.style.opacity = Math.random() * 0.7 + 0.2;
            
            const duration = Math.random() * 20 + 10;
            snowflake.style.animationDuration = duration + 's';
            snowflake.style.animationDelay = Math.random() * 10 + 's';
            
            if (size > 15) {
                snowflake.style.filter = 'blur(1px)';
            }
            
            const wind = Math.random() * 60 - 30;
            snowflake.style.setProperty('--wind', wind + 'px');
            
            container.appendChild(snowflake);
        }
    }

function createGarlands() {
    const screens = document.querySelectorAll('.screen');
    
    screens.forEach(screen => {
        const garland = document.createElement('div');
        garland.className = 'garland';
        
        // Создаём 22 лампочки
        for (let i = 0; i < 22; i++) {
            const bulb = document.createElement('div');
            bulb.className = 'light-bulb';
            garland.appendChild(bulb);
        }
        
        screen.appendChild(garland);
    });
}

    // === ПАРАЛЛАКС ===
    function setupParallax() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const layer2 = document.querySelector('.layer-2');
            if (layer2) {
                layer2.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        });
    }

    // === ТАЙМЕР ВРЕМЕНИ НА САЙТЕ ===
    function startTimer() {
        setInterval(() => {
            state.timeSpent++;
            if (elements.timeSpent) {
                elements.timeSpent.textContent = state.timeSpent;
            }
            
            // Автоматические достижения за время
            if (state.timeSpent === 10) addAchievement('🎯 Первые 10 секунд волшебства!');
            if (state.timeSpent === 30) addAchievement('⏱ Провёл 30 секунд в новогодней сказке');
            if (state.timeSpent === 60) addAchievement('🏆 Целую минуту наслаждался атмосферой!');
        }, 1000);
    }

    // === ИНТЕРАКТИВНЫЕ ЭЛЕМЕНТЫ ===
    function setupEventListeners() {
        // Музыка
        if (elements.musicToggle) {
            elements.musicToggle.addEventListener('click', toggleMusic);
        }
        
        // Действия с персонажем
        document.getElementById('upgradeChar')?.addEventListener('click', upgradeCharacter);
        document.getElementById('changeSkin')?.addEventListener('click', changeSkin);
        document.getElementById('spinWeapon')?.addEventListener('click', spinWeapon);
        
        // Комната
        document.querySelectorAll('[data-action]').forEach(btn => {
            btn.addEventListener('click', function() {
                const action = this.dataset.action;
                handleRoomAction(action);
            });
        });
        
        // Игра
        elements.startGame?.addEventListener('click', startGame);
        
        // Подарок
        elements.openGift?.addEventListener('click', openGift);
        
        // Копирование кода
        elements.copyCode?.addEventListener('click', copySecretCode);
        
        // Поделиться
        elements.shareBtn?.addEventListener('click', shareExperience);
        
        // Скролл наверх
        elements.scrollTop?.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        // Навигационные точки
        document.querySelectorAll('.nav-dot').forEach(dot => {
            dot.addEventListener('click', function(e) {
                e.preventDefault();
                const screenId = this.dataset.screen;
                const screen = document.getElementById(`screen${screenId}`);
                if (screen) {
                    screen.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Отслеживаем скролл для активной точки
        window.addEventListener('scroll', updateActiveNavDot);
        
        // Анимация при наведении на подарок
        if (elements.giftBox) {
            elements.giftBox.addEventListener('mouseenter', () => {
                if (!state.giftOpened) {
                    const lid = elements.giftBox.querySelector('.box-lid');
                    if (lid) {
                        lid.style.transform = 'rotateX(45deg)';
                    }
                }
            });
            
            elements.giftBox.addEventListener('mouseleave', () => {
                if (!state.giftOpened) {
                    const lid = elements.giftBox.querySelector('.box-lid');
                    if (lid) {
                        lid.style.transform = 'rotateX(0deg)';
                    }
                }
            });
        }
    }

    // === ОБРАБОТЧИКИ ДЕЙСТВИЙ ===
    function toggleMusic() {
        state.musicPlaying = !state.musicPlaying;
        const audio = document.getElementById('bgMusic');
        const volumeSlider = document.getElementById('volumeSlider');
        const volumeContainer = document.getElementById('volumeSliderContainer');
        
        // Устанавливаем громкость из слайдера или по умолчанию
        if (volumeSlider) {
            audio.volume = volumeSlider.value / 100;
        } else {
            audio.volume = 0.3; // 30% по умолчанию
        }
        
        if (state.musicPlaying) {
            audio.play().catch(e => {
                console.log("Автоплей заблокирован:", e);
                showNotification("🎵 Нажмите на страницу, чтобы включить музыку");
            });
            elements.musicToggle.innerHTML = '<span>🔇 Выключить музыку</span>';
            addAchievement('🎵 Включил новогоднее настроение');
            
            // ПОКАЗЫВАЕМ слайдер громкости
            if (volumeContainer) {
                setTimeout(() => {
                    volumeContainer.classList.remove('hidden');
                    setTimeout(() => {
                        volumeContainer.classList.add('visible');
                    }, 10);
                }, 300);
            }
            
        } else {
            audio.pause();
            elements.musicToggle.innerHTML = '<span>🎵 Включить музыку</span>';
            
            // СКРЫВАЕМ слайдер громкости
            if (volumeContainer) {
                volumeContainer.classList.remove('visible');
                setTimeout(() => {
                    volumeContainer.classList.add('hidden');
                }, 500);
            }
        }
    }

    // Добавь обработчик слайдера громкости
    function setupVolumeSlider() {
        const volumeSlider = document.getElementById('volumeSlider');
        const volumePercent = document.getElementById('volumePercent');
        const volumeIcon = document.querySelector('.volume-icon');
        const audio = document.getElementById('bgMusic');
        
        if (!volumeSlider || !audio) return;
        
        // Изначальная громкость
        audio.volume = volumeSlider.value / 100;
        
        // Обновляем при движении слайдера
        volumeSlider.addEventListener('input', function() {
            const volume = this.value / 100;
            audio.volume = volume;
            
            // Обновляем процент
            if (volumePercent) {
                volumePercent.textContent = this.value + '%';
            }
            
            // Меняем иконку в зависимости от громкости
            if (volumeIcon) {
                if (this.value == 0) {
                    volumeIcon.textContent = '🔇';
                } else if (this.value < 30) {
                    volumeIcon.textContent = '🔈';
                } else if (this.value < 70) {
                    volumeIcon.textContent = '🔉';
                } else {
                    volumeIcon.textContent = '🔊';
                }
            }
            
            // Анимация иконки
            if (volumeIcon) {
                volumeIcon.style.transform = 'scale(1.3)';
                setTimeout(() => {
                    volumeIcon.style.transform = 'scale(1)';
                }, 200);
            }
        });
        
        // Сохраняем громкость при изменении
        volumeSlider.addEventListener('change', function() {
            // Можно сохранить в localStorage
            localStorage.setItem('santaMusicVolume', this.value);
        });
        
        // Загружаем сохранённую громкость
        const savedVolume = localStorage.getItem('santaMusicVolume');
        if (savedVolume) {
            volumeSlider.value = savedVolume;
            audio.volume = savedVolume / 100;
            if (volumePercent) {
                volumePercent.textContent = savedVolume + '%';
            }
        }
    }

    function upgradeCharacter() {
        state.character.upgrades++;
        state.character.power += 100;
        if (elements.charPower) {
            elements.charPower.textContent = state.character.power;
        }
        
        // Анимация
        const charImg = document.querySelector('.character-img');
        if (charImg) {
            charImg.style.transform = 'scale(1.05)';
            setTimeout(() => charImg.style.transform = '', 300);
        }
        
        showNotification(`💪 Сила увеличена до ${state.character.power}!`);
        if (state.character.upgrades === 5) addAchievement('⚡ Прокачал персонажа 5 раз!');
        updateUI();
    }

    function changeSkin() {
        const skins = [
            { name: 'Огненный', color: '#e84141', borderImage: 'none' },
            { name: 'Ледяной', color: '#4cc9f0', borderImage: 'none' },
            { name: 'Золотой', color: '#ffd700', borderImage: 'none' },
            { name: 'Природный', color: '#2d6a4f', borderImage: 'none' },
            { name: 'Радужный', color: 'transparent', borderImage: 'linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet)' }
        ];
        
        const randomSkin = skins[Math.floor(Math.random() * skins.length)];
        state.character.skin = randomSkin.name;
        const charCard = document.querySelector('.character-card');
        
        if (charCard) {
            charCard.style.borderColor = randomSkin.color;
            charCard.style.borderImage = randomSkin.borderImage;
            if (randomSkin.borderImage !== 'none') {
                charCard.style.borderImageSlice = '1';
            } else {
                charCard.style.borderImageSlice = '0';
            }
        }
        
        showNotification(`🎨 Скин изменён на "${randomSkin.name}"!`);
        addAchievement('🎭 Сменил облик персонажа');
    }
let isSpinning = false; // Добавь в начале файла (после state)

    function spinWeapon() {
        if (isSpinning) return; // Если уже вращается - выходим
        
        state.interactions.weaponsSpun++;
        isSpinning = true; // Блокируем кнопку
        
        // Анимация вращения
        const charImg = document.querySelector('.character-img');
        if (charImg) {
            charImg.classList.add('weapon-spin');
            
            // Разблокируем после анимации (2 секунды)
            setTimeout(() => {
                charImg.classList.remove('weapon-spin');
                isSpinning = false;
            }, 2000);
        }
        
        showNotification(`⚔️ ${CONFIG.characterName} перекатывается! Уже ${state.interactions.weaponsSpun} раз(-а)!`);
        if (state.interactions.weaponsSpun === 3) addAchievement('🔄 Перекатиться 3 раза!');
    }

    function handleRoomAction(action) {
        switch(action) {
            case 'fire':
                state.interactions.fireLit = !state.interactions.fireLit;
                if (elements.fireStatus) {
                    elements.fireStatus.textContent = state.interactions.fireLit ? 'Да 🔥' : 'Нет';
                }
                if (state.interactions.fireLit) {
                    addAchievement('🔥 Разжёг уютный камин');
                    showNotification('Камин горит, в комнате стало теплее!');
                }
                break;
                
            case 'snowball':
                state.interactions.snowballs++;
                if (elements.snowballCount) {
                    elements.snowballCount.textContent = state.interactions.snowballs;
                }
                createSnowballAnimation();
                if (state.interactions.snowballs === 10) addAchievement('❄️ Мастер снежков!');
                break;
                
            case 'cocoa':
                state.interactions.cocoa++;
                if (elements.cocoaCount) {
                    elements.cocoaCount.textContent = state.interactions.cocoa;
                }
                if (state.interactions.cocoa === 3) addAchievement('☕ Ценитель горячего какао');
                showNotification('Вкусное какао готово!');
                break;
                
            case 'decorate':
                if (state.interactions.decorations < CONFIG.maxDecorations) {
                    state.interactions.decorations++;
                    if (elements.decorCount) {
                        elements.decorCount.textContent = state.interactions.decorations;
                    }
                    addDecoration();
                    if (state.interactions.decorations === CONFIG.maxDecorations) {
                        addAchievement('🎄 Украсил ёлку до блеска!');
                    }
                }
                break;
        }
        
        updateRoomProgress();
        updateUI();
    }

    function updateRoomProgress() {
        let progress = 0;
        if (state.interactions.fireLit) progress += 25;
        progress += Math.min(state.interactions.snowballs * 2, 10);
        progress += Math.min(state.interactions.cocoa * 5, 15);
        progress += state.interactions.decorations;
        
        state.roomProgress = Math.min(progress, 100);
        if (elements.roomProgress) {
            elements.roomProgress.style.width = state.roomProgress + '%';
        }
        if (elements.coziness) {
            elements.coziness.textContent = state.roomProgress + '%';
        }
        
        if (state.roomProgress >= 100) {
            addAchievement('🏠 Создал идеально уютную комнату!');
        }
    }

    function addDecoration() {
        const tree = document.querySelector('.tree');
        if (!tree) return;
        
        const colors = ['#e84141', '#ffd166', '#2d6a4f', '#4cc9f0', '#9d4edd', '#ff6b6b', '#ff9e00'];
        const color = colors[(state.interactions.decorations - 1) % colors.length];
        
        const dec = document.createElement('div');
        dec.className = 'decoration';
        
        // Позиционируем внутри ёлки (не выходя за границы)
        const treeRect = tree.getBoundingClientRect();
        const treeWidth = treeRect.width;
        const treeHeight = treeRect.height;
        
        // Ограничиваем позицию украшений (10px отступ от краёв)
        const left = Math.random() * (treeWidth - 40) + 20;
        const top = Math.random() * (treeHeight - 60) + 20;
        
        dec.style.cssText = `
            position: absolute;
            width: 20px;
            height: 20px;
            background: ${color};
            border-radius: 50%;
            top: ${top}px;
            left: ${left}px;
            animation: sparkle 1s infinite alternate;
            z-index: 2;
            box-shadow: 0 0 10px ${color};
        `;
        
        const decorations = tree.querySelector('.decorations') || (() => {
            const div = document.createElement('div');
            div.className = 'decorations';
            tree.appendChild(div);
            return div;
        })();
        
        decorations.appendChild(dec);
    }

    // === МИНИ-ИГРА ===
    let gameCtx, santaX, gifts = [], coals = [], lastTime = 0, gameInterval;

    function setupGame() {
        if (!elements.gameCanvas) return;
        
        gameCtx = elements.gameCanvas.getContext('2d');
        santaX = elements.gameCanvas.width / 2 - 25;
        
        // Управление клавиатурой
        document.addEventListener('keydown', (e) => {
            if (!state.gameStats.isPlaying) return;
            if (e.key === 'ArrowLeft') santaX = Math.max(0, santaX - 20);
            if (e.key === 'ArrowRight') santaX = Math.min(elements.gameCanvas.width - 50, santaX + 20);
            if (e.key === ' ') toggleGamePause();
        });
        
        elements.gameCanvas.addEventListener('click', (e) => {
            if (!state.gameStats.isPlaying) return;
            const rect = elements.gameCanvas.getBoundingClientRect();
            santaX = e.clientX - rect.left - 25;
        });
    }

    function startGame() {
        if (state.gameStats.isPlaying) return;
        
        state.gameStats = {
            giftsCaught: 0,
            missed: 0,
            timeLeft: CONFIG.gameDuration,
            isPlaying: true
        };
        
        gifts = [];
        coals = [];
        lastTime = Date.now();
        
        updateGameUI();
        gameInterval = setInterval(gameLoop, 1000/60);
        
        addAchievement('🎮 Запустил новогоднюю игру');
        showNotification('Лови подарки, избегай углей! Управляй мышкой или стрелками!');
    }

    function gameLoop() {
        if (!state.gameStats.isPlaying) return;
        
        const currentTime = Date.now();
        const deltaTime = (currentTime - lastTime) / 1000;
        lastTime = currentTime;
        
        // Обновляем таймер
        state.gameStats.timeLeft -= deltaTime;
        if (state.gameStats.timeLeft <= 0) {
            endGame();
            return;
        }
        
        // Генерация объектов
        if (Math.random() < 0.03) {
            gifts.push({
                x: Math.random() * (elements.gameCanvas.width - 30),
                y: -30,
                speed: Math.random() * 100 + 50
            });
        }
        
        if (Math.random() < 0.02) {
            coals.push({
                x: Math.random() * (elements.gameCanvas.width - 30),
                y: -30,
                speed: Math.random() * 100 + 100
            });
        }
        
        // Обновление позиций и проверка столкновений
        updateObjects(gifts, deltaTime);
        updateObjects(coals, deltaTime);
        checkCollisions();
        
        // Отрисовка
        drawGame();
        updateGameUI();
    }

    function updateObjects(array, deltaTime) {
        for (let i = array.length - 1; i >= 0; i--) {
            array[i].y += array[i].speed * deltaTime;
            if (array[i].y > elements.gameCanvas.height) {
                array.splice(i, 1);
            }
        }
    }

    function checkCollisions() {
        // Санта: x, y, width, height
        const santaBox = { x: santaX, y: elements.gameCanvas.height - 60, w: 50, h: 50 };
        
        // Проверка подарков
        for (let i = gifts.length - 1; i >= 0; i--) {
            const gift = gifts[i];
            if (isCollision(santaBox, { x: gift.x, y: gift.y, w: 30, h: 30 })) {
                state.gameStats.giftsCaught++;
                gifts.splice(i, 1);
                showNotification('🎁 Подарок пойман!');
            }
        }
        
        // Проверка углей
        for (let i = coals.length - 1; i >= 0; i--) {
            const coal = coals[i];
            if (isCollision(santaBox, { x: coal.x, y: coal.y, w: 30, h: 30 })) {
                state.gameStats.missed++;
                coals.splice(i, 1);
                if (state.gameStats.missed >= CONFIG.maxMisses) {
                    endGame();
                }
            }
        }
    }

    function drawGame() {
        if (!gameCtx || !elements.gameCanvas) return;
        
        // Очистка
        gameCtx.fillStyle = '#0a1f2d';
        gameCtx.fillRect(0, 0, elements.gameCanvas.width, elements.gameCanvas.height);
        
        // Фон (звёзды)
        gameCtx.fillStyle = 'rgba(255,255,255,0.1)';
        for (let i = 0; i < 30; i++) {
            gameCtx.beginPath();
            gameCtx.arc(
                Math.random() * elements.gameCanvas.width,
                Math.random() * elements.gameCanvas.height,
                Math.random() * 2,
                0, Math.PI * 2
            );
            gameCtx.fill();
        }
        
        // Санта
        gameCtx.fillStyle = '#e84141';
        gameCtx.fillRect(santaX, elements.gameCanvas.height - 60, 50, 50);
        gameCtx.fillStyle = 'white';
        gameCtx.font = '30px Arial';
        gameCtx.fillText('🎅', santaX + 5, elements.gameCanvas.height - 20);
        
        // Подарки
        gifts.forEach(gift => {
            gameCtx.fillStyle = '#2d6a4f';
            gameCtx.fillRect(gift.x, gift.y, 30, 30);
            gameCtx.fillStyle = 'white';
            gameCtx.font = '20px Arial';
            gameCtx.fillText('🎁', gift.x + 5, gift.y + 22);
        });
        
        // Угли
        coals.forEach(coal => {
            gameCtx.fillStyle = '#333';
            gameCtx.fillRect(coal.x, coal.y, 30, 30);
            gameCtx.fillStyle = '#ff6b6b';
            gameCtx.font = '20px Arial';
            gameCtx.fillText('🔥', coal.x + 5, coal.y + 22);
        });
        
        // Таймер и счёт
        gameCtx.fillStyle = 'white';
        gameCtx.font = '20px Arial';
        gameCtx.fillText(`Время: ${Math.ceil(state.gameStats.timeLeft)}с`, 10, 30);
        gameCtx.fillText(`Подарки: ${state.gameStats.giftsCaught}`, 10, 60);
    }

    function endGame() {
        state.gameStats.isPlaying = false;
        clearInterval(gameInterval);
        
        let achievement = '';
        if (state.gameStats.giftsCaught >= 20) {
            achievement = '🏆 Мастер по ловле подарков!';
        } else if (state.gameStats.giftsCaught >= 10) {
            achievement = '🎯 Отличный результат!';
        } else {
            achievement = '🎄 Хорошая попытка!';
        }
        
        addAchievement(achievement);
        showNotification(`Игра окончена! Поймано подарков: ${state.gameStats.giftsCaught}`);
    }

    // === ОТКРЫТИЕ ПОДАРКА ===
    function openGift() {
        if (state.giftOpened) return;
        
        state.giftOpened = true;
        
        // 1. Сначала анимация открытия
        const lid = document.querySelector('.box-lid');
        if (lid) {
            lid.style.transform = 'rotateX(180deg) translateY(-50px)';
        }
        
        // 2. Скрываем кнопку
        if (elements.openGift) {
            elements.openGift.style.display = 'none';
        }


        const sidebar = document.getElementById('mainGiftSidebar');
        sidebar.classList.add('visible');
        showNotification('🎮 Основной подарок доступен!');

        
        // 3. Ждём завершения анимации открытия (1 сек)
        setTimeout(() => {
            // 4. ПОТОМ показываем гифку
            createGifAbove();
            
            // 5. И только потом финальное сообщение (ещё через 0.5 сек)
            setTimeout(() => {
                showFinalMessage();
            }, 500);
            
        }, 1000);
    }

    function createGifAbove() {
        const giftBox = document.querySelector('.gift-box');
        if (!giftBox) return;
        
        const boxRect = giftBox.getBoundingClientRect();
        
        const giftContent = document.createElement('div');
        giftContent.className = 'gift-content';
        giftContent.style.cssText = `
            position: absolute;
            width: 280px;
            height: 280px;
            top: 10;
            left: 50%;
            transform: translateX(-50%);
            z-index: 1000;
            background: white;
            border-radius: 15px;
            box-shadow: 0 15px 40px rgba(0,0,0,0.3);
            border: 5px solid var(--color-accent);
            animation: gifAppear 0.5s ease-out;
        `;
        
        // Обёртка для кликабельной гифки
        const gifLink = document.createElement('a');
        gifLink.href = CONFIG.giftGif;
        gifLink.download = `новогодний_подарок_${CONFIG.friendName}.gif`;
        gifLink.style.cssText = `
            display: block;
            width: 100%;
            height: 100%;
            cursor: pointer;
            position: relative;
        `;
        
        const gifImg = document.createElement('img');
        gifImg.src = CONFIG.giftGif;
        gifImg.alt = 'Подарок';
        gifImg.style.cssText = `
            width: 100%;
            height: 100%;
            object-fit: contain;
            padding: 10px;
            transition: transform 0.3s ease;
        `;
        
        // Эффект при наведении
        gifLink.addEventListener('mouseenter', () => {
            gifImg.style.transform = 'scale(1.05)';
        });
        
        gifLink.addEventListener('mouseleave', () => {
            gifImg.style.transform = 'scale(1)';
        });
        
        // Оверлей "Скачать"
        const downloadOverlay = document.createElement('div');
        downloadOverlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            border-radius: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        `;
        
        const downloadText = document.createElement('span');
        downloadText.textContent = '⬇️ Скачать файл';
        downloadText.style.cssText = `
            color: white;
            font-weight: bold;
            background: #e84141;
            padding: 10px 20px;
            border-radius: 20px;
            font-size: 1.1rem;
        `;
        
        downloadOverlay.appendChild(downloadText);
        
        // Показываем оверлей при наведении
        gifLink.addEventListener('mouseenter', () => {
            downloadOverlay.style.opacity = '1';
        });
        
        gifLink.addEventListener('mouseleave', () => {
            downloadOverlay.style.opacity = '0';
        });
        
        // Анимация при клике
        gifLink.addEventListener('click', (e) => {
            // Можно добавить анимацию
            gifImg.style.animation = 'clickPulse 0.5s ease';
            
            // Уведомление
            showNotification(`Скачивание запущено!`);
            
            // Можно добавить звук
            playSound('success');
            
            // Сбрасываем анимацию
            setTimeout(() => {
                gifImg.style.animation = '';
            }, 500);
        });
        
        // Собираем всё
        gifLink.appendChild(gifImg);
        gifLink.appendChild(downloadOverlay);
        giftContent.appendChild(gifLink);
        document.querySelector('.screen-final').appendChild(giftContent);
        
        // Добавляем анимацию в CSS
        if (!document.querySelector('#gifAnimations')) {
            const style = document.createElement('style');
            style.id = 'gifAnimations';
            style.textContent = `
                @keyframes clickPulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(0.95); }
                    100% { transform: scale(1); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    function showFinalMessage() {
        if (elements.finalMessage) {
            elements.finalMessage.classList.remove('hidden');
            generatePersonalMessage();
            updateAchievementsList();
            
            const code = generateSecretCode();
            if (elements.secretCode) {
                elements.secretCode.textContent = code;
            }
            
            addAchievement('🎁 Открыл главный подарок!');
            showNotification('Поздравляю! Ты открыл все сюрпризы!');
        }
    }

    // Твой готовый ключ Steam
    const YOUR_STEAM_KEY = "XXXX-XXXX-XXXX-XXXX"; // ← ВСТАВЬ СВОЙ КЛЮЧ ЗДЕСЬ

    // Обработчики Steam подарка
    function setupSteamGift() {
        const steamBtn = document.getElementById('steamGiftBtn');
        const steamModal = document.getElementById('steamModal');
        const closeBtn = document.getElementById('closeModal');
        const copyBtn = document.getElementById('copySteamKey');
        
        if (!steamBtn || !steamModal) return;
        
        // Открытие модального окна
        steamBtn.addEventListener('click', () => {
            steamModal.classList.remove('hidden');
            addAchievement('🎮 Получил Steam подарок!');
            playSound('success');
            showNotification('🎁 Ключ игры готов для активации!');
        });
        
        // Закрытие модального окна
        closeBtn.addEventListener('click', () => {
            steamModal.classList.add('hidden');
        });
        
        // Клик по оверлею тоже закрывает
        steamModal.addEventListener('click', (e) => {
            if (e.target === steamModal) {
                steamModal.classList.add('hidden');
            }
        });
        
        // Копирование ключа
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(YOUR_STEAM_KEY)
                .then(() => {
                    showNotification('✅ Ключ скопирован! Активируй в Steam!');
                    copyBtn.innerHTML = '✅ Скопировано!';
                    copyBtn.disabled = true;
                    
                    setTimeout(() => {
                        copyBtn.innerHTML = '📋 Копировать ключ';
                        copyBtn.disabled = false;
                    }, 3000);
                })
                .catch(() => {
                    showNotification('❌ Не удалось скопировать ключ');
                });
        });
    }

    function generatePersonalMessage() {
        if (!elements.personalMsg) return;
        
        const messages = [
            `Красава, ${CONFIG.friendName}! Твой ${CONFIG.characterName} теперь самый сильный.`,
            `Созданная тобой атмосфера просто нереальна! ${state.roomProgress}% уюта - это рекорд!`,
            `Ты провёл ${state.timeSpent} секунд в этом новогоднем мире и сделал его лучше!`,
            `Пойманные подарки (${state.gameStats.giftsCaught}) и выпитое какао (${state.interactions.cocoa}) - нереально!`,
            `С ${state.interactions.snowballs} снежками и ${state.interactions.decorations} украшениями - это самый уютный праздник!`
        ];
        
        elements.personalMsg.textContent = 
            messages[Math.floor(Math.random() * messages.length)];
    }

    function generateSecretCode() {
        const actions = [
            state.character.upgrades,
            state.interactions.snowballs,
            state.interactions.cocoa,
            state.interactions.decorations,
            state.gameStats.giftsCaught,
            Math.floor(state.timeSpent / 10)
        ];
        
        const code = 'XMAS-' + actions.map(n => n.toString(16)).join('').toUpperCase();
        return code.substring(0, 15);
    }

    // === ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ===
    function updateGameUI() {
        if (elements.giftsCaught) elements.giftsCaught.textContent = state.gameStats.giftsCaught;
        if (elements.gameTime) elements.gameTime.textContent = Math.ceil(state.gameStats.timeLeft);
        if (elements.missed) elements.missed.textContent = state.gameStats.missed;
    }

    function updateUI() {
        if (elements.charLevel) elements.charLevel.textContent = state.character.level;
        if (elements.charPower) elements.charPower.textContent = state.character.power;
        if (elements.snowballCount) elements.snowballCount.textContent = state.interactions.snowballs;
        if (elements.cocoaCount) elements.cocoaCount.textContent = state.interactions.cocoa;
        if (elements.decorCount) elements.decorCount.textContent = state.interactions.decorations;
        if (elements.fireStatus) elements.fireStatus.textContent = state.interactions.fireLit ? 'Да 🔥' : 'Нет';
    }

    function addAchievement(text) {
        if (!state.achievements.includes(text)) {
            state.achievements.push(text);
            showNotification(`🎉 Новое достижение: ${text}`);
        }
    }

    function updateAchievementsList() {
        if (!elements.achievementList) return;
        
        elements.achievementList.innerHTML = '';
        state.achievements.forEach(ach => {
            const li = document.createElement('li');
            li.textContent = ach;
            elements.achievementList.appendChild(li);
        });
    }

    function showNotification(text) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = text;
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 10);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    function createSnowballAnimation() {
        const windowElement = document.getElementById('window');
        if (!windowElement) return;
        
        const button = windowElement.querySelector('.btn-room');
        if (!button) return;
        
        const rect = button.getBoundingClientRect();
        
        const snowball = document.createElement('div');
        snowball.style.cssText = `
            position: fixed;
            width: 30px;
            height: 30px;
            background: white;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            top: ${rect.top + rect.height/2}px;
            left: ${rect.left + rect.width/2}px;
            transform: translate(-50%, -50%);
            box-shadow: 0 0 20px rgba(255,255,255,0.8);
        `;
        document.body.appendChild(snowball);
        
        // Анимация полёта от окна
        const randomX = Math.random() * 300 - 150;
        const randomY = Math.random() * -100 - 50; // Летит вверх
        
        snowball.animate([
            { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
            { transform: `translate(${randomX}px, ${randomY}px) scale(0.5)`, opacity: 0 }
        ], {
            duration: 1000,
            easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        });
        
        setTimeout(() => snowball.remove(), 1000);
    }

    function shareExperience() {
        const shareText = `🎄 Я провёл ${state.timeSpent} секунд в новогоднем приключении от Тайного Санты! 
        Поймал ${state.gameStats.giftsCaught} подарков и создал комнату с ${state.roomProgress}% уюта!
        Секретный код: ${elements.secretCode ? elements.secretCode.textContent : 'SANTA-2024'}`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Моё новогоднее приключение',
                text: shareText
            });
        } else {
            navigator.clipboard.writeText(shareText);
            showNotification('Текст скопирован! Поделись с друзьями!');
        }
    }

    function updateActiveNavDot() {
        const scrollPos = window.scrollY + window.innerHeight / 3;
        document.querySelectorAll('.screen').forEach((screen, index) => {
            const screenTop = screen.offsetTop;
            const screenBottom = screenTop + screen.offsetHeight;
            
            const dot = document.querySelector(`.nav-dot[data-screen="${index + 1}"]`);
            if (dot) {
                if (scrollPos >= screenTop && scrollPos <= screenBottom) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            }
        });
    }

    function isCollision(rect1, rect2) {
        return rect1.x < rect2.x + rect2.w &&
               rect1.x + rect1.w > rect2.x &&
               rect1.y < rect2.y + rect2.h &&
               rect1.y + rect1.h > rect2.y;
    }

    function toggleGamePause() {
        state.gameStats.isPlaying = !state.gameStats.isPlaying;
        if (state.gameStats.isPlaying) {
            lastTime = Date.now();
        }
    }

    // === ЗАПУСК ПРИЛОЖЕНИЯ ===
    init();
});