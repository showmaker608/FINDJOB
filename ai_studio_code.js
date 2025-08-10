// 这是一个JavaScript注释。这里的代码用于实现单页面切换和图片轮播功能。

document.addEventListener('DOMContentLoaded', function() {
    console.log('页面加载完成，开始初始化...');
    
    // 加载保存的数据
    loadSavedData();
    
    // 加载上传的图片
    loadUploadedImages();
    
    // 设置导航事件
    setupNavigation();
    
    // 初始化所有轮播图
    initializeCarousels();
    
    // 默认显示主页
    switchSection('home');
});

// 设置导航事件
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    console.log('找到导航链接数量:', navLinks.length);
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('点击导航:', this.getAttribute('data-section'));
            
            // 获取目标版块的ID
            const targetSection = this.getAttribute('data-section');
            
            // 切换内容显示
            switchSection(targetSection);
            
            // 更新导航栏激活状态
            updateNavigation(this);
        });
    });
}

// 切换内容版块
function switchSection(sectionId) {
    console.log('切换到版块:', sectionId);
    
    // 隐藏所有内容版块
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // 显示目标版块
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        console.log('成功切换到:', sectionId);
        
        // 滚动到顶部
        targetSection.scrollTop = 0;
    } else {
        console.error('找不到版块:', sectionId);
    }
}

// 更新导航栏激活状态
function updateNavigation(activeLink) {
    // 移除所有导航链接的激活状态
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // 激活当前点击的链接
    activeLink.classList.add('active');
}

// 加载上传的图片
function loadUploadedImages() {
    const imageData = JSON.parse(localStorage.getItem('imageData') || '{}');
    console.log('加载图片数据:', imageData);
    
    // 为每个部分加载图片
    Object.keys(imageData).forEach(sectionId => {
        const images = imageData[sectionId];
        if (images && images.length > 0) {
            console.log('为版块', sectionId, '加载', images.length, '张图片');
            updateCarouselImages(sectionId, images);
        }
    });
}

// 更新轮播图片
function updateCarouselImages(sectionId, imageUrls) {
    const carouselContainer = document.querySelector(`#${sectionId} .carousel-container`);
    const dotsContainer = document.querySelector(`#${sectionId} .carousel-dots`);
    
    if (!carouselContainer || !dotsContainer) {
        console.error('找不到轮播容器:', sectionId);
        return;
    }
    
    console.log('更新轮播图片:', sectionId, imageUrls.length);
    
    // 清空现有图片
    carouselContainer.innerHTML = '';
    dotsContainer.innerHTML = '';
    
    // 添加新图片
    imageUrls.forEach((imageUrl, index) => {
        // 创建图片元素
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = `${sectionId} 图片 ${index + 1}`;
        img.className = 'carousel-slide';
        if (index === 0) img.classList.add('active');
        
        carouselContainer.appendChild(img);
        
        // 创建对应的点
        const dot = document.createElement('span');
        dot.className = 'dot';
        if (index === 0) dot.classList.add('active');
        dot.onclick = () => currentSlide(sectionId, index);
        
        dotsContainer.appendChild(dot);
    });
    
    // 重置轮播索引
    slideIndexes[sectionId] = 0;
}

