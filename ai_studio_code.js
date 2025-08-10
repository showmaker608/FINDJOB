// 这是一个JavaScript注释。这里的代码用于实现单页面切换和图片轮播功能。

document.addEventListener('DOMContentLoaded', function() {
    
    // 加载保存的数据
    loadSavedData();
    
    // 获取所有导航链接
    const navLinks = document.querySelectorAll('.nav-link');
    
    // 为每个导航链接添加点击事件监听器
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // 获取目标版块的ID
            const targetSection = this.getAttribute('data-section');
            
            // 切换内容显示
            switchSection(targetSection);
            
            // 更新导航栏激活状态
            updateNavigation(this);
        });
    });

    // 初始化所有轮播图
    initializeCarousels();
    
    // 默认显示主页
    switchSection('home');
});

// 切换内容版块
function switchSection(sectionId) {
    // 隐藏所有内容版块
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // 显示目标版块
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // 滚动到顶部
        targetSection.scrollTop = 0;
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

// 加载保存的数据
function loadSavedData() {
    const savedData = localStorage.getItem('personalWebsiteData');
    if (savedData) {
        const data = JSON.parse(savedData);
        
        // 更新主页内容
        if (data.name) document.querySelector('#home h1').textContent = data.name;
        if (data.title) document.querySelector('#home .subtitle').textContent = data.title;
        if (data.intro) document.querySelector('#home .text-column p:nth-of-type(2)').textContent = data.intro;
        if (data.phone) document.querySelector('#home .contact-info p:first-of-type').innerHTML = `<strong>电话:</strong> ${data.phone}`;
        if (data.email) document.querySelector('#home .contact-info p:last-of-type').innerHTML = `<strong>邮箱:</strong> ${data.email}`;
        
        // 更新教育经历
        if (data.whuEdu) {
            const whuSection = document.querySelector('#education .experience-item:first-of-type');
            if (whuSection) {
                const lines = data.whuEdu.split('\n');
                whuSection.querySelector('h3').textContent = lines[0];
                whuSection.innerHTML = whuSection.innerHTML.replace(/<p><strong>学位:<\/strong>.*?<\/p>/s, `<p><strong>学位:</strong> ${lines[1]?.replace('学位: ', '') || ''}</p>`);
                whuSection.innerHTML = whuSection.innerHTML.replace(/<p><strong>主修课程:<\/strong>.*?<\/p>/s, `<p><strong>主修课程:</strong> ${lines[2]?.replace('主修课程: ', '') || ''}</p>`);
                whuSection.innerHTML = whuSection.innerHTML.replace(/<p><strong>荣誉:<\/strong>.*?<\/p>/s, `<p><strong>荣誉:</strong> ${lines[3]?.replace('荣誉: ', '') || ''}</p>`);
            }
        }
        
        if (data.hnustEdu) {
            const hnustSection = document.querySelector('#education .experience-item:last-of-type');
            if (hnustSection) {
                const lines = data.hnustEdu.split('\n');
                hnustSection.querySelector('h3').textContent = lines[0];
                hnustSection.innerHTML = hnustSection.innerHTML.replace(/<p><strong>学位:<\/strong>.*?<\/p>/s, `<p><strong>学位:</strong> ${lines[1]?.replace('学位: ', '') || ''}</p>`);
                hnustSection.innerHTML = hnustSection.innerHTML.replace(/<p><strong>主修课程:<\/strong>.*?<\/p>/s, `<p><strong>主修课程:</strong> ${lines[2]?.replace('主修课程: ', '') || ''}</p>`);
                hnustSection.innerHTML = hnustSection.innerHTML.replace(/<p><strong>荣誉:<\/strong>.*?<\/p>/s, `<p><strong>荣誉:</strong> ${lines[3]?.replace('荣誉: ', '') || ''}</p>`);
            }
        }
        
        // 更新项目经历
        const projectSections = document.querySelectorAll('#projects .experience-item');
        if (data.workExp && projectSections[0]) {
            const lines = data.workExp.split('\n');
            projectSections[0].querySelector('h3').textContent = lines[0];
            projectSections[0].querySelector('p').textContent = lines[1] || '';
        }
        
        if (data.ocrProject && projectSections[1]) {
            const lines = data.ocrProject.split('\n');
            projectSections[1].querySelector('h3').textContent = lines[0];
            projectSections[1].querySelector('p').textContent = lines[1] || '';
        }
        
        if (data.aiVideoProject && projectSections[2]) {
            const lines = data.aiVideoProject.split('\n');
            projectSections[2].querySelector('h3').textContent = lines[0];
            projectSections[2].querySelector('p').textContent = lines[1] || '';
        }
        
        if (data.labAutomation && projectSections[3]) {
            const lines = data.labAutomation.split('\n');
            projectSections[3].querySelector('h3').textContent = lines[0];
            projectSections[3].querySelector('p').textContent = lines[1] || '';
        }
        
        if (data.nanoProject && projectSections[4]) {
            const lines = data.nanoProject.split('\n');
            projectSections[4].querySelector('h3').textContent = lines[0];
            projectSections[4].querySelector('p').textContent = lines[1] || '';
        }
        
        // 更新技能爱好
        const skillsSections = document.querySelectorAll('#hobbies .skills-category');
        if (data.professionalSkills && skillsSections[0]) {
            const skills = data.professionalSkills.split('\n').filter(skill => skill.trim());
            skillsSections[0].querySelector('ul').innerHTML = skills.map(skill => `<li>${skill}</li>`).join('');
        }
        
        if (data.techSkills && skillsSections[1]) {
            const skills = data.techSkills.split('\n').filter(skill => skill.trim());
            skillsSections[1].querySelector('ul').innerHTML = skills.map(skill => `<li>${skill}</li>`).join('');
        }
        
        if (data.hobbies && skillsSections[2]) {
            const hobbies = data.hobbies.split('\n').filter(hobby => hobby.trim());
            skillsSections[2].querySelector('ul').innerHTML = hobbies.map(hobby => `<li>${hobby}</li>`).join('');
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