// 加载保存的数据
function loadSavedData() {
    const savedData = localStorage.getItem('personalWebsiteData');
    if (savedData) {
        const data = JSON.parse(savedData);
        console.log('加载保存的数据:', data);
        
        // 更新主页内容
        if (data.name) {
            const nameElement = document.querySelector('#home h1');
            if (nameElement) nameElement.textContent = data.name;
        }
        
        if (data.title) {
            const titleElement = document.querySelector('#home .subtitle');
            if (titleElement) titleElement.textContent = data.title;
        }
        
        if (data.intro) {
            const introElement = document.querySelector('#home .text-column p:nth-of-type(2)');
            if (introElement) introElement.textContent = data.intro;
        }
        
        if (data.phone) {
            const phoneElement = document.querySelector('#home .contact-info p:first-of-type');
            if (phoneElement) phoneElement.innerHTML = `<strong>电话:</strong> ${data.phone}`;
        }
        
        if (data.email) {
            const emailElement = document.querySelector('#home .contact-info p:last-of-type');
            if (emailElement) emailElement.innerHTML = `<strong>邮箱:</strong> ${data.email}`;
        }
        
        // 更新教育经历
        if (data.whuEdu) {
            const whuSection = document.querySelector('#education .experience-item:first-of-type');
            if (whuSection) {
                const lines = data.whuEdu.split('\n');
                const h3Element = whuSection.querySelector('h3');
                if (h3Element) h3Element.textContent = lines[0];
                
                // 更新学位信息
                const degreeElement = whuSection.querySelector('p:nth-of-type(1)');
                if (degreeElement && lines[1]) {
                    degreeElement.innerHTML = `<strong>学位:</strong> ${lines[1].replace('学位: ', '')}`;
                }
                
                // 更新课程信息
                const courseElement = whuSection.querySelector('p:nth-of-type(2)');
                if (courseElement && lines[2]) {
                    courseElement.innerHTML = `<strong>主修课程:</strong> ${lines[2].replace('主修课程: ', '')}`;
                }
                
                // 更新荣誉信息
                const honorElement = whuSection.querySelector('p:nth-of-type(3)');
                if (honorElement && lines[3]) {
                    honorElement.innerHTML = `<strong>荣誉:</strong> ${lines[3].replace('荣誉: ', '')}`;
                }
            }
        }
        
        if (data.hnustEdu) {
            const hnustSection = document.querySelector('#education .experience-item:last-of-type');
            if (hnustSection) {
                const lines = data.hnustEdu.split('\n');
                const h3Element = hnustSection.querySelector('h3');
                if (h3Element) h3Element.textContent = lines[0];
                
                // 更新学位信息
                const degreeElement = hnustSection.querySelector('p:nth-of-type(1)');
                if (degreeElement && lines[1]) {
                    degreeElement.innerHTML = `<strong>学位:</strong> ${lines[1].replace('学位: ', '')}`;
                }
                
                // 更新课程信息
                const courseElement = hnustSection.querySelector('p:nth-of-type(2)');
                if (courseElement && lines[2]) {
                    courseElement.innerHTML = `<strong>主修课程:</strong> ${lines[2].replace('主修课程: ', '')}`;
                }
                
                // 更新荣誉信息
                const honorElement = hnustSection.querySelector('p:nth-of-type(3)');
                if (honorElement && lines[3]) {
                    honorElement.innerHTML = `<strong>荣誉:</strong> ${lines[3].replace('荣誉: ', '')}`;
                }
            }
        }
        
        // 更新项目经历
        const projectSections = document.querySelectorAll('#projects .experience-item');
        if (data.workExp && projectSections[0]) {
            const lines = data.workExp.split('\n');
            const h3Element = projectSections[0].querySelector('h3');
            if (h3Element) h3Element.textContent = lines[0];
            
            const pElement = projectSections[0].querySelector('p');
            if (pElement) pElement.textContent = lines[1] || '';
        }
        
        if (data.ocrProject && projectSections[1]) {
            const lines = data.ocrProject.split('\n');
            const h3Element = projectSections[1].querySelector('h3');
            if (h3Element) h3Element.textContent = lines[0];
            
            const pElement = projectSections[1].querySelector('p');
            if (pElement) pElement.textContent = lines[1] || '';
        }
        
        if (data.aiVideoProject && projectSections[2]) {
            const lines = data.aiVideoProject.split('\n');
            const h3Element = projectSections[2].querySelector('h3');
            if (h3Element) h3Element.textContent = lines[0];
            
            const pElement = projectSections[2].querySelector('p');
            if (pElement) pElement.textContent = lines[1] || '';
        }
        
        if (data.labAutomation && projectSections[3]) {
            const lines = data.labAutomation.split('\n');
            const h3Element = projectSections[3].querySelector('h3');
            if (h3Element) h3Element.textContent = lines[0];
            
            const pElement = projectSections[3].querySelector('p');
            if (pElement) pElement.textContent = lines[1] || '';
        }
        
        if (data.nanoProject && projectSections[4]) {
            const lines = data.nanoProject.split('\n');
            const h3Element = projectSections[4].querySelector('h3');
            if (h3Element) h3Element.textContent = lines[0];
            
            const pElement = projectSections[4].querySelector('p');
            if (pElement) pElement.textContent = lines[1] || '';
        }
        
        // 更新技能爱好
        const skillsSections = document.querySelectorAll('#hobbies .skills-category');
        if (data.professionalSkills && skillsSections[0]) {
            const skills = data.professionalSkills.split('\n').filter(skill => skill.trim());
            const ulElement = skillsSections[0].querySelector('ul');
            if (ulElement) ulElement.innerHTML = skills.map(skill => `<li>${skill}</li>`).join('');
        }
        
        if (data.techSkills && skillsSections[1]) {
            const skills = data.techSkills.split('\n').filter(skill => skill.trim());
            const ulElement = skillsSections[1].querySelector('ul');
            if (ulElement) ulElement.innerHTML = skills.map(skill => `<li>${skill}</li>`).join('');
        }
        
        if (data.hobbies && skillsSections[2]) {
            const hobbies = data.hobbies.split('\n').filter(hobby => hobby.trim());
            const ulElement = skillsSections[2].querySelector('ul');
            if (ulElement) ulElement.innerHTML = hobbies.map(hobby => `<li>${hobby}</li>`).join('');
        }
    }
}

// 轮播图功能
let slideIndexes = {
    'home': 0,
    'education': 0,
    'projects': 0,
    'hobbies': 0
};

function initializeCarousels() {
    console.log('初始化轮播图...');
    // 为每个轮播图设置自动播放
    Object.keys(slideIndexes).forEach(sectionId => {
        showSlides(sectionId, 0);
        // 每5秒自动切换一次图片
        setInterval(() => {
            changeSlide(sectionId, 1);
        }, 5000);
    });
}

function changeSlide(sectionId, direction) {
    const slides = document.querySelectorAll(`#${sectionId} .carousel-slide`);
    const dots = document.querySelectorAll(`#${sectionId} .dot`);
    
    if (slides.length === 0) return;
    
    slideIndexes[sectionId] += direction;
    
    if (slideIndexes[sectionId] >= slides.length) {
        slideIndexes[sectionId] = 0;
    }
    if (slideIndexes[sectionId] < 0) {
        slideIndexes[sectionId] = slides.length - 1;
    }
    
    showSlides(sectionId, slideIndexes[sectionId]);
}

function currentSlide(sectionId, index) {
    slideIndexes[sectionId] = index;
    showSlides(sectionId, index);
}

function showSlides(sectionId, index) {
    const slides = document.querySelectorAll(`#${sectionId} .carousel-slide`);
    const dots = document.querySelectorAll(`#${sectionId} .dot`);
    
    if (slides.length === 0) return;
    
    // 隐藏所有图片
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // 移除所有点的激活状态
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // 显示当前图片
    if (slides[index]) {
        slides[index].classList.add('active');
    }
    
    // 激活当前点
    if (dots[index]) {
        dots[index].classList.add('active');
    }
}